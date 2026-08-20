import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AnnouncementsTable } from "@/components/admin/announcements-table"

export const metadata: Metadata = {
  title: "Announcements Management",
  description: "Manage department announcements",
}

export default async function AdminAnnouncementsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/announcements")
  }

  return (
    <AdminLayout>
      <AnnouncementsTable />
    </AdminLayout>
  )
}