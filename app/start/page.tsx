import ShopifyProjectForm from "@/components/landing-page/shopify-project-form";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Start a Shopify Project | Earl Gerald R. Balitcha",
  description:
    "Submit a Shopify project brief — share your goals, timeline, and budget. A detailed discovery follows once engagement terms are agreed.",
};

export default function StartPage() {
  return (
    <main className="relative min-h-[100svh]">
      <ShopifyProjectForm />
    </main>
  );
}
