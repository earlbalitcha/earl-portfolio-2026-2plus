"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Linkedin, Mail} from "lucide-react";
import {navigateHome, navigateToSection} from "@/lib/section-nav";

const social = [
  {
    href: "https://www.linkedin.com/in/earl-gerald-balitcha-a58b73407",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {href: "mailto:earlbalitcha@gmail.com", label: "Email", icon: Mail},
] as const;

const quickLinks = [
  {type: "home" as const, label: "Home"},
  {type: "route" as const, href: "/projects", label: "Projects"},
  {type: "section" as const, sectionId: "about", label: "About"},
  {type: "section" as const, sectionId: "approach", label: "Approach"},
  {type: "route" as const, href: "/start", label: "Project brief"},
  {type: "route" as const, href: "/contact", label: "Contact"},
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className="relative z-20 w-full border-t border-border bg-background pt-12 pb-10 md:pt-14 md:pb-12">
      <div className="absolute inset-0 bg-background" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden
      />

      <div className="container relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Earl Balitcha
            </p>
            <p className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              <span className="gradient-text">Full Stack</span>{" "}
              <span className="text-foreground">Developer</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Web apps, APIs, and dashboards with React, Next.js, Vue.js &
              TypeScript—plus Shopify, WordPress, and Squarespace when the scope
              needs a CMS or storefront.
            </p>
            <p className="mt-8 text-xs text-muted-foreground">
              © {year} Earl Gerald R. Balitcha. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:flex-col lg:items-end">
            <nav aria-label="Footer" className="flex flex-wrap gap-2">
              {quickLinks.map((item) => {
                if (item.type === "home") {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => navigateHome(pathname, router)}
                      className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted/50 hover:text-foreground">
                      {item.label}
                    </button>
                  );
                }

                if (item.type === "section") {
                  return (
                    <button
                      key={item.sectionId}
                      type="button"
                      onClick={() =>
                        navigateToSection(item.sectionId, pathname, router)
                      }
                      className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted/50 hover:text-foreground">
                      {item.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted/50 hover:text-foreground">
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
              {social.map(({href, label, icon: Icon}) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                  aria-label={label}>
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
