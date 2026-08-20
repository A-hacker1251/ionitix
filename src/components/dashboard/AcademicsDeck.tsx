"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Network,
  Brain,
  HardDrive,
  Cloud,
  Activity,
  Bot,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const specializations = [
  { name: "IoT Systems", icon: Cpu, desc: "Connected device ecosystems" },
  { name: "Embedded Systems", icon: Network, desc: "Low‑level firmware & RTOS" },
  { name: "Artificial Intelligence", icon: Brain, desc: "ML inference at the edge" },
  { name: "Edge Computing", icon: HardDrive, desc: "Local processing & analytics" },
  { name: "Cloud Integration", icon: Cloud, desc: "Scalable data pipelines" },
  { name: "Sensor Networks", icon: Activity, desc: "High‑frequency telemetry" },
  { name: "Automation & Robotics", icon: Bot, desc: "Closed‑loop control" },
  { name: "Cybersecurity", icon: Shield, desc: "Secure device provisioning" },
];

export function AcademicsDeck() {
  return (
    <section className="py-12" aria-labelledby="academics-heading">
      <h2
        id="academics-heading"
        className="section-heading text-center mb-10"
      >
        Academics & Specializations
      </h2>
      <div className="container-custom">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {specializations.map((spec, i) => (
            <motion.article
              key={spec.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <Card className="glass-card h-full flex flex-col border border-primary/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex items-center justify-center">
                    <spec.icon className="h-10 w-10 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-center">
                    {spec.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center flex-1">
                    {spec.desc}
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