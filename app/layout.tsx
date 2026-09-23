import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import AmbientBackground from "@/components/landing-page/ambient-background"
import IntroCurtain from "@/components/landing-page/intro-curtain"
import "@/components/landing-page/styles.css"
import { Suspense } from "react"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Earl Gerald R. Balitcha | Full Stack Web Developer",
  description:
    "Full stack web developer in the Philippines with 3 years of professional experience. I build scalable apps with React, Next.js, Vue.js, Node.js, TypeScript, and Python—plus REST/GraphQL APIs, realtime features, Shopify/WordPress/Squarespace, and CI/CD deployments.",
  icons: {
    icon: [{ url: "/earl-logo.png", type: "image/png" }],
    apple: [{ url: "/earl-logo.png" }],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${outfit.className}`}>
        {/* Curtain outside Suspense so it always mounts on load/reload */}
        <IntroCurtain />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
          disableTransitionOnChange>
          <Suspense fallback={null}>
            <AmbientBackground />
            {children}
          </Suspense>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
