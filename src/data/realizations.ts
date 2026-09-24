export type Realization = {
  id: string;
  image: string;
  imageAlt: string;
  device: string;
  problem: string;
  solution: string;
};

/**
 * Podmień pliki w /public/images/realizations, zachowując nazwy,
 * albo zmień ścieżki tutaj.
 */
export const realizations: Realization[] = [
  {
    id: "laptop-obraz",
    image: "/images/realizations/laptop-no-display.webp",
    imageAlt: "Laptop na stanowisku serwisowym po diagnostyce braku obrazu",
    device: "Laptop",
    problem: "Brak obrazu",
    solution:
      "Diagnostyka układu graficznego, aktualizacja firmware i konserwacja układu chłodzenia.",
  },
  {
    id: "laptop-temp",
    image: "/images/realizations/laptop-heat.webp",
    imageAlt: "Otwarty laptop podczas czyszczenia układu chłodzenia",
    device: "Laptop",
    problem: "Wysokie temperatury",
    solution: "Czyszczenie chłodzenia i wymiana materiałów termoprzewodzących.",
  },
  {
    id: "telefon-aparat",
    image: "/images/realizations/phone-camera.webp",
    imageAlt: "Smartfon z wymienioną szybką aparatu",
    device: "Telefon",
    problem: "Uszkodzona szybka aparatu",
    solution:
      "Wymiana elementu bez konieczności wymiany całego modułu aparatu.",
  },
  {
    id: "pc-modernizacja",
    image: "/images/realizations/pc-upgrade.webp",
    imageAlt: "Komputer stacjonarny w trakcie montażu dysku SSD",
    device: "Komputer",
    problem: "Modernizacja",
    solution: "Montaż SSD, rozbudowa RAM i optymalizacja Windows.",
  },
];
