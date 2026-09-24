"use client";

import { ArrowRight, Laptop, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useCanAnimate } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const options = [
  {
    id: "komputery",
    href: "/#komputery",
    icon: Laptop,
    kicker: "Komputer / laptop",
    title: "Naprawa laptopów i komputerów",
    text: "Nie wstaje, nie daje obrazu, grzeje się albo ledwo zipie przy zwykłej pracy.",
    items: ["Diagnostyka", "Czyszczenie i pasta", "SSD i RAM", "Windows"],
  },
  {
    id: "telefony",
    href: "/#telefony",
    icon: Smartphone,
    kicker: "Telefon",
    title: "Serwis telefonów i smartfonów",
    text: "Pęknięty ekran, słaba bateria, martwe ładowanie albo aparat po upadku.",
    items: ["Wyświetlacz", "Bateria", "Złącze ładowania", "Po zalaniu"],
  },
] as const;

export function ServiceSelector() {
  const [active, setActive] = useState<(typeof options)[number]["id"]>("komputery");
  const animate = useCanAnimate();

  return (
    <section id="uslugi" className="scroll-mt-24 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Co chcesz naprawić?
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon;
            const selected = active === option.id;
            return (
              <a
                key={option.id}
                href={option.href}
                onMouseEnter={() => setActive(option.id)}
                onFocus={() => setActive(option.id)}
                className={cn(
                  "card-shine group relative rounded-3xl border bg-card p-6 transition duration-300 sm:p-8",
                  selected
                    ? "border-accent/40 shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_18px_50px_rgba(0,0,0,0.28)]"
                    : "border-white/8 hover:-translate-y-0.5 hover:border-accent/30",
                )}
              >
                {selected && animate ? (
                  <motion.span
                    layoutId="service-glow"
                    className="pointer-events-none absolute inset-0 rounded-3xl"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-bg-2 text-accent transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-6 text-sm text-accent-2">{option.kicker}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {option.title}
                </h3>
                <p className="mt-3 max-w-md text-muted">{option.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {option.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text">
                  Zobacz zakres
                  <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
