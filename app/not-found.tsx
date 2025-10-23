import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[100svh] grid place-items-center px-6 py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.08),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-xl text-center space-y-5">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
          <SearchX className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          404 Not Found
        </div>

        {/* Big 404 */}
        <div className="text-7xl md:text-8xl font-black tracking-tight">
          <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Title */}
        <h1 id="not-found-title" className="text-2xl md:text-3xl font-bold">
          Page not found
        </h1>

        {/* Help text */}
        <p className="text-sm md:text-base text-muted-foreground">
          The page you’re looking for doesn’t exist or may have moved. Check the
          URL or head back home.
        </p>

        {/* Actions */}
        <div className="pt-2">
          <Button asChild>
            <Link href="/" aria-label="Back to Home">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
