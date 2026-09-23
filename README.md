# Earl Gerald Balitcha — Portfolio

Personal developer portfolio of **Earl Gerald Balitcha**, Full Stack Developer.

The site presents selected projects, professional experience, a Shopify project brief form, and a contact form.

## Tech stack

- **Framework:** Next.js 14 (App Router) with React 18 and TypeScript
- **Styling:** Tailwind CSS, shadcn/ui (Radix UI primitives), Lucide icons
- **Animation / 3D:** Framer Motion, three.js via `@react-three/fiber` and `@react-three/drei`
- **Forms & validation:** React Hook Form, Zod
- **Email delivery:** Web3Forms (primary) with optional Resend fallback via `app/api/contact`
- **Analytics:** Vercel Analytics
- **Package manager:** npm

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run Next.js lint (not configured yet) |

## Environment variables

See [`.env.example`](./.env.example) for the full list. `.env.local` is git-ignored; never commit real keys. For production, set the same variables in the hosting provider's environment settings.

## Project structure

```
app/            Next.js routes, layouts, and the /api/contact route handler
components/     Landing-page sections, portfolio views, and shared UI primitives
data/           Static project data (e.g. Shopify stores)
hooks/          Reusable React hooks
lib/, utils/    Helpers and data loading
public/         Images and static assets
styles/         Global styles
types/          Ambient TypeScript declarations
```

## Deployment

Standard Next.js application; deploys to Vercel with default settings (`next build`).
