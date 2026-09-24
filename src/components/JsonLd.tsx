import { areaNote, company, serviceAreas } from "@/config/company";
import { jsonLdScript } from "@/lib/utils";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}

export function localBusinessJsonLd() {
  const sameAs = company.facebookUrl.startsWith("http") ? [company.facebookUrl] : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    alternateName: company.seoName,
    description: company.description,
    url: company.siteUrl,
    telephone: company.phone,
    email: company.email,
    image: `${company.siteUrl}/images/service/hero-service.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.country,
    },
    areaServed: [
      ...serviceAreas.map((area) => ({
        "@type": "City",
        name: area.name,
      })),
      { "@type": "City", name: "Poznań" },
    ],
    knowsAbout: [
      "naprawa laptopów",
      "serwis komputerowy",
      "serwis telefonów",
      "wymiana wyświetlacza",
      "wymiana baterii",
    ],
    slogan: company.tagline,
    ...(sameAs ? { sameAs } : {}),
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Obszar działania",
      value: areaNote,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${company.siteUrl}${item.path}`,
    })),
  };
}
