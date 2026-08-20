"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ChevronDown, Mail, Phone, GraduationCap, Award, Eye, Edit, Trash2, MoreHorizontal, Loader2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FACULTY_DESIGNATIONS } from "@/lib/constants"
import { Faculty } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface FacultyTableProps {
  initialFaculty?: Faculty[]
}

export function FacultyTable({ initialFaculty }: FacultyTableProps) {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty || [])
  const [loading, setLoading] = useState(!initialFaculty)
  const [searchQuery, setSearchQuery] = useState("")
  const [designationFilter, setDesignationFilter] = useState("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchFaculty = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase.from("faculty").select("*").order("name", { ascending: true })

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,designation.ilike.%${searchQuery}%,specialization.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
      }

      if (designationFilter !== "all") {
        query = query.eq("designation", designationFilter)
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setFaculty(data || [])
    } catch (err) {
      console.error("Failed to fetch faculty:", err)
      toast.error("Failed to load faculty")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this faculty member? This action cannot be undone.")) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("faculty").delete().eq("id", id)

      if (error) throw error

      setFaculty(faculty.filter(f => f.id !== id))
      toast.success("Faculty member deleted successfully")
    } catch (err) {
      console.error("Failed to delete faculty:", err)
      toast.error("Failed to delete faculty member")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Faculty Management</h1>
          <p className="text-muted-foreground mt-1">Manage department faculty members</p>
        </div>
        <Button asChild>
          <Link href="/admin/faculty/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Link>
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={designationFilter} onValueChange={setDesignationFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Designations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Designations</SelectItem>
                {FACULTY_DESIGNATIONS.map((des) => (
                  <SelectItem key={des} value={des}>{des}</SelectItem>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Faculty</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Designation</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Specialization</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
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
                      <td className="px-4 py-3"><div className="h-4 w-32 bg-muted rounded" /></td>
                      <td className="px-4 py-3 text-right"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : faculty.length > 0 ? (
                  faculty.map((member) => (
                    <tr key={member.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {member.profile_image ? (
                              <img src={member.profile_image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm font-bold text-muted-foreground">
                                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.qualification}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant="outline">{member.designation}</Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-sm text-muted-foreground truncate max-w-xs">{member.specialization}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="h-3.5 w-3.5" />
                            <span className="truncate max-w-xs">{member.email}</span>
                          </div>
                          {member.phone && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>{member.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deletingId === member.id}>
                              {deletingId === member.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/faculty/${member.id}`} target="_blank">
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/faculty/${member.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(member.id)}
                              disabled={deletingId === member.id}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <User className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No faculty members found</p>
                          <p className="text-sm">Get started by adding your first faculty member</p>
                        </div>
                        <Button asChild>
                          <Link href="/admin/faculty/new">Add Faculty</Link>
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