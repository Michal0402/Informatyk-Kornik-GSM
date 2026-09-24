type CompanyInput = {
  name: string;
  logoLines: [string, string];
  tagline: string;
  seoName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  region: string;
  country: string;
  openingHours: string;
  openingHoursNote: string;
  serviceAreaLabel: string;
  siteUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  facebookUrl: string;
  description: string;
};

type Area = { name: string; primary: boolean };

export function renderCompany(input: CompanyInput, serviceAreas: Area[], areaNote: string) {
  const phone = input.phone.trim();
  const email = input.email.trim();
  const company = {
    name: input.name.trim(),
    logoLines: [input.logoLines[0].trim(), input.logoLines[1].trim()],
    tagline: input.tagline.trim(),
    seoName: input.seoName.trim(),
    phone,
    phoneHref: `tel:${phone}`,
    email,
    emailHref: `mailto:${email}`,
    address: input.address.trim(),
    city: input.city.trim(),
    region: input.region.trim(),
    country: input.country.trim(),
    openingHours: input.openingHours.trim(),
    openingHoursNote: input.openingHoursNote.trim(),
    serviceAreaLabel: input.serviceAreaLabel.trim(),
    siteUrl: input.siteUrl.trim(),
    googleMapsUrl: input.googleMapsUrl.trim(),
    googleMapsEmbedUrl: input.googleMapsEmbedUrl.trim(),
    facebookUrl: input.facebookUrl.trim(),
    description: input.description.trim(),
  };

  return `/**
 * Jedno miejsce na dane firmy.
 * Podmień placeholdery przed publikacją — reszta strony czyta wyłącznie stąd.
 */
export const company = ${block(company)} as const;

export const serviceAreas = ${block(serviceAreas)} as const;

export const areaNote =
  ${JSON.stringify(areaNote.trim())};
`;
}

export function renderPricing(
  pricingItems: { id: string; name: string; price: string; detail: string; category: string }[],
  pricingNote: string,
) {
  return `export type PriceItem = {
  id: string;
  name: string;
  price: string;
  detail: string;
  category: "ogolne" | "komputery" | "telefony";
};

/** Orientacyjne kwoty. Zmieniaj tylko ten plik. */
export const pricingItems: PriceItem[] = ${block(pricingItems)};

export const pricingNote =
  ${JSON.stringify(pricingNote.trim())};
`;
}

export function renderComputers(groups: { id: string; title: string; text: string; items: string[] }[]) {
  return `export type ServiceGroup = {
  id: string;
  title: string;
  text: string;
  items: string[];
};

export const computerGroups: ServiceGroup[] = ${block(groups)};
`;
}

export function renderPhones(
  brands: string[],
  groups: { id: string; title: string; text: string; items: string[] }[],
  phonePriceNote: string,
) {
  return `export const phoneBrands = ${block(brands)} as const;

export const phoneGroups = ${block(groups)} as const;

export const phonePriceNote =
  ${JSON.stringify(phonePriceNote.trim())};
`;
}

export function renderFaq(items: { id: string; question: string; answer: string; tags: string[] }[]) {
  return `export type FaqTag = "home" | "computers" | "phones" | "laptops";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  tags: FaqTag[];
};

export const faqItems: FaqItem[] = ${block(items)};

export function faqByTag(tag: FaqTag) {
  return faqItems.filter((item) => item.tags.includes(tag));
}
`;
}

export function renderRealizations(
  items: {
    id: string;
    image: string;
    imageAlt: string;
    device: string;
    problem: string;
    solution: string;
  }[],
) {
  return `export type Realization = {
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
export const realizations: Realization[] = ${block(items)};
`;
}

export function renderBenefits(
  items: { id: string; title: string; text: string; icon: string }[],
) {
  return `export const benefits = ${block(items)} as const;
`;
}

export function renderProblems(
  items: { id: string; title: string; text: string; icon: string }[],
) {
  return `export const problems = ${block(items)} as const;
`;
}

export function renderProcess(items: { id: string; title: string; text: string }[]) {
  return `export const repairSteps = ${block(items)} as const;
`;
}

export function renderReviews(
  items: { id: string; author: string; text: string; rating: number; source: "Google"; date: string }[],
) {
  return `export type Review = {
  id: string;
  author: string;
  text: string;
  rating: number;
  source: "Google";
  date: string;
};

/**
 * Prawdziwe opinie Google. Pusta tablica ukrywa sekcję na stronie.
 * Nie dodawaj opinii, których nie ma w profilu firmy.
 */
export const reviews: Review[] = ${block(items)};
`;
}

export function renderImages(images: {
  hero: { src: string; alt: string };
  workstation: { src: string; alt: string };
  laptop: { src: string; alt: string };
  phone: { src: string; alt: string };
}) {
  return `/** Podmień pliki w /public/images, zostawiając te same nazwy. */
export const images = ${block(images)} as const;
`;
}

function block(value: unknown) {
  return JSON.stringify(value, null, 2);
}
