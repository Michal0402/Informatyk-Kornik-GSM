import Link from "next/link";
import { pricingItems, pricingNote, type PriceItem } from "@/data/pricing";
import { InlineCta } from "@/components/sections/InlineCta";

export function Pricing({
  items = pricingItems,
  heading = "Orientacyjne ceny",
  intro = "To widełki, nie sztywny cennik wszystkich usterek. Dokładną kwotę poznajesz po diagnozie.",
}: {
  items?: PriceItem[];
  heading?: string;
  intro?: string;
}) {
  return (
    <section id="cennik" className="scroll-mt-24 border-t border-white/8 bg-bg-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{intro}</p>
          </div>
          <Link
            href="/#naprawa"
            className="text-sm text-text underline decoration-white/20 underline-offset-4 hover:decoration-accent"
          >
            Jak wygląda naprawa?
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-card">
          {items.map((item) => (
            <li
              key={item.id}
              className="grid gap-2 px-5 py-5 transition duration-200 hover:bg-white/[0.02] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
            >
              <div>
                <h3 className="font-medium text-text">{item.name}</h3>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </div>
              <p className="font-display text-lg font-semibold text-accent-2 sm:text-right">
                {item.price}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{pricingNote}</p>
        <InlineCta text="Nie widzisz swojej usterki na liście? Opisz ją przez telefon — i tak zaczynamy od diagnozy." />
      </div>
    </section>
  );
}
