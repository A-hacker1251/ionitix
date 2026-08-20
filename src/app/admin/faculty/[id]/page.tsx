"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { facultySchema, FacultyFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { FACULTY_DESIGNATIONS } from "@/lib/constants"
import { Loader2, Save, Eye, User, Mail, Phone, GraduationCap, Award, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import React from "react"

export default function FacultyFormPage() {
  const router = useRouter()
  const params = useParams()
  const facultyId = params.id as string
  const isEditing = !!facultyId && facultyId !== "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      designation: "Assistant Professor",
    },
  })

  const loadFaculty = async () => {
    if (!isEditing) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .eq("id", facultyId)
        .single()

      if (error) throw error

      if (data) {
        setValue("name", data.name)
        setValue("designation", data.designation)
        setValue("qualification", data.qualification)
        setValue("specialization", data.specialization)
        setValue("email", data.email)
        setValue("phone", data.phone || "")
        setValue("profile_image", data.profile_image || "")
        setValue("bio", data.bio || "")

        if (data.profile_image) setImagePreview(data.profile_image)
      }
    } catch (err) {
      console.error("Failed to load faculty:", err)
      toast.error("Failed to load faculty member")
      router.back()
    }
  }

  React.useEffect(() => {
    loadFaculty()
  }, [isEditing, facultyId])

  const onSubmit = async (data: FacultyFormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const payload = {
        ...data,
        profile_image: imagePreview,
        updated_at: new Date().toISOString(),
      }

      let result
      if (isEditing) {
        const { data: updated, error } = await supabase
          .from("faculty")
          .update(payload)
          .eq("id", facultyId)
          .select()
          .single()
        if (error) throw error
        result = updated
      } else {
        const { data: created, error } = await supabase
          .from("faculty")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw error
        result = created
      }

      toast.success(isEditing ? "Faculty member updated successfully" : "Faculty member added successfully")
      router.push(`/admin/faculty/${result.id}/edit`)
      router.refresh()
    } catch (err) {
      console.error("Failed to save faculty:", err)
      toast.error("Failed to save faculty member")
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
      const fileName = `faculty/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const { data, error } = await supabase.storage.from("faculty").upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from("faculty").getPublicUrl(data.path)
      setImagePreview(publicUrl)
      setValue("profile_image", publicUrl)
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
              {isEditing ? "Edit Faculty Member" : "Add New Faculty Member"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update faculty member details" : "Add a new faculty member to the directory"}
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
                  Save {isEditing ? "Changes" : "Faculty Member"}
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 flex-shrink-0">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className={cn(
                    "relative aspect-square w-full rounded-full border-2 border-dashed cursor-pointer transition-colors overflow-hidden",
                    imagePreview ? "border-primary" : "border-border hover:border-primary/50"
                  )}
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <User className="h-12 w-12 mb-2" />
                      <span className="text-sm">Upload Photo</span>
                      <p className="text-xs">Square aspect ratio</p>
                    </div>
                  )}
                </label>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setImagePreview(null); setValue("profile_image", "") }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2"
                    size="sm"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      {...register("name")}
                      placeholder="Enter full name"
                      error={!!errors.name}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="designation">Designation *</Label>
                    <Select {...register("designation")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {FACULTY_DESIGNATIONS.map((des) => (
                          <SelectItem key={des} value={des}>{des}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.designation && <p className="text-sm text-destructive">{errors.designation.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="qualification">Qualification *</Label>
                  <Input
                    {...register("qualification")}
                    placeholder="e.g., Ph.D. (IIT Delhi), M.Tech, B.Tech"
                    error={!!errors.qualification}
                  />
                  {errors.qualification && <p className="text-sm text-destructive">{errors.qualification.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Input
                    {...register("specialization")}
                    placeholder="e.g., Artificial Intelligence, Cybersecurity, Data Science"
                    error={!!errors.specialization}
                  />
                  {errors.specialization && <p className="text-sm text-destructive">{errors.specialization.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="faculty@ionitix.edu"
                      error={!!errors.email}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      error={!!errors.phone}
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    {...register("bio")}
                    placeholder="Short biography, research interests, achievements..."
                    rows={4}
                    error={!!errors.bio}
                  />
                  {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
                </div>
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
                {isEditing ? "Save Changes" : "Add Faculty Member"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(`/admin/faculty`)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}