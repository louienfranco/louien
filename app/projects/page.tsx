import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work and experiments.",
};

type Project = {
  title: string;
  description: string;
  year?: string;
  tags: string[];
  repo?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: "UI Blocks",
    description: "Reusable shadcn/ui blocks for fast prototyping.",
    year: "2025",
    tags: ["Next.js", "shadcn/ui", "Tailwind"],
    repo: "https://github.com/louienfranco/",
    demo: "#",
  },
  {
    title: "Portfolio",
    description: "Minimal developer portfolio with dynamic island header.",
    year: "2025",
    tags: ["Next.js", "App Router"],
    repo: "https://github.com/louienfranco/",
    demo: "#",
  },
  {
    title: "MDX Blog",
    description: "Blog system with MDX, tags, and RSS.",
    year: "2024",
    tags: ["MDX", "Contentlayer"],
    repo: "https://github.com/louienfranco/",
    demo: "#",
  },
  {
    title: "Realtime Chat",
    description: "Socket-powered chat with presence and reactions.",
    year: "2024",
    tags: ["WebSocket", "Prisma"],
    repo: "https://github.com/louienfranco/",
  },
  {
    title: "Design Tokens",
    description: "Systemized colors, spacing, and typography tokens.",
    year: "2023",
    tags: ["Design System"],
    repo: "https://github.com/louienfranco/",
  },
  {
    title: "Playground",
    description: "Small experiments and UI micro-interactions.",
    year: "WIP",
    tags: ["Experiments"],
    demo: "#",
  },
];

export default function ProjectPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 mt-8">
      <header className="mb-6 md:mb-8">
        <h1 className="font-mono text-3xl md:text-5xl font-semibold tracking-tight">
          Projects
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A collection of work, experiments, and open-source bits.
        </p>
      </header>

      <Separator className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((p) => (
          <article
            key={p.title}
            className="group rounded-xl border p-5 transition-colors hover:bg-muted/30"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base md:text-lg font-semibold">{p.title}</h2>
              <div className="flex items-center gap-1">
                {p.repo && (
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    aria-label={`${p.title} GitHub`}
                  >
                    <Link href={p.repo} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {p.demo && (
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    aria-label={`${p.title} Demo`}
                  >
                    <Link href={p.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {p.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{p.year ?? "—"}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        More projects coming soon.
      </div>
    </section>
  );
}
