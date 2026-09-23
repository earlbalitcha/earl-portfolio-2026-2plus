"use client";

import {
  Mail,
  MapPin,
  Clock,
  CircleDot,
  Linkedin,
  ArrowRight,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import ContactForm from "@/components/landing-page/contact-form";

const EMAIL = "earlbalitcha@gmail.com";
const PHONE = "+63 926 787 6389";
const LOCATION = "Bulo, Victoria, Tarlac · PH";
const LINKEDIN =
  "https://www.linkedin.com/in/earl-gerald-balitcha-a58b73407";

const info = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    accent: true,
  },
  {
    label: "Phone",
    value: PHONE,
    href: "tel:+639267876389",
    icon: Phone,
    accent: false,
  },
  {
    label: "Location",
    value: LOCATION,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION)}`,
    icon: MapPin,
    accent: false,
  },
  {
    label: "Response",
    value: "Usually within 24–48 hrs",
    href: null,
    icon: Clock,
    accent: false,
  },
  {
    label: "Availability",
    value: "Open to roles & contracts",
    href: null,
    icon: CircleDot,
    accent: true,
  },
] as const;

const social = [
  {
    name: "LinkedIn",
    handle: "earl-gerald-balitcha",
    href: LINKEDIN,
    icon: Linkedin,
  },
  {
    name: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
] as const;

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="relative z-10">
        <div className="container pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Contact
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Let&apos;s <span className="gradient-text">talk</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
              Roles, contracts, or product builds — tell me what you&apos;re
              working on and I&apos;ll get back to you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Form panel */}
            <section className="rounded-xl border border-border bg-card p-6 md:p-8 lg:col-span-7">
              <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                I read every message personally. Prefer email? Use the details
                on the right.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </section>

            {/* Side panel */}
            <aside className="flex flex-col gap-6 lg:col-span-5">
              <section className="rounded-xl border border-border bg-card p-6 md:p-7">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Contact information
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Prefer to reach out directly? Here&apos;s where to find me.
                </p>
                <ul className="mt-6 space-y-4">
                  {info.map(({label, value, href, icon: Icon, accent}) => {
                    const inner = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-primary">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {label}
                          </span>
                          <span
                            className={
                              accent
                                ? "mt-0.5 block truncate text-sm font-medium text-primary"
                                : "mt-0.5 block truncate text-sm font-medium text-foreground"
                            }>
                            {value}
                          </span>
                        </span>
                      </>
                    );

                    return (
                      <li key={label}>
                        {href ? (
                          <a
                            href={href}
                            {...(href.startsWith("http")
                              ? {target: "_blank", rel: "noopener noreferrer"}
                              : {})}
                            className="flex items-center gap-3 rounded-md transition-opacity hover:opacity-90">
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-3">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-6 md:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Find me online
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {social.map(({name, handle, href, icon: Icon}) => (
                    <a
                      key={name}
                      href={href}
                      {...(href.startsWith("http")
                        ? {target: "_blank", rel: "noopener noreferrer"}
                        : {})}
                      className="flex items-center gap-3 rounded-md border border-border bg-muted/20 px-3 py-3 transition-colors hover:border-primary/35 hover:bg-muted/40">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-foreground">
                          {name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {handle}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-primary/25 bg-primary/10 p-6 md:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Ready to begin a project?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Planning a Shopify store build or redesign? Submit a short
                  project brief — approximately 5–8 minutes. Store credentials
                  are never requested.
                </p>
                <Link
                  href="/start"
                  className="btn-primary mt-5 inline-flex items-center gap-2">
                  Begin project brief
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
