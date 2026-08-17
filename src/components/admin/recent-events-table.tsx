"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Eye, Edit, Trash2, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, formatTime, getStatusConfig } from "@/lib/utils"
import { Event } from "@/types"
import Link from "next/link"
import { getEvents } from "@/lib/supabase/events"

export async function RecentEventsTable() {
  const eventsData = await getEvents({ limit: 5, sortBy: "created_at", sortOrder: "desc" })
  const events = eventsData.data

  const statusColors = {
    published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  }

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Events</CardTitle>
        <Button asChild size="sm">
          <Link href="/admin/events">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatTime(event.start_time)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Badge variant="outline" className={statusColors[event.status as keyof typeof statusColors] || statusColors.draft}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
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
                              <MapPin className="h-4 w-4 mr-2" />
                              View Registrations
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" asChild>
                            <Link href={`/admin/events/${event.id}/delete`}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    No events found. <Button asChild variant="ghost" className="ml-2"><Link href="/admin/events/new">Create your first event</Link></Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border">
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href="/admin/events">View All Events</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}