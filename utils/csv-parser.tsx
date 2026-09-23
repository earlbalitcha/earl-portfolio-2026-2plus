export interface PortfolioItem {
  slug: string;
  title: string;
  logo: string;
  mainImage: string;
  shortDescription: string;
  projectUrl: string;
  content: string;
  sortOrder: string;
  categories?: string[];
}

const CACHE_KEY = "__portfolioCacheV9";

/** Static portfolio source — no runtime CSV fetch (works on Vercel SSR/static). */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "the-hostdesk",
    title: "The HostDesk, Multilingual Platform",
    logo: "/projects/the-hostdesk.png?height=400&width=600",
    mainImage: "/projects/the-hostdesk.png?height=400&width=600",
    shortDescription:
      "Main frontend platform (Next.js, multilingual, AI tools, integrations).",
    projectUrl: "https://thehostdesk.com/en",
    content:
      "<h3>Overview</h3><p>The HostDesk is a multilingual platform built with Next.js, combining AI tooling and third-party integrations for hospitality and operations teams.</p>",
    sortOrder: "2025-12-01",
    categories: ["Next.js", "Multilingual", "AI", "Integrations", "web"],
  },
  {
    slug: "csr-dashboard",
    title: "CSR Dashboard, Enterprise System",
    logo: "/projects/portal-dashboard.png?height=400&width=600",
    mainImage: "/projects/portal-dashboard.png?height=400&width=600",
    shortDescription:
      "Enterprise system with ticketing, chat, and real-time workflows.",
    projectUrl: "https://portal.thehostdesk.com/signin",
    content:
      "<h3>Overview</h3><p>CSR-facing enterprise dashboard with ticketing, internal chat, and real-time workflows for support and operations.</p>",
    sortOrder: "2025-11-15",
    categories: ["Enterprise", "Real-time", "Dashboard", "web"],
  },
  {
    slug: "xmg-real-estate",
    title: "XMG Real Estate, xmgca.com",
    logo: "/projects/xmgcawebsite.png?height=400&width=600",
    mainImage: "/projects/xmgcawebsite.png?height=400&width=600",
    shortDescription:
      "Business website for real estate services and lead generation.",
    projectUrl: "https://xmgca.com/en",
    content:
      "<h3>Overview</h3><p>XMG provides real estate management, financing, and rental services—multilingual corporate site with mission-driven content and a modern presence.</p>",
    sortOrder: "2025-11-01",
    categories: [
      "Real Estate",
      "Next.js",
      "Internationalization",
      "Corporate",
      "Marketing",
      "web",
    ],
  },
  {
    slug: "travelhere",
    title: "TravelHere, travelhere.co",
    logo: "/projects/travelhere.png?height=400&width=600",
    mainImage: "/projects/travelhere.png?height=400&width=600",
    shortDescription:
      "Marketing and product platform (React SPA, animations, CI/CD).",
    projectUrl: "https://travelhere.co/",
    content:
      "<h3>Overview</h3><p>TravelHere is a React SPA with rich animations and a CI/CD-backed release workflow for marketing and product storytelling.</p>",
    sortOrder: "2025-10-20",
    categories: ["React", "SPA", "Animations", "DevOps", "web"],
  },
  {
    slug: "shopify-integration",
    title: "Shopify Integration",
    logo: "/projects/shopifyorder.png?height=400&width=600",
    mainImage: "/projects/shopifyorder.png?height=400&width=600",
    shortDescription:
      "Integrated Shopify e-commerce data into a centralized dashboard.",
    projectUrl: "https://portal.superhostdepot.com/signin",
    content:
      "<h3>Overview</h3><p>A one-stop dashboard for managing Shopify orders and store data. A storefront integration directly connected to the admin dashboard.</p>",
    sortOrder: "2024-02-20",
    categories: ["Shopify", "Liquid", "JavaScript", "E-commerce Dashboard", "web"],
  },
  {
    slug: "hubspot-integration",
    title: "HubSpot Integration",
    logo: "/projects/hubspot-integration.png?height=400&width=600",
    mainImage: "/projects/hubspot-integration.png?height=400&width=600",
    shortDescription:
      "CRM contact form integration to capture leads directly into HubSpot.",
    projectUrl: "https://superhostdepot.com/en/contact-us",
    content:
      "<h3>Overview</h3><p>Custom HubSpot integration where user form submissions sync directly to HubSpot CRM. Enables lead capture and workflow efficiency.</p>",
    sortOrder: "2024-02-10",
    categories: ["HubSpot", "API Integration", "CRM", "Automation", "web"],
  },
  {
    slug: "clickup-integration",
    title: "ClickUp Task Integration",
    logo: "/projects/clickuptabform.png?height=400&width=600",
    mainImage: "/projects/clickuptabform.png?height=400&width=600",
    shortDescription:
      "Seamless ClickUp integration for centralized task and project tracking.",
    projectUrl: "https://portal.superhostdepot.com/signin",
    content:
      "<h3>Overview</h3><p>Integrated ClickUp task management directly into the dashboard. Features include syncing task data, project status updates, and productivity workflows to provide a single hub for property and project management.</p>",
    sortOrder: "2024-01-20",
    categories: [
      "ClickUp",
      "API Integration",
      "Project Management",
      "Productivity",
      "web",
    ],
  },
];

export function resetPortfolioCache() {
  if (typeof window !== "undefined") {
    delete (window as any).__portfolioCache;
    delete (window as any).__portfolioCacheV2;
    delete (window as any).__portfolioCacheV3;
    delete (window as any).__portfolioCacheV5;
    delete (window as any).__portfolioCacheV6;
    delete (window as any).__portfolioCacheV7;
    delete (window as any).__portfolioCacheV8;
    delete (window as any).__portfolioCacheV9;
  }
}

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  const items = [...PORTFOLIO_ITEMS].sort(
    (a, b) =>
      new Date(b.sortOrder).getTime() - new Date(a.sortOrder).getTime(),
  );

  if (typeof window !== "undefined") {
    (window as any)[CACHE_KEY] = items;
  }

  return items;
}
