"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {
  consumePendingSectionScroll,
  scrollToSection,
} from "@/lib/section-nav";

/** Handles cross-page section jumps and legacy hash URLs without keeping # in the bar. */
export default function SectionScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      window.history.replaceState(null, "", "/");
      setTimeout(() => scrollToSection(hash, "auto"), 100);
      return;
    }

    consumePendingSectionScroll();
  }, [pathname]);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.pathname !== "/") return;

      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;

      window.history.replaceState(null, "", "/");
      scrollToSection(hash, "auto");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return null;
}
