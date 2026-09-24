"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGBgZGQAAAD/AwA+Zq3oAAAAAElFTkSuQmCC";

export function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.28),transparent_42%),linear-gradient(160deg,#14181f,#080a0d)]"
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-6 rounded-xl border border-white/10" />
        <p className="absolute bottom-5 left-5 right-5 text-sm text-muted">{alt}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={blur}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
