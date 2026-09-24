import Link from "next/link";
import { phoneBrands, phoneGroups, phonePriceNote } from "@/data/phone-services";
import { images } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { InlineCta } from "@/components/sections/InlineCta";

export function PhoneServices() {
  return (
    <section id="telefony" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm text-accent-2">GSM</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Serwis telefonów
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                iPhone, Samsung, Xiaomi i inne modele, które ludzie naprawdę noszą w kieszeni.
                Nie wymieniamy całego telefonu, jeśli da się naprawić konkretną część.
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/8">
              <Photo
                src={images.phone.src}
                alt={images.phone.alt}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <ul className="mt-8 flex gap-2 overflow-x-auto pb-1" aria-label="Obsługiwane marki">
          {phoneBrands.map((brand) => (
            <li
              key={brand}
              className="shrink-0 rounded-full border border-white/10 bg-card px-3 py-1.5 text-xs text-muted"
            >
              {brand}
            </li>
          ))}
        </ul>

        <Stagger className="mt-6 grid gap-4 md:grid-cols-2">
          {phoneGroups.map((group) => (
            <StaggerItem key={group.id}>
              <article className="card-shine h-full rounded-2xl border border-white/8 bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.text}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-text">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{phonePriceNote}</p>
        <p className="mt-3 text-sm">
          <Link href="/serwis-telefonow-kornik" className="text-text underline decoration-white/20 underline-offset-4 hover:decoration-accent">
            Serwis telefonów Kórnik — szczegóły
          </Link>
        </p>
        <InlineCta text="Podaj model i co się stało. Powiemy, czy da się to zrobić i od czego zależy cena." />
      </div>
    </section>
  );
}
