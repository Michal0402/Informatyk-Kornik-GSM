import { expect, test } from "@playwright/test";

test("hero ma grafikę sprzętu i scroll nie gubi klatek", async ({ page }) => {
  await page.goto("/");
  const stage = page.locator("[data-device-stage='pair']");
  await expect(stage).toBeVisible();
  await expect(stage.locator("svg")).toBeVisible();

  const frames = await scrollFrames(page, 70);
  const slow = frames.filter((frame) => frame > 50);
  const median = frames.slice().sort((a, b) => a - b)[Math.floor(frames.length / 2)];

  expect(median, `mediana klatki ${median.toFixed(1)} ms`).toBeLessThan(34);
  expect(slow.length / frames.length, `${slow.length} wolnych klatek`).toBeLessThan(0.15);

  await page.screenshot({ path: "e2e/artifacts/hero.png" });
});

test("opowieść o usterkach zmienia się przy scrollu", async ({ page }) => {
  await page.goto("/");
  const track = page.locator(".story-track");
  await track.scrollIntoViewIfNeeded();
  const first = async () =>
    track.locator("[data-story='heat']").evaluate((el) => Number(getComputedStyle(el).opacity));
  const third = async () =>
    track.locator("[data-story='signal']").evaluate((el) => Number(getComputedStyle(el).opacity));

  const before = await third();
  await page.evaluate(() => {
    const el = document.querySelector(".story-track");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + el.clientHeight * 0.82);
  });
  await page.waitForTimeout(600);
  const after = await third();
  const opening = await first();

  expect(after).toBeGreaterThan(before + 0.4);
  expect(opening).toBeLessThan(0.2);
  await page.screenshot({ path: "e2e/artifacts/story.png" });
});

async function scrollFrames(page: import("@playwright/test").Page, steps: number) {
  return page.evaluate(async (count) => {
    const deltas: number[] = [];
    let last = performance.now();
    await new Promise<void>((resolve) => {
      let i = 0;
      const tick = (now: number) => {
        deltas.push(now - last);
        last = now;
        window.scrollBy(0, 24);
        i += 1;
        if (i < count) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    return deltas.slice(1);
  }, steps);
}
