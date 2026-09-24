import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-bg shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_rgba(59,130,246,0.18)] hover:bg-[#60a5fa] hover:shadow-[0_0_0_1px_rgba(96,165,250,0.5),0_10px_36px_rgba(59,130,246,0.28)]",
  secondary:
    "border border-white/15 bg-white/[0.03] text-text hover:border-accent/50 hover:bg-white/[0.05]",
  ghost: "text-text hover:text-accent-2",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold tracking-tight transition duration-200",
    styles[variant],
    className,
  );

  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
