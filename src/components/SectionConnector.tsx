"use client";

import { motion } from "framer-motion";

export function SectionConnector() {
  return (
    <div className="w-full flex justify-center py-4" aria-hidden="true">
      <motion.div
        className="relative w-px h-24 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* moving node */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
          animate={{ y: [ -12, 12 ], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}