import { Suspense } from "react"
import { AnnouncementsClient } from "./announcements-client"

export const dynamic = 'force-dynamic'

export default function AnnouncementsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <AnnouncementsClient />
    </Suspense>
  )
}