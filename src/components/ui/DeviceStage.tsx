import { useId } from "react";
import { cn } from "@/lib/utils";

export type DeviceScene = "pair" | "heat" | "crack" | "nosignal";

export function DeviceStage({
  scene,
  className,
}: {
  scene: DeviceScene;
  className?: string;
}) {
  const gid = useId().replace(/:/g, "");
  return (
    <div data-device-stage={scene} className={cn("relative aspect-[5/4] w-full", className)}>
      <svg viewBox="0 0 800 640" className="h-full w-full" role="img" aria-label={labels[scene]}>
        <defs>
          <linearGradient id={`${gid}-light`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${gid}-metal`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4454" />
            <stop offset="100%" stopColor="#161b24" />
          </linearGradient>
          <linearGradient id={`${gid}-screen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1c2a3d" />
            <stop offset="100%" stopColor="#070b10" />
          </linearGradient>
          <radialGradient id={`${gid}-heat`} cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#ff9a4a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff9a4a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="400" cy="40" rx="260" ry="90" fill={`url(#${gid}-light)`} />
        <ellipse cx="400" cy="590" rx="250" ry="18" fill="#000" opacity="0.45" />

        {scene === "nosignal" ? <Monitor id={gid} /> : null}
        {scene === "pair" || scene === "heat" ? (
          <Laptop id={gid} x={scene === "heat" ? 90 : 40} y={scene === "heat" ? 70 : 120} w={scene === "heat" ? 620 : 520} warm={scene === "heat"} />
        ) : null}
        {scene === "pair" || scene === "crack" ? (
          <Phone id={gid} x={scene === "crack" ? 280 : 560} y={scene === "crack" ? 40 : 90} h={scene === "crack" ? 540 : 420} cracked={scene === "crack"} />
        ) : null}
      </svg>
    </div>
  );
}

const labels: Record<DeviceScene, string> = {
  pair: "Laptop i telefon na stanowisku serwisowym",
  heat: "Laptop, który się przegrzewa",
  crack: "Telefon z pękniętym ekranem",
  nosignal: "Monitor bez obrazu",
};

function Laptop({
  id,
  x,
  y,
  w,
  warm,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  warm: boolean;
}) {
  const h = w * 0.62;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="16" fill={`url(#${id}-metal)`} stroke="rgba(255,255,255,0.18)" />
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx="8" fill={`url(#${id}-screen)`} />
      <rect x={x + 28} y={y + 28} width="72" height="8" rx="4" fill="#38bdf8" opacity="0.9" />
      <rect x={x + 28} y={y + 48} width={w * 0.42} height="8" rx="4" fill="#ffffff" opacity="0.28" />
      <rect x={x + 28} y={y + 78} width={w * 0.55} height="46" rx="8" fill="#101820" stroke="rgba(59,130,246,0.45)" />
      <rect x={x + 40} y={y + 92} width={w * 0.28} height="8" rx="4" fill="#3b82f6" opacity="0.8" />
      <rect x={x + w * 0.62} y={y + 78} width={w * 0.24} height="46" rx="8" fill="#121a24" />
      <rect x={x + w * 0.66} y={y + 92} width={w * 0.16} height="6" rx="3" fill="#ffffff" opacity="0.2" />
      <path d={`M${x + 18} ${y + 22} L${x + w * 0.46} ${y + 22}`} stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      {warm ? <rect x={x + 14} y={y + h * 0.45} width={w - 28} height={h * 0.5} rx="8" fill={`url(#${id}-heat)`} /> : null}
      <path
        d={`M${x - 28} ${y + h} H${x + w + 28} L${x + w + 8} ${y + h + 22} H${x - 8} Z`}
        fill="#222a36"
        stroke="rgba(255,255,255,0.12)"
      />
      {Array.from({ length: 12 }, (_, col) =>
        Array.from({ length: 3 }, (_, row) => (
          <rect
            key={`${col}-${row}`}
            x={x + 36 + col * ((w - 40) / 13)}
            y={y + h + 4 + row * 5}
            width={(w - 80) / 16}
            height="3"
            rx="1"
            fill="#0c1118"
          />
        )),
      )}
    </g>
  );
}

function Phone({
  id,
  x,
  y,
  h,
  cracked,
}: {
  id: string;
  x: number;
  y: number;
  h: number;
  cracked: boolean;
}) {
  const w = h * 0.48;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="28" fill="#10151c" stroke="rgba(255,255,255,0.28)" strokeWidth="3" />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx="22" fill={`url(#${id}-screen)`} />
      <rect x={x + w / 2 - 22} y={y + 16} width="44" height="10" rx="5" fill="#05070a" />
      <text x={x + 22} y={y + h * 0.28} fill="#f5f7fa" fontSize="28" fontFamily="ui-sans-serif, sans-serif">
        09:41
      </text>
      <rect x={x + 18} y={y + h * 0.36} width={w - 36} height="46" rx="10" fill="#ffffff" opacity="0.08" />
      <rect x={x + 18} y={y + h * 0.48} width={w - 36} height="46" rx="10" fill="#3b82f6" opacity="0.35" />
      <rect x={x + w / 2 - 18} y={y + h - 28} width="36" height="5" rx="2.5" fill="#ffffff" opacity="0.35" />
      {cracked ? (
        <path
          d={`M${x + 30} ${y + 40} L${x + w * 0.62} ${y + h * 0.38} L${x + 36} ${y + h * 0.62} L${x + w - 24} ${y + h - 36}`}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.4"
        />
      ) : null}
    </g>
  );
}

function Monitor({ id }: { id: string }) {
  return (
    <g>
      <rect x="120" y="80" width="560" height="360" rx="18" fill={`url(#${id}-metal)`} stroke="rgba(255,255,255,0.16)" />
      <rect x="142" y="102" width="516" height="316" rx="8" fill="#05070a" />
      <rect x="250" y="250" width="300" height="2" fill="#ffffff" opacity="0.35" />
      <path d="M360 440 H440 L470 500 H330 Z" fill="#222a36" />
      <rect x="280" y="500" width="240" height="12" rx="6" fill="#1a2130" />
    </g>
  );
}
