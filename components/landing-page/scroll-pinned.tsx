"use client";

import {useCallback, useEffect, useRef, useState, type ReactNode} from "react";
import {cn} from "@/lib/utils";

/** Scroll distance per item — enough to feel pinned, fast enough to skim */
export const PIN_VH_PER_ITEM = 85;

export function useScrollPinnedIndex(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (itemCount <= 0) return;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;

      // Hidden off-breakpoint (e.g. lg:block sibling) — no layout, skip updates
      if (el.getClientRects().length === 0) return;

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActive(0);
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      // Evenly map scroll progress across items (reaches last item reliably)
      const next = Math.min(
        itemCount - 1,
        Math.max(0, Math.round(progress * (itemCount - 1))),
      );
      setActive((prev) => (prev === next ? prev : next));
    };

    update();
    window.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [itemCount]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el || itemCount <= 0) return;
      const total = Math.max(0, el.offsetHeight - window.innerHeight);
      const clamped = Math.max(0, Math.min(itemCount - 1, index));
      const absoluteTop = window.scrollY + el.getBoundingClientRect().top;
      const target =
        itemCount === 1
          ? absoluteTop
          : absoluteTop + (total * clamped) / (itemCount - 1);
      window.scrollTo({top: Math.max(0, target), behavior: "smooth"});
    },
    [itemCount],
  );

  return {containerRef, active, scrollToIndex};
}

interface ScrollPinnedProps {
  itemCount: number;
  /** Sits directly above the pinned panel — scrolls as one unit with the content */
  header?: ReactNode;
  children: (ctx: {
    active: number;
    scrollToIndex: (i: number) => void;
  }) => ReactNode;
  className?: string;
}

/**
 * Title + panel stay grouped. The whole block stays in view while
 * document scroll advances items — do not put overflow on the sticky
 * layer or wheel events get trapped and the pin “stops”.
 */
export function ScrollPinned({
  itemCount,
  header,
  children,
  className,
}: ScrollPinnedProps) {
  const {containerRef, active, scrollToIndex} = useScrollPinnedIndex(itemCount);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{height: `${Math.max(itemCount, 1) * PIN_VH_PER_ITEM}vh`}}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center">
        <div className="container w-full py-8 md:py-10">
          <div className="mx-auto w-full max-w-6xl">
            {header ? <div className="mb-5 md:mb-6">{header}</div> : null}
            {children({active, scrollToIndex})}
          </div>
        </div>
      </div>
    </div>
  );
}
