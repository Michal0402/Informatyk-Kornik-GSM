import sharp from "sharp";
import { NextResponse } from "next/server";
import { images } from "@/data/images";
import { realizations } from "@/data/realizations";
import { denied, devOnly, passwordOk } from "@/lib/admin/guard";
import { assertImagePath } from "@/lib/admin/validate";
import { requestRebuild } from "@/lib/admin/rebuild";
import { writeImageFile } from "@/lib/admin/write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const blocked = devOnly();
  if (blocked) return blocked;
  if (!passwordOk(request)) return denied();

  try {
    const form = await request.formData();
    const target = String(form.get("target") ?? "");
    const file = form.get("file");
    if (!(file instanceof File)) throw new Error("Wybierz plik graficzny.");
    const destination = resolveTarget(target);
    const input = Buffer.from(await file.arrayBuffer());
    const webp = await sharp(input).rotate().webp({ quality: 82 }).toBuffer();
    await writeImageFile(destination, webp);
    const rebuild = await requestRebuild();
    return NextResponse.json({ ok: true, file: destination, rebuild });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nie udało się zapisać grafiki.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function resolveTarget(target: string) {
  if (target in images) {
    const src = images[target as keyof typeof images].src;
    assertImagePath(src);
    return src;
  }
  if (target.startsWith("realization:")) {
    const id = target.slice("realization:".length);
    const item = realizations.find((entry) => entry.id === id);
    if (!item) throw new Error("Nie ma takiej realizacji.");
    assertImagePath(item.image);
    return item.image;
  }
  throw new Error("Nieznana grafika.");
}
