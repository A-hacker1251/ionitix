import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminStatsCards } from "@/components/admin/stats-cards"
import { RecentEventsTable } from "@/components/admin/recent-events-table"
import { RecentRegistrationsTable } from "@/components/admin/recent-registrations-table"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard overview",
}

export default async function AdminDashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin")
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your department.</p>
        </div>

        <AdminStatsCards />

        <div className="grid lg:grid-cols-2 gap-6">
          <RecentEventsTable />
          <RecentRegistrationsTable />
        </div>
      </div>
    </AdminLayout>
  )
}