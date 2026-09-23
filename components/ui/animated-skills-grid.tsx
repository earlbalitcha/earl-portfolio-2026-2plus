"use client";

import type {LucideIcon} from "lucide-react";
import {
  Atom,
  Hexagon,
  Database,
  Wind,
  ShoppingBag,
  Container,
  Cloud,
  GitBranch,
  Smartphone,
  Server,
  Braces,
  Code2,
  Boxes,
  Workflow,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {ScrollPinned} from "@/components/landing-page/scroll-pinned";

type StackItem = {
  name: string;
  mark?: string;
  markClass?: string;
  icon?: LucideIcon;
  iconClass?: string;
};

type Layer = {
  id: string;
  title: string;
  blurb: string;
  items: StackItem[];
};

const LAYERS: Layer[] = [
  {
    id: "frontend",
    title: "Interface",
    blurb: "Responsive UIs with React, Next.js, Vue, and modern CSS systems.",
    items: [
      {name: "TypeScript", mark: "TS", markClass: "bg-[#3178C6] text-white"},
      {name: "JavaScript", mark: "JS", markClass: "bg-[#F7DF1E] text-black"},
      {name: "React", icon: Atom, iconClass: "text-[#61DAFB]"},
      {name: "Next.js", mark: "N", markClass: "bg-foreground text-background"},
      {name: "Vue.js", mark: "V", markClass: "bg-[#42B883] text-white"},
      {name: "Tailwind", icon: Wind, iconClass: "text-[#38BDF8]"},
      {name: "Bootstrap", mark: "B", markClass: "bg-[#7952B3] text-white"},
      {
        name: "Chakra / MUI",
        mark: "UI",
        markClass: "bg-primary text-primary-foreground text-[10px]",
      },
      {name: "React Native", icon: Smartphone, iconClass: "text-[#61DAFB]"},
    ],
  },
  {
    id: "backend",
    title: "Systems",
    blurb: "APIs, data, auth, realtime, and Python for automation.",
    items: [
      {name: "Node.js", icon: Hexagon, iconClass: "text-[#5FA04E]"},
      {name: "Express", icon: Server, iconClass: "text-foreground"},
      {name: "Python", mark: "PY", markClass: "bg-[#3776AB] text-white"},
      {name: "GraphQL", icon: Braces, iconClass: "text-[#E10098]"},
      {name: "REST APIs", icon: Workflow, iconClass: "text-primary"},
      {
        name: "Socket.IO",
        mark: "IO",
        markClass: "bg-foreground text-background text-[10px]",
      },
      {name: "PostgreSQL", icon: Database, iconClass: "text-[#336791]"},
      {
        name: "MySQL",
        mark: "SQL",
        markClass: "bg-[#4479A1] text-white text-[10px]",
      },
      {
        name: "Prisma",
        mark: "ORM",
        markClass: "bg-foreground text-background text-[10px]",
      },
    ],
  },
  {
    id: "commerce",
    title: "CMS & Commerce",
    blurb: "Shopify, WordPress, Squarespace, and payment integrations.",
    items: [
      {name: "Shopify", icon: ShoppingBag, iconClass: "text-[#95BF47]"},
      {
        name: "Shopify Liquid",
        mark: "LQ",
        markClass: "bg-[#95BF47] text-black text-[10px]",
      },
      {
        name: "WordPress",
        mark: "WP",
        markClass: "bg-[#21759B] text-white text-[10px]",
      },
      {
        name: "Squarespace",
        mark: "SQ",
        markClass: "bg-foreground text-background text-[10px]",
      },
      {
        name: "Stripe",
        mark: "PAY",
        markClass: "bg-[#635BFF] text-white text-[10px]",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    blurb: "Third-party APIs that connect product workflows end to end.",
    items: [
      {
        name: "HubSpot",
        mark: "HS",
        markClass: "bg-[#FF7A59] text-white text-[10px]",
      },
      {
        name: "ClickUp",
        mark: "CU",
        markClass: "bg-[#7B68EE] text-white text-[10px]",
      },
      {
        name: "Hostaway",
        mark: "HA",
        markClass: "bg-primary text-primary-foreground text-[10px]",
      },
      {
        name: "Azure Blob",
        mark: "AZ",
        markClass: "bg-[#0078D4] text-white text-[10px]",
      },
      {
        name: "Microsoft Graph",
        mark: "MG",
        markClass: "bg-[#00A4EF] text-white text-[10px]",
      },
      {
        name: "Postman",
        mark: "API",
        markClass: "bg-[#FF6C37] text-white text-[10px]",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    blurb: "Containers, process managers, and CI/CD for reliable releases.",
    items: [
      {name: "Docker", icon: Container, iconClass: "text-[#2496ED]"},
      {name: "GitHub Actions", icon: GitBranch, iconClass: "text-foreground"},
      {name: "Vercel", icon: Cloud, iconClass: "text-foreground"},
      {
        name: "PM2",
        mark: "PM2",
        markClass: "bg-[#2B037A] text-white text-[10px]",
      },
      {
        name: "Nginx",
        mark: "NG",
        markClass: "bg-[#009639] text-white text-[10px]",
      },
      {name: "Git", icon: Boxes, iconClass: "text-[#F05032]"},
    ],
  },
];

function Mark({item}: {item: StackItem}) {
  if (item.mark) {
    return (
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md text-[11px] font-bold",
          item.markClass,
        )}>
        {item.mark}
      </span>
    );
  }
  const Icon = item.icon ?? Code2;
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/50">
      <Icon className={cn("h-4 w-4", item.iconClass)} strokeWidth={1.75} />
    </span>
  );
}

function SectionIntro({forPinned}: {forPinned?: boolean}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Technology
      </p>
      <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Built in <span className="gradient-text">layers</span>
      </h2>
      <p className="mt-3 text-sm text-muted-foreground md:text-base">
        {forPinned
          ? "Scroll through each layer — frontend, backend, CMS, integrations, and delivery."
          : "Frontend, backend, CMS, integrations, and delivery — each layer fully listed below."}
      </p>
    </div>
  );
}

function LayerCard({
  layer,
  index,
  total,
}: {
  layer: Layer;
  index: number;
  total: number;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-violet-400/80 to-transparent" />
      <div className="border-b border-border px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}{" "}
          — {layer.title}
        </p>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          {layer.blurb}
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
        {layer.items.map((item, i) => (
          <li
            key={item.name}
            className="flex items-center gap-3 bg-card px-4 py-3.5 sm:px-5">
            <Mark item={item} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{item.name}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {layer.title} · {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Mobile/tablet: stacked full cards (no pin) so content is never clipped.
 * Desktop (lg+): scroll-pinned layer switcher.
 */
export function AnimatedSkillsGrid() {
  return (
    <section id="skills" className="my-20 scroll-mt-24 md:my-28">
      {/* Natural scroll stack — phones & tablets */}
      <div className="container lg:hidden">
        <SectionIntro />
        <div className="mt-8 space-y-4 md:mt-10 md:space-y-5">
          {LAYERS.map((layer, index) => (
            <LayerCard
              key={layer.id}
              layer={layer}
              index={index}
              total={LAYERS.length}
            />
          ))}
        </div>
      </div>

      {/* Scroll-pinned layers — large screens only */}
      <div className="hidden lg:block">
        <ScrollPinned
          itemCount={LAYERS.length}
          header={<SectionIntro forPinned />}>
          {({active, scrollToIndex}) => {
            const current = LAYERS[active];
            return (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-8">
                <div
                  className="flex flex-col gap-2"
                  role="tablist"
                  aria-label="Stack layers">
                  {LAYERS.map((layer, i) => (
                    <button
                      key={layer.id}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => scrollToIndex(i)}
                      className={cn(
                        "flex items-start gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                        i === active
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:text-foreground",
                      )}>
                      <span
                        className={cn(
                          "font-display mt-0.5 text-xs tabular-nums",
                          i === active
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium">{layer.title}</span>
                    </button>
                  ))}
                </div>

                <div
                  key={current.id}
                  role="tabpanel"
                  className="relative animate-fade-up overflow-hidden rounded-xl border border-border bg-card">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-violet-400/80 to-transparent" />
                  <div className="border-b border-border px-6 py-5 md:px-8 md:py-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(LAYERS.length).padStart(2, "0")} — {current.title}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground md:text-base">
                      {current.blurb}
                    </p>
                  </div>
                  <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                    {current.items.map((item, i) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-3 bg-card px-5 py-4 transition-colors hover:bg-muted/30 md:px-6">
                        <Mark item={item} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                            {current.title} · {String(i + 1).padStart(2, "0")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }}
        </ScrollPinned>
      </div>
    </section>
  );
}
