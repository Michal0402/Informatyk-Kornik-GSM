import type { Metadata } from "next";
import { ServiceLanding } from "@/components/pages/ServiceLanding";
import { faqByTag } from "@/data/faq";
import { pricingItems } from "@/data/pricing";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Naprawa laptopów Kórnik",
  description:
    "Naprawa laptopów w Kórniku. Przegrzewanie, brak obrazu, wolny system, wymiana SSD i RAM, pasta termoprzewodząca. Wycena przed naprawą.",
  alternates: { canonical: "/naprawa-laptopow-kornik" },
  openGraph: {
    title: "Naprawa laptopów Kórnik",
    description:
      "Laptop się grzeje, nie wstaje albo działa jak sprzed dekady. Serwis laptopów w Kórniku — diagnoza przed wymianą części.",
    url: "/naprawa-laptopow-kornik",
  },
};

const groups = [
  {
    id: "chlodzenie",
    title: "Ciepło i hałas",
    text: "Wentylator na pełnych obrotach zwykle znaczy kurz albo wyschniętą pastę, nie „koniec laptopa”.",
    items: [
      "Czyszczenie laptopa",
      "Wymiana pasty termoprzewodzącej CPU/GPU",
      "Przegrzewanie",
      "Wyłączanie pod obciążeniem",
    ],
  },
  {
    id: "start",
    title: "Obraz i start",
    text: "Czarny ekran przy działających wentylatorach i pętla naprawcza Windows to osobne ścieżki diagnostyki.",
    items: ["Brak obrazu", "Laptop nie uruchamia się", "Windows nie wstaje", "Diagnostyka"],
  },
  {
    id: "tempo",
    title: "Wolna praca",
    text: "Stary dysk talerzowy potrafi udawać zepsuty procesor. Najpierw sprawdzamy, co dławi system.",
    items: ["Wymiana dysku SSD", "Rozbudowa RAM", "Optymalizacja systemu", "Sterowniki"],
  },
  {
    id: "pliki-laptop",
    title: "Zanim postawimy system",
    text: "Reinstalacja kasuje pulpit. Jeśli na dysku są zdjęcia albo praca, mówimy o tym przed formatem.",
    items: ["Odzyskiwanie danych", "Instalacja Windows", "Przeniesienie plików"],
  },
];

export default function LaptopRepairPage() {
  return (
    <ServiceLanding
      eyebrow="Kórnik · laptopy"
      h1="Naprawa laptopów w Kórniku"
      lead="Grzeje się, nie daje obrazu albo otwiera przeglądarkę pół minuty. Laptop da się często uratować bez kupowania nowego."
      paragraphs={[
        "Laptopy psują się inaczej niż komputery stacjonarne: ciasne chłodzenie, zużyta pasta, klawiatura zalana kawą, matryca po upadku. Dlatego ten opis jest tylko o nich.",
        "Przy wysokich temperaturach zaczynamy od czyszczenia i materiałów termoprzewodzących. Przy braku obrazu sprawdzamy, czy winna jest matryca, taśma czy układ graficzny — zanim ktokolwiek zamówi panel.",
        "Jeśli sprzęt ma kilka lat i tylko zwalnia, często wystarcza SSD i trochę RAM. Gdy płyta jest uszkodzona i rachunek przekracza sens naprawy, powiemy to po diagnozie.",
      ]}
      groups={groups}
      prices={pricingItems.filter((item) => item.id !== "bateria" && item.id !== "wyswietlacz" && item.id !== "ladowanie")}
      faq={faqByTag("laptops")}
      crumbs={[
        { name: "Strona główna", path: "/" },
        { name: "Naprawa laptopów", path: "/naprawa-laptopow-kornik" },
      ]}
    >
      <div className="relative min-h-64 overflow-hidden rounded-3xl border border-white/8">
        <Photo src={images.laptop.src} alt={images.laptop.alt} sizes="(max-width: 1024px) 100vw, 40vw" />
      </div>
    </ServiceLanding>
  );
}
