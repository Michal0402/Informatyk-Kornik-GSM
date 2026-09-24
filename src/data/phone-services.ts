export const phoneBrands = [
  "Apple iPhone",
  "Samsung",
  "Xiaomi",
  "Redmi",
  "POCO",
  "Motorola",
  "Huawei",
  "Honor",
  "Oppo",
  "Realme",
  "OnePlus",
  "Inne popularne modele",
] as const;

export const phoneGroups = [
  {
    id: "obudowa",
    title: "Wyświetlacz i obudowa",
    text: "Pęknięta szybka, martwy obraz albo uszkodzona klapka.",
    items: [
      "Wymiana wyświetlacza",
      "Wymiana szybki aparatu",
      "Wymiana tylnej klapki",
    ],
  },
  {
    id: "zasilanie",
    title: "Zasilanie",
    text: "Telefon nie ładuje, ładuje tylko w jednej pozycji albo pada w kilka godzin.",
    items: [
      "Wymiana baterii",
      "Naprawa złącza ładowania",
      "Problemy z ładowaniem",
    ],
  },
  {
    id: "dzwiek",
    title: "Dźwięk i aparat",
    text: "Cicho w słuchawce, niewyraźny mikrofon albo aparat, który nie ostrzy.",
    items: ["Wymiana głośnika", "Wymiana mikrofonu", "Problemy z aparatem"],
  },
  {
    id: "diagnoza",
    title: "Diagnostyka",
    text: "Po upadku, zalaniu albo gdy telefon w ogóle nie reaguje.",
    items: [
      "Telefon nie uruchamia się",
      "Diagnostyka po upadku",
      "Diagnostyka po zalaniu",
      "Czyszczenie telefonu",
      "Problemy systemowe",
      "Przenoszenie danych",
    ],
  },
] as const;

export const phonePriceNote =
  "Koszt zależy od modelu urządzenia i dostępności części. Przed naprawą otrzymujesz wycenę.";
