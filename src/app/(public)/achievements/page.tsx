import { Metadata } from "next"
import { Suspense } from "react"
import { getAchievements } from "@/lib/supabase/achievements"
import { AchievementsClient } from "./achievements-client"

export const metadata = {
  title: "Achievements - IONITIX",
  description: "Explore achievements and awards of students, faculty, and researchers at IONITIX Department of Computer Science & Engineering.",
}

export const dynamic = 'force-dynamic'

export default async function AchievementsPage() {
  const allAchievements = await getAchievements()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <AchievementsClient
        initialAchievements={[]}
        initialAllAchievements={allAchievements}
        category="all"
        query=""
        page={1}
        totalPages={1}
      />
    </Suspense>
  )
}