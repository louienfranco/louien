import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Github, Twitter, MapPin, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  const EMAIL = "you@example.com"; // replace with your email

  return (
    <section className="font-mono mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 mt-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Contact
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Have a question or proposal? I’d love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {/* Form */}
        <div className="md:col-span-7 rounded-2xl border p-5 md:p-6">
          <form
            action={`mailto:${EMAIL}`}
            method="post"
            encType="text/plain"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  className="bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What’s this about?"
                className="bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me a bit about your project or question…"
                rows={6}
                className="bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                Send message
              </Button>

              {/* Fallback: open mail client */}
              <Button asChild variant="outline">
                <Link href={`mailto:${EMAIL}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email me directly
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: This uses a mailto action. Replace with an API route or a
              form service if you need server-side handling.
            </p>
          </form>
        </div>

        {/* Info panel */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-2xl border p-5 md:p-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Contact
            </p>
            <div className="mt-3 space-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Anywhere, Remote
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border p-5 md:p-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Availability
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Open to freelance and collaboration opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
