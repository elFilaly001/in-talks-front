
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ToolTipsProvider from "../charts/ToolTipsProvider"
import formatNumber from "@/lib/numbers"
import Image from "next/image"
import { ExternalLink, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface Mention {
  id: string
  title: string
  link: string
  postedDate: string
  thumbnail: string
  snippet?: string
  source?: string
  type?: string
  mentionCount: number
}

interface TopBlogsProps {
  feeds?: Mention[]
  itemsPerPage?: number
}

// Constants
const ITEMS_PER_PAGE_DEFAULT = 10

const DEFAULT_MENTIONS: Mention[] = [
  {
    id: "1",
    title: "Glovo expands in Morocco",
    link: "https://example.com/thumb1.jpg",
    postedDate: "2025-11-01",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is expanding its delivery services to more cities in Morocco, aiming to cover both major urban centers and smaller towns.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 120,
  },
  {
    id: "2",
    title: "Fast Delivery Trends 2025",
    link: "https://example.com/fast-delivery-trends",
    postedDate: "2025-10-28",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "The fast delivery market in North Africa is experiencing significant growth in 2025, with trends showing an increase in demand.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 85,
  },
  {
    id: "3",
    title: "Glovo partners with local restaurants",
    link: "https://example.com/glovo-partners",
    postedDate: "2025-10-30",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Glovo has partnered with over 50 local restaurants in Casablanca to expand its offerings and provide more diverse meal options.",
    source: "instagram",
    type: "NEGATIVE",
    mentionCount: 65,
  },
  {
    id: "4",
    title: "Rabat sees growth in app-based deliveries",
    link: "https://example.com/rabat-growth",
    postedDate: "2025-10-25",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Rabat has seen a remarkable growth in app-based delivery services this year, with a 35% increase in demand.",
    source: "instagram",
    type: "Article",
    mentionCount: 45,
  },
  {
    id: "5",
    title: "Glovo job opportunities in Morocco",
    link: "https://example.com/glovo-jobs",
    postedDate: "2025-10-20",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is actively hiring delivery partners, customer support staff, and other roles across Morocco.",
    source: "tiktok",
    type: "NEGATIVE",
    mentionCount: 30,
  },
  {
    id: "6",
    title: "New delivery zones in Marrakech",
    link: "https://example.com/marrakech-zones",
    postedDate: "2025-10-15",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has announced the addition of new delivery zones in Marrakech, covering popular tourist areas.",
    source: "twitter",
    type: "POSITIVE",
    mentionCount: 55,
  },
  {
    id: "7",
    title: "Customer feedback on Glovo app",
    link: "https://example.com/app-feedback",
    postedDate: "2025-10-12",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Users have shared mixed feedback on the Glovo app's user interface and delivery tracking features.",
    source: "facebook",
    type: "NEUTRAL",
    mentionCount: 40,
  },
  {
    id: "8",
    title: "Glovo sustainability initiatives",
    link: "https://example.com/sustainability",
    postedDate: "2025-10-10",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Glovo is implementing eco-friendly practices, including the use of electric vehicles for deliveries.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 70,
  },
  {
    id: "9",
    title: "Delivery delays during peak hours",
    link: "https://example.com/delays",
    postedDate: "2025-10-08",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Customers have reported longer wait times during peak hours, leading to dissatisfaction.",
    source: "tiktok",
    type: "NEGATIVE",
    mentionCount: 25,
  },
  {
    id: "10",
    title: "Partnership with local supermarkets",
    link: "https://example.com/supermarkets",
    postedDate: "2025-10-05",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has expanded its grocery delivery options by partnering with major supermarkets across Morocco.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 90,
  },
  {
    id: "11",
    title: "Glovo customer loyalty program",
    link: "https://example.com/loyalty",
    postedDate: "2025-10-03",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "The new loyalty program rewards frequent users with discounts and free deliveries.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 60,
  },
  {
    id: "12",
    title: "Challenges in rural delivery",
    link: "https://example.com/rural-delivery",
    postedDate: "2025-10-01",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Delivering to rural areas remains a challenge due to infrastructure limitations.",
    source: "twitter",
    type: "NEUTRAL",
    mentionCount: 35,
  },
]

// Sub-components
const BlogItem = ({ feed, rank }: { feed: Mention; rank: number }) => (
  <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
    <span className="flex-shrink-0 w-6 text-xs font-medium text-muted-foreground">
      #{rank}
    </span>
    <div
      className="flex-shrink-0 w-10 h-10 rounded-md bg-muted bg-cover bg-center"
      style={{ backgroundImage: `url(${feed.thumbnail})` }}
    >
      {!feed.thumbnail && (
        <div className="w-full h-full flex items-center justify-center bg-cyan-100">
          <FileText className="h-4 w-4 text-cyan-600" />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <a
        href={feed.link}
        target="_blank"
        rel="noopener noreferrer"
        title={feed.title}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="truncate">{feed.title}</span>
        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
      {feed.snippet && (
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {feed.snippet.slice(0, 60)}...
        </p>
      )}
    </div>
    <div className="flex-shrink-0 min-w-8 h-8 px-2 bg-cyan-100 text-cyan-600 rounded-md flex items-center justify-center text-xs font-semibold">
      {formatNumber(feed.mentionCount)}
    </div>
  </div>
)

const AIInsightBadge = ({ insight }: { insight: string }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="relative">
      <div
        className="text-sm text-black flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Image
          src="/icons/IN-TALKS-logo.png-2.webp"
          alt="IN-TALKS Logo"
          width={22}
          height={22}
          style={{ display: "inline-block", verticalAlign: "middle" }}
        />
        <span
          className="font-semibold"
          style={{
            background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          AI-powered insight
        </span>
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {insight}
          </p>
        </div>
      )}
    </div>
  )
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => (
  <div className="flex items-center justify-between w-full">
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="gap-1"
    >
      <ChevronLeft className="h-4 w-4" />
      Précédent
    </Button>
    <div className="flex items-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-8 h-8 text-xs font-medium rounded-md transition-colors",
            currentPage === page
              ? "bg-cyan-500 text-white"
              : "hover:bg-cyan-100 text-muted-foreground"
          )}
        >
          {page}
        </button>
      ))}
    </div>
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="gap-1"
    >
      Suivant
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
)

// Main component
export default function TopBlogs({
  feeds = [],
  itemsPerPage = ITEMS_PER_PAGE_DEFAULT,
}: TopBlogsProps) {
  const [currentPage, setCurrentPage] = React.useState(1)

  const displayFeeds = React.useMemo(
    () => (feeds.length > 0 ? feeds : DEFAULT_MENTIONS),
    [feeds]
  )

  const totalPages = Math.ceil(displayFeeds.length / itemsPerPage)

  const currentItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return displayFeeds.slice(startIndex, startIndex + itemsPerPage)
  }, [displayFeeds, currentPage, itemsPerPage])

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  // Reset to first page when feeds change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [feeds])

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Top des blogs</CardTitle>
            <ToolTipsProvider title="Affiche les blogs les plus mentionnés. Utilisez ces données pour identifier les blogs les plus référencés par votre audience." />
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {displayFeeds.length} blogs
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-3 pb-4">
        <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-1">
            {currentItems.map((feed, index) => (
              <BlogItem
                key={feed.id}
                feed={feed}
                rank={(currentPage - 1) * itemsPerPage + index + 1}
              />
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-4 pt-4 border-t">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="w-full flex justify-start">
          <AIInsightBadge
            insight="Recent mentions focus on Glovo's expansion and partnerships, with positive sentiment indicating growing acceptance. Negative feedback on commissions suggests opportunities for improved vendor relations."
          />
        </div>
      </CardFooter>
    </Card>
  )
}