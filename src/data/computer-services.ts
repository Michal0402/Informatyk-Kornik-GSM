export type ServiceGroup = {
  id: string;
  title: string;
  text: string;
  items: string[];
};

export const computerGroups: ServiceGroup[] = [
  {
    id: "naprawa",
    title: "Naprawa",
    text: "Gdy sprzęt nie wstaje, gubi obraz albo się dusi od temperatury.",
    items: [
      "Diagnostyka komputera",
      "Naprawa laptopów",
      "Naprawa komputerów stacjonarnych",
      "Brak obrazu",
      "Komputer nie uruchamia się",
      "Przegrzewanie",
      "Czyszczenie laptopa",
      "Wymiana pasty termoprzewodzącej CPU/GPU",
    ],
  },
  {
    id: "modernizacja",
    title: "Modernizacja",
    text: "Czasem wystarczy dysk i pamięć, żeby komputer znów nadawał się do pracy.",
    items: [
      "Wymiana dysku SSD",
      "Rozbudowa RAM",
      "Składanie komputerów",
      "Modernizacja PC",
    ],
  },
  {
    id: "system",
    title: "System",
    text: "Windows, sterowniki i porządki, gdy system sam staje się problemem.",
    items: [
      "Instalacja Windows",
      "Sterowniki",
      "Optymalizacja systemu",
      "Usuwanie problemów z Windows",
    ],
  },
  {
    id: "dane",
    title: "Dane",
    text: "Najpierw ocena, czy pliki da się odzyskać. Potem konkretna wycena.",
    items: ["Odzyskiwanie danych"],
  },
  {
    id: "siec",
    title: "Sieć",
    text: "Dom i mała firma. Wi-Fi, kabel i sprzęt, który nagle znika z sieci.",
    items: ["Konfiguracja Wi-Fi", "Problemy z siecią", "Pomoc informatyczna"],
  },
];
