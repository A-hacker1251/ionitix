"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useRef, useEffect } from "react";
import { ReactNode } from "react";

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number; // 0-1
}

export function MagneticWrapper({ children, strength = 0.15 }: MagneticWrapperProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      x.set(dx);
      y.set(dy);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y, strength, reduced]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}