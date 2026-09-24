import { writeFile } from "node:fs/promises";

export async function requestRebuild() {
  if (process.env.NODE_ENV === "development") return false;
  await writeFile(".rebuild", String(Date.now()));
  return true;
}
