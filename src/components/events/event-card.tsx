"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ExternalLink, ArrowRight } from "lucide-react"
import { cn, formatDate, getRegistrationStatus, getStatusConfig } from "@/lib/utils"
import { Event } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface EventCardProps {
  event: Event
  variant?: "default" | "compact" | "featured"
  priority?: boolean
}

export function EventCard({ event, variant = "default", priority = false }: EventCardProps) {
  const status = getRegistrationStatus(event.event_date, event.registration_deadline)
  const statusConfig = getStatusConfig(status)
  const eventDate = new Date(event.event_date)
  const isUpcoming = eventDate > new Date()

  if (variant === "compact") {
    return (
      <Link href={`/events/${event.slug}`} className="group flex gap-4 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
        {event.banner_image && (
          <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={event.banner_image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="112px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs">{event.category}</Badge>
            <Badge variant={status === "open" ? "success" : status === "closing-soon" ? "warning" : "destructive"} className="text-xs">
              {statusConfig.icon} {statusConfig.label}
            </Badge>
          </div>
          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{event.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(event.event_date)}</span>
            <MapPin className="h-3 w-3" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <Link href={`/events/${event.slug}`} className="group block">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-xl bg-card glass-card card-hover"
        >
          {event.banner_image && (
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={event.banner_image}
                alt={event.title}
                fill
                priority={priority}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur">{event.category}</Badge>
                <Badge variant={status === "open" ? "success" : status === "closing-soon" ? "warning" : "destructive"}>
                  {statusConfig.icon} {statusConfig.label}
                </Badge>
              </div>
            </div>
          )}
          <div className="p-5">
            <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.short_description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDate(event.event_date)}</span>
                {event.start_time && (
                  <>
                    <span className="text-muted-foreground/50">·</span>
                    <Clock className="h-4 w-4" />
                    <span>{event.start_time} - {event.end_time}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>
            {event.registration_enabled && event.registration_type !== "none" && (
              <Button className="w-full mt-4" variant={status === "open" ? "default" : "outline"} disabled={status !== "open"}>
                {status === "open" ? "Register Now" : status === "closing-soon" ? "Closing Soon" : status === "closed" ? "Registration Closed" : "Event Completed"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.article>
      </Link>
    )
  }

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-xl bg-card glass-card card-hover h-full flex flex-col"
      >
        {event.banner_image && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={event.banner_image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur">{event.category}</Badge>
              <Badge variant={status === "open" ? "success" : status === "closing-soon" ? "warning" : "destructive"}>
                {statusConfig.icon} {statusConfig.label}
              </Badge>
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col p-5">
          <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{event.short_description}</p>
          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{formatDate(event.event_date)}</span>
            </div>
            {event.start_time && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{event.start_time} - {event.end_time}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
          {event.registration_enabled && event.registration_type !== "none" && (
            <Button className="w-full mt-4" variant={status === "open" ? "default" : "outline"} disabled={status !== "open"}>
              {status === "open" ? "View & Register" : status === "closing-soon" ? "Closing Soon" : status === "closed" ? "Registration Closed" : "Event Completed"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.article>
    </Link>
  )
}

export function EventCardSkeleton({ variant = "default" }: { variant?: "default" | "featured" }) {
  if (variant === "featured") {
    return (
      <div className="relative overflow-hidden rounded-xl bg-card glass-card animate-pulse">
        <div className="aspect-video w-full bg-muted" />
        <div className="p-5 space-y-4">
          <div className="h-6 w-3/4 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded mt-4" />
        </div>
      </div>
    )
  }
  return (
    <article className="relative overflow-hidden rounded-xl bg-card glass-card animate-pulse h-full flex flex-col">
      <div className="aspect-video w-full bg-muted" />
      <div className="flex-1 flex flex-col p-5 space-y-4">
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="space-y-2 border-t border-border pt-4 mt-auto">
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-4 w-1/3 bg-muted rounded" />
        </div>
        <div className="h-10 w-full bg-muted rounded mt-4" />
      </div>
    </article>
  )
}