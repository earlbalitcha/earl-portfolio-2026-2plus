"use client";

import {Check} from "lucide-react";
import SectionHeader from "./section-header";
import {cn} from "@/lib/utils";
import {ScrollPinned} from "./scroll-pinned";

const responsibilityGroups = [
  {
    title: "Product",
    items: [
      "React, Next.js, Vue.js & TypeScript apps",
      "SaaS platforms & enterprise dashboards",
      "React Native (Expo)",
      "Shopify, WordPress & Squarespace",
    ],
  },
  {
    title: "APIs",
    items: [
      "REST & GraphQL APIs",
      "Auth systems & realtime (Socket.IO)",
      "PostgreSQL / MySQL + Prisma",
      "Stripe, HubSpot, ClickUp, Hostaway & more",
    ],
  },
  {
    title: "Delivery",
    items: [
      "Docker, Vercel, PM2 & Nginx",
      "CI/CD with GitHub Actions",
      "Performance & lazy loading",
      "Python for automation where needed",
    ],
  },
];

const majorProjects = [
  {
    title: "The HostDesk",
    summary:
      "Main multilingual frontend platform with AI tools and third-party integrations.",
    features: [
      "Multilingual UI",
      "AI tools",
      "Integrations",
      "Responsive",
      "Production",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "APIs"],
  },
  {
    title: "CSR Dashboard",
    summary:
      "Enterprise portal with ticketing, chat, and realtime operational workflows.",
    features: [
      "Ticketing",
      "Live chat",
      "Realtime",
      "Auth",
      "Workflows",
      "Ops",
    ],
    tech: ["Next.js", "TypeScript", "Socket.IO", "Node.js", "PostgreSQL"],
  },
  {
    title: "XMG Real Estate",
    summary:
      "Business website for real estate services and lead generation.",
    features: ["Lead gen", "Services", "Responsive", "CMS", "SEO"],
    tech: ["Next.js", "TypeScript"],
  },
  {
    title: "Property & CRM Integrations",
    summary:
      "Connected Hostaway, Stripe, HubSpot, ClickUp, Azure, and Microsoft Graph into product flows.",
    features: [
      "Hostaway",
      "Stripe",
      "HubSpot",
      "ClickUp",
      "Azure Blob",
      "Graph API",
    ],
    tech: ["Node.js", "REST", "Webhooks"],
  },
  {
    title: "CMS & Ecommerce",
    summary:
      "Shopify Liquid themes, WordPress, and Squarespace sites with API integrations.",
    features: [
      "Shopify Liquid",
      "Theme work",
      "WordPress",
      "Squarespace",
      "Integrations",
    ],
    tech: ["Shopify", "Liquid", "WordPress", "Squarespace"],
  },
  {
    title: "Realtime Systems",
    summary:
      "Socket.IO-powered chat, live dashboards, and instant notifications.",
    features: ["Live chat", "Dashboard sync", "Alerts", "Monitoring"],
    tech: ["Socket.IO", "Node.js", "React"],
  },
];

export default function ProfessionalExperience() {
  return (
    <section id="experience" className="my-20 scroll-mt-24 md:my-24">
      <div className="container">
        <SectionHeader
          eyebrow="Career"
          title="Professional"
          titleAccent="experience"
          description="Falcon Global Services · Apr 2023–Apr 2026 · Full Stack Developer"
        />

        <div className="surface-glass flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
              Full Stack Developer
            </h3>
            <p className="text-muted-foreground">
              Falcon Global Services · Tarlac City
            </p>
          </div>
          <p className="text-sm font-medium text-primary">Apr 2023 – Apr 2026</p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {responsibilityGroups.map((group) => (
            <div key={group.title} className="surface-glass p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {group.title}
              </p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        {/* Mobile / tablet — full stacked cards, no pin */}
        <div className="container lg:hidden">
          <h4 className="font-display text-lg font-semibold text-foreground">
            Major projects
          </h4>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Highlights from production work at Falcon Global Services.
          </p>
          <div className="mt-6 space-y-4">
            {majorProjects.map((project, index) => (
              <article
                key={project.title}
                className="surface-glass p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(majorProjects.length).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop — scroll-pinned */}
        <div className="hidden lg:block">
          <ScrollPinned
            itemCount={majorProjects.length}
            header={
              <>
                <h4 className="font-display text-lg font-semibold text-foreground md:text-xl">
                  Major projects
                </h4>
                <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
                  Pinned highlights from production work at Falcon Global
                  Services.
                </p>
              </>
            }>
            {({active, scrollToIndex}) => {
              const project = majorProjects[active];
              return (
                <div className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-8">
                  <div className="flex flex-col gap-2">
                    {majorProjects.map((p, i) => (
                      <button
                        key={p.title}
                        type="button"
                        onClick={() => scrollToIndex(i)}
                        className={cn(
                          "rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors",
                          i === active
                            ? "border-primary/40 bg-primary/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:text-foreground",
                        )}>
                        {p.title}
                      </button>
                    ))}
                  </div>

                  <div
                    key={project.title}
                    className="surface-glass animate-fade-up p-5 md:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(majorProjects.length).padStart(2, "0")}
                    </p>
                    <h3 className="font-display mt-2 text-xl font-semibold text-foreground md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }}
          </ScrollPinned>
        </div>
      </div>
    </section>
  );
}
