"use client";

import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight, ShoppingBag} from "lucide-react";
import {SHOPIFY_STORES, type ShopifyStoreItem} from "@/data/shopify-stores";

interface ShopifyStoresGridProps {
  items?: ShopifyStoreItem[];
}

export default function ShopifyStoresGrid({
  items = SHOPIFY_STORES,
}: ShopifyStoresGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((store, index) => {
        const isPlaceholder = store.isPlaceholder ?? !store.projectUrl;
        const isSample = store.isSample ?? false;
        const card = (
          <>
            <div className="relative h-52 w-full shrink-0 bg-muted/50 sm:h-60">
              <Image
                src={store.mainImage}
                alt={store.title}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={
                  isPlaceholder
                    ? "object-contain object-center p-4 opacity-70"
                    : "object-contain object-center p-3"
                }
              />
              {isPlaceholder ? (
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-border bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                  <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                  Placeholder
                </div>
              ) : isSample ? (
                <div className="absolute left-4 top-4 rounded-md border border-border bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                  Sample build
                </div>
              ) : (
                <div className="absolute left-4 top-4 rounded-md border border-primary/30 bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                  Live project
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col border-t border-border p-5 md:p-6">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                0{index + 1} — Shopify
              </p>
              <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">
                {store.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {store.shortDescription}
              </p>
              {store.categories && store.categories.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {store.categories.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {isPlaceholder ? (
                <p className="mt-4 text-xs text-muted-foreground/80">
                  Screenshots and project details will be added soon.
                </p>
              ) : (
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Visit store
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </span>
              )}
            </div>
          </>
        );

        if (!isPlaceholder && store.projectUrl) {
          return (
            <Link
              key={store.slug}
              href={store.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
              {card}
            </Link>
          );
        }

        return (
          <article
            key={store.slug}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
            {card}
          </article>
        );
      })}
    </div>
  );
}
