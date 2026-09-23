import Link from "next/link";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-20 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Project not found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          That project does not exist or the link may be outdated.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:opacity-95">
          Back to projects
        </Link>
      </div>
      <Footer />
    </main>
  );
}
