import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, MapPin, Mail, Phone, Share2, ArrowRight, CheckCircle, AlertCircle, XCircle, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getEventBySlug, getRelatedEvents } from "@/lib/supabase/events"
import { getRegistrationStatus, getStatusConfig, formatDate, formatTime, cn } from "@/lib/utils"
import { Event, RegistrationType } from "@/types"
import { motion } from "framer-motion"

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  
  if (!event) {
    return { title: "Event Not Found" }
  }

  return {
    title: event.title,
    description: event.short_description,
    openGraph: {
      title: event.title,
      description: event.short_description,
      images: event.banner_image ? [event.banner_image] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.short_description,
      images: event.banner_image ? [event.banner_image] : [],
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const status = getRegistrationStatus(event.event_date, event.registration_deadline)
  const statusConfig = getStatusConfig(status)
  const relatedEvents = await getRelatedEvents(event.category, event.id, 3)
  const isUpcoming = new Date(event.event_date) > new Date()

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.short_description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    }
  }

  const getRegistrationComponent = () => {
    if (!event.registration_enabled || event.registration_type === "none") {
      return (
        <Card className="glass-card border-border">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <XCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Registration Not Available</h3>
              <p className="text-muted-foreground">This event does not require registration or registration is disabled.</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (status === "closed" || status === "completed") {
      return (
        <Card className="glass-card border-border">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {status === "completed" ? "Event Completed" : "Registration Closed"}
              </h3>
              <p className="text-muted-foreground">
                {status === "completed" 
                  ? "This event has already taken place." 
                  : `Registration deadline was ${event.registration_deadline ? formatDate(event.registration_deadline) : "passed"}.`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }

    switch (event.registration_type) {
      case "google-form":
        return <GoogleFormRegistration event={event} />
      case "native":
        return <NativeRegistration event={event} />
      case "external":
        return <ExternalRegistration event={event} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {event.banner_image && (
        <div className="relative aspect-[21/9] max-h-[600px] w-full overflow-hidden">
          <Image
            src={event.banner_image}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="container-custom">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur text-sm px-3 py-1">
                  {event.category}
                </Badge>
                <Badge variant={status === "open" ? "success" : status === "closing-soon" ? "warning" : "destructive"}>
                  {statusConfig.icon} {statusConfig.label}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-custom py-10 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-bold mb-4">About This Event</h2>
              <div className="prose prose-lg max-w-none text-foreground dark:prose-invert">
                {event.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 whitespace-pre-line">{paragraph}</p>
                ))}
              </div>
            </section>

            {event.speaker && (
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Speaker</h2>
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {event.speaker.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{event.speaker}</h3>
                        <p className="text-muted-foreground">Guest Speaker</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {event.registration_enabled && event.registration_type !== "none" && (
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">Registration</h2>
                {getRegistrationComponent()}
              </section>
            )}

            <section>
              <h2 className="text-2xl font-heading font-bold mb-4">Contact Information</h2>
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {event.contact_email && (
                      <a href={`mailto:${event.contact_email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{event.contact_email}</p>
                        </div>
                      </a>
                    )}
                    {event.contact_phone && (
                      <a href={`tel:${event.contact_phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{event.contact_phone}</p>
                        </div>
                      </a>
                    )}
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors sm:col-span-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Venue</p>
                        <p className="font-medium">{event.venue}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="glass-card sticky top-24">
              <CardContent className="pt-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Event Details</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Organizer</dt>
                    <dd className="font-medium">{event.organizer}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="font-medium">{formatDate(event.event_date)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Time</dt>
                    <dd className="font-medium">{formatTime(event.start_time)} - {formatTime(event.end_time)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Venue</dt>
                    <dd className="font-medium">{event.venue}</dd>
                  </div>
                  {event.registration_deadline && (
                    <div>
                      <dt className="text-muted-foreground">Registration Deadline</dt>
                      <dd className="font-medium text-primary">{formatDate(event.registration_deadline)}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium capitalize">{event.category}</dd>
                  </div>
                </dl>

                <Separator className="my-6" />

                <Button onClick={handleShare} variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Event
                </Button>

                {isUpcoming && event.registration_type !== "none" && event.registration_enabled && (
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => {
                      if (event.registration_type === "google-form" && event.google_form_url) {
                        window.open(event.google_form_url, "_blank")
                      } else if (event.registration_type === "external" && event.registration_url) {
                        window.open(event.registration_url, "_blank")
                      }
                    }}
                    disabled={status !== "open"}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {status === "open" ? "Register Now" : "Registration Closed"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {relatedEvents.length > 0 && (
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Related Events</h3>
                  <div className="space-y-4">
                    {relatedEvents.map((relatedEvent) => (
                      <Link key={relatedEvent.id} href={`/events/${relatedEvent.slug}`} className="block">
                        <div className="flex gap-3 group">
                          {relatedEvent.banner_image && (
                            <Image
                              src={relatedEvent.banner_image}
                              alt={relatedEvent.title}
                              width={80}
                              height={60}
                              className="rounded-lg object-cover transition-opacity group-hover:opacity-80"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                              {relatedEvent.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(relatedEvent.event_date)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function GoogleFormRegistration({ event }: { event: Event }) {
  const isEmbedded = event.registration_display_mode === "embedded"

  return (
    <Card className="glass-card border-border">
      <CardContent className="pt-6">
        {isEmbedded && event.google_form_url ? (
          <div className="relative aspect-[4/3] min-h-[500px] rounded-lg overflow-hidden border border-border">
            <iframe
              src={event.google_form_url}
              title={`Registration Form for ${event.title}`}
              className="w-full h-full border-0"
              sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Register via Google Form</h3>
            <p className="text-muted-foreground mb-6">
              Click the button below to open the registration form in a new tab.
            </p>
            {event.google_form_url && (
              <Button size="lg" asChild>
                <a href={event.google_form_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Registration Form
                </a>
              </Button>
            )}
          </div>
        )}
        {isEmbedded && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            If the form doesn't load above,{" "}
            <a href={event.google_form_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              open it in a new tab
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function NativeRegistration({ event }: { event: Event }) {
  return (
    <NativeRegistrationForm eventId={event.id} eventTitle={event.title} />
  )
}

function ExternalRegistration({ event }: { event: Event }) {
  return (
    <Card className="glass-card border-border">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <ExternalLink className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">External Registration</h3>
          <p className="text-muted-foreground mb-6">
            Registration for this event is handled on an external platform.
          </p>
          {event.registration_url && (
            <Button size="lg" asChild>
              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Register on External Site
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema, RegistrationFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { SEMESTERS, SECTIONS } from "@/lib/constants"

function NativeRegistrationForm({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      event_id: eventId,
      semester: "1",
      section: "A",
    },
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      const supabase = createClient()
      const { error } = await supabase.from("registrations").insert(data)

      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "You have already registered for this event" })
        } else {
          throw error
        }
        return
      }

      setIsSuccess(true)
      reset()
      toast.success(`Successfully registered for ${eventTitle}!`)
    } catch (err) {
      console.error("Registration error:", err)
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="glass-card border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
            <p className="text-muted-foreground mb-6">
              You have successfully registered for <strong>{eventTitle}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                {...register("name")}
                placeholder="Enter your full name"
                error={!!formErrors.name}
              />
              {formErrors.name && <p className="text-sm text-destructive">{formErrors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="usn">USN / Student ID *</Label>
              <Input
                {...register("usn")}
                placeholder="Enter your USN"
                error={!!formErrors.usn}
              />
              {formErrors.usn && <p className="text-sm text-destructive">{formErrors.usn.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              error={!!formErrors.email || !!errors.email}
            />
            {formErrors.email && <p className="text-sm text-destructive">{formErrors.email.message}</p>}
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              error={!!formErrors.phone}
            />
            {formErrors.phone && <p className="text-sm text-destructive">{formErrors.phone.message}</p>}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="college">College / Institution *</Label>
              <Input
                {...register("college")}
                placeholder="Enter your college name"
                error={!!formErrors.college}
              />
              {formErrors.college && <p className="text-sm text-destructive">{formErrors.college.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="semester">Semester *</Label>
              <Select
                {...register("semester")}
                onValueChange={(v) => register("semester").onChange({ target: { value: v } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTERS.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="section">Section *</Label>
              <Select
                {...register("section")}
                onValueChange={(v) => register("section").onChange({ target: { value: v } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map((sec) => (
                    <SelectItem key={sec} value={sec}>
                      Section {sec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Registering...
              </>
            ) : (
              "Register Now"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By registering, you agree to receive event-related communications.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}