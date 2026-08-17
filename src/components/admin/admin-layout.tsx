"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sidebar } from "./sidebar"
import { ADMIN_NAV_ITEMS } from "@/lib/constants"
import {
  LayoutDashboard,
  Calendar,
  Megaphone,
  Users,
  FlaskConical,
  Images,
  Award,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  const navigation = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { href: "/admin/faculty", label: "Faculty", icon: Users },
    { href: "/admin/laboratories", label: "Laboratories", icon: FlaskConical },
    { href: "/admin/gallery", label: "Gallery", icon: Images },
    { href: "/admin/achievements", label: "Achievements", icon: Award },
    { href: "/admin/registrations", label: "Registrations", icon: UserPlus },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-card border-r border-border transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        aria-label="Admin sidebar"
      >
        <Sidebar
          navigation={navigation}
          pathname={pathname}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={cn("transition-all duration-300 lg:pl-64", sidebarCollapsed ? "lg:pl-16" : "")}>
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="container-custom h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </Button>
              <h1 className="text-xl font-heading font-bold text-foreground hidden sm:block">
                Admin Dashboard
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
              <Button variant="ghost" size="icon" asChild>
                <Link href="/api/auth/signout">
                  <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="container-custom py-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function Sidebar({
  navigation,
  pathname,
  collapsed,
  onToggleCollapse,
  onClose,
}: {
  navigation: typeof ADMIN_NAV_ITEMS
  pathname: string
  collapsed: boolean
  onToggleCollapse: () => void
  onClose: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2" aria-label="IONITIX Admin">
          <span className={cn("font-heading font-bold text-xl gradient-text", collapsed && "hidden")}>
            IONITIX
          </span>
          <span className={cn("font-heading font-bold text-xl gradient-text", !collapsed && "hidden")}>
            I
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn("hidden lg:flex", !collapsed && "hidden")}
          onClick={onToggleCollapse}
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className={cn("w-full justify-start gap-3", collapsed && "justify-center px-2")}
          onClick={onClose}
          asChild
        >
          <Link href="/api/auth/signout">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </Button>
      </div>
    </div>
  )
}