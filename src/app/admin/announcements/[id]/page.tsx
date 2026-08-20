"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { announcementSchema, AnnouncementFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/constants"
import { Loader2, Save, Eye, Calendar, Image as ImageIcon, Tag } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function AnnouncementFormPage() {
  const router = useRouter()
  const params = useParams()
  const announcementId = params.id as string
  const isEditing = !!announcementId && announcementId !== "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      published: false,
      category: "general",
    },
  })

  const loadAnnouncement = async () => {
    if (!isEditing) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", announcementId)
        .single()

      if (error) throw error

      if (data) {
        setValue("title", data.title)
        setValue("slug", data.slug)
        setValue("description", data.description)
        setValue("image", data.image || "")
        setValue("attachment_url", data.attachment_url || "")
        setValue("published", data.published)
        setValue("category", data.category || "general")

        if (data.image) setImagePreview(data.image)
      }
    } catch (err) {
      console.error("Failed to load announcement:", err)
      toast.error("Failed to load announcement")
      router.back()
    }
  }

  React.useEffect(() => {
    loadAnnouncement()
  }, [isEditing, announcementId])

  const onSubmit = async (data: AnnouncementFormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const payload = {
        ...data,
        image: imagePreview,
        updated_at: new Date().toISOString(),
        published_at: data.published ? new Date().toISOString() : null,
      }

      let result
      if (isEditing) {
        const { data: updated, error } = await supabase
          .from("announcements")
          .update(payload)
          .eq("id", announcementId)
          .select()
          .single()
        if (error) throw error
        result = updated
      } else {
        const { data: created, error } = await supabase
          .from("announcements")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw error
        result = created
      }

      toast.success(isEditing ? "Announcement updated successfully" : "Announcement created successfully")
      router.push(`/admin/announcements/${result.id}/edit`)
      router.refresh()
    } catch (err) {
      console.error("Failed to save announcement:", err)
      toast.error("Failed to save announcement")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      toast.error("Invalid file type. Please upload JPEG, PNG, WebP, or AVIF.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB.")
      return
    }

    try {
      const supabase = createClient()
      const fileName = `announcements/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const { data, error } = await supabase.storage.from("announcements").upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from("announcements").getPublicUrl(data.path)
      setImagePreview(publicUrl)
      setValue("image", publicUrl)
      toast.success("Image uploaded successfully")
    } catch (err) {
      console.error("Upload failed:", err)
      toast.error("Failed to upload image")
    }
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              {isEditing ? "Edit Announcement" : "Create New Announcement"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update announcement details" : "Create a new announcement for the department"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save {isEditing ? "Changes" : "Announcement"}
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                {...register("title")}
                placeholder="Enter announcement title"
                error={!!errors.title}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                {...register("slug")}
                placeholder="auto-generated-from-title"
                error={!!errors.slug}
              />
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
              <p className="text-xs text-muted-foreground">Used in URL: /announcements/your-slug</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select {...register("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ANNOUNCEMENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                {...register("description")}
                placeholder="Announcement content (supports markdown)"
                rows={8}
                error={!!errors.description}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Featured Image</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-64">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageUpload}
                    className="sr-only"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={cn(
                      "relative aspect-video w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                      imagePreview ? "border-primary" : "border-border hover:border-primary/50"
                    )}
                  >
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview}
                          alt="Image preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-medium">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <ImageIcon className="h-10 w-10 mb-2" />
                        <span className="text-sm">Click to upload image</span>
                        <p className="text-xs">Recommended: 16:9 aspect ratio</p>
                      </div>
                    )}
                  </label>
                </div>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setImagePreview(null); setValue("image", "") }}
                    className="self-end"
                  >
                    Remove Image
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="attachment_url">Attachment URL</Label>
              <Input
                {...register("attachment_url")}
                placeholder="https://example.com/document.pdf"
                error={!!errors.attachment_url}
              />
              {errors.attachment_url && <p className="text-sm text-destructive">{errors.attachment_url.message}</p>}
              <p className="text-xs text-muted-foreground">Optional link to a PDF or document</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Publishing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                {...register("published")}
                checked={watch("published")}
              />
              <Label className="mb-0">Published</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Only <strong>Published</strong> announcements are visible to the public. Draft announcements are only visible to admins.
            </p>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="submit" variant="default" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Create Announcement"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(`/admin/announcements`)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}