import { Metadata } from "next"
import { Suspense } from "react"
import { getEvents, getEventCategories } from "@/lib/supabase/events"
import { EventsClient } from "./events-client"

export const metadata: Metadata = {
  title: "Events",
  description: "Explore upcoming workshops, hackathons, seminars, competitions, and conferences at IONITIX",
}

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const eventsData = await getEvents({ limit: 12 })
  const categories = await getEventCategories()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <EventsClient
        initialEventsData={eventsData}
        categories={categories}
        query=""
        category="all"
        status="upcoming"
        page={1}
      />
    </Suspense>
  )
}