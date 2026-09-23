"use client";

import {Check, GraduationCap, Briefcase} from "lucide-react";
import SectionHeader from "./section-header";

const industries = [
  "SaaS & internal platforms",
  "Ecommerce & CMS",
  "Hospitality & property ops",
  "CRM & automation",
];

const strengths = [
  "Full-stack React / Next / Vue / Node",
  "REST, GraphQL & realtime",
  "Shopify, WordPress & Squarespace",
  "Dashboards & third-party APIs",
];

const path = [
  {
    title: "Full Stack Developer",
    place: "Falcon Global Services · Apr 2023–Apr 2026 · Tarlac City",
    icon: Briefcase,
  },
  {
    title: "BS Information Technology",
    place: "Central Luzon State University · Graduated 2023",
    icon: GraduationCap,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="my-20 scroll-mt-24 md:my-24">
      <SectionHeader
        eyebrow="Profile"
        title="About"
        titleAccent="me"
        description="Web apps, dashboards, SaaS platforms, and CMS-driven products."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="surface-glass p-6 md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Summary
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Full Stack Developer with{" "}
            <span className="font-semibold text-foreground">3 years</span> of
            experience building scalable web applications using{" "}
            <span className="font-semibold text-foreground">
              React, Next.js, Vue.js, Node.js, TypeScript, and Python
            </span>
            . Comfortable across frontend and backend, API integrations, and CMS
            platforms including Shopify, WordPress, and Squarespace—shipping
            dashboards, SaaS platforms, and automation-driven apps with realtime
            features and CI/CD.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
            {[
              {n: "3+", l: "Years"},
              {n: "FS", l: "Full stack"},
              {n: "CI/CD", l: "Deploys"},
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-2xl font-semibold gradient-text">
                  {s.n}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="surface-glass p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Industries
            </p>
            <ul className="mt-3 space-y-2">
              {industries.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-glass p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Strengths
            </p>
            <ul className="mt-3 space-y-2">
              {strengths.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {path.map(({title, place, icon: Icon}) => (
          <div
            key={title}
            className="surface-glass flex items-start gap-3 p-4 md:p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{place}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
