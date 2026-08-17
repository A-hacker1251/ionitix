import { Metadata } from "next"
import { Search, Filter, ChevronDown, Calendar, Clock, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EventCard, EventCardSkeleton } from "@/components/events/event-card"
import { getEvents, getEventCategories } from "@/lib/supabase/events"
import { EVENT_CATEGORIES } from "@/lib/constants"
import { SearchFilters } from "@/types"
import { motion } from "framer-motion"

export const metadata: Metadata = {
  title: "Events",
  description: "Explore upcoming workshops, hackathons, seminars, competitions, and conferences at IONITIX",
}

interface EventsPageProps {
  searchParams: Promise<{
    query?: string
    category?: string
    status?: string
    page?: string
  }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const query = params.query || ""
  const category = params.category || "all"
  const status = params.status || "upcoming"
  const page = parseInt(params.page || "1")

  const filters: SearchFilters = {
    query,
    category: category !== "all" ? category as any : undefined,
    page,
    limit: 12,
  }

  if (status === "upcoming") {
    filters.dateFrom = new Date().toISOString().split("T")[0]
  } else if (status === "completed") {
    filters.dateTo = new Date().toISOString().split("T")[0]
  }

  const [eventsData, categories] = await Promise.all([
    getEvents(filters),
    getEventCategories(),
  ])

  const activeCategories = [...new Set([...EVENT_CATEGORIES.map(c => c.value), ...categories])]

  return (
    <div className="min-h-screen bg-background">
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="section-heading mb-4">Events</h1>
            <p className="section-subheading mx-auto">
              Discover workshops, hackathons, seminars, and more. Join our community of innovators and builders.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={query}
                  onChange={(e) => {
                    const url = new URL(window.location.href)
                    url.searchParams.set("query", e.target.value)
                    url.searchParams.delete("page")
                    window.location.href = url.toString()
                  }}
                  className="pl-10"
                />
              </div>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {activeCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {EVENT_CATEGORIES.find(c => c.value === cat)?.label || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Upcoming" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {eventsData.data.length} of {eventsData.total} events</span>
            </div>
          </div>

          {eventsData.data.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.data.map((event, index) => (
                  <EventCard key={event.id} event={event} priority={index < 3} />
                ))}
              </div>

              {eventsData.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={eventsData.totalPages}
                  baseParams={{ query, category, status }}
                />
              )}
            </>
          ) : (
            <EmptyState
              title="No Events Found"
              description={query || category !== "all" ? "Try adjusting your search or filters" : "No events scheduled at the moment. Check back soon!"}
              action={{ label: "Clear Filters", href: "/events" }}
            />
          )}
        </div>
      </section>
    </div>
  )
}

function handleCategoryChange(value: string) {
  const url = new URL(window.location.href)
  if (value === "all") {
    url.searchParams.delete("category")
  } else {
    url.searchParams.set("category", value)
  }
  url.searchParams.delete("page")
  window.location.href = url.toString()
}

function handleStatusChange(value: string) {
  const url = new URL(window.location.href)
  if (value === "upcoming") {
    url.searchParams.delete("status")
  } else {
    url.searchParams.set("status", value)
  }
  url.searchParams.delete("page")
  window.location.href = url.toString()
}

function Pagination({ currentPage, totalPages, baseParams }: { currentPage: number; totalPages: number; baseParams: Record<string, string> }) {
  const createUrl = (page: number) => {
    const url = new URL(window.location.href)
    Object.entries(baseParams).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value)
    })
    if (page > 1) url.searchParams.set("page", page.toString())
    else url.searchParams.delete("page")
    return url.toString()
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => window.location.href = createUrl(currentPage - 1)}
      >
        <ChevronDown className="h-4 w-4 rotate-180" />
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum: number
          if (totalPages <= 5) pageNum = i + 1
          else if (currentPage <= 3) pageNum = i + 1
          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
          else pageNum = currentPage - 2 + i

          return (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => window.location.href = createUrl(pageNum)}
            >
              {pageNum}
            </Button>
          )
        })}
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => window.location.href = createUrl(currentPage + 1)}
      >
        Next
        <ChevronDown className="h-4 w-4" />
      </Button>
    </nav>
  )
}

function EmptyState({ title, description, action }: { title: string; description: string; action?: { label: string; href: string } }) {
  return (
    <div className="text-center py-16">
      <Calendar className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {action && (
        <Button variant="outline" asChild>
          <a href={action.href}>{action.label}</a>
        </Button>
      )}
    </div>
  )
}