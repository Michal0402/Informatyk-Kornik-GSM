import Link from "next/link";
import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { company } from "@/config/company";
import type { FaqItem } from "@/data/faq";
import type { ServiceGroup } from "@/data/computer-services";
import type { PriceItem } from "@/data/pricing";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export function ServiceLanding({
  eyebrow,
  h1,
  lead,
  paragraphs,
  groups,
  prices,
  faq,
  crumbs,
  children,
}: {
  eyebrow: string;
  h1: string;
  lead: string;
  paragraphs: string[];
  groups: ServiceGroup[];
  prices: PriceItem[];
  faq: FaqItem[];
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="border-b border-white/8 pt-24">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <nav aria-label="Okruszki" className="text-sm text-muted">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === crumbs.length - 1 ? (
                    <span className="text-text">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-text">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="mt-6 text-sm text-accent-2">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2.3rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>
          <div className="mt-8">
            <Button href={company.phoneHref} ariaLabel={`Zadzwoń: ${company.phone}`}>
              <Phone className="size-4" aria-hidden="true" />
              Zadzwoń
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {children}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <article key={group.id} className="rounded-2xl border border-white/8 bg-card p-5">
              <h2 className="font-display text-2xl font-semibold">{group.title}</h2>
              <p className="mt-2 text-sm text-muted">{group.text}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-text">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-bg-2">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">Orientacyjne ceny</h2>
          <ul className="mt-6 divide-y divide-white/8 rounded-2xl border border-white/8 bg-card">
            {prices.map((item) => (
              <li key={item.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span>{item.name}</span>
                <span className="font-semibold text-accent-2">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ items={faq} />
      <ContactCTA />
    </main>
  );
}
