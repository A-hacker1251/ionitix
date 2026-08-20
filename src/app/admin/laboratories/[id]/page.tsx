"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { laboratorySchema, LaboratoryFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Loader2, Save, FlaskConical, Cpu, Shield, Wifi, Code, Monitor, Database, Image as ImageIcon, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import React from "react"

export default function LaboratoryFormPage() {
  const router = useRouter()
  const params = useParams()
  const labId = params.id as string
  const isEditing = !!labId && labId !== "new"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [equipment, setEquipment] = useState<string[]>([])
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newEquipment, setNewEquipment] = useState("")
  const [newTechnology, setNewTechnology] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LaboratoryFormData>({
    resolver: zodResolver(laboratorySchema),
  })

  const loadLaboratory = async () => {
    if (!isEditing) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("laboratories")
        .select("*")
        .eq("id", labId)
        .single()

      if (error) throw error

      if (data) {
        setValue("name", data.name)
        setValue("description", data.description)
        setValue("equipment", data.equipment || [])
        setValue("technologies", data.technologies || [])
        setValue("image", data.image || "")
        setValue("in_charge", data.in_charge || "")
        setValue("location", data.location || "")
        setValue("capacity", data.capacity || "")

        setEquipment(data.equipment || [])
        setTechnologies(data.technologies || [])

        if (data.image) setImagePreview(data.image)
      }
    } catch (err) {
      console.error("Failed to load laboratory:", err)
      toast.error("Failed to load laboratory")
      router.back()
    }
  }

  React.useEffect(() => {
    loadLaboratory()
  }, [isEditing, labId])

  React.useEffect(() => {
    setValue("equipment", equipment)
  }, [equipment, setValue])

  React.useEffect(() => {
    setValue("technologies", technologies)
  }, [technologies, setValue])

  const onSubmit = async (data: LaboratoryFormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const payload = {
        ...data,
        equipment,
        technologies,
        image: imagePreview,
        updated_at: new Date().toISOString(),
      }

      let result
      if (isEditing) {
        const { data: updated, error } = await supabase
          .from("laboratories")
          .update(payload)
          .eq("id", labId)
          .select()
          .single()
        if (error) throw error
        result = updated
      } else {
        const { data: created, error } = await supabase
          .from("laboratories")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw error
        result = created
      }

      toast.success(isEditing ? "Laboratory updated successfully" : "Laboratory added successfully")
      router.push(`/admin/laboratories/${result.id}/edit`)
      router.refresh()
    } catch (err) {
      console.error("Failed to save laboratory:", err)
      toast.error("Failed to save laboratory")
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
      const fileName = `laboratories/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const { data, error } = await supabase.storage.from("events").upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from("events").getPublicUrl(data.path)
      setImagePreview(publicUrl)
      setValue("image", publicUrl)
      toast.success("Image uploaded successfully")
    } catch (err) {
      console.error("Upload failed:", err)
      toast.error("Failed to upload image")
    }
  }

  const addEquipment = () => {
    if (newEquipment.trim()) {
      setEquipment([...equipment, newEquipment.trim()])
      setNewEquipment("")
    }
  }

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index))
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setTechnologies([...technologies, newTechnology.trim()])
      setNewTechnology("")
    }
  }

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }

  const labIcons = {
    "Artificial Intelligence & Machine Learning Lab": Cpu,
    "Cybersecurity & Digital Forensics Lab": Shield,
    "Internet of Things & Embedded Systems Lab": Wifi,
    "High Performance Computing & Cloud Lab": Database,
    "Software Engineering & DevOps Lab": Code,
    "Data Science & Analytics Lab": Monitor,
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              {isEditing ? "Edit Laboratory" : "Add New Laboratory"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update laboratory details" : "Add a new laboratory to the department"}
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
                  Save {isEditing ? "Changes" : "Laboratory"}
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="name">Laboratory Name *</Label>
              <Input
                {...register("name")}
                placeholder="e.g., Artificial Intelligence & Machine Learning Lab"
                error={!!errors.name}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe the laboratory, its purpose, and key features"
                rows={4}
                error={!!errors.description}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-64 flex-shrink-0">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="lab-image-upload"
                />
                <label
                  htmlFor="lab-image-upload"
                  className={cn(
                    "relative aspect-video w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                    imagePreview ? "border-primary" : "border-border hover:border-primary/50"
                  )}
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Lab image preview"
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
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setImagePreview(null); setValue("image", "") }}
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
                    <Label htmlFor="in_charge">Faculty In-Charge</Label>
                    <Input
                      {...register("in_charge")}
                      placeholder="e.g., Dr. Priya Sharma"
                      error={!!errors.in_charge}
                    />
                    {errors.in_charge && <p className="text-sm text-destructive">{errors.in_charge.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      {...register("location")}
                      placeholder="e.g., Block A, 3rd Floor, Room 301"
                      error={!!errors.location}
                    />
                    {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="capacity">Student Capacity</Label>
                  <Input
                    {...register("capacity")}
                    placeholder="e.g., 40 students"
                    error={!!errors.capacity}
                  />
                  {errors.capacity && <p className="text-sm text-destructive">{errors.capacity.message}</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Equipment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEquipment()}
                placeholder="Add equipment item..."
              />
              <Button type="button" variant="outline" onClick={addEquipment}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {equipment.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {equipment.map((item, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {item}
                    <button
                      type="button"
                      onClick={() => removeEquipment(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technologies & Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTechnology()}
                placeholder="Add technology/tool..."
              />
              <Button type="button" variant="outline" onClick={addTechnology}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technologies.map((item, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
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
                {isEditing ? "Save Changes" : "Add Laboratory"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(`/admin/laboratories`)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}