"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ChevronDown, Award, Trophy, Medal, Star, GraduationCap, Users, FlaskConical, BookOpen, Eye, Edit, Trash2, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, cn } from "@/lib/utils"
import { ACHIEVEMENT_CATEGORIES } from "@/lib/constants"
import { Achievement } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface AchievementsTableProps {
  initialAchievements?: Achievement[]
}

export function AchievementsTable({ initialAchievements }: AchievementsTableProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements || [])
  const [loading, setLoading] = useState(!initialAchievements)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchAchievements = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase.from("achievements").select("*").order("date", { ascending: false })

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter)
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setAchievements(data || [])
    } catch (err) {
      console.error("Failed to fetch achievements:", err)
      toast.error("Failed to load achievements")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement? This action cannot be undone.")) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("achievements").delete().eq("id", id)

      if (error) throw error

      setAchievements(achievements.filter(a => a.id !== id))
      toast.success("Achievement deleted successfully")
    } catch (err) {
      console.error("Failed to delete achievement:", err)
      toast.error("Failed to delete achievement")
    } finally {
      setDeletingId(null)
    }
  }

  const categoryIcons: Record<string, any> = {
    student: GraduationCap,
    faculty: Users,
    research: FlaskConical,
    competition: Trophy,
    certification: Award,
    award: Medal,
    other: Star,
  }

  const categoryColors: Record<string, string> = {
    student: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    faculty: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    research: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    competition: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    certification: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    award: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Achievements Management</h1>
          <p className="text-muted-foreground mt-1">Manage department achievements and awards</p>
        </div>
        <Button asChild>
          <Link href="/admin/achievements/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Link>
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {ACHIEVEMENT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Achievement</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
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
                      <td className="px-4 py-3 text-right"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : achievements.length > 0 ? (
                  achievements.map((achievement) => {
                    const Icon = categoryIcons[achievement.category] || Star
                    return (
                      <tr key={achievement.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: categoryColors[achievement.category]?.replace("bg-", "").replace("text-", "").replace("-800", "").replace("-100", "").replace("dark:", "").replace("/30", "") + "20" }}>
                              <Icon className="h-5 w-5" style={{ color: categoryColors[achievement.category]?.replace("bg-", "").replace("text-", "").replace("-800", "").replace("-100", "").replace("dark:", "").replace("/30", "") }} />
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">{achievement.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <Badge variant="outline" className={categoryColors[achievement.category]}>
                            <Icon className="h-3 w-3 mr-1" />
                            {ACHIEVEMENT_CATEGORIES.find(c => c.value === achievement.category)?.label || achievement.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="text-sm text-muted-foreground">{formatDate(achievement.date)}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deletingId === achievement.id}>
                                {deletingId === achievement.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/achievements/${achievement.id}`} target="_blank">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Public
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/achievements/${achievement.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(achievement.id)}
                                disabled={deletingId === achievement.id}
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
                    <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <Award className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No achievements found</p>
                          <p className="text-sm">Get started by adding your first achievement</p>
                        </div>
                        <Button asChild>
                          <Link href="/admin/achievements/new">Add Achievement</Link>
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