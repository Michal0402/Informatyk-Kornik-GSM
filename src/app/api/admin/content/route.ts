import { NextResponse } from "next/server";
import { company, serviceAreas, areaNote } from "@/config/company";
import { pricingItems, pricingNote } from "@/data/pricing";
import { computerGroups } from "@/data/computer-services";
import { phoneBrands, phoneGroups, phonePriceNote } from "@/data/phone-services";
import { faqItems } from "@/data/faq";
import { realizations } from "@/data/realizations";
import { benefits } from "@/data/benefits";
import { problems } from "@/data/problems";
import { repairSteps } from "@/data/process";
import { reviews } from "@/data/reviews";
import { images } from "@/data/images";
import { denied, devOnly, passwordOk } from "@/lib/admin/guard";
import {
  renderBenefits,
  renderCompany,
  renderComputers,
  renderFaq,
  renderImages,
  renderPhones,
  renderPricing,
  renderProblems,
  renderProcess,
  renderRealizations,
  renderReviews,
} from "@/lib/admin/serialize";
import { writeProjectFile } from "@/lib/admin/write";
import {
  assertBenefits,
  assertCompany,
  assertFaq,
  assertImages,
  assertPricing,
  assertProblems,
  assertProcess,
  assertRealizations,
  assertReviews,
  assertServices,
} from "@/lib/admin/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const files = {
  company: "src/config/company.ts",
  pricing: "src/data/pricing.ts",
  computers: "src/data/computer-services.ts",
  phones: "src/data/phone-services.ts",
  faq: "src/data/faq.ts",
  realizations: "src/data/realizations.ts",
  benefits: "src/data/benefits.ts",
  problems: "src/data/problems.ts",
  process: "src/data/process.ts",
  reviews: "src/data/reviews.ts",
  images: "src/data/images.ts",
} as const;

export async function GET(request: Request) {
  const blocked = devOnly();
  if (blocked) return blocked;
  if (!passwordOk(request)) return denied();

  return NextResponse.json({
    company,
    serviceAreas,
    areaNote,
    pricingItems,
    pricingNote,
    computerGroups,
    phoneBrands,
    phoneGroups,
    phonePriceNote,
    faqItems,
    realizations,
    benefits,
    problems,
    repairSteps,
    reviews,
    images,
  });
}

export async function POST(request: Request) {
  const blocked = devOnly();
  if (blocked) return blocked;
  if (!passwordOk(request)) return denied();

  try {
    const body = await request.json();
    const section = String(body.section ?? "");
    const written = await saveSection(section, body.data);
    return NextResponse.json({ ok: true, file: written });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nie udało się zapisać.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

async function saveSection(section: string, data: unknown) {
  switch (section) {
    case "company": {
      const parsed = assertCompany(data);
      return writeProjectFile(
        files.company,
        renderCompany(
          parsed.company as Parameters<typeof renderCompany>[0],
          parsed.serviceAreas,
          parsed.areaNote,
        ),
      );
    }
    case "pricing": {
      const parsed = assertPricing(data);
      return writeProjectFile(
        files.pricing,
        renderPricing(
          parsed.pricingItems as Parameters<typeof renderPricing>[0],
          parsed.pricingNote,
        ),
      );
    }
    case "services": {
      const parsed = assertServices(data);
      await writeProjectFile(files.computers, renderComputers(parsed.computerGroups));
      await writeProjectFile(
        files.phones,
        renderPhones(parsed.phoneBrands, parsed.phoneGroups, parsed.phonePriceNote),
      );
      return `${files.computers}, ${files.phones}`;
    }
    case "faq":
      return writeProjectFile(files.faq, renderFaq(assertFaq(data) as Parameters<typeof renderFaq>[0]));
    case "realizations":
      return writeProjectFile(
        files.realizations,
        renderRealizations(assertRealizations(data) as Parameters<typeof renderRealizations>[0]),
      );
    case "benefits":
      return writeProjectFile(
        files.benefits,
        renderBenefits(assertBenefits(data) as Parameters<typeof renderBenefits>[0]),
      );
    case "problems":
      return writeProjectFile(
        files.problems,
        renderProblems(assertProblems(data) as Parameters<typeof renderProblems>[0]),
      );
    case "process":
      return writeProjectFile(
        files.process,
        renderProcess(assertProcess(data) as Parameters<typeof renderProcess>[0]),
      );
    case "reviews":
      return writeProjectFile(files.reviews, renderReviews(assertReviews(data)));
    case "images":
      return writeProjectFile(files.images, renderImages(assertImages(data)));
    default:
      throw new Error("Nieznana sekcja.");
  }
}
