"use client";

import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import SectionHeader from "@/components/landing-page/section-header";
import StartProjectBanner from "@/components/landing-page/start-project-banner";
import PortfolioMasonryGridFinal from "./portfolio-masonry-grid-final";
import ShopifyStoresGrid from "./shopify-stores-grid";
import type {PortfolioItem} from "@/utils/csv-parser";

interface ProjectsPageProps {
  initialData: PortfolioItem[];
}

export default function ProjectsPage({initialData}: ProjectsPageProps) {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="relative z-10">
        <div className="container pb-20 pt-10 md:pb-24 md:pt-14">
          <SectionHeader
            eyebrow="Archive"
            title="All"
            titleAccent="projects"
            description="Case studies and shipped work—React, Next.js, Vue.js, and Node.js apps, dashboards, APIs, and integrations—with Shopify, WordPress, and ecommerce examples where they apply."
          />

          <div className="mt-10 md:mt-12">
            <PortfolioMasonryGridFinal items={initialData} />
          </div>

          <div className="mt-20 border-t border-border pt-16 md:mt-24 md:pt-20">
            <SectionHeader
              eyebrow="Recent"
              title="Shopify"
              titleAccent="stores"
              description="Recent Shopify storefront work — Joe & Bella is a live, shipped build. Bloom and SHOP.CO are sample themes built to showcase custom Liquid sections, OS 2.0 patterns, and conversion-focused UX."
            />
            <div className="mt-10 md:mt-12">
              <ShopifyStoresGrid />
            </div>
            <StartProjectBanner className="mt-10 md:mt-12" />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
