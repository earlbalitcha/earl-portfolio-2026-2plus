import Header from "./header";
import Hero from "./hero";
import Projects from "./projects";
import AboutSection from "./faq";
import ShopifySection from "./shopify-section";
import ApproachSection from "./approach-section";
import ProfessionalExperience from "./experience";
import CallToAction from "./call-to-action";
import Footer from "./footer";
import ContactFormButton from "./contact-form-button";
import SectionScrollHandler from "./section-scroll-handler";
import type {LandingPageProps} from "./types";
import {AnimatedSkillsGrid} from "../ui/animated-skills-grid";

export {
  Header,
  Hero,
  Projects,
  AboutSection,
  ShopifySection,
  ProfessionalExperience,
  CallToAction,
  Footer,
  ContactFormButton,
};

export default function LandingPage({
  showHeader = true,
  showFooter = true,
}: LandingPageProps) {
  return (
    <main className="relative min-h-screen">
      <SectionScrollHandler />
      {showHeader && <Header />}

      <div className="relative z-10">
        <Hero />

        <div className="container">
          <AboutSection />
          <ShopifySection />
        </div>

        {/* Solid page-break — fully blocks fixed ambient / 3D */}
        <ApproachSection />

        <ProfessionalExperience />

        <Projects />

        <AnimatedSkillsGrid />

        <div className="container pb-8">
          <CallToAction />
        </div>

        {showFooter && <Footer />}
      </div>
    </main>
  );
}
