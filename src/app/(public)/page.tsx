import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkles, Target, Users, Award, Calendar, BookOpen, FlaskConical, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { getUpcomingEvents } from "@/lib/supabase/events"
import { getLatestAnnouncements } from "@/lib/supabase/announcements"
import { getFaculty } from "@/lib/supabase/faculty"

export const metadata: Metadata = {
  title: "Department of Computer Science & Engineering",
  description: "Official website of IONITIX - Department of Computer Science & Engineering. Events, announcements, faculty, academics, and more.",
}

const features = [
  { icon: Target, title: "Vision & Mission", description: "Guided by innovation and excellence in computer science education" },
  { icon: Users, title: "Expert Faculty", description: "Learn from industry experts and renowned researchers" },
  { icon: Award, title: "Achievements", description: "Recognized for excellence in research, competitions, and innovation" },
  { icon: BookOpen, title: "Academic Programs", description: "Comprehensive B.Tech, M.Tech, and research programs" },
  { icon: FlaskConical, title: "Modern Labs", description: "State-of-the-art laboratories with cutting-edge technology" },
  { icon: TrendingUp, title: "Industry Partnerships", description: "Strong ties with leading tech companies and organizations" },
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
  const [upcomingEvents, latestAnnouncements, faculty] = await Promise.all([
    getUpcomingEvents(6),
    getLatestAnnouncements(5),
    getFaculty(),
  ])

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient">
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Department of Computer Science & Engineering
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground mb-6 text-balance"
            >
              Innovating.<br />
              <span className="gradient-text">Building.</span><br />
              Shaping the Future.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            >
              Welcome to IONITIX - where technology meets innovation. Join our community of passionate engineers, researchers, and innovators shaping tomorrow's digital landscape.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="xl" asChild>
                <Link href="/events">
                  Explore Events
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/about">
                  Explore Department
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <ArrowRight className="h-6 w-6 text-muted-foreground/50 rotate-90" />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 glass-card rounded-xl"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-heading mb-4">Why Choose IONITIX?</h2>
            <p className="section-subheading mx-auto">Excellence in education, research, and innovation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="section-heading">Upcoming Events</h2>
              <p className="section-subheading mt-2">Don't miss out on our exciting events</p>
            </div>
            <Button variant="outline" asChild className="mt-4 sm:mt-0">
              <Link href="/events">View All Events <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground mb-4">Check back soon for new events!</p>
                <Button asChild>
                  <Link href="/events">Browse All Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="section-heading">Latest Announcements</h2>
              <p className="section-subheading mt-2">Stay updated with department news</p>
            </div>
            <Button variant="outline" asChild className="mt-4 sm:mt-0">
              <Link href="/announcements">View All <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
          
          {latestAnnouncements.length > 0 ? (
            <div className="space-y-4 max-w-3xl">
              {latestAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AnnouncementCard announcement={announcement} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No announcements at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-heading">Faculty Highlights</h2>
            <p className="section-subheading mx-auto">Meet our distinguished faculty members</p>
          </div>
          
          {faculty.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.slice(0, 4).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FacultyCard faculty={member} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">Faculty information coming soon.</p>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/faculty">View All Faculty <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">Ready to Join IONITIX?</h2>
            <p className="section-subheading mx-auto mb-8 text-primary-foreground/80">
              Explore our programs, connect with faculty, and start your journey in computer science & engineering.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/academics">Explore Programs</Link>
              </Button>
              <Button size="xl" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function EventCard({ event }: { event: any }) {
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  
  return (
    <Link href={`/events/${event.slug}`} className="block group">
      <Card className="h-full glass-card card-hover overflow-hidden group">
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
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.short_description}</p>
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

function AnnouncementCard({ announcement }: { announcement: any }) {
  return (
    <Card className="glass-card hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-sm">📢</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground mb-1">{announcement.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{announcement.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FacultyCard({ faculty }: { faculty: any }) {
  return (
    <Card className="glass-card text-center">
      <CardContent className="p-5">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-muted flex items-center justify-center">
          {faculty.profile_image ? (
            <img src={faculty.profile_image} alt={faculty.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-muted-foreground">
              {faculty.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <h4 className="font-heading font-semibold">{faculty.name}</h4>
        <p className="text-sm text-primary mb-1">{faculty.designation}</p>
        <p className="text-xs text-muted-foreground">{faculty.specialization}</p>
      </CardContent>
    </Card>
  )
}