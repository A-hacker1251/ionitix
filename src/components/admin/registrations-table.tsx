"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, Calendar, Download, Loader2, Eye, User, Mail, Phone, GraduationCap, Building2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, formatTime, cn } from "@/lib/utils"
import { Registration, Event } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface RegistrationsTableProps {
  initialRegistrations?: Registration[]
  initialEvents?: Event[]
}

export function RegistrationsTable({ initialRegistrations, initialEvents }: RegistrationsTableProps) {
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations || [])
  const [events, setEvents] = useState<Event[]>(initialEvents || [])
  const [loading, setLoading] = useState(!initialRegistrations)
  const [searchQuery, setSearchQuery] = useState("")
  const [eventFilter, setEventFilter] = useState("all")
  const [dateFromFilter, setDateFromFilter] = useState("")
  const [dateToFilter, setDateToFilter] = useState("")
  const [exporting, setExporting] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      // Fetch events for filter dropdown
      const { data: eventsData } = await (supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false }) as any)
      setEvents(eventsData || [])

      // Fetch registrations
      let query = supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,usn.ilike.%${searchQuery}%,college.ilike.%${searchQuery}%`)
      }

      if (eventFilter !== "all") {
        query = query.eq("event_id", eventFilter)
      }

      if (dateFromFilter) {
        query = query.gte("created_at", dateFromFilter)
      }

      if (dateToFilter) {
        query = query.lte("created_at", dateToFilter + "T23:59:59")
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setRegistrations(data || [])
    } catch (err) {
      console.error("Failed to fetch registrations:", err)
      toast.error("Failed to load registrations")
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      const headers = [
        "Event",
        "Name",
        "USN",
        "Email",
        "Phone",
        "Semester",
        "Section",
        "College",
        "Registered At",
      ]

      const rows = registrations.map((reg) => {
        const event = events.find(e => e.id === reg.event_id)
        return [
          event?.title || "Unknown Event",
          reg.name,
          reg.usn,
          reg.email,
          reg.phone,
          reg.semester,
          reg.section,
          reg.college,
          formatDate(reg.created_at),
        ]
      })

      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `registrations-${formatDate(new Date().toISOString())}.csv`
      link.click()
      URL.revokeObjectURL(link.href)

      toast.success("Registrations exported successfully")
    } catch (err) {
      console.error("Failed to export registrations:", err)
      toast.error("Failed to export registrations")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Registrations Management</h1>
          <p className="text-muted-foreground mt-1">View and manage event registrations</p>
        </div>
        <Button variant="outline" onClick={handleExport} disabled={exporting || registrations.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          {exporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search registrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
                placeholder="From Date"
                className="w-[160px]"
              />
              <Input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
                placeholder="To Date"
                className="w-[160px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">USN</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Sem/Sec</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">College</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3"><div className="h-4 w-32 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-20 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-32 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden xl:table-cell"><div className="h-4 w-16 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden xl:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded" /></td>
                    </tr>
                  ))
                ) : registrations.length > 0 ? (
                  registrations.map((reg) => {
                    const event = events.find(e => e.id === reg.event_id)
                    return (
                      <tr key={reg.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium truncate max-w-xs">{event?.title || "Unknown Event"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{reg.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="font-mono text-sm">{reg.usn}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="truncate max-w-xs">{reg.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{reg.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell">
                          <div className="flex items-center gap-1 text-sm">
                            <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>Sem {reg.semester}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>Sec {reg.section}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell">
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{reg.college}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{formatDate(reg.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatTime(reg.created_at)}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <User className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No registrations found</p>
                          <p className="text-sm">Registrations will appear here when students register for events</p>
                        </div>
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