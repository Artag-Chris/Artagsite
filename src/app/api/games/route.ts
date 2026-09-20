import { NextRequest, NextResponse } from "next/server"
import { getUnifiedLibrary } from "@/lib/games/merge"
import type { PlatformFilter, SortOption } from "@/lib/games/types"

const VALID_PLATFORMS = ["all", "steam", "epic", "gog"] as const
const VALID_SORTS = ["playtime", "rating", "title"] as const
const MAX_PER_PAGE = 50

/**
 * GET /api/games?platform=all|steam|epic|gog&sort=playtime|rating|title&page=1&perPage=12
 * Unified, paginated, sortable game library (Steam live + curated Epic/GOG via RAWG).
 * CDN-cached 15 min; upstreams are in-memory cached as well (see src/lib/games/cache.ts).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const platformParam = params.get("platform") ?? "all"
  const sortParam = params.get("sort") ?? "playtime"
  const platform = (
    VALID_PLATFORMS.includes(platformParam as (typeof VALID_PLATFORMS)[number])
      ? platformParam
      : "all"
  ) as PlatformFilter
  const sort = (
    VALID_SORTS.includes(sortParam as (typeof VALID_SORTS)[number])
      ? sortParam
      : "playtime"
  ) as SortOption

  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1)
  const perPage = Math.min(
    MAX_PER_PAGE,
    Math.max(1, parseInt(params.get("perPage") ?? "12", 10) || 12)
  )

  const data = await getUnifiedLibrary({ platform, sort, page, perPage })

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  })
}