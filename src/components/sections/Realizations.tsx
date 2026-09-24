import { realizations } from "@/data/realizations";
import { CinematicPhoto } from "@/components/ui/CinematicPhoto";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Realizations() {
  return (
    <section id="realizacje" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ostatnie naprawy
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Krótko: urządzenie, problem i co zostało zrobione.
        </p>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
          {realizations.map((item, index) => (
            <StaggerItem key={item.id} className={index === 0 ? "md:col-span-2" : undefined}>
              <article className="group overflow-hidden rounded-3xl border border-white/8 bg-card">
                <div className={`relative ${index === 0 ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
                  <CinematicPhoto
                    src={item.image}
                    alt={item.imageAlt}
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 1100px" : "(max-width: 768px) 100vw, 50vw"}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs tracking-wide text-accent-2">{item.device}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{item.problem}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {item.solution}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
