"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useCanAnimate } from "@/components/ui/Reveal";
import { DeviceStage } from "@/components/ui/DeviceStage";

export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const animate = useCanAnimate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <div ref={ref}>
      <motion.div style={animate ? { y } : undefined} className="will-change-transform">
        <DeviceStage scene="pair" />
        <p className="mt-4 text-sm text-muted">
          Diagnoza na miejscu. Wycena zanim cokolwiek wymienimy.
        </p>
      </motion.div>
    </div>
  );
}
