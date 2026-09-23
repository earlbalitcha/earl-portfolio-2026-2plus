/** Shared between desktop header and mobile drawer so links stay in sync. */
export type LandingScrollNavItem =
  | {sectionId: string; label: string}
  | {href: string; label: string};

export const landingScrollNavItems: LandingScrollNavItem[] = [
  {sectionId: "about", label: "About"},
  {sectionId: "shopify", label: "CMS"},
  {sectionId: "approach", label: "Approach"},
  {sectionId: "experience", label: "Experience"},
  {sectionId: "projects", label: "Work"},
  {sectionId: "skills", label: "Skills"},
  {href: "/contact", label: "Contact"},
];

export const landingProjectsNav = {href: "/projects", label: "Projects"} as const;
