import type { Metadata } from "next";
import { ServiceLanding } from "@/components/pages/ServiceLanding";
import { faqByTag } from "@/data/faq";
import { pricingItems } from "@/data/pricing";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Serwis komputerowy Kórnik",
  description:
    "Serwis komputerowy w Kórniku. Diagnostyka, brak obrazu, Windows, SSD, RAM, sieć i odzyskiwanie danych. Najpierw sprawdzamy, potem podajemy koszt.",
  alternates: { canonical: "/serwis-komputerowy-kornik" },
  openGraph: {
    title: "Serwis komputerowy Kórnik",
    description:
      "Naprawa komputerów stacjonarnych i pomoc informatyczna w Kórniku. Diagnoza i wycena przed naprawą.",
    url: "/serwis-komputerowy-kornik",
  },
};

const groups = [
  {
    id: "stacjonarne",
    title: "Komputery stacjonarne",
    text: "Zestawy do pracy, nauki i grania. Gdy nie startują albo gasną pod obciążeniem.",
    items: ["Brak obrazu", "Komputer nie uruchamia się", "Przegrzewanie", "Diagnostyka"],
  },
  {
    id: "biuro",
    title: "Dom i mała firma",
    text: "Sprzęt, który ma działać w ciągu dnia, a nie jechać kurierem przez pół kraju.",
    items: ["Pomoc informatyczna", "Konfiguracja Wi-Fi", "Problemy z siecią", "Instalacja Windows"],
  },
  {
    id: "rozbudowa",
    title: "Rozbudowa zamiast wymiany",
    text: "Jeśli płyta i zasilacz są sprawne, często wystarczy dysk i pamięć.",
    items: ["Wymiana dysku SSD", "Rozbudowa RAM", "Modernizacja PC", "Składanie komputerów"],
  },
  {
    id: "pliki",
    title: "Dane",
    text: "Dokumenty i zdjęcia sprawdzamy zanim ktokolwiek postawi system od nowa.",
    items: ["Odzyskiwanie danych", "Ocena dysku", "Przeniesienie plików na nowy nośnik"],
  },
];

export default function ComputerServicePage() {
  return (
    <ServiceLanding
      eyebrow="Kórnik · komputery"
      h1="Serwis komputerowy w Kórniku"
      lead="Komputer milczy, sieć zrywa albo Windows kręci się w kółko. Sprawdzamy sprzęt na miejscu i mówimy, co da się zrobić."
      paragraphs={[
        "Ta strona jest o komputerach stacjonarnych i codziennej pomocy informatycznej. Laptopy mają osobny opis, telefony też — żeby nie mieszać trzech różnych napraw w jednym zdaniu.",
        "Pracujemy z klientami prywatnymi i małymi firmami z Kórnika oraz pobliskich miejscowości. Odbiór sprzętu jest możliwy po ustaleniu, nie jako stały kurs po całym powiecie.",
        "Nie wymieniamy płyty głównej „na wszelki wypadek”. Najpierw jest przyczyna, potem koszt, potem decyzja.",
      ]}
      groups={groups}
      prices={pricingItems.filter((item) => item.category !== "telefony")}
      faq={faqByTag("computers")}
      crumbs={[
        { name: "Strona główna", path: "/" },
        { name: "Serwis komputerowy", path: "/serwis-komputerowy-kornik" },
      ]}
    >
      <div className="relative min-h-64 overflow-hidden rounded-3xl border border-white/8">
        <Photo src={images.workstation.src} alt={images.workstation.alt} sizes="(max-width: 1024px) 100vw, 40vw" />
      </div>
    </ServiceLanding>
  );
}
