"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Mail, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, formatDateTime } from "@/lib/utils"
import { getRegistrations } from "@/lib/supabase/registrations"
import Link from "next/link"

export async function RecentRegistrationsTable() {
  const registrationsData = await getRegistrations(undefined, { limit: 5, sortBy: "created_at", sortOrder: "desc" })
  const registrations = registrationsData.data

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Registrations</CardTitle>
        <Button asChild size="sm" variant="outline">
          <Link href="/admin/registrations">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Event</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Semester</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registrations.length > 0 ? (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          {reg.name}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5" />
                          {reg.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm font-medium">{reg.event_id.slice(0, 8)}...</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Badge variant="outline">Sem {reg.semester} - {reg.section}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{formatDateTime(reg.created_at)}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4" />
                              Email: {reg.email}
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4" />
                              USN: {reg.usn}
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              Registered: {formatDateTime(reg.created_at)}
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border">
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href="/admin/registrations">View All Registrations</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}