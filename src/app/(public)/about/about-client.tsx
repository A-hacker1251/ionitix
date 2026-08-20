"use client"

import { Target, Users, Award, BookOpen, FlaskConical, TrendingUp, ArrowRight, Lightbulb, Shield, Globe, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const visionMission = [
  {
    icon: Lightbulb,
    title: "Vision",
    description: "To be a globally recognized center of excellence in computer science education, research, and innovation, producing leaders who shape the future of technology.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "Mission",
    description: "To provide world-class education, foster cutting-edge research, and cultivate industry partnerships that empower students to solve real-world problems through technology.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Values",
    description: "Excellence, Innovation, Integrity, Collaboration, and Social Responsibility guide everything we do at IONITIX.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

const objectives = [
  "Deliver industry-aligned curriculum with hands-on learning",
  "Foster research culture with publications in top-tier venues",
  "Build strong industry partnerships for internships and placements",
  "Support student entrepreneurship and innovation initiatives",
  "Promote diversity, equity, and inclusion in technology",
  "Contribute to societal development through technology solutions",
]

const hodMessage = {
  name: "Dr. Rajesh Kumar",
  designation: "Head of Department, Computer Science & Engineering",
  qualification: "Ph.D. (IIT Delhi), M.Tech (IIT Bombay), B.Tech (NIT Trichy)",
  message: "Welcome to IONITIX! Our department stands at the forefront of computer science education and research. With a legacy of academic excellence spanning decades, we are committed to nurturing the next generation of technology leaders. Our world-class faculty, state-of-the-art laboratories, and industry-aligned curriculum ensure that every student receives the best possible education. We believe in learning by doing, which is why our programs emphasize practical experience through projects, internships, hackathons, and research opportunities. I invite you to explore our programs, meet our faculty, and discover how IONITIX can help you achieve your dreams in the exciting world of computer science and engineering.",
}

const highlights = [
  { icon: Award, title: "NAAC A++", description: "Accredited with highest grade" },
  { icon: GraduationCap, title: "100%", description: "Placement assistance" },
  { icon: FlaskConical, title: "12+", description: "Advanced laboratories" },
  { icon: Globe, title: "50+", description: "Industry partnerships" },
  { icon: Users, title: "80+", description: "Expert faculty members" },
  { icon: TrendingUp, title: "500+", description: "Research publications" },
]

export function AboutClient() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Lightbulb className="h-4 w-4" />
                About IONITIX
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              Department of Computer Science & Engineering
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              Innovating, building, and shaping the future of technology through excellence in education, research, and industry collaboration.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Vision", description: "To be a globally recognized center of excellence in computer science education, research, and innovation, producing leaders who shape the future of technology.", color: "text-primary", bgColor: "bg-primary/10" },
              { icon: Target, title: "Mission", description: "To provide world-class education, foster cutting-edge research, and cultivate industry partnerships that empower students to solve real-world problems through technology.", color: "text-accent", bgColor: "bg-accent/10" },
              { icon: Shield, title: "Values", description: "Excellence, Innovation, Integrity, Collaboration, and Social Responsibility guide everything we do at IONITIX.", color: "text-primary", bgColor: "bg-primary/10" },
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full border-l-4 border-primary border border-[hsl(276_30%_20%_/_0.3)]">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bgColor} border border-primary/20`}>
                      <item.icon className="h-6 w-6" style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 relative">
            <div className="accent-line w-24 mx-auto mb-4" />
            <h2 className="section-heading mb-4">Our Objectives</h2>
            <p className="section-subheading mx-auto">Guiding principles that drive our department forward</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Deliver industry-aligned curriculum with hands-on learning",
              "Foster research culture with publications in top-tier venues",
              "Build strong industry partnerships for internships and placements",
              "Support student entrepreneurship and innovation initiatives",
              "Promote diversity, equity, and inclusion in technology",
              "Contribute to societal development through technology solutions",
            ].map((objective, index) => (
              <motion.div
                key={objective}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-5 glass-card rounded-xl border border-[hsl(276_30%_20%_/_0.3)]"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">{objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading mb-6">Message from the Head of Department</h2>
              <div className="glass-card p-8 border border-[hsl(276_30%_20%_/_0.3)]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">RK</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">Dr. Rajesh Kumar</h3>
                    <p className="text-primary text-sm font-medium">Head of Department, Computer Science & Engineering</p>
                    <p className="text-muted-foreground text-sm">Ph.D. (IIT Delhi), M.Tech (IIT Bombay), B.Tech (NIT Trichy)</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">Welcome to IONITIX! Our department stands at the forefront of computer science education and research. With a legacy of academic excellence spanning decades, we are committed to nurturing the next generation of technology leaders. Our world-class faculty, state-of-the-art laboratories, and industry-aligned curriculum ensure that every student receives the best possible education. We believe in learning by doing, which is why our programs emphasize practical experience through projects, internships, hackathons, and research opportunities. I invite you to explore our programs, meet our faculty, and discover how IONITIX can help you achieve your dreams in the exciting world of computer science and engineering.</p>
              </div>
            </div>
            <div>
              <h2 className="section-heading mb-6">Department Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, title: "NAAC A++", description: "Accredited with highest grade" },
                  { icon: GraduationCap, title: "100%", description: "Placement assistance" },
                  { icon: FlaskConical, title: "12+", description: "Advanced laboratories" },
                  { icon: Globe, title: "50+", description: "Industry partnerships" },
                  { icon: Users, title: "80+", description: "Expert faculty members" },
                  { icon: TrendingUp, title: "500+", description: "Research publications" },
                ].map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 glass-card rounded-xl border border-[hsl(276_30%_20%_/_0.3)]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                      <highlight.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-heading font-bold text-primary mb-1">{highlight.description}</div>
                    <div className="text-sm text-muted-foreground">{highlight.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden" style={{ background: 'hsl(276 65% 46%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(276_65%_46%_/_0.3)_0%,_transparent_70%)]" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">Ready to Join IONITIX?</h2>
            <p className="section-subheading mx-auto mb-8" style={{ color: 'hsl(270 100% 96% / 0.8)' }}>
              Explore our programs, connect with faculty, and start your journey in computer science & engineering.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_hsl(276_65%_46%_/_0.3)] hover:bg-primary/90 hover:shadow-[0_6px_30px_hsl(276_65%_46%_/_0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 active:scale-[0.98]" onClick={() => window.location.href = "/academics"}>
                Explore Programs
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 active:scale-[0.98]" onClick={() => window.location.href = "/contact"}>
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}