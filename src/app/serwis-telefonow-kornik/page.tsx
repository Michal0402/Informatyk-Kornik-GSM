import type { Metadata } from "next";
import { ServiceLanding } from "@/components/pages/ServiceLanding";
import { faqByTag } from "@/data/faq";
import { pricingItems } from "@/data/pricing";
import { phoneBrands } from "@/data/phone-services";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Serwis telefonów Kórnik",
  description:
    "Serwis GSM w Kórniku. Wymiana wyświetlacza i baterii, naprawa ładowania, iPhone, Samsung, Xiaomi i inne modele. Wycena przed naprawą.",
  alternates: { canonical: "/serwis-telefonow-kornik" },
  openGraph: {
    title: "Serwis telefonów Kórnik",
    description:
      "Naprawa smartfonów w Kórniku: ekran, bateria, ładowanie, aparat. Cena zależy od modelu i części.",
    url: "/serwis-telefonow-kornik",
  },
};

const groups = [
  {
    id: "ekran",
    title: "Ekran i szybka",
    text: "Pęknięcie nie zawsze oznacza wymianę całego telefonu. Oglądamy, czy padł obraz i dotyk.",
    items: ["Wymiana wyświetlacza", "Wymiana szybki aparatu", "Wymiana tylnej klapki"],
  },
  {
    id: "prad",
    title: "Bateria i ładowanie",
    text: "Szybkie rozładowanie i kapryśne gniazdo to dwie różne usterki. Nie zgadujemy po objawie.",
    items: ["Wymiana baterii", "Naprawa złącza ładowania", "Problemy z ładowaniem"],
  },
  {
    id: "po-upadku",
    title: "Po upadku i zalaniu",
    text: "Telefon, który wpadł do wody, nie powinien iść od razu na ładowarkę. Najpierw diagnostyka.",
    items: ["Diagnostyka po upadku", "Diagnostyka po zalaniu", "Telefon nie uruchamia się"],
  },
  {
    id: "reszta",
    title: "Dźwięk, aparat, dane",
    text: "Gdy słychać tylko jedną stronę rozmowy albo zdjęcia zostały na starym aparacie.",
    items: ["Wymiana głośnika", "Wymiana mikrofonu", "Problemy z aparatem", "Przenoszenie danych"],
  },
];

export default function PhoneServicePage() {
  return (
    <ServiceLanding
      eyebrow="Kórnik · GSM"
      h1="Serwis telefonów w Kórniku"
      lead="Pęknięty ekran, bateria na jedno przedpołudnie albo telefon, który ładuje się tylko pod kątem. Sprawdzamy model i mówimy, ile to kosztuje."
      paragraphs={[
        "Robimy naprawy telefonów, nie „szeroko pojęte usługi mobilne”. Chodzi o konkretną część: wyświetlacz, baterię, złącze, głośnik, mikrofon albo aparat.",
        "Obsługujemy iPhone, Samsung, Xiaomi, Redmi, POCO, Motorolę, Huawei, Honor, Oppo, Realme, OnePlus i inne popularne modele. Koszt zależy od modelu i dostępności części.",
        "Przed wymianą dostajesz wycenę. Jeśli naprawa nie ma sensu przy wieku telefonu, też to usłyszysz — zanim cokolwiek zamówimy.",
      ]}
      groups={groups}
      prices={pricingItems.filter((item) => item.category !== "komputery")}
      faq={faqByTag("phones")}
      crumbs={[
        { name: "Strona główna", path: "/" },
        { name: "Serwis telefonów", path: "/serwis-telefonow-kornik" },
      ]}
    >
      <div>
        <div className="relative min-h-56 overflow-hidden rounded-3xl border border-white/8">
          <Photo src={images.phone.src} alt={images.phone.alt} sizes="(max-width: 1024px) 100vw, 40vw" />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Marki telefonów">
          {phoneBrands.map((brand) => (
            <li key={brand} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </ServiceLanding>
  );
}
