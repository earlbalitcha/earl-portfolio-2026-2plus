import type {PortfolioItem} from "@/utils/csv-parser";

export type ShopifyStoreItem = PortfolioItem & {
  isPlaceholder?: boolean;
  /** Demo/sample theme builds — not live client work */
  isSample?: boolean;
};

/** Shopify storefronts — update placeholders when assets are ready. */
export const SHOPIFY_STORES: ShopifyStoreItem[] = [
  {
    slug: "joe-and-bella",
    title: "Joe & Bella",
    logo: "/placeholder.svg?height=80&width=80&query=joe+and+bella+logo",
    mainImage: "/projects/joe-and-bella-hero.png",
    shortDescription:
      "Adaptive apparel, reimagined — hidden magnets, side zippers, and conversion-focused Shopify storefront for the most-awarded easy-dressing brand.",
    projectUrl: "https://joeandbella.com/",
    content: `
      <p>Easy dressing, reimagined. Rated 4.8/5 and loved by thousands — hidden magnets, side zippers, no compromises.</p>
      <h3>Hero &amp; merchandising</h3>
      <ul>
        <li>Split hero: lifestyle imagery with Shop Men's / Shop Women's CTAs</li>
        <li>Announcement bar: Summer Sale promotions</li>
        <li>Best sellers grid with reviews and add-to-cart</li>
      </ul>
      <h3>Product lines</h3>
      <ul>
        <li>Everyday Magnetic Button Shirts (tailored &amp; relaxed fit)</li>
        <li>CareZips® and Everyday Side-Zip Pants</li>
        <li>HoodEase® magnetic zip-up hoodies</li>
        <li>Signature Side-Zip Chinos and magnetic flannels</li>
      </ul>
      <p>CoCreate award winner — selected by Shark Tank's Daymond John and Lori Greiner. HSA/FSA eligible adaptive clothing for men and women.</p>
    `,
    sortOrder: "1",
    categories: ["Shopify", "Adaptive Apparel", "Ecommerce", "Liquid"],
    isPlaceholder: false,
    isSample: false,
  },
  {
    slug: "bloom-consulting",
    title: "Bloom",
    logo: "/placeholder.svg?height=80&width=80&query=bloom+consulting+logo",
    mainImage: "/projects/bloom-consulting-hero.png",
    shortDescription:
      "Shopify-native creative studio — calm, conversion-minded commerce experiences for brands ready to grow with intention.",
    projectUrl: "https://earlbalitcha.myshopify.com/?pb=0",
    content: `
      <p>Stores that feel as good as they sell. Bloom designs calm, conversion-minded commerce experiences for brands ready to grow with intention.</p>
      <h3>What we craft</h3>
      <ul>
        <li><strong>Theme design systems</strong> — Modular Shopify themes with clear visual language and reusable sections.</li>
        <li><strong>Conversion UX</strong> — Product pages, carts, and checkout paths shaped around clarity.</li>
        <li><strong>Custom Shopify builds</strong> — Bespoke sections, apps, and integrations that feel native.</li>
        <li><strong>Launch campaigns</strong> — Landing experiences from ad click to purchase.</li>
        <li><strong>Storefront SEO</strong> — Technical hygiene, content structure, and page speed.</li>
        <li><strong>Lifecycle creative</strong> — Email and retention assets that match your storefront.</li>
      </ul>
      <p>Selected collaborations: Northlane, Field &amp; Form, Cove Supply, Lumen Atelier, Harbor Goods, Kin &amp; Clay, Aster Studio.</p>
      <p>Studio stack: Shopify, Shopify Plus, Klaviyo, Meta, Google, Figma, Notion, Slack.</p>
    `,
    sortOrder: "2",
    categories: ["Shopify", "Creative Studio", "Conversion UX", "Liquid"],
    isPlaceholder: false,
    isSample: true,
  },
  {
    slug: "shop-co",
    title: "SHOP.CO",
    logo: "/placeholder.svg?height=80&width=80&query=shop+co+fashion",
    mainImage: "/projects/shop-co-hero.png",
    shortDescription:
      "Fashion storefront with hero, brand ticker, and product discovery — FIND CLOTHES THAT MATCHES YOUR STYLE.",
    projectUrl:
      "https://growmodo-test-2.myshopify.com/?preview_theme_id=159335416007",
    content: `
      <p>Custom Shopify theme for a modern fashion brand — hero with lifestyle imagery, category navigation, product search, and social proof stats.</p>
      <ul>
        <li>Shop · On Sale · New Arrivals · Brands navigation</li>
        <li>Hero: FIND CLOTHES THAT MATCHES YOUR STYLE</li>
        <li>200+ International Brands · 2,000+ High-Quality Products · 30,000+ Happy Customers</li>
        <li>Brand ticker: Versace, Zara, Gucci, Prada, Calvin Klein</li>
      </ul>
    `,
    sortOrder: "3",
    categories: ["Shopify", "Fashion", "OS 2.0", "Liquid"],
    isPlaceholder: false,
    isSample: true,
  },
];

/** @deprecated Use SHOPIFY_STORES */
export const SHOPIFY_STORE_PLACEHOLDERS = SHOPIFY_STORES;
