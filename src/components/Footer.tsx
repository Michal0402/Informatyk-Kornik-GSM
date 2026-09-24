import Link from "next/link";
import { company } from "@/config/company";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-bg pb-28 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted">{company.tagline}</p>
          <p className="mt-4 text-sm text-muted">{company.city}</p>
        </div>
        <div className="text-sm">
          <p className="font-medium text-text">Kontakt</p>
          <a
            href={company.phoneHref}
            className="mt-3 block text-muted hover:text-text"
            aria-label={`Zadzwoń: ${company.phone}`}
          >
            {company.phone}
          </a>
          <a href={company.emailHref} className="mt-2 block text-muted hover:text-text">
            {company.email}
          </a>
          {company.facebookUrl.startsWith("http") ? (
            <a
              href={company.facebookUrl}
              className="mt-2 block text-muted hover:text-text"
              rel="noreferrer"
            >
              Facebook
            </a>
          ) : null}
        </div>
        <nav aria-label="Stopka">
          <ul className="space-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/8">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {year} {company.name}
        </p>
      </div>
    </footer>
  );
}
