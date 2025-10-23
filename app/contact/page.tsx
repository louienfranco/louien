import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Github, Twitter, MapPin } from "lucide-react";
import ContactForm from "./_form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  const EMAIL = "louienfrancoaxalan@gmail.com";

  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14">
      <header className="mb-6 md:mb-8 mt-10 sm:mt-10 lg:mt-10">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
          Contact
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Have a question or proposal? I’d love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {/* Form (client) */}
        <div className="md:col-span-7 rounded-2xl border p-5 md:p-6">
          <ContactForm email={EMAIL} />
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
