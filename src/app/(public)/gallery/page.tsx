import { Metadata } from "next"
import Link from "next/link"
import {
  Image as ImageIcon,
  Search,
  ChevronDown,
  Download,
  Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import Image from "next/image"

import { GALLERY_CATEGORIES } from "@/lib/constants"
import {
  getGalleryItems,
  getGalleryCategories,
} from "@/lib/supabase/gallery"

import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "../motion-wrapper"

export const metadata: Metadata = {
  title: "Gallery - IONITIX",
  description:
    "Explore the photo gallery of IONITIX Department of Computer Science & Engineering - events, workshops, achievements, and campus life.",
}

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string
    query?: string
    page?: string
  }>
}

export const dynamic = "force-dynamic"

export default async function GalleryPage({
  searchParams,
}: GalleryPageProps) {
  const params = await searchParams

  const category = params.category || "all"
  const query = params.query || ""

  const parsedPage = parseInt(params.page || "1", 10)
  const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage

  const [galleryData, categories] = await Promise.all([
    getGalleryItems({
      category: category !== "all" ? (category as any) : undefined,
      query,
      page,
      limit: 12,
    }),
    getGalleryCategories(),
  ])

  const activeCategories = [
    ...new Set([
      ...GALLERY_CATEGORIES.map((c) => c.value),
      ...categories,
    ]),
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                <ImageIcon className="h-3 w-3 mr-1" />
                Photo Gallery
              </Badge>
            </MotionDiv>

            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              Moments at IONITIX
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              A visual journey through our events, workshops,
              achievements, and campus life.
            </MotionP>

          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-background">
        <div className="container-custom">

          {/* FILTERS */}
          <form
            method="GET"
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >

            {/* SEARCH */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                name="query"
                placeholder="Search gallery..."
                defaultValue={query}
                className="pl-10"
              />
            </div>

            {/* CATEGORY */}
            <select
              name="category"
              defaultValue={category}
              className="flex h-10 w-full sm:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">
                All Categories
              </option>

              {activeCategories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {
                    GALLERY_CATEGORIES.find(
                      (c) => c.value === cat
                    )?.label || cat
                  }
                </option>
              ))}
            </select>

            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>

          </form>

          {/* RESULTS */}
          {galleryData.data.length > 0 ? (
            <>

              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                role="list"
              >

                {galleryData.data.map((item, index) => (

                  <MotionDiv
                    key={item.id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      margin: "-50px",
                    }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="group"
                  >

                    <GalleryItemCard item={item} />

                  </MotionDiv>

                ))}

              </div>

              {/* PAGINATION */}
              {galleryData.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={galleryData.totalPages}
                  category={category}
                  query={query}
                />
              )}

            </>
          ) : (

            <EmptyState
              title="No Images Found"
              description={
                query || category !== "all"
                  ? "Try adjusting your search or filters"
                  : "Gallery is empty. Check back soon!"
              }
            />

          )}

        </div>
      </section>

    </div>
  )
}


/* =========================================================
   GALLERY ITEM
========================================================= */

function GalleryItemCard({
  item,
}: {
  item: any
}) {
  return (
    <Dialog>

      <DialogTrigger asChild>

        <Card className="glass-card overflow-hidden cursor-zoom-in h-full">

          <div className="relative aspect-square overflow-hidden">

            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              loading="lazy"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* ACTIONS */}
            <div className="absolute bottom-2 left-2 right-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between p-2">

              <Badge
                variant="secondary"
                className="text-xs"
              >
                {
                  GALLERY_CATEGORIES.find(
                    (c) => c.value === item.category
                  )?.label || item.category
                }
              </Badge>

              <div className="flex items-center gap-1">

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/90 text-foreground"
                  aria-label="Download"
                  asChild
                >
                  <a
                    href={item.image_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/90 text-foreground"
                  aria-label="Share"
                  asChild
                >
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      item.title + " " + item.image_url
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                </Button>

              </div>

            </div>

          </div>

          <CardContent className="p-3">

            <h4 className="font-medium text-sm line-clamp-1">
              {item.title}
            </h4>

            <p className="text-xs text-muted-foreground capitalize">
              {item.category}
            </p>

          </CardContent>

        </Card>

      </DialogTrigger>

      {/* LIGHTBOX */}
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent shadow-none border-none">

        <div className="relative aspect-video max-h-[80vh]">

          <Image
            src={item.image_url}
            alt={item.title}
            fill
            priority
            className="object-contain rounded-lg"
            sizes="80vw"
          />

        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">

          <p className="font-medium">
            {item.title}
          </p>

          <p className="capitalize">
            {item.category}
          </p>

        </div>

      </DialogContent>

    </Dialog>
  )
}


/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  currentPage,
  totalPages,
  category,
  query,
}: {
  currentPage: number
  totalPages: number
  category: string
  query: string
}) {

  const createUrl = (page: number) => {

    const params = new URLSearchParams()

    if (query) {
      params.set("query", query)
    }

    if (category !== "all") {
      params.set("category", category)
    }

    if (page > 1) {
      params.set("page", page.toString())
    }

    const queryString = params.toString()

    return queryString
      ? `/gallery?${queryString}`
      : "/gallery"
  }

  const pages = Array.from(
    {
      length: Math.min(totalPages, 5),
    },
    (_, i) => {

      let pageNum: number

      if (totalPages <= 5) {
        pageNum = i + 1
      } else if (currentPage <= 3) {
        pageNum = i + 1
      } else if (currentPage >= totalPages - 2) {
        pageNum = totalPages - 4 + i
      } else {
        pageNum = currentPage - 2 + i
      }

      return pageNum
    }
  )

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-10"
      aria-label="Pagination"
    >

      {/* PREVIOUS */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage !== 1 ? (
          <Link href={createUrl(currentPage - 1)}>
            <ChevronDown className="h-4 w-4 rotate-180" />
            Previous
          </Link>
        ) : (
          <span>
            <ChevronDown className="h-4 w-4 rotate-180" />
            Previous
          </span>
        )}
      </Button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-1">

        {pages.map((pageNum) => (

          <Button
            key={pageNum}
            variant={
              pageNum === currentPage
                ? "default"
                : "outline"
            }
            size="sm"
            asChild
          >
            <Link href={createUrl(pageNum)}>
              {pageNum}
            </Link>
          </Button>

        ))}

      </div>

      {/* NEXT */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage !== totalPages ? (
          <Link href={createUrl(currentPage + 1)}>
            Next
            <ChevronDown className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            Next
            <ChevronDown className="h-4 w-4" />
          </span>
        )}
      </Button>

    </nav>
  )
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="text-center py-16">

      <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-muted-foreground">
        {description}
      </p>

    </div>
  )
}