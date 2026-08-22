"use client"

import { BookOpen, GraduationCap, Award, Download, FileText, ChevronDown, ChevronUp, Clock, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import Link from "next/link"

interface AcademicsClientProps {
  programs: any[]
  specializations: any[]
}

export function AcademicsClient({ programs, specializations }: AcademicsClientProps) {
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
              <Badge variant="secondary" className="text-sm px-3 py-1 border border-primary/20">
                <GraduationCap className="h-3 w-3 mr-1" />
                Academic Programs
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              Academic Programs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              Industry-aligned curriculum designed to prepare students for the evolving technology landscape.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="space-y-8">
            {programs.map((program, programIndex) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: programIndex * 0.1 }}
              >
                <Card className="glass-card overflow-hidden border border-[hsl(276_30%_20%_/_0.3)]">
                  <CardHeader className="p-6 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-sm border border-primary/20">{program.type}</Badge>
                          <Badge variant="outline" className="text-sm border border-[hsl(276_30%_20%_/_0.4)]">{program.duration}</Badge>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold">{program.name}</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl">{program.description}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{program.seats} Seats</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Program Highlights
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.highlights.map((highlight: string) => (
                            <Badge key={highlight} variant="outline" className="text-sm border border-[hsl(276_30%_20%_/_0.4)]">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Curriculum Overview
                        </h4>
                        <Accordion type="single" collapsible className="w-full space-y-2">
                          {program.curriculum.map((sem: any, semIndex: number) => (
                            <AccordionItem key={sem.semester} value={`sem-${sem.semester}`}>
                              <AccordionTrigger className="text-sm font-medium hover:bg-accent/10">
                                <div className="flex items-center justify-between w-full">
                                  <span>Semester {sem.semester}</span>
                                  <span className="text-muted-foreground text-xs">{sem.subjects.length} subjects</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground pt-2">
                                <ul className="grid sm:grid-cols-2 gap-2 list-disc list-inside">
                                  {sem.subjects.map((subject: string) => (
                                    <li key={subject}>{subject}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-[hsl(276_30%_20%_/_0.3)] flex flex-wrap gap-3">
                      <Button variant="outline" asChild size="sm">
                        <a href={`/documents/curriculum-${program.name.toLowerCase().replace(/\s+/g, '-')}.pdf`} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download Curriculum PDF
                        </a>
                      </Button>
                      <Button variant="outline" className="bg-[#00b0ff]" asChild size="sm">
                        <a href="/contact">
                          <Clock className="h-4 w-4 mr-2" />
                          Admission Inquiry
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 relative">
            <div className="accent-line w-24 mx-auto mb-4" />
            <h2 className="section-heading mb-4">Specializations & Research Areas</h2>
            <p className="section-subheading mx-auto">Choose your focus area and dive deep into cutting-edge technology domains</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 glass-card rounded-xl hover:shadow-lg transition-shadow border border-[hsl(276_30%_20%_/_0.3)]"
              >
                <div className="text-4xl mb-4">{spec.icon}</div>
                <h3 className="font-heading text-lg font-semibold mb-2">{spec.name}</h3>
                <p className="text-sm text-muted-foreground">{spec.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <Card className="glass-card border border-[hsl(276_30%_20%_/_0.3)]">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-heading font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Research Papers Published</div>
                </div>
                <Separator orientation="vertical" className="mx-auto md:mx-0" />
                <div>
                  <div className="text-4xl font-heading font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Industry Projects</div>
                </div>
                <Separator orientation="vertical" className="mx-auto md:mx-0" />
                <div>
                  <div className="text-4xl font-heading font-bold text-primary mb-2">95%+</div>
                  <div className="text-muted-foreground">Placement Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden" style={{ background: '#00b0ff' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00b0ff4d_0%,_transparent_70%)]" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">Ready to Apply?</h2>
            <p className="section-subheading mx-auto mb-8" style={{ color: 'hsl(270 100% 96% / 0.8)' }}>
              Join our community of innovators and builders. Start your application today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="secondary" className="bg-white text-black dark:bg-black dark:text-white" asChild>
                <a href="/contact">Admission Inquiry</a>
              </Button>
              <Button size="xl" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <a href="/documents/brochure.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download Brochure
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}