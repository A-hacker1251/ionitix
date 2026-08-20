import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { GalleryTable } from "@/components/admin/gallery-table"

export const metadata: Metadata = {
  title: "Gallery Management",
  description: "Manage department gallery images",
}

export default async function AdminGalleryPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/gallery")
  }

  return (
    <AdminLayout>
      <GalleryTable />
    </AdminLayout>
  )
}