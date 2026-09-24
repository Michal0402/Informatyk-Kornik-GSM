import { Phone } from "lucide-react";
import { company } from "@/config/company";
import { Button } from "@/components/ui/Button";

export function InlineCta({ text }: { text: string }) {
  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{text}</p>
      <Button href={company.phoneHref} ariaLabel={`Zadzwoń: ${company.phone}`} className="shrink-0">
        <Phone className="size-4" aria-hidden="true" />
        Zadzwoń
      </Button>
    </div>
  );
}
