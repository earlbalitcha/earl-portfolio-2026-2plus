"use client";

import type React from "react";
import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Menu, X} from "lucide-react";
import MobileMenu from "./mobile-menu";
import {ScrollProgress} from "../ui/scroll-progress";
import {landingProjectsNav, landingScrollNavItems} from "./nav-config";
import {cn} from "@/lib/utils";
import {navigateHome, navigateToSection} from "@/lib/section-nav";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateHome(pathname, router);
  };

  const projectsActive =
    pathname === "/projects" || pathname?.startsWith("/projects/");
  const contactActive = pathname === "/contact";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-colors duration-300",
          isScrolled
            ? "border-border bg-background/92 backdrop-blur-xl"
            : "border-transparent bg-background/75 backdrop-blur-md",
        )}>
        <ScrollProgress />
        <div className="container flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleLogoClick}>
            <Image
              src="/darkmode.png"
              alt="Earl Balitcha — portfolio"
              width={300}
              height={50}
              className="h-9 w-auto md:h-10"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary">
            {landingScrollNavItems.map((item) =>
              "href" in item ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-[13px] font-medium transition-colors",
                    item.href === "/contact" && contactActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}>
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.sectionId}
                  type="button"
                  onClick={() =>
                    navigateToSection(item.sectionId, pathname, router)
                  }
                  className="px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/start"
              className={cn(
                "hidden rounded-md px-3.5 py-2 text-[13px] font-semibold transition-colors md:inline-flex",
                pathname === "/start"
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20",
              )}>
              Project brief
            </Link>
            <Link
              href={landingProjectsNav.href}
              className={cn(
                "hidden rounded-md px-3.5 py-2 text-[13px] font-semibold transition-colors sm:inline-flex",
                projectsActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary",
              )}>
              {landingProjectsNav.label}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-500 ease-out lg:hidden",
                mobileMenuOpen
                  ? "border-primary/35 bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}>
              <Menu
                className={cn(
                  "absolute h-4 w-4 transition-all duration-500 ease-out",
                  mobileMenuOpen
                    ? "scale-75 rotate-90 opacity-0"
                    : "scale-100 rotate-0 opacity-100",
                )}
                strokeWidth={1.5}
              />
              <X
                className={cn(
                  "absolute h-4 w-4 transition-all duration-500 ease-out",
                  mobileMenuOpen
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-75 -rotate-90 opacity-0",
                )}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
