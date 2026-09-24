import { cn } from "@/lib/utils";
import { company } from "@/config/company";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill="#14181F" />
      <rect
        x="4.5"
        y="13"
        width="15"
        height="10"
        rx="1.8"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.6"
      />
      <path d="M7.5 23.2h9" stroke="#3B82F6" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="16.2" y="6.2" width="10.2" height="16.2" rx="2" fill="#080A0D" stroke="#F5F7FA" strokeWidth="1.6" />
      <circle cx="21.3" cy="19.2" r="0.9" fill="#38BDF8" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[12px] font-semibold leading-[1.05] tracking-[0.14em] text-text">
        <span className="block">{company.logoLines[0]}</span>
        <span className="block">{company.logoLines[1]}</span>
      </span>
    </span>
  );
}
