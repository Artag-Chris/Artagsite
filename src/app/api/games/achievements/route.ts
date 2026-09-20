import { NextRequest, NextResponse } from "next/server"
import { getSteamAchievements } from "@/lib/games/steam"

/**
 * GET /api/games/achievements?appid=12345
 * Real Steam achievements for one game (on-demand, cached 30 min).
 * Returns 200 with a `null`-ish status when Steam isn't configured or data is private.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const appid = parseInt(params.get("appid") ?? "", 10)

  if (!Number.isFinite(appid) || appid <= 0) {
    return NextResponse.json(
      { success: false, error: "Invalid appid" },
      { status: 400 }
    )
  }

  const result = await getSteamAchievements(appid)

  if (!result) {
    return NextResponse.json(
      { success: false, error: "Steam not configured or data unavailable" },
      { status: 404 }
    )
  }

  return NextResponse.json({ success: true, data: result }, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=7200",
    },
  })
}