"use client";

import Link from "next/link";
import type React from "react";
import {cn} from "@/lib/utils";

interface ContactFormButtonProps {
  className?: string;
  children?: React.ReactNode;
}

/** CTA that opens the full contact page (no modal). */
export default function ContactFormButton({
  className = "",
  children,
}: ContactFormButtonProps) {
  return (
    <Link href="/contact" className={cn(className || "btn-primary")}>
      {children || "Contact Me"}
    </Link>
  );
}
