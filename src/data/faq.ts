export type FaqTag = "home" | "computers" | "phones" | "laptops";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  tags: FaqTag[];
};

export const faqItems: FaqItem[] = [
  {
    id: "cena-laptopa",
    question: "Ile kosztuje naprawa laptopa w Kórniku?",
    answer:
      "Zależy od usterki. Diagnostyka ma orientacyjną cenę w cenniku, a koszt właściwej naprawy poznajesz przed jej rozpoczęciem. Przy przegrzewaniu często wystarcza czyszczenie. Przy uszkodzonej płycie kwota jest inna — mówimy o tym wprost.",
    tags: ["home", "laptops", "computers"],
  },
  {
    id: "iphone",
    question: "Czy naprawiacie iPhone?",
    answer:
      "Tak. Wymieniamy wyświetlacze, baterie i złącza ładowania oraz sprawdzamy telefony po upadku albo zalaniu. Cena zależy od modelu i części. Wycenę dostajesz przed naprawą.",
    tags: ["home", "phones"],
  },
  {
    id: "samsung-xiaomi",
    question: "Czy naprawiacie telefony Samsung i Xiaomi?",
    answer:
      "Tak. Oprócz Samsunga i Xiaomi obsługujemy też Redmi, POCO, Motorolę, Huawei, Honor, Oppo, Realme, OnePlus i inne popularne modele.",
    tags: ["home", "phones"],
  },
  {
    id: "bateria",
    question: "Czy można wymienić samą baterię?",
    answer:
      "W większości modeli tak. Jeśli konstrukcja telefonu pozwala na samą baterię, nie wymieniamy przy okazji całego wyświetlacza. Koszt podajemy po ustaleniu modelu.",
    tags: ["home", "phones"],
  },
  {
    id: "stary-laptop",
    question: "Czy opłaca się naprawiać stary laptop?",
    answer:
      "Często tak. Czyszczenie, pasta termoprzewodząca, dysk SSD albo dodatkowa pamięć potrafią przywrócić sprzęt do normalnej pracy. Jeśli naprawa nie ma sensu ekonomicznego, powiemy to przed rozpoczęciem.",
    tags: ["home", "laptops", "computers"],
  },
  {
    id: "dane",
    question: "Czy odzyskujecie dane?",
    answer:
      "Tak, gdy problem leży po stronie dysku, systemu albo przypadkowego skasowania. Najpierw sprawdzamy, czy dane w ogóle da się odzyskać, i dopiero wtedy podajemy koszt.",
    tags: ["home", "computers", "laptops"],
  },
  {
    id: "wlasne-czesci",
    question: "Czy mogę dostarczyć własne części?",
    answer:
      "Można to ustalić telefonicznie. Przy częściach klienta zakres odpowiedzialności za samą część jest inny niż przy częściach dobranych w serwisie. Mówimy o tym przed robotą.",
    tags: ["home", "phones", "laptops"],
  },
  {
    id: "czas-telefonu",
    question: "Ile trwa naprawa telefonu?",
    answer:
      "Prosta wymiana często mieści się w tym samym dniu, jeśli część jest na miejscu. Gdy część trzeba sprowadzić, termin podajemy po diagnozie — bez obiecywania godziny z góry.",
    tags: ["home", "phones"],
  },
  {
    id: "wycena",
    question: "Czy przed naprawą otrzymam wycenę?",
    answer:
      "Tak. Najpierw sprawdzamy urządzenie i podajemy koszt. Naprawę zaczynamy dopiero, gdy się na nią zgodzisz.",
    tags: ["home", "computers", "phones", "laptops"],
  },
  {
    id: "odbior",
    question: "Czy możliwy jest odbiór sprzętu?",
    answer:
      "W wybranych przypadkach tak. Odbiór albo dowóz ustalamy telefonicznie, głównie dla klientów z Kórnika i pobliskich miejscowości.",
    tags: ["home", "computers", "phones", "laptops"],
  },
  {
    id: "gaming",
    question: "Czy naprawiacie komputery gamingowe?",
    answer:
      "Tak. Najczęściej chodzi o przegrzewanie, brak obrazu, czyszczenie układu chłodzenia i modernizację. Diagnoza poprzedza wycenę, tak jak przy zwykłym komputerze.",
    tags: ["home", "computers"],
  },
  {
    id: "windows",
    question: "Czy instalujecie Windows?",
    answer:
      "Tak. Instalacja, sterowniki i podstawowa konfiguracja. Jeśli na dysku są dane, najpierw ustalamy, czy trzeba je zachować.",
    tags: ["home", "computers", "laptops"],
  },
  {
    id: "male-firmy",
    question: "Czy pomagacie małym firmom?",
    answer:
      "Tak. Komputery biurowe, laptopy, prosta sieć i sprzęt, który stanął w środku dnia. Umawiamy się telefonicznie, bez panelu zgłoszeń i pośredników.",
    tags: ["computers"],
  },
  {
    id: "siec-dom",
    question: "Czy konfigurujecie Wi-Fi w domu albo małym biurze?",
    answer:
      "Tak. Gdy sieć zrywa, drukarka znika albo nowy router nie rozmawia ze starym sprzętem. Zakres ustalamy po krótkim opisie problemu.",
    tags: ["computers"],
  },
  {
    id: "szybka-czy-ekran",
    question: "Czy wymieniacie samą szybkę, czy cały wyświetlacz?",
    answer:
      "Zależy od modelu i od tego, czy uszkodzony jest tylko front, czy też obraz i dotyk. Po obejrzeniu telefonu mówimy, która opcja ma sens i ile kosztuje.",
    tags: ["phones"],
  },
  {
    id: "zalanie",
    question: "Co z telefonem po zalaniu?",
    answer:
      "Nie wkładaj go do ryżu i nie ładuj na siłę. Im szybciej trafi na diagnostykę, tym większa szansa, że da się go uratować. Najpierw ocena, potem decyzja o naprawie.",
    tags: ["phones"],
  },
  {
    id: "wylacza-sie",
    question: "Laptop wyłącza się pod obciążeniem. Co dalej?",
    answer:
      "Najczęściej winne jest chłodzenie: kurz, zużyta pasta albo zatarty wentylator. Sprawdzamy temperatury i dopiero wtedy proponujemy czyszczenie albo inną naprawę.",
    tags: ["laptops"],
  },
  {
    id: "pasta",
    question: "Czy wymiana pasty termoprzewodzącej coś daje?",
    answer:
      "Przy laptopie, który ma kilka lat i mocno się grzeje — zwykle tak. Sama pasta nie naprawi uszkodzonego układu, dlatego najpierw jest diagnostyka, a nie wymiana w ciemno.",
    tags: ["laptops"],
  },
];

export function faqByTag(tag: FaqTag) {
  return faqItems.filter((item) => item.tags.includes(tag));
}
