import Link from "next/link";
import {ArrowRight, ShoppingBag} from "lucide-react";
import {cn} from "@/lib/utils";

type StartProjectBannerProps = {
  className?: string;
  compact?: boolean;
};

export default function StartProjectBanner({
  className,
  compact = false,
}: StartProjectBannerProps) {
  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-xl border border-primary/30 bg-primary/10",
        compact ? "p-5 md:p-6" : "p-6 md:p-8",
        className,
      )}>
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 100% 0%, hsl(243 62% 70% / 0.22), transparent 55%)",
        }}
      />
      <div
        className={cn(
          "relative flex flex-col gap-4",
          compact
            ? "sm:flex-row sm:items-center sm:justify-between"
            : "md:flex-row md:items-center md:justify-between md:gap-8",
        )}>
        <div className="min-w-0 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/30 bg-primary/15 text-primary">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Shopify projects
            </p>
          </div>
          <h3
            className={cn(
              "font-display mt-3 font-semibold tracking-tight text-foreground",
              compact ? "text-lg md:text-xl" : "text-xl md:text-2xl",
            )}>
            Planning a new store or redesign?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Submit a short project brief (approximately 5–8 minutes). Your
            responses inform an initial proposal before a formal discovery
            process.
          </p>
        </div>
        <Link
          href="/start"
          className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 px-5 text-sm">
          Begin project brief
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
