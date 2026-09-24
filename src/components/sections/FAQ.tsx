"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/data/faq";
import { faqByTag } from "@/data/faq";
import { InlineCta } from "@/components/sections/InlineCta";

export function FAQ({
  items = faqByTag("home"),
  withCta = true,
}: {
  items?: FaqItem[];
  withCta?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <section id="faq" className="scroll-mt-24 border-t border-white/8 bg-bg-2">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Pytania, które wracają
        </h2>
        <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
          {items.map((item) => {
            const open = openId === item.id;
            const panelId = `${baseId}-${item.id}`;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-text"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    {item.question}
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted transition duration-200 ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" hidden={!open}>
                  <p className="pb-5 text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
        {withCta ? (
          <InlineCta text="Nie ma Twojego pytania na liście? Łatwiej je zadać przez telefon." />
        ) : null}
      </div>
    </section>
  );
}
