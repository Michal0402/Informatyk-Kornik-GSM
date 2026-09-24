"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { company } from "@/config/company";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "border-b border-white/8 bg-bg/95"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" aria-label="Serwis Kórnik — strona główna" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Główne">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-sm text-muted hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            aria-label={`Zadzwoń: ${company.phone}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-text lg:hidden"
          >
            <Phone className="size-4" aria-hidden="true" />
          </a>
          <div className="hidden lg:block">
            <Button href={company.phoneHref} ariaLabel={`Zadzwoń: ${company.phone}`}>
              <Phone className="size-4" aria-hidden="true" />
              Zadzwoń
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobilne"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobilne"
          aria-label="Mobilne"
          className="border-t border-white/8 bg-bg px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center text-lg text-text"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
