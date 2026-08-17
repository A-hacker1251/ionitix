import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { EventsTable } from "@/components/admin/events-table"

export const metadata: Metadata = {
  title: "Events Management",
  description: "Manage department events",
}

export default async function AdminEventsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/events")
  }

  return (
    <AdminLayout>
      <EventsTable />
    </AdminLayout>
  )
}