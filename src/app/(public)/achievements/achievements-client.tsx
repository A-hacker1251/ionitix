"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, Trophy, Medal, Star, Target, GraduationCap, Users, FlaskConical, BookOpen, ChevronDown, ChevronUp, Filter, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import Image from "next/image"
import { ACHIEVEMENT_CATEGORIES } from "@/lib/constants"
import { getAchievements, getAchievementsByCategory } from "@/lib/supabase/achievements"

export function AchievementsClient({ initialAchievements, initialAllAchievements, category, query, page, totalPages: initialTotalPages }: {
  initialAchievements: any[]
  initialAllAchievements: any[]
  category: string
  query: string
  page: number
  totalPages: number
}) {
  const [achievements, setAchievements] = useState(initialAchievements)
  const [allAchievements, setAllAchievements] = useState(initialAllAchievements)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== "all") params.set("category", categoryFilter)
      if (searchQuery) params.set("query", searchQuery)
      params.set("page", currentPage.toString())
      params.set("limit", "9")

      const response = await fetch(`/api/achievements?${params.toString()}`)
      const data = await response.json()
      if (data) {
        setAchievements(data.data || data)
        setTotalPages(data.totalPages || 1)
      }
    } catch (err) {
      console.error("Failed to fetch achievements:", err)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (value: string) => {
    const url = new URL(window.location.href)
    if (value === "all") url.searchParams.delete("category")
    else url.searchParams.set("category", value)
    url.searchParams.delete("page")
    window.location.href = url.toString()
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const categoryIcons: Record<string, any> = {
    student: GraduationCap,
    faculty: Users,
    research: FlaskConical,
    competition: Trophy,
    certification: Award,
    award: Medal,
    other: Star,
  }

  const categoryColors: Record<string, string> = {
    student: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    faculty: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    research: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    competition: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    certification: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    award: "bg-red-500/10 text-red-600 dark:text-red-400",
    other: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Trophy className="h-3 w-3 mr-1" />
                Achievements & Awards
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              Excellence Recognized
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              Celebrating the outstanding achievements of our students, faculty, and researchers across academics, competitions, and research.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Achievements", icon: Award, color: "text-yellow-500" },
              { label: "Student Awards", icon: GraduationCap, color: "text-blue-500" },
              { label: "Faculty Honors", icon: Users, color: "text-purple-500" },
              { label: "Research Papers", icon: FlaskConical, color: "text-emerald-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 glass-card rounded-xl"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-current/10 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-heading font-bold mb-1">{0}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search achievements..."
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  if (e.target.value) url.searchParams.set("query", e.target.value)
                  else url.searchParams.delete("query")
                  url.searchParams.delete("page")
                  window.location.href = url.toString()
                }}
                className="w-full pl-10 h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
            <select
              value=""
              onChange={(e) => {
                const url = new URL(window.location.href)
                if (e.target.value === "all") url.searchParams.delete("category")
                else url.searchParams.set("category", e.target.value)
                url.searchParams.delete("page")
                window.location.href = url.toString()
              }}
              className="w-full sm:w-[200px] h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              {ACHIEVEMENT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <section className="section-padding bg-primary text-primary-foreground">
            <div className="container-custom text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-heading mb-4">Share Your Achievement</h2>
                <p className="section-subheading mx-auto mb-8 text-primary-foreground/80">
                  Have you or your team won an award, published a paper, or achieved something remarkable? Let us know!
                </p>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90" onClick={() => window.location.href = "/contact"}>
                  Submit Achievement
                </button>
              </motion.div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}