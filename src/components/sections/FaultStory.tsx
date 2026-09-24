"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { DeviceStage, type DeviceScene } from "@/components/ui/DeviceStage";
import { cn } from "@/lib/utils";

const stories: {
  id: string;
  scene: DeviceScene;
  kicker: string;
  title: string;
  text: string;
}[] = [
  {
    id: "heat",
    scene: "heat",
    kicker: "Laptop",
    title: "Grzeje się i zwalnia",
    text: "Wentylator wchodzi na wysokie obroty, obudowa parzy, a programy zaczynają się zacinać. Najpierw sprawdzamy chłodzenie.",
  },
  {
    id: "crack",
    scene: "crack",
    kicker: "Telefon",
    title: "Pęknięty ekran",
    text: "Szybka, obraz albo dotyk. Oglądamy model i mówimy, czy wystarczy front, czy cały wyświetlacz.",
  },
  {
    id: "signal",
    scene: "nosignal",
    kicker: "Komputer",
    title: "Nie daje obrazu",
    text: "Diody się świecą, monitor zostaje czarny. Sprawdzamy sygnał, zanim ktokolwiek zamówi nową część.",
  },
];

const fades = [0.33, 0.66];


export function FaultStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < fades[0] ? 0 : value < fades[1] ? 1 : 2;
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section id="co-sie-psuje" className="scroll-mt-24 border-t border-white/8">
      <div className="md:hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Co się psuje</h2>
          <p className="mt-3 text-muted">Trzy usterki, od których zwykle się zaczyna.</p>
        </div>
        {stories.map((story) => (
          <article key={story.id} className="mx-auto max-w-6xl px-4 py-10">
            <DeviceStage scene={story.scene} />
            <p className="mt-6 text-sm text-accent-2">{story.kicker}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">{story.title}</h3>
            <p className="mt-3 text-muted">{story.text}</p>
          </article>
        ))}
      </div>

      <div ref={trackRef} className="story-track relative hidden h-[240vh] md:block">
        <div className="story-sticky sticky top-16 flex h-[calc(100dvh-4rem)] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-16 px-6">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">Co się psuje</h2>
              <p className="mt-3 text-muted">Trzy usterki, od których zwykle się zaczyna.</p>
              <div className="relative mt-10 min-h-44">
                {stories.map((story, index) => (
                  <StoryCopy key={story.id} story={story} active={active === index} />
                ))}
              </div>
            </div>
            <div className="relative aspect-[5/4]">
              {stories.map((story, index) => (
                <StoryVisual key={story.id} story={story} active={active === index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCopy({
  story,
  active,
}: {
  story: (typeof stories)[number];
  active: boolean;
}) {
  return (
    <article
      data-story={story.id}
      className={cn(
        "story-pane absolute inset-0 transition-opacity duration-500",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <p className="text-sm text-accent-2">{story.kicker}</p>
      <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight">{story.title}</h3>
      <p className="mt-4 max-w-md text-lg text-muted">{story.text}</p>
    </article>
  );
}

function StoryVisual({
  story,
  active,
}: {
  story: (typeof stories)[number];
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "story-pane absolute inset-0 transition-opacity duration-500",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <DeviceStage scene={story.scene} />
    </div>
  );
}
