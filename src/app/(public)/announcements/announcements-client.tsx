"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ChevronDown, Calendar, Tag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import { Announcement } from "@/types"

export function AnnouncementsClient() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [announcementsData, setAnnouncementsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/announcements?query=${encodeURIComponent(query)}&page=${page}&limit=10&sortBy=published_at&sortOrder=desc`)
      const data = await response.json()
      setAnnouncementsData(data)
    } catch (err) {
      console.error("Failed to fetch announcements:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query, page])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Tag className="h-3 w-3 mr-1" />
                Updates & News
              </span>
            </div>
            <h1 className="section-heading mb-4">Announcements</h1>
            <p className="section-subheading mx-auto">
              Stay updated with the latest news, updates, and important notices from the department.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search announcements..."
                value={query}
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  if (e.target.value) url.searchParams.set("query", e.target.value)
                  else url.searchParams.delete("query")
                  url.searchParams.delete("page")
                  window.location.href = url.toString()
                }}
                className="w-full pl-10 h-10 rounded-lg border border-[hsl(276_30%_20%_/_0.4)] bg-secondary px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
          </div>

          {announcementsData?.data?.length > 0 ? (
            <>
              <div className="space-y-4 max-w-4xl">
                {announcementsData.data.map((announcement: any) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>

              {announcementsData.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={announcementsData.totalPages}
                  query={query}
                  onPageChange={setPage}
                />
              )}
            </>
          ) : (
            <EmptyState
              title="No Announcements Found"
              description={query ? "Try adjusting your search terms" : "No announcements at the moment. Check back soon!"}
            />
          )}
        </div>
      </section>
    </div>
  )
}

function AnnouncementCard({ announcement }: { announcement: any }) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  return (
    <a href={`/announcements/${announcement.slug}`} className="block">
      <div className="glass-card hover:shadow-lg transition-shadow overflow-hidden group border border-[hsl(276_30%_20%_/_0.3)]">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {announcement.image && (
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={announcement.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 border border-primary/20 text-primary">
                  Announcement
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(announcement.published_at || announcement.created_at)}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {announcement.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3">{announcement.description}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

function Pagination({ currentPage, totalPages, query, onPageChange }: { currentPage: number; totalPages: number; query: string; onPageChange: (page: number) => void }) {
  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-2 rounded-lg border border-[hsl(276_30%_20%_/_0.4)] bg-secondary px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 hover:bg-secondary/80 transition-colors"
      >
        <span className="h-4 w-4 rotate-180">▼</span>
        Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum: number
          if (totalPages <= 5) pageNum = i + 1
          else if (currentPage <= 3) pageNum = i + 1
          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
          else pageNum = currentPage - 2 + i

          return (
            <button
              key={pageNum}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border ${
                pageNum === currentPage
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary hover:bg-secondary/80 border-[hsl(276_30%_20%_/_0.4)]"
              }`}
              onClick={() => window.location.href = new URLSearchParams({ query, page: pageNum.toString() }).toString()}
            >
              {pageNum}
            </button>
          )
        })}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-2 rounded-lg border border-[hsl(276_30%_20%_/_0.4)] bg-secondary px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 hover:bg-secondary/80 transition-colors"
      >
        Next
        <span className="h-4 w-4">▼</span>
      </button>
    </nav>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-16">
      <div className="h-16 w-16 mx-auto text-primary/30 mb-4">📅</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}