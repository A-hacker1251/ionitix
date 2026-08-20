import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { RegistrationsTable } from "@/components/admin/registrations-table"

export const metadata: Metadata = {
  title: "Registrations Management",
  description: "Manage event registrations",
}

export default async function AdminRegistrationsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/registrations")
  }

  return (
    <AdminLayout>
      <RegistrationsTable />
    </AdminLayout>
  )
}