"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu, X, Sun, Moon, Monitor, LayoutDashboard, User,
  Home, Users, GraduationCap, UserCircle, Cpu, Calendar,
  Megaphone, Trophy, ImageIcon, Mail
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from "@/lib/constants"
import logo from "@/app/(public)/logo.png"
import { AccountDropdown } from "@/components/AccountDropdown"

const NAV_ICONS: Record<string, React.ElementType> = {
  "/": Home,
  "/about": Users,
  "/academics": GraduationCap,
  "/faculty": UserCircle,
  "/laboratories": Cpu,
  "/events": Calendar,
  "/announcements": Megaphone,
  "/achievements": Trophy,
  "/gallery": ImageIcon,
  "/contact": Mail,
}

export function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 backdrop-blur-xl",
        scrolled
          ? "bg-white/90 dark:bg-[hsl(215_40%_4%_/_0.85)] shadow-[0_2px_20px_hsl(199_100%_50%_/_0.08)] border-b border-[hsl(199_100%_50%_/_0.15)] dark:border-[hsl(199_100%_50%_/_0.12)]"
          : "bg-white/70 dark:bg-[hsl(215_40%_4%_/_0.6)] border-b border-[hsl(199_100%_50%_/_0.08)] dark:border-[hsl(199_100%_50%_/_0.06)]"
      )}
    >
<nav className="w-full px-4 md:px-8 lg:px-12 xl:px-16 h-full flex items-center justify-between gap-4 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-4 lg:gap-8" aria-label="Main navigation">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0 min-w-0" aria-label="IONITIX Home">
          <Image
            src={logo}
            alt="IONITIX Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <div className="hidden sm:block">
            <span className="block font-header font-semibold text-lg text-foreground tracking-tight">IONITIX</span>
            <span className="block font-header font-medium text-sm text-muted-foreground tracking-tight">Department of IoT</span>
          </div>
        </Link>

        {/* Navigation Links - centered */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-1 lg:gap-2 xl:gap-3 relative flex-1 min-w-0">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.href]
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 font-header flex flex-col items-center gap-0.5",
                  isActive(item.href)
                    ? "text-[hsl(199_100%_50%)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-[hsl(199_100%_50%_/_0.08)]"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {Icon && <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />}
                <span className="leading-none">{item.label}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-px left-1 right-1 h-0.5 bg-[hsl(199_100%_50%)] rounded-full shadow-[0_0_8px_hsl(199_100%_50%_/_0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

{/* Actions (theme toggle, account dropdown, mobile menu) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="h-9 w-9"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>

          <AccountDropdown />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(199_100%_50%_/_0.3)] to-transparent" />
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[hsl(215_40%_4%_/_0.95)] backdrop-blur-xl border-t border-[hsl(199_100%_50%_/_0.12)] overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = NAV_ICONS[item.href]
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all font-header",
                      isActive(item.href)
                        ? "bg-[hsl(199_100%_50%_/_0.12)] text-[hsl(199_100%_50%)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-[hsl(199_100%_50%_/_0.06)]"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-2 border-t border-border" />
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}