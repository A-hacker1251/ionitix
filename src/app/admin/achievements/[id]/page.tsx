"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { achievementSchema, AchievementFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ACHIEVEMENT_CATEGORIES } from "@/lib/constants"
import { Loader2, Save, Award, Trophy, Medal, Star, GraduationCap, Users, FlaskConical, BookOpen, Image as ImageIcon, Calendar } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import React from "react"

export default function AchievementFormPage() {
  const router = useRouter()
  const params = useParams()
  const achievementId = params.id as string
  const isEditing = !!achievementId && achievementId !== "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      category: "student",
    },
  })

  const loadAchievement = async () => {
    if (!isEditing) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .eq("id", achievementId)
        .single()

      if (error) throw error

      if (data) {
        setValue("title", data.title)
        setValue("description", data.description)
        setValue("category", data.category)
        setValue("image", data.image || "")
        setValue("date", data.date)

        if (data.image) setImagePreview(data.image)
      }
    } catch (err) {
      console.error("Failed to load achievement:", err)
      toast.error("Failed to load achievement")
      router.back()
    }
  }

  React.useEffect(() => {
    loadAchievement()
  }, [isEditing, achievementId])

  const onSubmit = async (data: AchievementFormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const payload = {
        ...data,
        image: imagePreview,
        updated_at: new Date().toISOString(),
      }

      let result
      if (isEditing) {
        const { data: updated, error } = await supabase
          .from("achievements")
          .update(payload)
          .eq("id", achievementId)
          .select()
          .single()
        if (error) throw error
        result = updated
      } else {
        const { data: created, error } = await supabase
          .from("achievements")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw error
        result = created
      }

      toast.success(isEditing ? "Achievement updated successfully" : "Achievement added successfully")
      router.push(`/admin/achievements/${result.id}/edit`)
      router.refresh()
    } catch (err) {
      console.error("Failed to save achievement:", err)
      toast.error("Failed to save achievement")
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
      const fileName = `achievements/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
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
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              {isEditing ? "Edit Achievement" : "Add New Achievement"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update achievement details" : "Add a new achievement or award"}
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
                  Save {isEditing ? "Changes" : "Achievement"}
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Achievement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                {...register("title")}
                placeholder="Enter achievement title"
                error={!!errors.title}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Select {...register("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ACHIEVEMENT_CATEGORIES.map((cat) => {
                    const Icon = categoryIcons[cat.value] || Star
                    return (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={categoryColors[cat.value]}>
                            <Icon className="h-3 w-3 mr-1" />
                            {cat.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe the achievement, award, or accomplishment"
                rows={4}
                error={!!errors.description}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="date">Date *</Label>
                <Input
                  {...register("date")}
                  type="date"
                  error={!!errors.date}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
              </div>
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
                    id="achievement-image-upload"
                  />
                  <label
                    htmlFor="achievement-image-upload"
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
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="submit" variant="default" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Add Achievement"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(`/admin/achievements`)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}