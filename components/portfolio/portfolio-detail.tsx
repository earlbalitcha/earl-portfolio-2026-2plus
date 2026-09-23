"use client";

import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ExternalLink} from "lucide-react";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import type {PortfolioItem} from "@/utils/csv-parser";

interface PortfolioDetailPageProps {
  project: PortfolioItem;
}

const panel =
  "rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/20 shadow-md dark:to-muted/12";

export default function PortfolioDetailPage({project}: PortfolioDetailPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/[0.1] to-transparent dark:from-primary/10"
          aria-hidden
        />
        <div className="container relative py-10 md:py-14">
          <Link
            href="/projects"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary">
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" aria-hidden />
            Back to projects
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <div className={`${panel} overflow-hidden p-2 sm:p-3`}>
                <Image
                  src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="max-h-[min(70vh,640px)] w-full rounded-xl object-contain"
                  priority
                />
              </div>

              <article className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:font-semibold prose-a:text-primary">
                <div dangerouslySetInnerHTML={{__html: project.content}} />
              </article>
            </div>

            <div className="lg:col-span-1">
              <div className={`${panel} sticky top-24 p-6 md:p-7`}>
                <div className="flex gap-4">
                  {project.logo ? (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/40 p-2">
                      <Image
                        src={project.logo || "/placeholder.svg"}
                        alt={`${project.title} logo`}
                        width={64}
                        height={64}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
                      {project.title}
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.shortDescription}</p>
                  </div>
                </div>

                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-[0.97]">
                    Visit live project
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}

                <div className="mt-8 border-t border-border/60 pt-6">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.categories
                      ?.filter((cat) => cat !== "all")
                      .map((category) => (
                        <span
                          key={category}
                          className="rounded-md border border-border/70 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground dark:bg-muted/30">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
