# Landing page (portfolio)

Modular sections for **Earl Gerald R. Balitcha**—import `LandingPage` on the home route or compose individual blocks.

## Quick integration

```tsx
import LandingPage from "@/components/landing-page"

export default function Home() {
  return <LandingPage />
}
```

Import `styles.css` from this folder in the app layout (already wired in `app/layout.tsx`).

## Individual exports

```tsx
import {
  Header,
  Hero,
  AboutSection,
  ProfessionalExperience,
  Projects,
  CallToAction,
  Footer,
} from "@/components/landing-page"
```

`AboutSection` is implemented in `faq.tsx` (historical filename). Skills live in `../ui/animated-skills-grid.tsx`; stack summary in `technologies-glance.tsx`.

## Assets

Logos and images live under `/public` (e.g. `darkmode.png`, `lightmode.png`, `logo-light.png`, `logo-dark.png`, `purple-circle-wave-static.png`, portfolio images).
