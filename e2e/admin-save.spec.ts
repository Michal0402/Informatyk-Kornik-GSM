import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

function adminPassword() {
  const line = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((entry) => entry.startsWith("ADMIN_PASSWORD="));
  return line?.slice("ADMIN_PASSWORD=".length).trim() ?? "";
}

test("guzik zapisz zmienia kursor i potwierdza zapis", async ({ page }) => {
  await page.goto("/admin");
  await page.evaluate((password) => {
    sessionStorage.setItem("admin-password", password);
    sessionStorage.removeItem("admin-notice");
    sessionStorage.removeItem("admin-saved-until");
  }, adminPassword());
  await page.reload();

  const save = page.getByRole("button", { name: "Zapisz" });
  await expect(save).toBeVisible({ timeout: 15_000 });

  await save.hover();
  await expect.poll(() => save.evaluate((el) => getComputedStyle(el).cursor)).toBe("pointer");

  await save.click();
  const saved = page.getByRole("button", { name: "Zapisano" });
  await expect(saved).toBeVisible({ timeout: 15_000 });
  await expect.poll(() => saved.evaluate((el) => getComputedStyle(el).animationName)).toContain("save-pop");
  await expect(page.getByText("Zapisano src/config/company.ts")).toBeVisible();
  await expect(page.getByRole("button", { name: "Zapisz" })).toBeVisible({ timeout: 5_000 });
});
