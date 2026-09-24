/**
 * Jedno miejsce na dane firmy.
 * Podmień placeholdery przed publikacją — reszta strony czyta wyłącznie stąd.
 */
export const company = {
  "name": "Serwis Kórnik",
  "logoLines": [
    "SERWIS",
    "KÓRNIK"
  ],
  "tagline": "Komputery • Laptopy • Telefony",
  "seoName": "Serwis Komputerowy i GSM Kórnik",
  "phone": "12214454545",
  "phoneHref": "tel:12214454545",
  "email": "[EMAIL]",
  "emailHref": "mailto:[EMAIL]",
  "address": "[ADRES_LUB_INFORMACJA_O_OBSLUDZE_PO_UMOWIENIU]",
  "city": "Kórnik",
  "region": "Wielkopolskie",
  "country": "PL",
  "openingHours": "Pon.–Niedz.",
  "openingHoursNote": "kontakt telefoniczny po wcześniejszym ustaleniu",
  "serviceAreaLabel": "Kórnik i okolice",
  "siteUrl": "https://twoja-domena.pl",
  "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=K%C3%B3rnik",
  "googleMapsEmbedUrl": "https://maps.google.com/maps?q=K%C3%B3rnik&z=12&output=embed",
  "facebookUrl": "",
  "description": "Serwis komputerowy i GSM w Kórniku. Naprawa laptopów, komputerów i telefonów, wymiana ekranów i baterii, Windows, SSD, RAM i odzyskiwanie danych. Zadzwoń i umów naprawę."
} as const;

export const serviceAreas = [
  {
    "name": "Kórnik",
    "primary": true
  },
  {
    "name": "Bnin",
    "primary": false
  },
  {
    "name": "Borówiec",
    "primary": false
  },
  {
    "name": "Kamionki",
    "primary": false
  },
  {
    "name": "Robakowo",
    "primary": false
  },
  {
    "name": "Zaniemyśl",
    "primary": false
  },
  {
    "name": "Środa Wielkopolska",
    "primary": false
  },
  {
    "name": "Śrem",
    "primary": false
  }
] as const;

export const areaNote =
  "Obsługujemy klientów z Kórnika, Bnina oraz pobliskich miejscowości. Po wcześniejszym ustaleniu możliwa jest również obsługa klientów z dalszej części powiatu poznańskiego i sąsiednich miejscowości.";
