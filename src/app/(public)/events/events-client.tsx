"use client"

import { useState, useEffect } from "react"
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

interface EventsClientProps {
  initialEventsData: any
  categories: string[]
  query: string
  category: string
  status: string
  page: number
}

export function EventsClient({ initialEventsData, categories, query, category, status, page }: EventsClientProps) {
  const [eventsData, setEventsData] = useState(initialEventsData)
  const [searchQuery, setSearchQuery] = useState(query)
  const [categoryFilter, setCategoryFilter] = useState(category)
  const [statusFilter, setStatusFilter] = useState(status)
  const [currentPage, setCurrentPage] = useState(page)
  const [loading, setLoading] = useState(false)
  const [activeCategories, setActiveCategories] = useState(categories)

  const fetchData = async () => {
    setLoading(true)
    try {
      const filters: any = {
        query: searchQuery,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        page: currentPage,
        limit: 12,
      }

      if (statusFilter === "upcoming") {
        filters.dateFrom = new Date().toISOString().split("T")[0]
      } else if (statusFilter === "completed") {
        filters.dateTo = new Date().toISOString().split("T")[0]
      }

      const response = await fetch(`/api/events?${new URLSearchParams(filters).toString()}`)
      const data = await response.json()
      setEventsData(data)
    } catch (err) {
      console.error("Failed to fetch events:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchQuery, categoryFilter, statusFilter, currentPage])

  const handleCategoryChange = (value: string) => {
    const url = new URL(window.location.href)
    if (value === "all") {
      url.searchParams.delete("category")
    } else {
      url.searchParams.set("category", value)
    }
    url.searchParams.delete("page")
    window.location.href = url.toString()
  }

  const handleStatusChange = (value: string) => {
    const url = new URL(window.location.href)
    if (value === "upcoming") {
      url.searchParams.delete("status")
    } else {
      url.searchParams.set("status", value)
    }
    url.searchParams.delete("page")
    window.location.href = url.toString()
  }

  const createUrl = (page: number) => {
    const url = new URL(window.location.href)
    if (searchQuery) url.searchParams.set("query", searchQuery)
    if (categoryFilter !== "all") url.searchParams.set("category", categoryFilter)
    if (statusFilter !== "upcoming") url.searchParams.set("status", statusFilter)
    if (page > 1) url.searchParams.set("page", page.toString())
    else url.searchParams.delete("page")
    return url.toString()
  }

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

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => {
                    const url = new URL(window.location.href)
                    url.searchParams.set("query", e.target.value)
                    url.searchParams.delete("page")
                    window.location.href = url.toString()
                  }}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(value) => {
                const url = new URL(window.location.href)
                if (value === "all") {
                  url.searchParams.delete("category")
                } else {
                  url.searchParams.set("category", value)
                }
                url.searchParams.delete("page")
                window.location.href = url.toString()
              }}>
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
              <Select value={statusFilter} onValueChange={(value) => {
                const url = new URL(window.location.href)
                if (value === "upcoming") {
                  url.searchParams.delete("status")
                } else {
                  url.searchParams.set("status", value)
                }
                url.searchParams.delete("page")
                window.location.href = url.toString()
              }}>
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
              <span>Showing {eventsData?.data?.length || 0} of {eventsData?.total || 0} events</span>
            </div>
          </div>

          {eventsData?.data?.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.data.map((event: any, index: number) => (
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
      <button
        disabled={currentPage === 1}
        onClick={() => window.location.href = createUrl(currentPage - 1)}
        className="inline-flex items-center gap-2 rounded-lg border border-[hsl(276_30%_20%_/_0.4)] bg-secondary px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 hover:bg-secondary/80 transition-colors"
      >
        <ChevronDown className="h-4 w-4 rotate-180" />
        Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum: number
          if (totalPages <= 5) pageNum = i + 1
          else if (currentPage <= 3) pageNum = i + 1
          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
          else pageNum = currentPage - 2 + i

          return (
            <button
              key={pageNum}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border ${
                pageNum === currentPage
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary hover:bg-secondary/80 border-[hsl(276_30%_20%_/_0.4)]"
              }`}
              onClick={() => window.location.href = createUrl(pageNum)}
            >
              {pageNum}
            </button>
          )
        })}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => window.location.href = createUrl(currentPage + 1)}
        className="inline-flex items-center gap-2 rounded-lg border border-[hsl(276_30%_20%_/_0.4)] bg-secondary px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 hover:bg-secondary/80 transition-colors"
      >
        Next
        <ChevronDown className="h-4 w-4" />
      </button>
    </nav>
  )
}

function EmptyState({ title, description, action }: { title: string; description: string; action?: { label: string; href: string } }) {
  return (
    <div className="text-center py-16">
      <Calendar className="h-16 w-16 mx-auto text-primary/30 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {action && (
        <button
          onClick={() => window.location.href = action.href}
          className="inline-flex items-center justify-center rounded-lg border border-[hsl(276_30%_20%_/_0.4)] bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}