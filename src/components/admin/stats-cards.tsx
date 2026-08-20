"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  UserPlus,
  Megaphone,
  Award,
  Images,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  href?: string
  style?: React.CSSProperties
}

function StatCard({ title, value, icon, change, changeType, href }: StatCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className={cn("glass-card hover:shadow-lg transition-shadow cursor-pointer", href && "hover:bg-accent/50")}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
              {change && (
                <p className={cn(
                  "text-sm mt-2 flex items-center gap-1",
                  changeType === "positive" ? "text-green-600" :
                  changeType === "negative" ? "text-red-600" : "text-muted-foreground"
                )}>
                  {changeType === "positive" && <TrendingUp className="h-3 w-3" />}
                  {changeType === "negative" && <TrendingUp className="h-3 w-3 rotate-180" />}
                  {change}
                </p>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function AdminStatsCards() {
  const stats = [
    { title: "Total Events", value: "24", icon: <Calendar className="h-6 w-6" />, change: "+12% from last month", changeType: "positive" as const },
    { title: "Upcoming Events", value: "6", icon: <Calendar className="h-6 w-6" />, change: "3 this week", changeType: "neutral" as const },
    { title: "Total Registrations", value: "1,284", icon: <UserPlus className="h-6 w-6" />, change: "+234 this month", changeType: "positive" as const },
    { title: "Announcements", value: "18", icon: <Megaphone className="h-6 w-6" />, change: "+5 this week", changeType: "positive" as const },
    { title: "Faculty Members", value: "8", icon: <Users className="h-6 w-6" />, change: "No change", changeType: "neutral" as const },
    { title: "Gallery Images", value: "156", icon: <Images className="h-6 w-6" />, change: "+23 this month", changeType: "positive" as const },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} style={{ transitionDelay: `${index * 50}ms` }} />
      ))}
    </div>
  )
}