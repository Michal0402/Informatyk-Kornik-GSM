/** Podmień pliki w /public/images, zostawiając te same nazwy. */
export const images = {
  hero: {
    src: "/images/service/hero-service.webp",
    alt: "Stanowisko serwisowe z laptopem, telefonem i narzędziami",
  },
  workstation: {
    src: "/images/service/workstation.webp",
    alt: "Blat serwisowy z otwartym laptopem i narzędziami",
  },
  laptop: {
    src: "/images/computers/laptop-repair.webp",
    alt: "Laptop otwarty podczas naprawy układu chłodzenia",
  },
  phone: {
    src: "/images/phones/phone-repair.webp",
    alt: "Smartfon w trakcie wymiany wyświetlacza",
  },
} as const;
