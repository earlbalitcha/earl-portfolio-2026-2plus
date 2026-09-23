"use client";

import {useEffect, useId, useState} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {ArrowRight, X} from "lucide-react";
import {landingProjectsNav, landingScrollNavItems} from "./nav-config";
import {cn} from "@/lib/utils";
import {navigateToSection} from "@/lib/section-nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Soft, deliberate ease — open should feel composed, not snappy */
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const PANEL_MS = 720;
const EXIT_MS = 560;

export default function MobileMenu({isOpen, onClose}: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setVisible(true));
      });
      return () => window.cancelAnimationFrame(id);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const projectsActive =
    pathname === "/projects" || pathname?.startsWith("/projects/");
  const contactActive = pathname === "/contact";

  return (
    <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
      {/* Backdrop — fades in slightly ahead of the panel */}
      <button
        type="button"
        aria-label="Close menu"
        className={cn(
          "absolute inset-0 bg-black/55 backdrop-blur-[10px] transition-opacity",
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          transitionDuration: visible ? `${PANEL_MS}ms` : `${EXIT_MS}ms`,
          transitionTimingFunction: EASE,
        }}
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-[min(100%,19.5rem)] flex-col border-l border-white/[0.08] bg-[#0c0c0c] will-change-transform sm:w-[21rem]",
          "transition-transform",
          visible ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          transitionDuration: visible ? `${PANEL_MS}ms` : `${EXIT_MS}ms`,
          transitionTimingFunction: EASE,
          boxShadow: "-32px 0 64px rgba(0,0,0,0.45)",
        }}>
        {/* Quiet atmosphere — no loud glows */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, hsl(243 40% 16% / 0.35) 0%, transparent 28%), linear-gradient(0deg, hsl(0 0% 4% / 0.9) 0%, transparent 22%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Header */}
        <header className="relative flex items-center justify-between gap-3 px-5 pb-5 pt-[max(1.15rem,env(safe-area-inset-top))] pr-[max(1.25rem,env(safe-area-inset-right))]">
          <div
            className={cn(
              "min-w-0 transition-all",
              visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
            style={{
              transitionDuration: `${PANEL_MS}ms`,
              transitionTimingFunction: EASE,
              transitionDelay: visible ? "120ms" : "0ms",
            }}>
            <p
              id={titleId}
              className="text-[10px] font-medium uppercase tracking-[0.26em] text-primary/90">
              Menu
            </p>
            <p className="mt-1.5 truncate text-[13px] font-medium tracking-wide text-foreground/80">
              Earl Gerald Balitcha
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-foreground"
            aria-label="Close menu">
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </header>

        <div className="relative mx-5 h-px bg-white/[0.07]" />

        {/* Links — refined scale, slower cascade */}
        <nav
          className="relative flex-1 overflow-y-auto px-3 py-5"
          aria-label="Primary">
          <ul className="space-y-0.5">
            {landingScrollNavItems.map((item, index) => {
              const key = "href" in item ? item.href : item.sectionId;
              const delay = visible ? 180 + index * 70 : 0;
              const active =
                "href" in item &&
                ((item.href === "/contact" && contactActive) ||
                  (item.href === "/projects" && projectsActive));

              const className = cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                "transition-[opacity,transform,background-color,color] duration-500",
                active
                  ? "bg-white/[0.05] text-foreground"
                  : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0",
              );

              const style = {
                transitionTimingFunction: EASE,
                transitionDelay: `${delay}ms`,
              } as const;

              const content = (
                <>
                  <span
                    className={cn(
                      "w-5 shrink-0 text-[10px] font-medium tabular-nums tracking-wider",
                      active ? "text-primary" : "text-white/25",
                    )}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] font-medium tracking-wide">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "h-px w-0 bg-primary/70 transition-all duration-500 group-hover:w-4",
                      active && "w-4",
                    )}
                  />
                </>
              );

              return (
                <li key={key}>
                  {"href" in item ? (
                    <Link
                      href={item.href}
                      className={className}
                      style={style}
                      onClick={onClose}>
                      {content}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={className}
                      style={style}
                      onClick={() => {
                        navigateToSection(item.sectionId, pathname, router);
                        onClose();
                      }}>
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer actions — quiet, not a loud card */}
        <footer
          className={cn(
            "relative border-t border-white/[0.07] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 transition-all",
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
          style={{
            transitionDuration: `${PANEL_MS}ms`,
            transitionTimingFunction: EASE,
            transitionDelay: visible
              ? `${180 + landingScrollNavItems.length * 70}ms`
              : "0ms",
          }}>
          <Link
            href="/start"
            onClick={onClose}
            className="flex items-center justify-between gap-3 rounded-lg border border-primary/35 bg-primary/15 px-3.5 py-3 text-[13px] font-medium tracking-wide text-primary transition-colors duration-300 hover:border-primary/50 hover:bg-primary/20">
            <span>Begin project brief</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-70" strokeWidth={1.5} />
          </Link>

          <Link
            href={landingProjectsNav.href}
            onClick={onClose}
            className={cn(
              "mt-2.5 flex items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-[13px] font-medium tracking-wide transition-colors duration-300",
              projectsActive
                ? "border-primary/35 bg-primary/15 text-primary"
                : "border-white/[0.08] bg-white/[0.02] text-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary",
            )}>
            <span>{landingProjectsNav.label}</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-70" strokeWidth={1.5} />
          </Link>

          <div className="mt-4 flex items-center justify-between gap-3 px-0.5">
            <a
              href="mailto:earlbalitcha@gmail.com"
              className="truncate text-[12px] text-muted-foreground/80 transition-colors duration-300 hover:text-primary">
              earlbalitcha@gmail.com
            </a>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/25">
              PH · 2026
            </span>
          </div>
        </footer>
      </aside>
    </div>
  );
}
