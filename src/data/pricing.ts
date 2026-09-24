export type PriceItem = {
  id: string;
  name: string;
  price: string;
  detail: string;
  category: "ogolne" | "komputery" | "telefony";
};

/** Orientacyjne kwoty. Zmieniaj tylko ten plik. */
export const pricingItems: PriceItem[] = [
  {
    id: "diagnostyka",
    name: "Diagnostyka",
    price: "od 50 zł",
    detail: "Komputer, laptop albo telefon. Zakres ustalamy przed sprawdzeniem.",
    category: "ogolne",
  },
  {
    id: "czyszczenie",
    name: "Czyszczenie laptopa / komputera",
    price: "od 120 zł",
    detail: "Kurz z układu chłodzenia i podstawowa konserwacja.",
    category: "komputery",
  },
  {
    id: "system",
    name: "Instalacja systemu",
    price: "od 100 zł",
    detail: "Windows, sterowniki i podstawowa konfiguracja po instalacji.",
    category: "komputery",
  },
  {
    id: "dysk-ram",
    name: "Wymiana dysku / RAM",
    price: "od 80 zł + części",
    detail: "Montaż SSD lub pamięci. Części dobieramy po diagnozie.",
    category: "komputery",
  },
  {
    id: "bateria",
    name: "Wymiana baterii telefonu",
    price: "indywidualna wycena",
    detail: "Cena zależy od modelu i tego, jaka bateria jest dostępna.",
    category: "telefony",
  },
  {
    id: "wyswietlacz",
    name: "Wymiana wyświetlacza",
    price: "indywidualna wycena",
    detail: "iPhone, Samsung, Xiaomi i inne popularne modele.",
    category: "telefony",
  },
  {
    id: "ladowanie",
    name: "Naprawa ładowania",
    price: "indywidualna wycena",
    detail: "Złącze, bateria albo inna przyczyna — po sprawdzeniu.",
    category: "telefony",
  },
];

export const pricingNote =
  "Dokładna cena zależy od modelu urządzenia, rodzaju usterki i ceny części.";
