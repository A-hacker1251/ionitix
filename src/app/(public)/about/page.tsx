import { Metadata } from "next"
import { Suspense } from "react"
import { AboutClient } from "./about-client"

export const metadata: Metadata = {
  title: "About Us - IONITIX",
  description: "Learn about IONITIX Department of Computer Science & Engineering - our vision, mission, values, and leadership.",
}

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <AboutClient />
    </Suspense>
  )
}