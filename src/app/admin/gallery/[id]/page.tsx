"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { gallerySchema, GalleryFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { GALLERY_CATEGORIES } from "@/lib/constants"
import { Loader2, Save, Image as ImageIcon, Calendar, Loader2 as LoaderIcon } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import React from "react"

export default function GalleryFormPage() {
  const router = useRouter()
  const params = useParams()
  const galleryId = params.id as string
  const isEditing = !!galleryId && galleryId !== "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      category: "other",
    },
  })

  const loadGallery = async () => {
    if (!isEditing) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", galleryId)
        .single()

      if (error) throw error

      if (data) {
        setValue("title", data.title)
        setValue("image_url", data.image_url)
        setValue("category", data.category)
        setValue("event_id", data.event_id || "")

        if (data.image_url) setImagePreview(data.image_url)
      }
    } catch (err) {
      console.error("Failed to load gallery item:", err)
      toast.error("Failed to load gallery item")
      router.back()
    }
  }

  React.useEffect(() => {
    loadGallery()
  }, [isEditing, galleryId])

  const onSubmit = async (data: GalleryFormData) => {
    if (!imagePreview && !isEditing) {
      toast.error("Please upload an image")
      return
    }

    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const payload = {
        ...data,
        image_url: imagePreview,
      }

      let result
      if (isEditing) {
        const { data: updated, error } = await supabase
          .from("gallery")
          .update(payload)
          .eq("id", galleryId)
          .select()
          .single()
        if (error) throw error
        result = updated
      } else {
        const { data: created, error } = await supabase
          .from("gallery")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw error
        result = created
      }

      toast.success(isEditing ? "Gallery item updated successfully" : "Gallery item added successfully")
      router.push(`/admin/gallery/${result.id}/edit`)
      router.refresh()
    } catch (err) {
      console.error("Failed to save gallery item:", err)
      toast.error("Failed to save gallery item")
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

    setUploading(true)
    try {
      const supabase = createClient()
      const fileName = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const { data, error } = await supabase.storage.from("gallery").upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(data.path)
      setImagePreview(publicUrl)
      setValue("image_url", publicUrl)
      toast.success("Image uploaded successfully")
    } catch (err) {
      console.error("Upload failed:", err)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              {isEditing ? "Edit Gallery Item" : "Add New Gallery Item"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update gallery item details" : "Add a new image to the gallery"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || uploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : uploading ? (
                <>
                  <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save {isEditing ? "Changes" : "Gallery Item"}
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Image Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                {...register("title")}
                placeholder="Enter image title"
                error={!!errors.title}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Image *</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-80">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageUpload}
                    className="sr-only"
                    id="gallery-image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="gallery-image-upload"
                    className={cn(
                      "relative aspect-video w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                      imagePreview ? "border-primary" : "border-border hover:border-primary/50",
                      uploading && "opacity-50 cursor-not-allowed"
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
                        {!uploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-medium">Change Image</span>
                          </div>
                        )}
                        {uploading && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <LoaderIcon className="h-8 w-8 animate-spin text-white" />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mb-2" />
                        <span className="text-sm">Click to upload image</span>
                        <p className="text-xs">Recommended: 4:3 or 16:9 aspect ratio</p>
                      </div>
                    )}
                  </label>
                </div>
                {imagePreview && !uploading && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setImagePreview(null); setValue("image_url", "") }}
                    className="self-end"
                  >
                    Remove Image
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Select {...register("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {GALLERY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="event_id">Link to Event (Optional)</Label>
              <Input
                {...register("event_id")}
                placeholder="Event ID (optional)"
                error={!!errors.event_id}
              />
              {errors.event_id && <p className="text-sm text-destructive">{errors.event_id.message}</p>}
              <p className="text-xs text-muted-foreground">Enter an event ID to associate this image with a specific event</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="submit" variant="default" disabled={isSubmitting || uploading}>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Add Gallery Item"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(`/admin/gallery`)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}