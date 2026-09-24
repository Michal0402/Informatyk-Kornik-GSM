import { Phone } from "lucide-react";
import { company } from "@/config/company";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroStage } from "@/components/sections/HeroStage";

const proof = ["Kórnik i okolice", "Komputery • Laptopy • GSM", "Diagnoza przed naprawą"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_68%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
        <Reveal>
          <p className="text-sm text-accent-2">Komputer albo telefon odmówił współpracy?</p>
          <h1 className="mt-4 max-w-xl font-display text-[2.4rem] font-semibold leading-[1.05] tracking-tight text-text sm:text-[2.85rem] lg:text-6xl xl:text-[4.25rem]">
            Serwis komputerowy i GSM w Kórniku
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Telefon przestał się ładować? Laptop się przegrzewa? Komputer nie uruchamia się?
            Sprawdzimy sprzęt, przedstawimy koszt naprawy i dopiero wtedy zdecydujesz, co dalej.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={company.phoneHref} ariaLabel={`Zadzwoń: ${company.phone}`} className="w-full sm:w-auto">
              <Phone className="size-4" aria-hidden="true" />
              Zadzwoń
            </Button>
            <Button href="/#uslugi" variant="secondary" className="w-full sm:w-auto">
              Sprawdź usługi
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {proof.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <HeroStage />
        </Reveal>
      </div>
    </section>
  );
}
