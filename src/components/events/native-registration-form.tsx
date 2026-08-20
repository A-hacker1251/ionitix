"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema, RegistrationFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { SEMESTERS, SECTIONS } from "@/lib/constants"

export function NativeRegistrationForm({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      event_id: eventId,
      semester: "1",
      section: "A",
    },
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      const supabase = createClient()
      const { error } = await (supabase.from("registrations").insert(data) as any)

      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "You have already registered for this event" })
        } else {
          throw error
        }
        return
      }

      setIsSuccess(true)
      reset()
      toast.success(`Successfully registered for ${eventTitle}!`)
    } catch (err) {
      console.error("Registration error:", err)
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="glass-card border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
            <p className="text-muted-foreground mb-6">
              You have successfully registered for <strong>{eventTitle}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                {...register("name")}
                placeholder="Enter your full name"
                error={!!formErrors.name}
              />
              {formErrors.name && <p className="text-sm text-destructive">{formErrors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="usn">USN / Student ID *</Label>
              <Input
                {...register("usn")}
                placeholder="Enter your USN"
                error={!!formErrors.usn}
              />
              {formErrors.usn && <p className="text-sm text-destructive">{formErrors.usn.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              error={!!formErrors.email || !!errors.email}
            />
            {formErrors.email && <p className="text-sm text-destructive">{formErrors.email.message}</p>}
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              error={!!formErrors.phone}
            />
            {formErrors.phone && <p className="text-sm text-destructive">{formErrors.phone.message}</p>}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="college">College / Institution *</Label>
              <Input
                {...register("college")}
                placeholder="Enter your college name"
                error={!!formErrors.college}
              />
              {formErrors.college && <p className="text-sm text-destructive">{formErrors.college.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="semester">Semester *</Label>
              <Select
                {...register("semester")}
                onValueChange={(v) => register("semester").onChange({ target: { value: v } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTERS.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="section">Section *</Label>
              <Select
                {...register("section")}
                onValueChange={(v) => register("section").onChange({ target: { value: v } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map((sec) => (
                    <SelectItem key={sec} value={sec}>
                      Section {sec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Registering...
              </>
            ) : (
              "Register Now"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By registering, you agree to receive event-related communications.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}