import Link from "next/link";
import {MapPin, Phone, Mail, ArrowUpRight} from "lucide-react";

export default function CallToAction() {
  const address = "Bulo, Victoria, Tarlac";
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  const phoneDisplay = "+63 926 787 6389";
  const phoneHref = "tel:+639267876389";

  const email = "earlbalitcha@gmail.com";
  const emailHref = `mailto:${email}`;

  const channels = [
    {
      label: "Address",
      href: mapsHref,
      external: true,
      value: address,
      icon: MapPin,
    },
    {
      label: "Phone",
      href: phoneHref,
      external: false,
      value: phoneDisplay,
      icon: Phone,
    },
    {
      label: "Email",
      href: emailHref,
      external: false,
      value: email,
      icon: Mail,
    },
  ] as const;

  return (
    <section id="contact" className="my-16 scroll-mt-24 sm:my-20 md:my-24">
      <div className="rounded-xl border border-border bg-card">
        <div className="grid gap-8 p-5 sm:gap-10 sm:p-8 md:p-10 lg:grid-cols-12 lg:items-start lg:gap-12 lg:p-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Let&apos;s talk
            </p>
            <h2 className="font-display mt-3 max-w-md text-[1.65rem] font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl md:leading-[1.1]">
              <span className="text-foreground">Ready to </span>
              <span className="gradient-text">connect</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-4 md:text-base">
              Based in the Philippines. Open to full-stack web roles and
              contract work—React, Next.js, Vue.js, Node.js, TypeScript, APIs,
              and dashboards—plus Shopify, WordPress, and Squarespace when CMS
              or ecommerce is in scope.
            </p>
            <div className="gradient-rule mt-6 opacity-70 sm:mt-8" />
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/contact"
                className="btn-primary w-full px-5 text-sm sm:w-auto sm:px-7 sm:text-base">
                Go to contact page
              </Link>
              <Link
                href="/start"
                className="inline-flex w-full items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/20 sm:w-auto sm:px-7 sm:text-base">
                Start Shopify project
              </Link>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3 lg:col-span-7">
            {channels.map(({label, href, external, value, icon: Icon}) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? {target: "_blank", rel: "noopener noreferrer"}
                  : {})}
                className="group flex min-w-0 items-start gap-3 rounded-lg border border-border bg-muted/20 p-3.5 transition-colors hover:border-primary/35 hover:bg-primary/10 sm:items-center sm:gap-4 sm:p-4 md:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/15 text-primary sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                    {label}
                  </p>
                  <p className="mt-0.5 break-words text-sm font-medium leading-snug text-foreground group-hover:text-primary sm:text-base">
                    {value}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 hidden h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:mt-0 sm:block"
                  aria-hidden
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
