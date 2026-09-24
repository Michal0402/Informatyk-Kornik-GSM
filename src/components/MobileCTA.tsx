import { Phone } from "lucide-react";
import Link from "next/link";
import { company } from "@/config/company";

export function MobileCTA() {
  return (
    <nav
      aria-label="Szybkie akcje"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href={company.phoneHref}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-accent text-xs font-semibold text-bg"
            aria-label={`Zadzwoń: ${company.phone}`}
          >
            <Phone className="size-4" aria-hidden="true" />
            Zadzwoń
          </a>
        </li>
        <li>
          <Link
            href="/#uslugi"
            className="flex min-h-14 items-center justify-center text-sm text-text"
          >
            Usługi
          </Link>
        </li>
        <li>
          <Link
            href="/#cennik"
            className="flex min-h-14 items-center justify-center text-sm text-text"
          >
            Cennik
          </Link>
        </li>
      </ul>
    </nav>
  );
}
