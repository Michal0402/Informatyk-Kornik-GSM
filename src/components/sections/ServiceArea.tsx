"use client";

import { useState } from "react";
import { areaNote, company, serviceAreas } from "@/config/company";

export function ServiceArea() {
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="obszar" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Serwis komputerowy i GSM Kórnik
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {areaNote}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {serviceAreas.map((area) => (
            <li key={area.name}>
              <span
                className={
                  area.primary
                    ? "inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg"
                    : "inline-flex rounded-full border border-white/10 bg-card px-4 py-2 text-sm text-text"
                }
              >
                {area.name}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Poza tym południowo-wschodnie okolice Poznania — po wcześniejszym ustaleniu.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-card">
          {showMap ? (
            <iframe
              title="Mapa okolic Kórnika"
              src={company.googleMapsEmbedUrl}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                Mapa ładuje się dopiero po kliknięciu, żeby nie spowalniać strony.
              </p>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-text transition hover:border-accent/50"
              >
                Pokaż mapę
              </button>
            </div>
          )}
        </div>
        <p className="mt-3 text-sm">
          <a
            href={company.googleMapsUrl}
            className="text-text underline decoration-white/20 underline-offset-4 hover:decoration-accent"
            rel="noreferrer"
          >
            Otwórz Kórnik w Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}
