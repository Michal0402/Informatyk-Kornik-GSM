import { Layers, MapPin, Phone, Receipt, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { benefits } from "@/data/benefits";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  phone: Phone,
  receipt: Receipt,
  layers: Layers,
  map: MapPin,
  truck: Truck,
};

export function Benefits() {
  return (
    <section id="dlaczego" className="scroll-mt-24 border-t border-white/8 bg-bg-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Dlaczego lokalny serwis?
        </h2>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {benefits.map((item, index) => {
            const Icon = icons[item.icon] ?? Phone;
            return (
              <StaggerItem
                key={item.id}
                className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <article className="h-full rounded-2xl border border-white/8 bg-card p-5 transition duration-200 hover:border-accent/30">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
