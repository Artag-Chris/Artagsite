import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 gap-6 px-4">
      <span className="text-8xl font-display font-bold text-cyan-400">404</span>
      <h2 className="text-2xl font-display font-bold text-zinc-100 text-center">
        Page not found
      </h2>
      <p className="text-zinc-400 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 mt-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-lg transition-colors"
        >
          <Home className="w-4 h-4" />
          Go home
        </Link>
      </div>
    </div>
  )
}
