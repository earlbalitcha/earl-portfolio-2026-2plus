"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import ProjectPopup from "../portfolio/project-popup";
import {fetchPortfolioData, type PortfolioItem} from "@/utils/csv-parser";
import SectionHeader from "./section-header";

const FEATURED_SLUGS = [
  "the-hostdesk",
  "csr-dashboard",
  "xmg-real-estate",
] as const;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null,
  );
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData();
        const featured = FEATURED_SLUGS.map((slug) =>
          data.find((p) => p.slug === slug),
        ).filter(Boolean) as PortfolioItem[];
        setProjects(featured);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative z-20 w-full scroll-mt-24 bg-background">
      <div className="absolute inset-0 bg-background" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />

      <div className="container relative py-20 md:py-24">
        <SectionHeader
          eyebrow="Work"
          title="Featured"
          titleAccent="projects"
          description="HostDesk, CSR Dashboard & XMG Real Estate."
        />

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({length: 3}).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex h-full flex-col animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="h-52 w-full shrink-0 bg-muted/40 sm:h-56" />
                  <div className="space-y-3 border-t border-border p-5">
                    <div className="h-3 w-24 rounded bg-muted/50" />
                    <div className="h-5 w-3/4 rounded bg-muted/50" />
                    <div className="h-4 w-full rounded bg-muted/40" />
                  </div>
                </div>
              ))
            : projects.map((project, index) => (
                <button
                  key={project.slug}
                  type="button"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/30"
                  onClick={() => setSelectedProject(project)}>
                  {/* Equal frame for every card; contain keeps the full screenshot */}
                  <div className="relative h-52 w-full shrink-0 bg-muted/50 sm:h-56">
                    <Image
                      src={
                        project.mainImage ||
                        "/placeholder.svg?height=600&width=800&query=project"
                      }
                      alt={project.title}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain object-center p-3"
                    />
                  </div>

                  <div className="flex flex-1 flex-col border-t border-border bg-card p-5 md:p-6">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                      0{index + 1} — Featured
                    </p>
                    <h3 className="font-display text-lg font-semibold leading-snug text-foreground md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {project.shortDescription}
                    </p>

                    {Array.isArray(project.categories) &&
                      project.categories.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.categories.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      View project
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/projects" className="btn-primary">
            View all projects
          </Link>
          <Link
            href="/start"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Start Shopify project →
          </Link>
        </div>
      </div>

      <ProjectPopup
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
