"use client";

import {Layers, Gauge, Puzzle, ShieldCheck} from "lucide-react";

const principles = [
  {
    icon: Layers,
    title: "Full-stack systems",
    body: "UI, APIs, and data designed to work as one product.",
  },
  {
    icon: Gauge,
    title: "Measurable delivery",
    body: "Ship work that improves speed, clarity, or revenue.",
  },
  {
    icon: Puzzle,
    title: "Integration-ready",
    body: "Shopify, HubSpot, Stripe, Hostaway—connected cleanly.",
  },
  {
    icon: ShieldCheck,
    title: "Maintainable code",
    body: "Auth, RBAC, and structure that lasts after handoff.",
  },
];

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative z-20 w-full scroll-mt-24 bg-background">
      <div className="absolute inset-0 bg-background" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />

      <div className="container relative py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Approach
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            How I <span className="gradient-text">build</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({icon: Icon, title, body}) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-4 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
