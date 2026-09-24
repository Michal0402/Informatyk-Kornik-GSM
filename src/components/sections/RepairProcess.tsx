"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { repairSteps } from "@/data/process";
import { useCanAnimate } from "@/components/ui/Reveal";

export function RepairProcess() {
  const ref = useRef<HTMLElement>(null);
  const animate = useCanAnimate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section id="naprawa" ref={ref} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Prosto. Bez niespodzianek.
        </h2>
        <p className="mt-3 text-muted">Jak wygląda naprawa</p>
        <div className="relative mt-10">
          <span className="absolute top-4 right-[8%] left-[8%] hidden h-px bg-white/10 md:block" aria-hidden="true" />
          <motion.span
            className="absolute top-4 left-[8%] hidden h-px w-[84%] origin-left bg-accent md:block"
            style={animate ? { scaleX } : { scaleX: 1 }}
            aria-hidden="true"
          />
          <span className="absolute top-4 bottom-4 left-[15px] w-px bg-white/10 md:hidden" aria-hidden="true" />
          <motion.span
            className="absolute top-4 bottom-4 left-[15px] w-px origin-top bg-accent md:hidden"
            style={animate ? { scaleY } : { scaleY: 1 }}
            aria-hidden="true"
          />
          <ol className="grid gap-8 md:grid-cols-4 md:gap-4">
            {repairSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                index={index}
                progress={scrollYProgress}
                animate={animate}
                step={step}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  index,
  progress,
  animate,
  step,
}: {
  index: number;
  progress: MotionValue<number>;
  animate: boolean;
  step: (typeof repairSteps)[number];
}) {
  const opacity = useTransform(progress, [index * 0.18, index * 0.18 + 0.2], [0.35, 1]);

  return (
    <motion.li className="relative" style={animate ? { opacity } : undefined}>
      <div className="relative flex gap-4 md:block">
        <span className="relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg font-display text-xs text-accent-2">
          {step.id}
        </span>
        <div className="md:mt-5">
          <h3 className="font-display text-xl font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
        </div>
      </div>
    </motion.li>
  );
}
