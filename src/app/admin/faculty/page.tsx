import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { FacultyTable } from "@/components/admin/faculty-table"

export const metadata: Metadata = {
  title: "Faculty Management",
  description: "Manage department faculty members",
}

export default async function AdminFacultyPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/faculty")
  }

  return (
    <AdminLayout>
      <FacultyTable />
    </AdminLayout>
  )
}