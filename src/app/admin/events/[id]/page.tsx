"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventSchema, EventFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { EVENT_CATEGORIES, REGISTRATION_TYPES, REGISTRATION_DISPLAY_MODES, EVENT_STATUSES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Loader2, Save, Eye, Calendar, Clock, MapPin, User, Mail, Phone, Image as ImageIcon, Globe, FileText } from "lucide-react"
import Image from "next/image"

export default function EventFormPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  const isEditing = !!eventId && eventId !== "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      registration_enabled: true,
      registration_type: "none",
      registration_display_mode: "button",
      status: "draft",
      category: "workshop",
    },
  })

  const registrationType = watch("registration_type")
  const registrationEnabled = watch("registration_enabled")

  const loadEvent = async () => {
    if (!isEditing) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single()

      if (error) throw error

      if (data) {
        setValue("title", data.title)
        setValue("slug", data.slug)
        setValue("description", data.description)
        setValue("short_description", data.short_description)
        setValue("category", data.category)
        setValue("event_date", data.event_date)
        setValue("start_time", data.start_time?.slice(0, 5) || "")
        setValue("end_time", data.end_time?.slice(0, 5) || "")
        setValue("venue", data.venue)
        setValue("organizer", data.organizer)
        setValue("speaker", data.speaker || "")
        setValue("banner_image", data.banner_image || "")
        setValue("event_gallery", data.event_gallery || [])
        setValue("registration_enabled", data.registration_enabled)
        setValue("registration_type", data.registration_type)
        setValue("registration_url", data.registration_url || "")
        setValue("google_form_url", data.google_form_url || "")
        setValue("registration_display_mode", data.registration_display_mode)
        setValue("registration_deadline", data.registration_deadline || "")
        setValue("contact_email", data.contact_email || "")
        setValue("contact_phone", data.contact_phone || "")
        setValue("status", data.status)

        if (data.banner_image) setBannerPreview(data.banner_image)
        if (data.event_gallery) setGalleryPreviews(data.event_gallery)
      }
    } catch (err) {
      console.error("Failed to load event:", err)
      toast.error("Failed to load event")
      router.back()
    }
  }

  // Load event on mount
  React.useEffect(() => {
    loadEvent()
  }, [isEditing, eventId])

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const payload = {
        ...data,
        event_gallery: galleryPreviews,
        banner_image: bannerPreview,
        updated_at: new Date().toISOString(),
      }

      let result
      if (isEditing) {
        const { data: updated, error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", eventId)
          .select()
          .single()
        if (error) throw error
        result = updated
      } else {
        const { data: created, error } = await supabase
          .from("events")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw error
        result = created
      }

      toast.success(isEditing ? "Event updated successfully" : "Event created successfully")
      router.push(`/admin/events/${result.id}/edit`)
      router.refresh()
    } catch (err) {
      console.error("Failed to save event:", err)
      toast.error("Failed to save event")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "banner" | "gallery") => {
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
      const fileName = `${type}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const { data, error } = await supabase.storage.from("events").upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from("events").getPublicUrl(data.path)

      if (type === "banner") {
        setBannerPreview(publicUrl)
        setValue("banner_image", publicUrl)
      } else {
        const newGallery = [...galleryPreviews, publicUrl]
        setGalleryPreviews(newGallery)
        setValue("event_gallery", newGallery)
      }

      toast.success("Image uploaded successfully")
    } catch (err) {
      console.error("Upload failed:", err)
      toast.error("Failed to upload image")
    }
  }

  const removeGalleryImage = (index: number) => {
    const newGallery = galleryPreviews.filter((_, i) => i !== index)
    setGalleryPreviews(newGallery)
    setValue("event_gallery", newGallery)
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              {isEditing ? "Edit Event" : "Create New Event"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update event details and settings" : "Fill in the details to create a new event"}
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
                  Save {isEditing ? "Changes" : "Event"}
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  {...register("title")}
                  placeholder="Enter event title"
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
                <p className="text-xs text-muted-foreground">Used in URL: /events/your-slug</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Select {...register("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="short_description">Short Description *</Label>
              <Textarea
                {...register("short_description")}
                placeholder="Brief description for event cards (max 300 characters)"
                rows={3}
                error={!!errors.short_description}
              />
              {errors.short_description && <p className="text-sm text-destructive">{errors.short_description.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                {...register("description")}
                placeholder="Detailed event description (supports markdown)"
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
              <Calendar className="h-5 w-5" />
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="event_date">Event Date *</Label>
                <Input
                  {...register("event_date")}
                  type="date"
                  error={!!errors.event_date}
                />
                {errors.event_date && <p className="text-sm text-destructive">{errors.event_date.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="start_time">Start Time *</Label>
                <Input
                  {...register("start_time")}
                  type="time"
                  error={!!errors.start_time}
                />
                {errors.start_time && <p className="text-sm text-destructive">{errors.start_time.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end_time">End Time *</Label>
                <Input
                  {...register("end_time")}
                  type="time"
                  error={!!errors.end_time}
                />
                {errors.end_time && <p className="text-sm text-destructive">{errors.end_time.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="venue">Venue *</Label>
              <Input
                {...register("venue")}
                placeholder="e.g., Department Auditorium, CSE Block"
                error={!!errors.venue}
              />
              {errors.venue && <p className="text-sm text-destructive">{errors.venue.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="organizer">Organizer *</Label>
                <Input
                  {...register("organizer")}
                  placeholder="e.g., IONITIX Department"
                  error={!!errors.organizer}
                />
                {errors.organizer && <p className="text-sm text-destructive">{errors.organizer.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="speaker">Speaker</Label>
                <Input
                  {...register("speaker")}
                  placeholder="e.g., Dr. Jane Smith"
                  error={!!errors.speaker}
                />
                {errors.speaker && <p className="text-sm text-destructive">{errors.speaker.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <Label>Banner Image</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-64">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={(e) => handleImageUpload(e, "banner")}
                    className="sr-only"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className={cn(
                      "relative aspect-video w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                      bannerPreview ? "border-primary" : "border-border hover:border-primary/50"
                    )}
                  >
                    {bannerPreview ? (
                      <>
                        <Image
                          src={bannerPreview}
                          alt="Banner preview"
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
                        <span className="text-sm">Click to upload banner</span>
                        <p className="text-xs">Recommended: 16:9 aspect ratio</p>
                      </div>
                    )}
                  </label>
                </div>
                {bannerPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setBannerPreview(null); setValue("banner_image", "") }}
                    className="self-end"
                  >
                    Remove Banner
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Event Gallery</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-64">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={(e) => handleImageUpload(e, "gallery")}
                    className="sr-only"
                    id="gallery-upload"
                    multiple
                  />
                  <label
                    htmlFor="gallery-upload"
                    className={cn(
                      "relative aspect-video w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                      "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <span className="text-sm">Add gallery images</span>
                      <p className="text-xs">Multiple images allowed</p>
                    </div>
                  </label>
                </div>
              </div>
              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {galleryPreviews.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image src={img} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Registration Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3">
              <Switch
                {...register("registration_enabled")}
                checked={registrationEnabled}
              />
              <Label className="mb-0">Enable Registration</Label>
            </div>

            {registrationEnabled && (
              <div className="space-y-4" id="registration-fields">
                <div className="space-y-1.5">
                  <Label htmlFor="registration_type">Registration Type *</Label>
                  <Select {...register("registration_type")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select registration type" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGISTRATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.registration_type && <p className="text-sm text-destructive">{errors.registration_type.message}</p>}
                </div>

                {registrationType === "google-form" && (
                  <div className="space-y-1.5 p-4 bg-muted/50 rounded-lg">
                    <Label htmlFor="google_form_url">Google Form URL *</Label>
                    <Input
                      {...register("google_form_url")}
                      placeholder="https://forms.gle/..."
                      error={!!errors.google_form_url}
                    />
                    {errors.google_form_url && <p className="text-sm text-destructive">{errors.google_form_url.message}</p>}
                    <p className="text-xs text-muted-foreground">Paste your Google Form link here. Responses will go to the linked Google Sheet.</p>

                    <div className="space-y-1.5 mt-4">
                      <Label htmlFor="registration_display_mode">Display Mode</Label>
                      <Select {...register("registration_display_mode")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select display mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {REGISTRATION_DISPLAY_MODES.map((mode) => (
                            <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {registrationType === "native" && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Native registration will use the website's built-in form. Submissions are stored in the database and can be viewed in the Registrations section.
                    </p>
                  </div>
                )}

                {registrationType === "external" && (
                  <div className="space-y-1.5 p-4 bg-muted/50 rounded-lg">
                    <Label htmlFor="registration_url">External Registration URL *</Label>
                    <Input
                      {...register("registration_url")}
                      placeholder="https://external-site.com/register"
                      error={!!errors.registration_url}
                    />
                    {errors.registration_url && <p className="text-sm text-destructive">{errors.registration_url.message}</p>}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="registration_deadline">Registration Deadline</Label>
                    <Input
                      {...register("registration_deadline")}
                      type="date"
                      error={!!errors.registration_deadline}
                    />
                    {errors.registration_deadline && <p className="text-sm text-destructive">{errors.registration_deadline.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      {...register("contact_email")}
                      type="email"
                      placeholder="events@ionitix.edu"
                      error={!!errors.contact_email}
                    />
                    {errors.contact_email && <p className="text-sm text-destructive">{errors.contact_email.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      {...register("contact_phone")}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      error={!!errors.contact_phone}
                    />
                    {errors.contact_phone && <p className="text-sm text-destructive">{errors.contact_phone.message}</p>}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Publishing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="status">Status *</Label>
              <Select {...register("status")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
              <p className="text-xs text-muted-foreground">
                Only <strong>Published</strong> events are visible to the public. Draft events are only visible to admins.
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="submit" variant="default" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Create Event"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(`/admin/events`)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}