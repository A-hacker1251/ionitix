"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  Cpu,
  Wifi,
  Brain,
  Bot,
  Lightbulb,
  Server,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const labs = [
  { name: "IoT Lab", icon: Microscope, focus: "Prototyping & testing" },
  { name: "Embedded Systems Lab", icon: Cpu, focus: "MCU/SoC development" },
  { name: "Networking Lab", icon: Wifi, focus: "Protocol analysis & 5G" },
  { name: "AI/ML Lab", icon: Brain, focus: "Model training & inference" },
  { name: "Robotics Lab", icon: Bot, focus: "Autonomous systems" },
  { name: "Innovation Center", icon: Lightbulb, focus: "Cross‑disciplinary projects" },
  { name: "Smart Systems Lab", icon: Server, focus: "Edge‑cloud orchestration" },
  { name: "Power Electronics Lab", icon: Zap, focus: "Energy harvesting & mgmt" },
];

export function LabsDeck() {
  return (
    <section className="py-12" aria-labelledby="labs-heading">
      <h2
        id="labs-heading"
        className="section-heading text-center mb-10"
      >
        Laboratories & Facilities
      </h2>
      <div className="container-custom">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {labs.map((lab, i) => (
            <motion.article
              key={lab.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <Card className="glass-card h-full flex flex-col border border-primary/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex items-center justify-center">
                    <lab.icon className="h-10 w-10 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-center">
                    {lab.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center flex-1">
                    {lab.focus}
                  </p>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}