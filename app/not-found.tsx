import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="font-mono min-h-screen grid place-items-center px-4">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2
            className="h-5 w-5 animate-spin text-primary"
            aria-hidden="true"
          />
          <span className="text-xs uppercase tracking-wide">404</span>
        </div>

        <h1 id="not-found-title" className="text-2xl md:text-3xl font-bold">
          Under Development
        </h1>

        <p className="text-sm text-muted-foreground">
          I’m working on it. Please check back soon.
        </p>

        <div className="pt-2">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
