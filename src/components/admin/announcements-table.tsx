"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ChevronDown, Calendar, Tag, Eye, Edit, Trash2, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, cn } from "@/lib/utils"
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/constants"
import { Announcement } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface AnnouncementsTableProps {
  initialAnnouncements?: Announcement[]
}

export function AnnouncementsTable({ initialAnnouncements }: AnnouncementsTableProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements || [])
  const [loading, setLoading] = useState(!initialAnnouncements)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [publishedFilter, setPublishedFilter] = useState("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchAnnouncements = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase.from("announcements").select("*").order("published_at", { ascending: false })

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter)
      }

      if (publishedFilter !== "all") {
        query = query.eq("published", publishedFilter === "published")
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setAnnouncements(data || [])
    } catch (err) {
      console.error("Failed to fetch announcements:", err)
      toast.error("Failed to load announcements")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [searchQuery, categoryFilter, publishedFilter])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement? This action cannot be undone.")) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("announcements").delete().eq("id", id)

      if (error) throw error

      setAnnouncements(announcements.filter(a => a.id !== id))
      toast.success("Announcement deleted successfully")
    } catch (err) {
      console.error("Failed to delete announcement:", err)
      toast.error("Failed to delete announcement")
    } finally {
      setDeletingId(null)
    }
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const supabase = createClient()
      const { error } = await (supabase
        .from("announcements")
        .update({
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id) as any)

      if (error) throw error

      setAnnouncements(announcements.map(a =>
        a.id === id ? { ...a, published: !currentStatus, published_at: !currentStatus ? new Date().toISOString() : undefined } : a
      ))
      toast.success(`Announcement ${!currentStatus ? "published" : "unpublished"} successfully`)
    } catch (err) {
      console.error("Failed to toggle published status:", err)
      toast.error("Failed to update status")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Announcements Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage department announcements</p>
        </div>
        <Button asChild>
          <Link href="/admin/announcements/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Announcement
          </Link>
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
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
                {ANNOUNCEMENT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={publishedFilter} onValueChange={setPublishedFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Announcement</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Published</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3"><div className="h-4 w-48 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 text-right"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <tr key={announcement.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{announcement.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{announcement.description}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant="outline" className="text-capitalize">{announcement.category || "general"}</Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{announcement.published_at ? formatDate(announcement.published_at) : "Not published"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={announcement.published ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"}>
                          {announcement.published ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deletingId === announcement.id}>
                              {deletingId === announcement.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/announcements/${announcement.slug}`} target="_blank">
                                <Eye className="h-4 w-4 mr-2" />
                                View Public
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/announcements/${announcement.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleTogglePublished(announcement.id, announcement.published)}
                              className="focus:text-primary"
                            >
                              {announcement.published ? (
                                <>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(announcement.id)}
                              disabled={deletingId === announcement.id}
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
                        <Tag className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No announcements found</p>
                          <p className="text-sm">Get started by creating your first announcement</p>
                        </div>
                        <Button asChild>
                          <Link href="/admin/announcements/new">Create Announcement</Link>
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