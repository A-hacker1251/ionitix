import { Metadata } from "next"
import { Suspense } from "react"
import { ContactForm } from "@/components/contact/contact-form"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Users,
  Image as ImageIcon,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Building2,
  GraduationCap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import Link from "next/link"

import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionA,
} from "../motion-wrapper"

export const metadata: Metadata = {
  title: "Contact Us - IONITIX",
  description:
    "Get in touch with IONITIX Department of Computer Science & Engineering. We'd love to hear from you.",
}

export const dynamic = "force-dynamic"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: [
      {
        label: "General Inquiries",
        value: "info@ionitix.edu",
      },
      {
        label: "Admissions",
        value: "admissions@ionitix.edu",
      },
      {
        label: "Placements",
        value: "placements@ionitix.edu",
      },
      {
        label: "Research",
        value: "research@ionitix.edu",
      },
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      {
        label: "Department Office",
        value: "+91 XXXX XXXXXX",
      },
      {
        label: "Admissions Helpline",
        value: "+91 XXXX XXXXXX",
      },
      {
        label: "Placement Cell",
        value: "+91 XXXX XXXXXX",
      },
    ],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      {
        label: "Address",
        value:
          "Department of Computer Science & Engineering",
      },
      {
        label: "",
        value: "University Campus, Main Building",
      },
      {
        label: "",
        value: "City, State - PIN CODE",
      },
      {
        label: "",
        value: "India",
      },
    ],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      {
        label: "Monday - Friday",
        value: "9:00 AM - 5:00 PM",
      },
      {
        label: "Saturday",
        value: "9:00 AM - 1:00 PM",
      },
      {
        label: "Sunday",
        value: "Closed",
      },
      {
        label: "Holidays",
        value: "As per University Calendar",
      },
    ],
  },
]

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/ionitix",
    label: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/ionitix",
    label: "Twitter",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/school/ionitix",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@ionitix",
    label: "YouTube",
  },
]

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <div className="min-h-screen bg-background">

        {/* HERO */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <Badge
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Contact Us
                </Badge>
              </MotionDiv>

              <MotionH1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="section-heading mb-4"
              >
                Get in Touch
              </MotionH1>

              <MotionP
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="section-subheading mx-auto"
              >
                Have questions? We'd love to hear from you.
                Send us a message and we'll respond as soon
                as possible.
              </MotionP>

            </div>
          </div>
        </section>

        {/* CONTACT INFORMATION */}
        <section className="section-padding bg-background">
          <div className="container-custom">

            <div className="grid lg:grid-cols-4 gap-8 mb-12">

              {contactInfo.map((info, index) => {
                const Icon = info.icon

                return (
                  <MotionDiv
                    key={info.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="p-6 glass-card rounded-xl h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="font-heading font-semibold text-lg mb-4">
                      {info.title}
                    </h3>

                    <div className="space-y-2">

                      {info.details.map((detail, i) => {

                        const isEmail =
                          detail.value.includes("@")

                        const isPhone =
                          detail.value.includes("+91")

                        const href = isEmail
                          ? `mailto:${detail.value}`
                          : isPhone
                          ? `tel:${detail.value}`
                          : undefined

                        return (
                          <div
                            key={i}
                            className="flex items-start gap-3"
                          >

                            {detail.label && (
                              <span className="text-sm font-medium text-foreground min-w-[120px]">
                                {detail.label}
                              </span>
                            )}

                            {href ? (
                              <a
                                href={href}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors break-words"
                              >
                                {detail.value}
                              </a>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                {detail.value}
                              </span>
                            )}

                          </div>
                        )
                      })}

                    </div>
                  </MotionDiv>
                )
              })}

            </div>

            {/* MESSAGE + LOCATION */}
            <div className="grid lg:grid-cols-2 gap-8">

              {/* CONTACT FORM */}
              <div>
                <h2 className="section-heading mb-6">
                  Send Us a Message
                </h2>

                <ContactForm />
              </div>

              {/* LOCATION */}
              <div>

                <Card className="glass-card h-full">

                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">

                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">

                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0!2d72.0!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAwJzAwLjQiTiA3MsKwMDA'MDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{
                          border: 0,
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="IONITIX Department Location"
                      />

                    </div>

                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">

                      <h4 className="font-semibold mb-2">
                        Directions
                      </h4>

                      <p className="text-sm text-muted-foreground">
                        The department is located in the Main
                        Building of the University Campus.
                        Enter through Gate No. 2 and follow
                        signs for the Computer Science Block.
                        Parking available at the visitor
                        parking lot.
                      </p>

                    </div>

                  </CardContent>
                </Card>

                {/* QUICK LINKS */}
                <Card className="glass-card mt-6">

                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Quick Links
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">

                    <div className="grid sm:grid-cols-2 gap-3">

                      <Link
                        href="/academics"
                        className="p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all group"
                      >
                        <GraduationCap className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />

                        <p className="font-medium">
                          Admissions
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Programs & Applications
                        </p>
                      </Link>

                      <Link
                        href="/events"
                        className="p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all group"
                      >
                        <Calendar className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />

                        <p className="font-medium">
                          Events
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Upcoming Events
                        </p>
                      </Link>

                      <Link
                        href="/faculty"
                        className="p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all group"
                      >
                        <Users className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />

                        <p className="font-medium">
                          Faculty
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Meet Our Team
                        </p>
                      </Link>

                      <Link
                        href="/gallery"
                        className="p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all group"
                      >
                        <ImageIcon className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />

                        <p className="font-medium">
                          Gallery
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Campus Life
                        </p>
                      </Link>

                    </div>

                  </CardContent>
                </Card>

              </div>

            </div>

          </div>
        </section>

        {/* SOCIAL MEDIA */}
        <section className="section-padding bg-muted/30">

          <div className="container-custom">

            <div className="text-center mb-12">

              <h2 className="section-heading mb-4">
                Connect With Us
              </h2>

              <p className="section-subheading mx-auto">
                Follow us on social media for the latest updates
              </p>

            </div>

            <div className="flex justify-center gap-6">

              {socialLinks.map((social, index) => {
                const Icon = social.icon

                return (
                  <MotionA
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                    aria-label={social.label}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </MotionA>
                )
              })}

            </div>

          </div>

        </section>

      </div>
    </Suspense>
  )
}