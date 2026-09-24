import Link from "next/link";
import { computerGroups } from "@/data/computer-services";
import { images } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { InlineCta } from "@/components/sections/InlineCta";

export function ComputerServices() {
  return (
    <section id="komputery" className="scroll-mt-24 bg-bg-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm text-accent-2">Komputery i laptopy</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Serwis komputerów i laptopów
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Od braku obrazu po dysk, który dławi cały system. Najpierw sprawdzamy, co
                naprawdę nie działa. Potem mówimy, czy warto naprawiać.
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/8">
              <Photo
                src={images.laptop.src}
                alt={images.laptop.alt}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-2/80 to-transparent" />
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {computerGroups.map((group, index) => (
            <StaggerItem
              key={group.id}
              className={index < 2 ? "xl:col-span-3" : "xl:col-span-2"}
            >
              <article className="card-shine h-full rounded-2xl border border-white/8 bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.text}</p>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-text">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-6 text-sm text-muted">
          Szukasz samego laptopa?{" "}
          <Link href="/naprawa-laptopow-kornik" className="text-text underline decoration-white/20 underline-offset-4 hover:decoration-accent">
            Naprawa laptopów w Kórniku
          </Link>
          {" · "}
          <Link href="/serwis-komputerowy-kornik" className="text-text underline decoration-white/20 underline-offset-4 hover:decoration-accent">
            Serwis komputerowy
          </Link>
        </p>
        <InlineCta text="Masz komputer, który stanął? Zadzwoń — Kórnik i okolice." />
      </div>
    </section>
  );
}
