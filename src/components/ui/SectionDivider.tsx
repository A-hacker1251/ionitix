"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionDivider() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="relative h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent my-8"
      initial={false}
      animate={reduced ? {} : { scaleX: [0, 1, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "left" }}
      aria-hidden="true"
    />
  );
}