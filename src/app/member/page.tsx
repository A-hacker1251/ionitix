import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen, Award, LogOut, LayoutDashboard } from "lucide-react"

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Member dashboard overview",
}

export default async function MemberDashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/member")
  }

  const user = session.user
  const role = (user.user_metadata?.role as string) || "MEMBER"
  const isAdmin = role === "ADMIN"

  if (isAdmin) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container-custom h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/member" className="flex items-center gap-2" aria-label="IONITIX Member">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-xl gradient-text">IONITIX</span>
            </Link>
            <h1 className="text-xl font-heading font-bold text-foreground hidden sm:block">
              Member Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <span className="flex items-center gap-2">
                  View Site
                </span>
              </Link>
            </Button>
            <form action="/api/auth/signout" method="POST">
              <Button variant="ghost" size="icon" type="submit">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-heading font-bold">Welcome, {user.user_metadata?.full_name || user.email?.split("@")[0] || "Member"}</h2>
            <p className="text-muted-foreground mt-1">Here's an overview of your department activities.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 text-left" asChild>
              <Link href="/events">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="font-medium">Events</span>
                <span className="text-sm text-muted-foreground">Browse & Register</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 text-left" asChild>
              <Link href="/faculty">
                <Users className="h-8 w-8 text-primary" />
                <span className="font-medium">Faculty</span>
                <span className="text-sm text-muted-foreground">View Profiles</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 text-left" asChild>
              <Link href="/academics">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="font-medium">Academics</span>
                <span className="text-sm text-muted-foreground">Courses & Labs</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 text-left" asChild>
              <Link href="/achievements">
                <Award className="h-8 w-8 text-primary" />
                <span className="font-medium">Achievements</span>
                <span className="text-sm text-muted-foreground">View Highlights</span>
              </Link>
            </Button>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default">
                <Link href="/events">
                  Browse Events
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/announcements">
                  View Announcements
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/gallery">
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}