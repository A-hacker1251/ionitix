import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Radar,
  Brain,
  Trophy,
  GraduationCap,
  Cpu,
  Globe,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "./motion-wrapper"
import { getUpcomingEvents } from "@/lib/supabase/events"
import { getLatestAnnouncements } from "@/lib/supabase/announcements"
import { getFaculty } from "@/lib/supabase/faculty"
import { StatCounter } from "@/components/ui/StatCounter"
import { MagneticWrapper } from "@/components/MagneticWrapper"
import { SectionConnector } from "@/components/SectionConnector"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Department of Computer Science & Engineering",
  description:
    "Official website of IONITIX - Department of Computer Science & Engineering. Events, announcements, faculty, academics, and more.",
}

const features = [
  {
    icon: Radar,
    title: "Vision & Mission",
    description:
      "Guided by innovation and excellence in computer science education",
  },
  {
    icon: Brain,
    title: "Expert Faculty",
    description:
      "Learn from industry experts and renowned researchers",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description:
      "Recognized for excellence in research, competitions, and innovation",
  },
  {
    icon: GraduationCap,
    title: "Academic Programs",
    description:
      "Comprehensive B.Tech, M.Tech, and research programs",
  },
  {
    icon: Cpu,
    title: "Modern Labs",
    description:
      "State-of-the-art laboratories with cutting-edge technology",
  },
  {
    icon: Globe,
    title: "Industry Partnerships",
    description:
      "Strong ties with leading tech companies and organizations",
  },
]

const stats = [
  { label: "Students", value: "2,500+" },
  { label: "Faculty", value: "80+" },
  { label: "Programs", value: "8+" },
  { label: "Labs", value: "12+" },
  { label: "Placements", value: "95%+" },
  { label: "Research Papers", value: "500+" },
]

export default async function HomePage() {
  const [upcomingEvents, latestAnnouncements, faculty] =
    await Promise.all([
      getUpcomingEvents(6),
      getLatestAnnouncements(5),
      getFaculty(),
    ])

  return (
    <div className="flex flex-col">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(199_100%_50%_/_0.04)_0%,_transparent_70%)]" />
        <div className="circuit-bg" aria-hidden="true" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <source src="/IMG_6317.MP4" type="video/mp4" />
        </video>
        <div className="hero-scan" aria-hidden="true" />
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25,
              }}
              className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground mb-6 text-balance"
            >
              Innovating.
              <br />
              <span className="gradient-text">Building.</span>
              <br />
              Shaping the Future.
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.55,
              }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            >
              Welcome to IONITIX - where technology meets innovation.
              Join our community of passionate engineers, researchers,
              and innovators shaping tomorrow's digital landscape.
            </MotionP>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.7,
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticWrapper>
                <Button size="xl" asChild className="btn-ripple">
                  <Link href="/events">
                    Explore Events
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </MagneticWrapper>

              <MagneticWrapper>
                <Button size="xl" variant="outline" asChild className="btn-ripple">
                  <Link href="/about">
                    Explore Department
                  </Link>
                </Button>
              </MagneticWrapper>
            </MotionDiv>

          </div>
        </div>

        <MotionDiv
          className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{
            opacity: { delay: 0.95, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          aria-hidden="true"
        >
          <ArrowRight className="h-6 w-6 text-primary/30 rotate-90" />
        </MotionDiv>
      </section>

      <SectionConnector />

      {/* STATS */}
      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {stats.map((stat, index) => (
              <MotionDiv
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-item"
              >
                <StatCounter
                  value={stat.value}
                  className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-2"
                />
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <SectionConnector />

      {/* FEATURES */}
      <section className="section-padding bg-[#00B0FF] dark:bg-secondary/50">
        <div className="container-custom">

          <div className="text-center max-w-2xl mx-auto mb-16 relative">
            <div className="accent-line w-24 mx-auto mb-6" />
            <h2 className="section-heading mb-4">
              Why Choose IONITIX?
            </h2>

            <p className="section-subheading mx-auto">
              Excellence in education, research, and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass-card card-hover border border-primary/20 border-trace">
                  <CardContent className="p-6">

                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <div className="icon-hover-scale">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-semibold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>

                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>

        </div>
      </section>

      <SectionConnector />

{/* EVENTS */}
      <section className="section-padding section-gradient">
        <div className="container-custom">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="relative">
              <div className="accent-line w-24 mb-4" />
              <h2 className="section-heading">
                Upcoming Events
              </h2>

              <p className="section-subheading mt-2">
                Don't miss out on our exciting events
              </p>
            </div>

            <Button
              variant="outline"
              asChild
              className="mt-4 sm:mt-0"
            >
              <Link href="/events">
                View All Events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <MotionDiv
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center py-12 border border-[hsl(276_30%_20%_/_0.3)]">
              <CardContent>
                <Calendar className="h-12 w-12 mx-auto text-primary/30 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Upcoming Events
                </h3>

                <p className="text-muted-foreground mb-4">
                  Check back soon for new events!
                </p>

                <Button asChild>
                  <Link href="/events">Browse All Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}

        </div>
      </section>

      <SectionConnector />

      {/* ANNOUNCEMENTS */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="relative">
              <div className="accent-line w-24 mb-4" />
              <h2 className="section-heading">
                Latest Announcements
              </h2>

              <p className="section-subheading mt-2">
                Stay updated with department news
              </p>
            </div>

            <Button
              variant="outline"
              asChild
              className="mt-4 sm:mt-0"
            >
              <Link href="/announcements">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {latestAnnouncements.length > 0 ? (
            <div className="space-y-4 max-w-3xl">
              {latestAnnouncements.map((announcement, index) => (
                <MotionDiv
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AnnouncementCard announcement={announcement} />
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center py-12 border border-[hsl(276_30%_20%_/_0.3)]">
              <CardContent>
                <p className="text-muted-foreground">
                  No announcements at the moment.
                </p>
              </CardContent>
            </Card>
          )}

        </div>
      </section>

      <SectionConnector />

      {/* FACULTY */}
      <section className="section-padding section-gradient">
        <div className="container-custom">

          <div className="text-center max-w-2xl mx-auto mb-12 relative">
            <div className="accent-line w-24 mx-auto mb-4" />
            <h2 className="section-heading">
              Faculty Highlights
            </h2>

            <p className="section-subheading mx-auto">
              Meet our distinguished faculty members
            </p>
          </div>

          {faculty.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.slice(0, 4).map((member, index) => (
                <MotionDiv
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FacultyCard faculty={member} />
                </MotionDiv>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center py-12 border border-[hsl(276_30%_20%_/_0.3)]">
              <CardContent>
                <p className="text-muted-foreground">
                  Faculty information coming soon.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/faculty">
                View All Faculty
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

        </div>
      </section>

      <SectionConnector />

      {/* CTA */}
      <section className="section-padding relative overflow-hidden bg-[#00B0FF] dark:bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3)_0%,_transparent_70%)]" />
        <div className="container-custom text-center relative z-10">

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">
              Ready to Join IONITIX?
            </h2>

            <p className="section-subheading mx-auto mb-8 text-primary-foreground/80">
              Explore our programs, connect with faculty, and start your journey in computer science & engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-black dark:bg-black dark:text-white"
                asChild
              >
                <Link href="/academics">
                  Explore Programs
                </Link>
              </Button>

              <Button
                size="xl"
                variant="outline"
                className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>

          </MotionDiv>

        </div>
      </section>

    </div>
  )
}

/* EVENT CARD */

function EventCard({ event }: { event: any }) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  return (
    <Link
      href={`/events/${event.slug}`}
      className="block group"
    >
      <Card className="h-full glass-card card-hover overflow-hidden group border border-primary/20 border-trace">

        {event.banner_image && (
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={event.banner_image}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground">
                {event.category}
              </span>
            </div>
          </div>
        )}

        <CardContent className="p-5">

          <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {event.short_description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{formatDate(event.event_date)}</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}

/* ANNOUNCEMENT CARD */

function AnnouncementCard({
  announcement,
}: {
  announcement: any
}) {
  return (
    <Card className="glass-card hover:shadow-md transition-shadow border border-primary/20 border-trace">
      <CardContent className="p-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-sm">
              📢
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground mb-1">
              {announcement.title}
            </h4>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {announcement.description}
            </p>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}

/* FACULTY CARD */

function FacultyCard({
  faculty,
}: {
  faculty: any
}) {
  return (
    <Card className="glass-card text-center card-hover border border-primary/20 border-trace">
      <CardContent className="p-5">

        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-secondary flex items-center justify-center ring-2 ring-primary/20">

          {faculty.profile_image ? (
            <img
              src={faculty.profile_image}
              alt={faculty.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-muted-foreground">
              {faculty.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          )}

        </div>

        <h4 className="font-heading font-semibold">
          {faculty.name}
        </h4>

        <p className="text-sm text-primary mb-1">
          {faculty.designation}
        </p>

        <p className="text-xs text-muted-foreground">
          {faculty.specialization}
        </p>

      </CardContent>
    </Card>
  )
}