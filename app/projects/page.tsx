import ProjectsPage from "@/components/portfolio/projects-page";
import {fetchPortfolioData} from "@/utils/csv-parser";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Projects | Earl Gerald R. Balitcha",
  description:
    "Shipped work—React, Next.js, Vue.js, and Node.js apps, dashboards, APIs, and integrations—plus Shopify, WordPress, and ecommerce examples in the archive.",
};

export default async function Projects() {
  const portfolioData = await fetchPortfolioData();

  return <ProjectsPage initialData={portfolioData} />;
}
