import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AchievementsTable } from "@/components/admin/achievements-table"

export const metadata: Metadata = {
  title: "Achievements Management",
  description: "Manage department achievements",
}

export default async function AdminAchievementsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/achievements")
  }

  return (
    <AdminLayout>
      <AchievementsTable />
    </AdminLayout>
  )
}