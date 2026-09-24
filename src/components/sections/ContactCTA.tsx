import { Phone } from "lucide-react";
import { company } from "@/config/company";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section id="kontakt" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-28">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-card px-6 py-12 sm:px-12 sm:py-16">
          <p className="text-sm text-accent-2">{company.serviceAreaLabel}</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Masz problem ze sprzętem?
          </h2>
          <p className="mt-4 max-w-lg text-lg text-muted">
            Zadzwoń. Opisz, co się stało, a ustalimy dalsze kroki.
          </p>
          <div className="mt-8">
            <Button
              href={company.phoneHref}
              ariaLabel={`Zadzwoń: ${company.phone}`}
              className="w-full px-8 text-base sm:w-auto"
            >
              <Phone className="size-4" aria-hidden="true" />
              Zadzwoń
            </Button>
          </div>
          <a
            href={company.phoneHref}
            className="mt-6 block font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl"
            aria-label={`Numer telefonu: ${company.phone}`}
          >
            {company.phone}
          </a>
          <dl className="mt-8 grid gap-4 text-sm text-muted sm:grid-cols-3">
            <div>
              <dt className="text-text">Gdzie</dt>
              <dd className="mt-1">{company.city} i okolice</dd>
              <dd>{company.address}</dd>
            </div>
            <div>
              <dt className="text-text">Kiedy</dt>
              <dd className="mt-1">{company.openingHours}</dd>
              <dd>{company.openingHoursNote}</dd>
            </div>
            <div>
              <dt className="text-text">Mail</dt>
              <dd className="mt-1">
                <a href={company.emailHref} className="hover:text-text">
                  {company.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
