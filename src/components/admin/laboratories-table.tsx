"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ChevronDown, FlaskConical, Cpu, Shield, Wifi, Code, Monitor, Database, Eye, Edit, Trash2, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Laboratory } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface LaboratoriesTableProps {
  initialLaboratories?: Laboratory[]
}

export function LaboratoriesTable({ initialLaboratories }: LaboratoriesTableProps) {
  const [laboratories, setLaboratories] = useState<Laboratory[]>(initialLaboratories || [])
  const [loading, setLoading] = useState(!initialLaboratories)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchLaboratories = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase.from("laboratories").select("*").order("name", { ascending: true })

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setLaboratories(data || [])
    } catch (err) {
      console.error("Failed to fetch laboratories:", err)
      toast.error("Failed to load laboratories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLaboratories()
  }, [searchQuery])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this laboratory? This action cannot be undone.")) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("laboratories").delete().eq("id", id)

      if (error) throw error

      setLaboratories(laboratories.filter(l => l.id !== id))
      toast.success("Laboratory deleted successfully")
    } catch (err) {
      console.error("Failed to delete laboratory:", err)
      toast.error("Failed to delete laboratory")
    } finally {
      setDeletingId(null)
    }
  }

  const labIcons: Record<string, any> = {
    "Artificial Intelligence & Machine Learning Lab": Cpu,
    "Cybersecurity & Digital Forensics Lab": Shield,
    "Internet of Things & Embedded Systems Lab": Wifi,
    "High Performance Computing & Cloud Lab": Database,
    "Software Engineering & DevOps Lab": Code,
    "Data Science & Analytics Lab": Monitor,
  }

  const getLabIcon = (name: string) => {
    return labIcons[name] || FlaskConical
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Laboratories Management</h1>
          <p className="text-muted-foreground mt-1">Manage department laboratories</p>
        </div>
        <Button asChild>
          <Link href="/admin/laboratories/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Laboratory
          </Link>
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search laboratories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Laboratory</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Equipment Count</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Technologies</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">In-Charge</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Location</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3"><div className="h-4 w-48 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-32 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 text-right"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : laboratories.length > 0 ? (
                  laboratories.map((lab) => {
                    const Icon = getLabIcon(lab.name)
                    return (
                      <tr key={lab.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{lab.name}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">{lab.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <Badge variant="outline">{lab.equipment?.length || 0} items</Badge>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {lab.technologies?.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                            ))}
                            {(lab.technologies?.length || 0) > 3 && (
                              <Badge variant="outline" className="text-xs">+{(lab.technologies?.length || 0) - 3} more</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{lab.in_charge || "Not assigned"}</p>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="text-sm text-muted-foreground">{lab.location || "Not specified"}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deletingId === lab.id}>
                                {deletingId === lab.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/laboratories/${lab.id}`} target="_blank">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Public
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/laboratories/${lab.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(lab.id)}
                                disabled={deletingId === lab.id}
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
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <FlaskConical className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No laboratories found</p>
                          <p className="text-sm">Get started by adding your first laboratory</p>
                        </div>
                        <Button asChild>
                          <Link href="/admin/laboratories/new">Add Laboratory</Link>
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