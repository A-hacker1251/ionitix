import { Metadata } from "next"
import { Search, Filter, ChevronDown, Calendar, Tag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getAnnouncements, getLatestAnnouncements } from "@/lib/supabase/announcements"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"

export const metadata: Metadata = {
  title: "Announcements",
  description: "Latest announcements and updates from IONITIX Department",
}

interface AnnouncementsPageProps {
  searchParams: Promise<{
    query?: string
    page?: string
  }>
}

export default async function AnnouncementsPage({ searchParams }: AnnouncementsPageProps) {
  const params = await searchParams
  const query = params.query || ""
  const page = parseInt(params.page || "1")

  const announcementsData = await getAnnouncements({
    query,
    page,
    limit: 10,
    sortBy: "published_at",
    sortOrder: "desc",
  })

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
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Tag className="h-3 w-3 mr-1" />
                Updates & News
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              Announcements
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              Stay updated with the latest news, updates, and important notices from the department.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={query}
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  url.searchParams.set("query", e.target.value)
                  url.searchParams.delete("page")
                  window.location.href = url.toString()
                }}
                className="pl-10"
              />
            </div>
          </div>

          {announcementsData.data.length > 0 ? (
            <>
              <div className="space-y-4 max-w-4xl">
                {announcementsData.data.map((announcement, index) => (
                  <motion.article
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AnnouncementCard announcement={announcement} />
                  </motion.article>
                ))}
              </div>

              {announcementsData.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={announcementsData.totalPages}
                  query={query}
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
  return (
    <Link href={`/announcements/${announcement.slug}`} className="block">
      <Card className="glass-card hover:shadow-lg transition-shadow overflow-hidden group">
        <CardContent className="p-6">
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
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
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
        </CardContent>
      </Card>
    </Link>
  )
}

function Pagination({ currentPage, totalPages, query }: { currentPage: number; totalPages: number; query: string }) {
  const createUrl = (page: number) => {
    const url = new URL(window.location.href)
    if (query) url.searchParams.set("query", query)
    if (page > 1) url.searchParams.set("page", page.toString())
    else url.searchParams.delete("page")
    return url.toString()
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => window.location.href = createUrl(currentPage - 1)}
      >
        <ChevronDown className="h-4 w-4 rotate-180" />
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum: number
          if (totalPages <= 5) pageNum = i + 1
          else if (currentPage <= 3) pageNum = i + 1
          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
          else pageNum = currentPage - 2 + i

          return (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => window.location.href = createUrl(pageNum)}
            >
              {pageNum}
            </Button>
          )
        })}
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => window.location.href = createUrl(currentPage + 1)}
      >
        Next
        <ChevronDown className="h-4 w-4" />
      </Button>
    </nav>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-16">
      <Calendar className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}