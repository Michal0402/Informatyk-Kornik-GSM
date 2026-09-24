import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images");

function scene({
  title,
  subtitle,
  accent = "#3B82F6",
  shapes,
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <defs>
    <radialGradient id="g" cx="30%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#1c2838"/>
      <stop offset="55%" stop-color="#10151c"/>
      <stop offset="100%" stop-color="#080a0d"/>
    </radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>
  <rect width="1600" height="1100" fill="url(#g)"/>
  <g opacity="0.35" stroke="rgba(255,255,255,0.08)" stroke-width="1">
    ${Array.from({ length: 18 }, (_, i) => `<line x1="${i * 90}" y1="0" x2="${i * 90}" y2="1100"/>`).join("")}
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 90}" x2="1600" y2="${i * 90}"/>`).join("")}
  </g>
  <circle cx="1180" cy="220" r="180" fill="${accent}" opacity="0.22" filter="url(#blur)"/>
  <rect x="0" y="860" width="1600" height="240" fill="#0c1016"/>
  <rect x="0" y="848" width="1600" height="16" fill="#1a2230"/>
  ${shapes}
</svg>`;
}

const files = [
  {
    file: "service/hero-service.webp",
    svg: scene({
      title: "Stanowisko serwisowe",
      subtitle: "Laptop, telefon, narzędzia",
      shapes: `
        <rect x="180" y="280" width="760" height="460" rx="28" fill="#14181f" stroke="rgba(255,255,255,0.12)"/>
        <rect x="230" y="330" width="500" height="300" rx="12" fill="#0c1016" stroke="#3B82F6" stroke-width="3"/>
        <rect x="250" y="640" width="460" height="18" rx="6" fill="#1d2430"/>
        <rect x="860" y="360" width="250" height="420" rx="28" fill="#0e131a" stroke="#F5F7FA" stroke-width="3"/>
        <circle cx="985" cy="720" r="10" fill="#38BDF8"/>
        <rect x="1120" y="620" width="280" height="16" rx="8" fill="#3B82F6" opacity="0.8"/>
        <rect x="1120" y="660" width="180" height="16" rx="8" fill="rgba(255,255,255,0.25)"/>
      `,
    }),
  },
  {
    file: "service/workstation.webp",
    svg: scene({
      title: "Blat serwisowy",
      subtitle: "Diagnostyka przed wymianą",
      shapes: `
        <rect x="220" y="360" width="980" height="28" rx="8" fill="#222a36"/>
        <rect x="300" y="250" width="620" height="380" rx="18" fill="#121820" stroke="rgba(255,255,255,0.14)"/>
        <rect x="340" y="290" width="540" height="280" rx="8" fill="#0a0e13"/>
        <path d="M1040 430 h220 v18 h-220z" fill="#3B82F6"/>
        <circle cx="1180" cy="560" r="46" fill="none" stroke="#38BDF8" stroke-width="6"/>
      `,
    }),
  },
  {
    file: "computers/laptop-repair.webp",
    svg: scene({
      title: "Laptop",
      subtitle: "Chłodzenie i diagnostyka",
      accent: "#38BDF8",
      shapes: `
        <rect x="260" y="240" width="900" height="560" rx="36" fill="#12171f" stroke="rgba(255,255,255,0.12)"/>
        <rect x="330" y="310" width="760" height="400" rx="16" fill="#0b0f14" stroke="#38BDF8" stroke-width="3"/>
        <circle cx="710" cy="510" r="70" fill="none" stroke="#3B82F6" stroke-width="10"/>
        <circle cx="710" cy="510" r="18" fill="#3B82F6"/>
        <rect x="430" y="760" width="560" height="16" rx="8" fill="#222a36"/>
      `,
    }),
  },
  {
    file: "phones/phone-repair.webp",
    svg: scene({
      title: "Telefon",
      subtitle: "Wyświetlacz i bateria",
      shapes: `
        <rect x="560" y="150" width="480" height="820" rx="56" fill="#121820" stroke="#F5F7FA" stroke-width="4"/>
        <rect x="610" y="230" width="380" height="620" rx="18" fill="#0b1016"/>
        <path d="M650 360 h300" stroke="#3B82F6" stroke-width="8"/>
        <path d="M650 420 h180" stroke="#38BDF8" stroke-width="8"/>
        <rect x="700" y="760" width="200" height="14" rx="7" fill="#3B82F6"/>
      `,
    }),
  },
  {
    file: "realizations/laptop-no-display.webp",
    svg: scene({
      title: "Brak obrazu",
      subtitle: "Laptop",
      shapes: `
        <rect x="280" y="260" width="1040" height="560" rx="24" fill="#10151c" stroke="rgba(255,255,255,0.1)"/>
        <rect x="360" y="330" width="700" height="400" rx="10" fill="#07090c" stroke="#3B82F6" stroke-width="2"/>
        <text x="430" y="560" fill="#9CA3AF" font-size="42" font-family="Arial">brak sygnału</text>
      `,
    }),
  },
  {
    file: "realizations/laptop-heat.webp",
    svg: scene({
      title: "Wysokie temperatury",
      subtitle: "Czyszczenie chłodzenia",
      accent: "#38BDF8",
      shapes: `
        <rect x="300" y="280" width="1000" height="500" rx="30" fill="#141b24"/>
        <circle cx="620" cy="530" r="110" fill="none" stroke="#38BDF8" stroke-width="14"/>
        <circle cx="980" cy="530" r="80" fill="none" stroke="#3B82F6" stroke-width="10"/>
        <path d="M400 700 h800" stroke="rgba(255,255,255,0.2)" stroke-width="8"/>
      `,
    }),
  },
  {
    file: "realizations/phone-camera.webp",
    svg: scene({
      title: "Szybka aparatu",
      subtitle: "Wymiana elementu",
      shapes: `
        <rect x="610" y="160" width="420" height="780" rx="48" fill="#121820" stroke="#F5F7FA" stroke-width="3"/>
        <circle cx="760" cy="280" r="46" fill="none" stroke="#3B82F6" stroke-width="8"/>
        <circle cx="860" cy="280" r="28" fill="none" stroke="#38BDF8" stroke-width="6"/>
        <rect x="680" y="380" width="280" height="420" rx="12" fill="#0c1117"/>
      `,
    }),
  },
  {
    file: "realizations/pc-upgrade.webp",
    svg: scene({
      title: "Modernizacja",
      subtitle: "SSD i RAM",
      shapes: `
        <rect x="360" y="220" width="860" height="640" rx="20" fill="#121820" stroke="rgba(255,255,255,0.12)"/>
        <rect x="460" y="340" width="520" height="70" rx="8" fill="#3B82F6" opacity="0.85"/>
        <rect x="460" y="450" width="360" height="70" rx="8" fill="#1e293b" stroke="#38BDF8"/>
        <rect x="460" y="560" width="280" height="70" rx="8" fill="#1e293b"/>
      `,
    }),
  },
];

for (const item of files) {
  const target = path.join(root, item.file);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(Buffer.from(item.svg)).webp({ quality: 78 }).toFile(target);
  console.log(target);
}
