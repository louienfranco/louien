"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sun,
  Moon,
  Menu,
  Home as HomeIcon,
  Mail,
  FolderGit2,
  LayoutPanelLeft,
  Sparkles,
  Wrench,
  Github,
  CircleUser,
  type LucideIcon,
} from "lucide-react";

/* One source of truth */
type NavLink = { href: string; label: string; icon?: LucideIcon };

const links: NavLink[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: CircleUser },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
];

/* SSR-safe media query */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

/* Floating “Dynamic Island” header that expands on mobile */
export default function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMdUp = useMediaQuery("(min-width: 768px)");

  // Close island menu on route change or when resizing to md+
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    if (isMdUp && mobileOpen) setMobileOpen(false);
  }, [isMdUp, mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure collapsible content height for smooth max-height animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setContentH(el.scrollHeight);
    measure();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, []);

  return (
    <header className="font-mono pointer-events-none fixed inset-x-0 top-3 z-50 sm:top-4 md:top-6">
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-4 pointer-events-auto">
        <div
          className={[
            "relative overflow-hidden border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "transition-[box-shadow,border-radius] duration-300",
            scrolled ? "shadow-lg" : "shadow-sm",
            mobileOpen ? "rounded-2xl" : "rounded-[18px]", // keep shape, avoid circle
            "w-full", // full width inside the container
          ].join(" ")}
        >
          {/* Top bar row */}
          <div className="flex h-12 items-center gap-2 px-2 pl-3 pr-2">
            {/* Mobile toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={mobileOpen}
                aria-controls="island-mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Logo */}
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
                    d="M73.232,28.96c-5.631,0-10.194,4.567-10.194,10.197 c0,8.74-4.368,13.108-13.11,13.108c-8.737,0-13.111-4.369-13.111-13.108c0-5.63-4.563-10.197-10.194-10.197 s-10.194,4.567-10.194,10.197c0,5.631,4.563,10.198,10.194,10.198c8.742,0,13.111,4.369,13.111,13.111 c0,5.631,4.563,10.194,10.195,10.194c5.63,0,10.2-4.563,10.2-10.194c0-8.742,4.368-13.111,13.104-13.111 c5.637,0,10.2-4.567,10.2-10.198C83.433,33.527,78.869,28.96,73.232,28.96z"
                  />
                </g>
              </svg>
            </Link>

            {/* Desktop nav */}
            {/* <nav className="mx-2 hidden md:flex flex-1 items-center justify-center gap-3">
              {links.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "rounded-lg px-3 py-1.5 text-sm transition-colors",
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
            </nav> */}

            <nav className="mx-2 hidden md:flex flex-1 items-center justify-center gap-3">
              {links.map(({ href, label }) => {
                const active = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative rounded-lg px-3 py-1.5 text-sm",
                      "transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    ].join(" ")}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-muted"
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          bounce: 0.25,
                        }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Theme toggle */}
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-background text-foreground border border-border shadow-sm hover:bg-muted/60"
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

          {/* Collapsible island content (mobile) */}
          <div
            id="island-mobile-nav"
            className="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
            style={{
              maxHeight: mobileOpen ? contentH : 0,
              opacity: mobileOpen ? 1 : 0,
            }}
            aria-hidden={!mobileOpen}
          >
            <div ref={contentRef}>
              <Separator />
              <nav className="px-2 py-2">
                {links.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={[
                        "flex items-center gap-3 rounded-md px-3 py-2 my-2 text-sm transition-colors",
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

              <div className="px-4 pb-3">
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
            </div>
          </div>
          {/* End collapsible */}
        </div>
      </div>
    </header>
  );
}
