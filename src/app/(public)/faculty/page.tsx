import { Metadata } from "next"
import { Suspense } from "react"
import { getFaculty } from "@/lib/supabase/faculty"
import { FacultyClient } from "./faculty-client"

export const metadata: Metadata = {
  title: "Faculty",
  description: "Meet our distinguished faculty members at IONITIX Department",
}

export const dynamic = 'force-dynamic'

export default async function FacultyPage() {
  const faculty = await getFaculty()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <FacultyClient initialFaculty={faculty} />
    </Suspense>
  )
}