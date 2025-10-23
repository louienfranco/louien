"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sun,
  Moon,
  Menu,
  Home as HomeIcon,
  Mail,
  FolderGit2,
  LayoutPanelLeft,
  Sparkles,
  Github,
  type LucideIcon,
} from "lucide-react";

/* One source of truth */
type NavLink = { href: string; label: string; icon?: LucideIcon };

const links: NavLink[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/templates", label: "Templates", icon: LayoutPanelLeft },
  { href: "/showcase", label: "Showcase", icon: Sparkles },
  { href: "/contact", label: "Contact", icon: Mail },
];

/* Mobile sidebar (inline) */
function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-80 sm:w-96 p-0"
          aria-label="Mobile sidebar"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Mobile sidebar</SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <span
                className="inline-block h-5 w-5 rounded bg-foreground/90"
                aria-hidden
              />
              <span className="font-semibold tracking-tight">luwen</span>
            </div>

            <Separator />

            <nav className="px-2 py-2">
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    ].join(" ")}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {label}
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-2" />

            <div className="px-4 py-3">
              <Button asChild variant="outline" className="w-full gap-2">
                <Link
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>

            <div className="mt-auto px-4 pb-4 pt-2">
              <p className="text-xs text-muted-foreground">
                Tip: Theme toggle is in the top bar.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/* Floating “Dynamic Island” header */
export default function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="font-sans pointer-events-none fixed inset-x-0 top-3 z-50 sm:top-4 md:top-6">
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-4 pointer-events-auto">
        <div
          className={[
            "flex h-12 items-center gap-2 rounded-full border px-2 pl-3 pr-2",
            "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            scrolled ? "shadow-lg" : "shadow-sm",
          ].join(" ")}
        >
          <MobileSidebar />

          <Link
            href="/"
            className="font-semibold tracking-tight"
            aria-label="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M73.232,28.96c-5.631,0-10.194,4.567-10.194,10.197   c0,8.74-4.368,13.108-13.11,13.108c-8.737,0-13.111-4.369-13.111-13.108c0-5.63-4.563-10.197-10.194-10.197   s-10.194,4.567-10.194,10.197c0,5.631,4.563,10.198,10.194,10.198c8.742,0,13.111,4.369,13.111,13.111   c0,5.631,4.563,10.194,10.195,10.194c5.63,0,10.2-4.563,10.2-10.194c0-8.742,4.368-13.111,13.104-13.111   c5.637,0,10.2-4.567,10.2-10.198C83.433,33.527,78.869,28.96,73.232,28.96z"
                />
              </g>
            </svg>
          </Link>

          {/* Desktop nav uses the same links array (ignores icon) */}
          <nav className="mx-2 hidden md:flex items-center gap-4">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background text-foreground border border-border shadow-sm hover:bg-muted/60"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
