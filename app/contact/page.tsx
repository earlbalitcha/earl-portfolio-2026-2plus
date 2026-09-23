import type {Metadata} from "next";
import ContactPage from "@/components/landing-page/contact-page";

export const metadata: Metadata = {
  title: "Contact | Earl Gerald R. Balitcha",
  description:
    "Get in touch with Earl Gerald R. Balitcha — full stack developer (React, Next.js, Vue.js, Node.js, TypeScript). Roles, contracts, and product builds.",
};

export default function Contact() {
  return <ContactPage />;
}
