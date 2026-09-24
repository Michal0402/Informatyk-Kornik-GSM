import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

export async function writeProjectFile(relativePath: string, contents: string) {
  const file = safePath(relativePath, ["src/config", "src/data"]);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents, "utf8");
  return relativePath;
}

export async function writeImageFile(publicPath: string, bytes: Buffer) {
  if (!/^\/images\/[a-z0-9/_-]+\.webp$/i.test(publicPath)) {
    throw new Error("Niedozwolona ścieżka grafiki.");
  }
  const file = safePath(path.join("public", publicPath), ["public/images"]);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, bytes);
  return publicPath;
}

function safePath(relativePath: string, allowedRoots: string[]) {
  const normalized = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  const absolute = path.resolve(root, normalized);
  const ok = allowedRoots.some((folder) => {
    const base = path.resolve(root, folder);
    return absolute === base || absolute.startsWith(base + path.sep);
  });
  if (!ok) throw new Error("Zapis poza dozwolonym katalogiem.");
  return absolute;
}
