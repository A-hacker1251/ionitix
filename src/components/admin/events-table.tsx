"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ChevronDown, Calendar, Clock, MapPin, Eye, Edit, Trash2, MoreHorizontal, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, formatTime, getStatusConfig, cn } from "@/lib/utils"
import { EVENT_CATEGORIES, EVENT_STATUSES } from "@/lib/constants"
import { Event } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface EventsTableProps {
  initialEvents?: Event[]
}

export function EventsTable({ initialEvents }: EventsTableProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents || [])
  const [loading, setLoading] = useState(!initialEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase.from("events").select("*").order("created_at", { ascending: false })

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,venue.ilike.%${searchQuery}%`)
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter)
      }

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter)
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      console.error("Failed to fetch events:", err)
      toast.error("Failed to load events")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [searchQuery, categoryFilter, statusFilter])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("events").delete().eq("id", id)

      if (error) throw error

      setEvents(events.filter(e => e.id !== id))
      toast.success("Event deleted successfully")
    } catch (err) {
      console.error("Failed to delete event:", err)
      toast.error("Failed to delete event")
    } finally {
      setDeletingId(null)
    }
  }

  const statusColors = {
    published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Events Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage department events</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {EVENT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {EVENT_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Venue</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Registration</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3"><div className="h-4 w-48 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-32 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-20 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 text-right"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : events.length > 0 ? (
                  events.map((event) => {
                    const status = getStatusConfig(event.status)
                    return (
                      <tr key={event.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">{event.short_description}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{formatDate(event.event_date)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{event.venue}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-capitalize">{event.category}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={cn(statusColors[event.status as keyof typeof statusColors] || statusColors.draft)}>
                            {status.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <Badge variant="outline" className={event.registration_enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {event.registration_enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deletingId === event.id}>
                                {deletingId === event.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/events/${event.slug}`} target="_blank">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Public
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/events/${event.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/events/${event.id}/registrations`}>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  View Registrations
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(event.id)}
                                disabled={deletingId === event.id}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <Calendar className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No events found</p>
                          <p className="text-sm">Get started by creating your first event</p>
                        </div>
                        <Button asChild>
                          <Link href="/admin/events/new">Create Event</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}