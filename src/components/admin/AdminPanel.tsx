"use client";

import { createContext, useContext, useEffect, useState, type FormEvent } from "react";

type Content = Record<string, unknown>;

const tabs = ["Firma", "Cennik", "Usługi", "FAQ", "Realizacje", "Opinie", "Grafiki"] as const;

const SaveStatus = createContext({ saving: false, saved: false });

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Firma");
  const [data, setData] = useState<Content | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin-password");
    const notice = sessionStorage.getItem("admin-notice");
    if (notice) {
      setMessage(notice);
      sessionStorage.removeItem("admin-notice");
    }
    const until = Number(sessionStorage.getItem("admin-saved-until") ?? 0);
    const left = until - Date.now();
    let timer = 0;
    if (left > 0) {
      setSaved(true);
      timer = window.setTimeout(() => {
        setSaved(false);
        sessionStorage.removeItem("admin-saved-until");
      }, left);
    } else {
      sessionStorage.removeItem("admin-saved-until");
    }
    if (!stored) return () => window.clearTimeout(timer);
    setPassword(stored);
    void openPanel(stored);
    return () => window.clearTimeout(timer);
  }, []);

  async function openPanel(value: string) {
    setError("");
    const response = await fetch("/api/admin/content", { headers: { "x-admin-password": value } });
    const body = await response.json();
    if (!response.ok) {
      setError(body.error ?? "Nie udało się otworzyć panelu.");
      setReady(false);
      return;
    }
    sessionStorage.setItem("admin-password", value);
    setData(body);
    setReady(true);
  }

  async function unlock(event: FormEvent) {
    event.preventDefault();
    await openPanel(password);
  }

  async function save(section: string, payload: unknown) {
    setError("");
    setMessage("");
    setSaving(true);
    setSaved(false);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-password": sessionStorage.getItem("admin-password") ?? password,
        },
        body: JSON.stringify({ section, data: payload }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(body.error ?? "Zapis nie powiódł się.");
        return;
      }
      const notice = body.rebuild ? `Zapisano ${body.file}. Strona przebudowuje się.` : `Zapisano ${body.file}`;
      sessionStorage.setItem("admin-notice", notice);
      sessionStorage.setItem("admin-saved-until", String(Date.now() + 1800));
      setMessage(notice);
      setSaved(true);
      window.setTimeout(() => {
        setSaved(false);
        sessionStorage.removeItem("admin-saved-until");
      }, 1800);
    } catch {
      setError("Zapis nie powiódł się.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready || !data) {
    return (
      <form onSubmit={unlock} className="mx-auto max-w-md px-4 py-24">
        <h1 className="font-display text-3xl font-semibold">Panel treści</h1>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-6 w-full rounded-xl border border-white/10 bg-card px-4 py-3"
          autoComplete="current-password"
        />
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        <button className="mt-4 min-h-11 rounded-full bg-accent px-5 font-semibold text-bg" type="submit">
          Wejdź
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 pb-40">
      <h1 className="font-display text-3xl font-semibold">Panel treści</h1>
      <p className="mt-2 text-sm text-muted">Zapisuje pliki w projekcie. Na serwerze strona przebudowuje się po zapisie.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`min-h-11 rounded-full px-4 text-sm ${tab === item ? "bg-accent text-bg" : "border border-white/10"}`}
          >
            {item}
          </button>
        ))}
      </div>
      {saving ? <p className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-card px-5 py-3 text-sm text-muted shadow-lg">Zapisuję…</p> : null}
      {message ? <p className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-card px-5 py-3 text-sm text-accent-2 shadow-lg">{message}</p> : null}
      {error ? <p className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-card px-5 py-3 text-sm text-red-300 shadow-lg">{error}</p> : null}
      <SaveStatus.Provider value={{ saving, saved }}>
      <div className="mt-6">
        {tab === "Firma" ? <CompanyForm data={data} save={save} /> : null}
        {tab === "Cennik" ? <PricingForm data={data} save={save} /> : null}
        {tab === "Usługi" ? <ServicesForm data={data} save={save} /> : null}
        {tab === "FAQ" ? <FaqForm data={data} save={save} /> : null}
        {tab === "Realizacje" ? <RealizationsForm data={data} save={save} /> : null}
        {tab === "Opinie" ? <ReviewsForm data={data} save={save} /> : null}
        {tab === "Grafiki" ? <ImagesForm data={data} save={save} onError={setError} onMessage={setMessage} /> : null}
      </div>
      </SaveStatus.Provider>
    </div>
  );
}

function CompanyForm({ data, save }: { data: Content; save: (section: string, payload: unknown) => void }) {
  const [form, setForm] = useState(data);
  const company = form.company as Record<string, string | string[]>;
  const areas = form.serviceAreas as { name: string; primary: boolean }[];
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        save("company", { company: form.company, serviceAreas: form.serviceAreas, areaNote: form.areaNote });
      }}
    >
      <Field label="Nazwa" value={String(company.name)} onChange={(value) => setCompany(setForm, "name", value)} />
      <Field label="Linia logo 1" value={String(company.logoLines?.[0] ?? "")} onChange={(value) => setLogo(setForm, 0, value)} />
      <Field label="Linia logo 2" value={String(company.logoLines?.[1] ?? "")} onChange={(value) => setLogo(setForm, 1, value)} />
      <Field label="Podpis" value={String(company.tagline)} onChange={(value) => setCompany(setForm, "tagline", value)} />
      <Field label="Nazwa SEO" value={String(company.seoName)} onChange={(value) => setCompany(setForm, "seoName", value)} />
      <Field label="Telefon" value={String(company.phone)} onChange={(value) => setCompany(setForm, "phone", value)} />
      <Field label="E-mail" value={String(company.email)} onChange={(value) => setCompany(setForm, "email", value)} />
      <Field label="Adres" value={String(company.address)} onChange={(value) => setCompany(setForm, "address", value)} />
      <Field label="Miasto" value={String(company.city)} onChange={(value) => setCompany(setForm, "city", value)} />
      <Field label="Godziny" value={String(company.openingHours)} onChange={(value) => setCompany(setForm, "openingHours", value)} />
      <Field label="Dopisek godzin" value={String(company.openingHoursNote)} onChange={(value) => setCompany(setForm, "openingHoursNote", value)} />
      <Field label="Obszar" value={String(company.serviceAreaLabel)} onChange={(value) => setCompany(setForm, "serviceAreaLabel", value)} />
      <Field label="Adres strony" value={String(company.siteUrl)} onChange={(value) => setCompany(setForm, "siteUrl", value)} />
      <Field label="Link do mapy" value={String(company.googleMapsUrl)} onChange={(value) => setCompany(setForm, "googleMapsUrl", value)} />
      <Field label="Mapa osadzona" value={String(company.googleMapsEmbedUrl)} onChange={(value) => setCompany(setForm, "googleMapsEmbedUrl", value)} />
      <Field label="Facebook" value={String(company.facebookUrl)} onChange={(value) => setCompany(setForm, "facebookUrl", value)} />
      <Area label="Opis SEO" value={String(company.description)} onChange={(value) => setCompany(setForm, "description", value)} />
      <Area label="Tekst obszaru" value={String(form.areaNote)} onChange={(value) => setForm({ ...form, areaNote: value })} />
      <p className="text-sm text-muted">Miejscowości, po jednej w linii. Główna to pierwsza.</p>
      <Area
        label="Miejscowości"
        value={areas.map((area) => area.name).join("\n")}
        onChange={(value) =>
          setForm({
            ...form,
            serviceAreas: value
              .split("\n")
              .map((name) => name.trim())
              .filter(Boolean)
              .map((name, index) => ({ name, primary: index === 0 })),
          })
        }
      />
      <Save />
    </form>
  );
}

function PricingForm({ data, save }: { data: Content; save: (section: string, payload: unknown) => void }) {
  const [items, setItems] = useState(data.pricingItems as Record<string, string>[]);
  const [note, setNote] = useState(String(data.pricingNote));
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        save("pricing", { pricingItems: items, pricingNote: note });
      }}
    >
      {items.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-2xl border border-white/10 p-4">
          <Field label="Nazwa" value={item.name} onChange={(value) => updateRow(setItems, index, { name: value })} />
          <Field label="Cena" value={item.price} onChange={(value) => updateRow(setItems, index, { price: value })} />
          <Field label="Opis" value={item.detail} onChange={(value) => updateRow(setItems, index, { detail: value })} />
          <label className="block text-sm text-muted">
            Kategoria
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-card px-3 py-3"
              value={item.category}
              onChange={(event) => updateRow(setItems, index, { category: event.target.value })}
            >
              <option value="ogolne">ogólne</option>
              <option value="komputery">komputery</option>
              <option value="telefony">telefony</option>
            </select>
          </label>
        </div>
      ))}
      <Area label="Dopisek" value={note} onChange={setNote} />
      <Save />
    </form>
  );
}

function ServicesForm({ data, save }: { data: Content; save: (section: string, payload: unknown) => void }) {
  const [computers, setComputers] = useState(data.computerGroups as Group[]);
  const [phones, setPhones] = useState(data.phoneGroups as Group[]);
  const [brands, setBrands] = useState((data.phoneBrands as string[]).join("\n"));
  const [phoneNote, setPhoneNote] = useState(String(data.phonePriceNote));
  const [benefits, setBenefits] = useState(data.benefits as Record<string, string>[]);
  const [problems, setProblems] = useState(data.problems as Record<string, string>[]);
  const [steps, setSteps] = useState(data.repairSteps as Record<string, string>[]);
  return (
    <div className="space-y-8">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          save("services", {
            computerGroups: computers,
            phoneGroups: phones,
            phoneBrands: brands.split("\n"),
            phonePriceNote: phoneNote,
          });
        }}
      >
        <h2 className="font-display text-2xl">Komputery</h2>
        {computers.map((group, index) => (
          <GroupFields key={group.id} group={group} onChange={(next) => updateRow(setComputers, index, next)} />
        ))}
        <h2 className="font-display text-2xl">Telefony</h2>
        {phones.map((group, index) => (
          <GroupFields key={group.id} group={group} onChange={(next) => updateRow(setPhones, index, next)} />
        ))}
        <Area label="Marki, jedna w linii" value={brands} onChange={setBrands} />
        <Area label="Dopisek o cenie" value={phoneNote} onChange={setPhoneNote} />
        <Save />
      </form>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          save("benefits", benefits);
        }}
      >
        <h2 className="font-display text-2xl">Dlaczego lokalny serwis</h2>
        {benefits.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <Field label="Tytuł" value={item.title} onChange={(value) => updateRow(setBenefits, index, { title: value })} />
            <Area label="Tekst" value={item.text} onChange={(value) => updateRow(setBenefits, index, { text: value })} />
          </div>
        ))}
        <Save />
      </form>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          save("problems", problems);
        }}
      >
        <h2 className="font-display text-2xl">Najczęstsze problemy</h2>
        {problems.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <Field label="Problem" value={item.title} onChange={(value) => updateRow(setProblems, index, { title: value })} />
            <Area label="Opis" value={item.text} onChange={(value) => updateRow(setProblems, index, { text: value })} />
          </div>
        ))}
        <Save />
      </form>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          save("process", steps);
        }}
      >
        <h2 className="font-display text-2xl">Jak wygląda naprawa</h2>
        {steps.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <Field label={item.id} value={item.title} onChange={(value) => updateRow(setSteps, index, { title: value })} />
            <Area label="Tekst" value={item.text} onChange={(value) => updateRow(setSteps, index, { text: value })} />
          </div>
        ))}
        <Save />
      </form>
    </div>
  );
}

function FaqForm({ data, save }: { data: Content; save: (section: string, payload: unknown) => void }) {
  const [items, setItems] = useState(data.faqItems as { id: string; question: string; answer: string; tags: string[] }[]);
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        save("faq", items);
      }}
    >
      {items.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-2xl border border-white/10 p-4">
          <Field label="Pytanie" value={item.question} onChange={(value) => updateRow(setItems, index, { question: value })} />
          <Area label="Odpowiedź" value={item.answer} onChange={(value) => updateRow(setItems, index, { answer: value })} />
          <Field
            label="Tagi: home, computers, phones, laptops"
            value={item.tags.join(", ")}
            onChange={(value) =>
              updateRow(setItems, index, {
                tags: value.split(",").map((tag) => tag.trim()).filter(Boolean),
              })
            }
          />
        </div>
      ))}
      <Save />
    </form>
  );
}

function RealizationsForm({ data, save }: { data: Content; save: (section: string, payload: unknown) => void }) {
  const [items, setItems] = useState(data.realizations as Record<string, string>[]);
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        save("realizations", items);
      }}
    >
      {items.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-2xl border border-white/10 p-4">
          <Field label="Urządzenie" value={item.device} onChange={(value) => updateRow(setItems, index, { device: value })} />
          <Field label="Problem" value={item.problem} onChange={(value) => updateRow(setItems, index, { problem: value })} />
          <Area label="Rozwiązanie" value={item.solution} onChange={(value) => updateRow(setItems, index, { solution: value })} />
          <Field label="Opis zdjęcia" value={item.imageAlt} onChange={(value) => updateRow(setItems, index, { imageAlt: value })} />
        </div>
      ))}
      <Save />
    </form>
  );
}

function ReviewsForm({ data, save }: { data: Content; save: (section: string, payload: unknown) => void }) {
  const [items, setItems] = useState(
    (data.reviews as { id: string; author: string; text: string; rating: number; source: "Google"; date: string }[]) ?? [],
  );
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        save("reviews", items);
      }}
    >
      <p className="text-sm text-muted">Tylko prawdziwe opinie Google. Pusta lista ukrywa sekcję.</p>
      {items.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-2xl border border-white/10 p-4">
          <Field label="Autor" value={item.author} onChange={(value) => updateRow(setItems, index, { author: value })} />
          <Area label="Treść" value={item.text} onChange={(value) => updateRow(setItems, index, { text: value })} />
          <Field label="Data" value={item.date} onChange={(value) => updateRow(setItems, index, { date: value })} />
          <Field label="Ocena 1–5" value={String(item.rating)} onChange={(value) => updateRow(setItems, index, { rating: Number(value) })} />
          <button type="button" className="text-sm text-red-300" onClick={() => setItems(items.filter((_, i) => i !== index))}>
            Usuń
          </button>
        </div>
      ))}
      <button
        type="button"
        className="min-h-11 rounded-full border border-white/15 px-4"
        onClick={() =>
          setItems([...items, { id: `opinia-${items.length + 1}`, author: "", text: "", rating: 5, source: "Google", date: "" }])
        }
      >
        Dodaj opinię
      </button>
      <Save />
    </form>
  );
}

function ImagesForm({
  data,
  save,
  onError,
  onMessage,
}: {
  data: Content;
  save: (section: string, payload: unknown) => void;
  onError: (value: string) => void;
  onMessage: (value: string) => void;
}) {
  const [images, setImages] = useState(data.images as Record<string, { src: string; alt: string }>);
  const slots = Object.entries(images);
  const realizations = data.realizations as { id: string; image: string; problem: string }[];

  async function upload(target: string, file: File) {
    onError("");
    onMessage("");
    const form = new FormData();
    form.set("target", target);
    form.set("file", file);
    const response = await fetch("/api/admin/image", {
      method: "POST",
      headers: { "x-admin-password": sessionStorage.getItem("admin-password") ?? "" },
      body: form,
    });
    const body = await response.json();
    if (!response.ok) onError(body.error ?? "Nie udało się wgrać pliku.");
    else onMessage(`Podmieniono ${body.file}`);
  }

  return (
    <div className="space-y-6">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          save("images", images);
        }}
      >
        {slots.map(([key, image]) => (
          <div key={key} className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm text-muted">{image.src}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt="" className="mt-3 h-32 w-full rounded-xl object-cover" />
            <Field label={`Opis: ${key}`} value={image.alt} onChange={(value) => setImages({ ...images, [key]: { ...image, alt: value } })} />
            <input
              className="mt-3 block"
              type="file"
              accept="image/webp,image/png,image/jpeg"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) upload(key, file);
              }}
            />
          </div>
        ))}
        <Save label="Zapisz opisy grafik" />
      </form>
      {realizations.map((item) => (
        <div key={item.id} className="rounded-2xl border border-white/10 p-4">
          <p className="font-medium">{item.problem}</p>
          <p className="text-sm text-muted">{item.image}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" className="mt-3 h-32 w-full rounded-xl object-cover" />
          <input
            className="mt-3 block"
            type="file"
            accept="image/webp,image/png,image/jpeg"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(`realization:${item.id}`, file);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function GroupFields({ group, onChange }: { group: Group; onChange: (next: Partial<Group>) => void }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 p-4">
      <Field label="Tytuł" value={group.title} onChange={(value) => onChange({ title: value })} />
      <Area label="Opis" value={group.text} onChange={(value) => onChange({ text: value })} />
      <Area label="Pozycje, jedna w linii" value={group.items.join("\n")} onChange={(value) => onChange({ items: value.split("\n") })} />
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input className="mt-1 w-full rounded-xl border border-white/10 bg-card px-3 py-3 text-text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <textarea className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-card px-3 py-3 text-text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Save({ label = "Zapisz" }: { label?: string }) {
  const { saving, saved } = useContext(SaveStatus);
  return (
    <button
      className={`min-h-11 cursor-pointer rounded-full px-5 font-semibold text-bg transition duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-95 disabled:cursor-wait disabled:opacity-60 ${saved ? "save-pop bg-emerald-400" : "bg-accent"}`}
      type="submit"
      disabled={saving}
    >
      {saving ? "Zapisuję…" : saved ? "Zapisano" : label}
    </button>
  );
}

function setCompany(setForm: (value: Content | ((current: Content) => Content)) => void, key: string, value: string) {
  setForm((current) => ({ ...current, company: { ...(current.company as object), [key]: value } }));
}

function setLogo(setForm: (value: Content | ((current: Content) => Content)) => void, index: number, value: string) {
  setForm((current) => {
    const company = current.company as { logoLines: string[] };
    const logoLines = [...company.logoLines];
    logoLines[index] = value;
    return { ...current, company: { ...company, logoLines } };
  });
}

function updateRow<T>(setItems: (value: T[] | ((current: T[]) => T[])) => void, index: number, patch: Partial<T>) {
  setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
}

type Group = { id: string; title: string; text: string; items: string[] };
