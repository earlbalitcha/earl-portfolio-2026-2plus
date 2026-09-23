"use client";

import {ShoppingBag, LayoutTemplate, Globe} from "lucide-react";
import Link from "next/link";
import SectionHeader from "./section-header";
import StartProjectBanner from "./start-project-banner";

const platforms = [
  {
    icon: ShoppingBag,
    title: "Shopify",
    body: "Liquid themes, Online Store 2.0, metafields, and API integrations.",
    tags: ["Liquid", "Themes", "GraphQL Admin", "Apps"],
  },
  {
    icon: LayoutTemplate,
    title: "WordPress",
    body: "Site builds, theme enhancements, and content workflows.",
    tags: ["Themes", "CMS", "Integrations"],
  },
  {
    icon: Globe,
    title: "Squarespace",
    body: "Marketing and business sites with ongoing maintenance.",
    tags: ["Landing pages", "Responsive", "SEO"],
  },
];

export default function ShopifySection() {
  return (
    <section id="shopify" className="my-20 scroll-mt-24 md:my-24">
      <SectionHeader
        eyebrow="CMS & Ecommerce"
        title="Platform"
        titleAccent="experience"
        description="Shopify, WordPress, and Squarespace—themes, customization, and API connections."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {platforms.map(({icon: Icon, title, body, tags}) => (
          <article
            key={title}
            className="surface-glass flex flex-col p-5 md:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-4 text-lg font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((label) => (
                <span
                  key={label}
                  className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                  {label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <StartProjectBanner className="mt-8 md:mt-10" />
      <p className="mt-3 text-center text-xs text-muted-foreground md:text-left">
        Prefer to reach out first?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contact me
        </Link>
        .
      </p>
    </section>
  );
}
