"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatCounterProps {
  value: string; // e.g. "2,500+"
  className?: string;
}

export function StatCounter({ value, className = "" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Extract numeric part for animation
  const numericStr = value.replace(/[^\d]/g, "");
  const suffix = value.replace(/[\d,]/g, "");
  const target = numericStr ? parseInt(numericStr.replace(/,/g, ""), 10) : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) {
      setCount(target);
      return;
    }
    let frame: number;
    const duration = 800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <div ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// Need useState import
import { useState } from "react";