"use client";

import { motion } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { useCanAnimate } from "@/components/ui/Reveal";

export function CinematicPhoto({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const animate = useCanAnimate();

  return (
    <motion.div
      className="absolute inset-0"
      initial={animate ? { scale: 1.04 } : false}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Photo src={src} alt={alt} sizes={sizes} />
    </motion.div>
  );
}
