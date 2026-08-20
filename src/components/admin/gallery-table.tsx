"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ChevronDown, Image as ImageIcon, Eye, Edit, Trash2, MoreHorizontal, Loader2, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate, cn } from "@/lib/utils"
import { GALLERY_CATEGORIES } from "@/lib/constants"
import { GalleryItem } from "@/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

interface GalleryTableProps {
  initialGallery?: GalleryItem[]
}

export function GalleryTable({ initialGallery }: GalleryTableProps) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery || [])
  const [loading, setLoading] = useState(!initialGallery)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const fetchGallery = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase.from("gallery").select("*").order("created_at", { ascending: false })

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%`)
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter)
      }

      const { data, error } = await (query as any)

      if (error) throw error
      setGallery(data || [])
    } catch (err) {
      console.error("Failed to fetch gallery:", err)
      toast.error("Failed to load gallery")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image? This action cannot be undone.")) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("gallery").delete().eq("id", id)

      if (error) throw error

      setGallery(gallery.filter(g => g.id !== id))
      toast.success("Image deleted successfully")
    } catch (err) {
      console.error("Failed to delete image:", err)
      toast.error("Failed to delete image")
    } finally {
      setDeletingId(null)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const supabase = createClient()
      const admin = (await import("@/lib/supabase/admin")).createAdminClient()

      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await admin.storage
          .from("gallery")
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = admin.storage
          .from("gallery")
          .getPublicUrl(filePath)

        const { error: insertError } = await (admin
          .from("gallery")
          .insert({
            title: file.name.replace(/\.[^/.]+$/, ""),
            image_url: publicUrl,
            category: "other",
          }) as any)

        if (insertError) throw insertError
      }

      toast.success(`${files.length} image(s) uploaded successfully`)
      fetchGallery()
    } catch (err) {
      console.error("Failed to upload images:", err)
      toast.error("Failed to upload images")
    } finally {
      setUploading(false)
      event.target.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Gallery Management</h1>
          <p className="text-muted-foreground mt-1">Manage department gallery images</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <Button variant="outline" disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          <Button asChild>
            <Link href="/admin/gallery/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Link>
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gallery..."
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
                {GALLERY_CATEGORIES.map((cat) => (
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3"><div className="h-12 w-16 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-32 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-20 bg-muted rounded" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded" /></td>
                      <td className="px-4 py-3 text-right"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : gallery.length > 0 ? (
                  gallery.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={80}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium truncate max-w-xs">{item.title}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant="outline" className="text-capitalize">{item.category}</Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-sm text-muted-foreground">{item.event_id ? "Linked to event" : "Standalone"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-muted-foreground">{formatDate(item.created_at)}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deletingId === item.id}>
                              {deletingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <a href={item.image_url} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4 mr-2" />
                                View Full Size
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/gallery/${item.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
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
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                        <div>
                          <p className="font-medium">No images found</p>
                          <p className="text-sm">Upload your first image to get started</p>
                        </div>
                        <label className="cursor-pointer">
                          <Button variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Images
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleUpload}
                            className="hidden"
                          />
                        </label>
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