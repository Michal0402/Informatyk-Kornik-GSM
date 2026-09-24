import {
  Battery,
  Database,
  Gauge,
  Monitor,
  Power,
  Smartphone,
  Thermometer,
  Unplug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { problems } from "@/data/problems";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  thermometer: Thermometer,
  unplug: Unplug,
  smartphone: Smartphone,
  monitor: Monitor,
  gauge: Gauge,
  battery: Battery,
  power: Power,
  database: Database,
};

export function CommonProblems() {
  return (
    <section id="problemy" className="scroll-mt-24 border-t border-white/8 bg-bg-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Z czym najczęściej do nas trafiają?
        </h2>
        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = icons[problem.icon] ?? Smartphone;
            return (
              <StaggerItem key={problem.id}>
                <article className="group h-full rounded-2xl border border-white/8 bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_0_36px_rgba(59,130,246,0.08)]">
                  <Icon
                    className="size-5 text-accent transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{problem.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
