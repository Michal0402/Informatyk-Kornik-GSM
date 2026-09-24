const text = (value: unknown) => typeof value === "string";
const lines = (value: unknown) => Array.isArray(value) && value.every(text);

const priceCategories = new Set(["ogolne", "komputery", "telefony"]);
const faqTags = new Set(["home", "computers", "phones", "laptops"]);
const benefitIcons = new Set(["phone", "receipt", "layers", "map", "truck"]);
const problemIcons = new Set([
  "thermometer",
  "unplug",
  "smartphone",
  "monitor",
  "gauge",
  "battery",
  "power",
  "database",
]);

export function assertCompany(data: unknown) {
  const row = asRecord(data);
  const company = asRecord(row.company);
  const required = [
    "name",
    "tagline",
    "seoName",
    "phone",
    "email",
    "address",
    "city",
    "region",
    "country",
    "openingHours",
    "openingHoursNote",
    "serviceAreaLabel",
    "siteUrl",
    "googleMapsUrl",
    "googleMapsEmbedUrl",
    "facebookUrl",
    "description",
  ] as const;
  for (const key of required) {
    if (!text(company[key])) throw new Error(`Pole ${key} musi być tekstem.`);
  }
  if (!Array.isArray(company.logoLines) || company.logoLines.length !== 2 || !company.logoLines.every(text)) {
    throw new Error("Logotyp to dwie linie tekstu.");
  }
  const siteUrl = String(company.siteUrl);
  if (!/^https?:\/\//.test(siteUrl)) throw new Error("Adres strony musi zaczynać się od http:// lub https://.");
  const facebook = String(company.facebookUrl);
  if (facebook && !/^https?:\/\//.test(facebook)) throw new Error("Facebook musi być pusty albo być adresem http(s).");
  const areas = asList(row.serviceAreas).map((item) => {
    const area = asRecord(item);
    if (!text(area.name) || typeof area.primary !== "boolean") throw new Error("Miejscowość ma nazwę i oznaczenie główne.");
    return { name: String(area.name), primary: area.primary };
  });
  if (!text(row.areaNote)) throw new Error("Opis obszaru musi być tekstem.");
  return { company, serviceAreas: areas, areaNote: String(row.areaNote) };
}

export function assertPricing(data: unknown) {
  const row = asRecord(data);
  if (!text(row.pricingNote)) throw new Error("Dopisek cennika musi być tekstem.");
  const pricingItems = asList(row.pricingItems).map((item) => {
    const price = asRecord(item);
    if (!text(price.id) || !text(price.name) || !text(price.price) || !text(price.detail)) {
      throw new Error("Pozycja cennika ma id, nazwę, cenę i opis.");
    }
    if (!priceCategories.has(String(price.category))) throw new Error("Zła kategoria ceny.");
    return price;
  });
  return { pricingItems, pricingNote: String(row.pricingNote) };
}

export function assertServices(data: unknown) {
  const row = asRecord(data);
  return {
    computerGroups: asList(row.computerGroups).map(assertGroup),
    phoneBrands: stringList(row.phoneBrands, "Marki"),
    phoneGroups: asList(row.phoneGroups).map(assertGroup),
    phonePriceNote: mustText(row.phonePriceNote, "Dopisek o cenie telefonu"),
  };
}

export function assertFaq(data: unknown) {
  return asList(data).map((item) => {
    const row = asRecord(item);
    if (!text(row.id) || !text(row.question) || !text(row.answer) || !lines(row.tags)) {
      throw new Error("Pytanie FAQ ma id, treść i tagi.");
    }
    if (!(row.tags as unknown[]).every((tag) => faqTags.has(String(tag)))) throw new Error("Zły tag FAQ.");
    return row;
  });
}

export function assertRealizations(data: unknown) {
  return asList(data).map((item) => {
    const row = asRecord(item);
    for (const key of ["id", "image", "imageAlt", "device", "problem", "solution"] as const) {
      if (!text(row[key])) throw new Error(`Realizacja: brak pola ${key}.`);
    }
    assertImagePath(String(row.image));
    return row;
  });
}

export function assertBenefits(data: unknown) {
  return asList(data).map((item) => {
    const row = asRecord(item);
    if (!text(row.id) || !text(row.title) || !text(row.text)) throw new Error("Karta korzyści ma id, tytuł i tekst.");
    if (!benefitIcons.has(String(row.icon))) throw new Error("Zła ikona korzyści.");
    return row;
  });
}

export function assertProblems(data: unknown) {
  return asList(data).map((item) => {
    const row = asRecord(item);
    if (!text(row.id) || !text(row.title) || !text(row.text)) throw new Error("Problem ma id, tytuł i tekst.");
    if (!problemIcons.has(String(row.icon))) throw new Error("Zła ikona problemu.");
    return row;
  });
}

export function assertProcess(data: unknown) {
  return asList(data).map((item) => {
    const row = asRecord(item);
    if (!text(row.id) || !text(row.title) || !text(row.text)) throw new Error("Krok ma numer, tytuł i tekst.");
    return row;
  });
}

export function assertReviews(data: unknown) {
  return asList(data).map((item) => {
    const row = asRecord(item);
    if (!text(row.id) || !text(row.author) || !text(row.text) || !text(row.date)) {
      throw new Error("Opinia ma autora, treść i datę.");
    }
    if (row.source !== "Google") throw new Error("Źródło opinii to Google.");
    const rating = Number(row.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("Ocena to liczba od 1 do 5.");
    return {
      id: String(row.id),
      author: String(row.author),
      text: String(row.text),
      rating,
      source: "Google" as const,
      date: String(row.date),
    };
  });
}

export function assertImages(data: unknown) {
  const row = asRecord(data);
  const images = {
    hero: imageSlot(row.hero),
    workstation: imageSlot(row.workstation),
    laptop: imageSlot(row.laptop),
    phone: imageSlot(row.phone),
  };
  return images;
}

export function assertImagePath(value: string) {
  if (!/^\/images\/[a-z0-9/_-]+\.webp$/i.test(value)) {
    throw new Error("Grafika musi być plikiem .webp w /images.");
  }
}

function imageSlot(value: unknown) {
  const row = asRecord(value);
  if (!text(row.src) || !text(row.alt)) throw new Error("Grafika ma ścieżkę i opis.");
  assertImagePath(String(row.src));
  return { src: String(row.src), alt: String(row.alt) };
}

function assertGroup(value: unknown) {
  const row = asRecord(value);
  if (!text(row.id) || !text(row.title) || !text(row.text)) throw new Error("Grupa usług ma id, tytuł i opis.");
  return { id: String(row.id), title: String(row.title), text: String(row.text), items: stringList(row.items, "Usługi") };
}

function stringList(value: unknown, label: string) {
  if (!lines(value)) throw new Error(`${label} muszą być listą tekstów.`);
  return (value as string[]).map((item) => item.trim()).filter(Boolean);
}

function mustText(value: unknown, label: string) {
  if (!text(value)) throw new Error(`${label} musi być tekstem.`);
  return String(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Nieprawidłowe dane.");
  return value as Record<string, unknown>;
}

function asList(value: unknown) {
  if (!Array.isArray(value) || value.length > 80) throw new Error("Lista jest pusta albo za długa.");
  return value;
}
