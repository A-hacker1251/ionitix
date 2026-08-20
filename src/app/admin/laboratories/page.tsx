import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { LaboratoriesTable } from "@/components/admin/laboratories-table"

export const metadata: Metadata = {
  title: "Laboratories Management",
  description: "Manage department laboratories",
}

export default async function AdminLaboratoriesPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/laboratories")
  }

  return (
    <AdminLayout>
      <LaboratoriesTable />
    </AdminLayout>
  )
}