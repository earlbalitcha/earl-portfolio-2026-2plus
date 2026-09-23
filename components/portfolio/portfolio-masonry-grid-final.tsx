"use client";

import {useState} from "react";
import type {PortfolioItem} from "@/utils/csv-parser";
import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import ProjectPopup from "./project-popup";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

const cardSurface =
  "group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/20 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10 dark:to-muted/12";

export default function PortfolioMasonryGridFinal({items}: PortfolioGridProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center dark:bg-muted/10">
        <p className="text-sm font-medium text-foreground">No projects in this category yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">Try another filter or check back later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.slug}
            className={cardSurface}
            onClick={() => setSelectedProject(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(item);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.title}`}>
            <div className="relative overflow-hidden">
              <Image
                src={item.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                alt={item.title}
                width={600}
                height={400}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              {item.categories && item.categories.length > 1 ? (
                <div className="absolute left-3 top-3">
                  <span className="rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                    {item.categories[1].charAt(0).toUpperCase() + item.categories[1].slice(1)}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="flex flex-grow flex-col p-5 md:p-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.categories
                  ?.filter((c) => c !== "all")
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/70 bg-muted/50 px-2 py-0.5 text-xs font-medium text-foreground dark:bg-muted/30">
                      {tag}
                    </span>
                  ))}
              </div>
              <span className="mt-auto inline-flex items-center pt-5 text-sm font-semibold text-primary">
                View details
                <ArrowUpRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
