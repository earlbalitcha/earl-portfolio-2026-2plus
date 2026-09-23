"use client";

import {useEffect, useState} from "react";
import {ArrowDownRight} from "lucide-react";
import ContactFormButton from "./contact-form-button";
import {scrollToSection} from "@/lib/section-nav";

const TECH = [
  "Shopify",
  "React",
  "Next.js",
  "Vue.js",
  "Node.js",
  "TypeScript",
];

const BEATS = [
  {label: "Shopify", value: "Custom storefronts, themes & redesigns"},
  {label: "Build", value: "Web apps, SaaS platforms & APIs"},
  {label: "Ship", value: "Dashboards, realtime systems & CMS"},
];

export default function Hero() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBeat((b) => (b + 1) % BEATS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 flex min-h-[100svh] items-center pb-20 pt-28">
      <div className="container grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
        <div className="animate-fade-up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Full Stack Developer · PH
          </p>
          <h1 className="font-display mt-4 font-semibold tracking-tight">
            <span className="block text-xl text-muted-foreground sm:text-2xl">
              Earl Gerald
            </span>
            <span className="mt-1 block text-5xl leading-[0.98] sm:text-6xl md:text-7xl">
              <span className="gradient-text">Balitcha</span>
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            3 years building scalable web apps and custom Shopify storefronts
            with React, Next.js, Vue.js, Node.js &amp; TypeScript.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TECH.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <ContactFormButton />
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary">
              See work <ArrowDownRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-7 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Focus
            </p>

            <div className="mt-6 min-h-[7.5rem]">
              <p
                key={BEATS[beat].label}
                className="font-display animate-fade-up text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {BEATS[beat].label}
              </p>
              <p
                key={BEATS[beat].value}
                className="mt-2 animate-fade-up text-lg text-muted-foreground md:text-xl">
                {BEATS[beat].value}
              </p>
            </div>

            <div className="mt-8 flex gap-2">
              {BEATS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show ${BEATS[i].label}`}
                  onClick={() => setBeat(i)}
                  className={`h-1.5 rounded-sm transition-all ${
                    i === beat
                      ? "w-8 bg-primary"
                      : "w-3 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                {n: "3+", l: "Years"},
                {n: "Shopify", l: "Stores"},
                {n: "SaaS", l: "Platforms"},
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="font-display text-2xl font-semibold gradient-text">
                    {s.n}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
