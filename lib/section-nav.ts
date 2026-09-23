const SCROLL_TO_SECTION_KEY = "portfolio:scrollToSection";

export function queueSectionScroll(sectionId: string) {
  sessionStorage.setItem(SCROLL_TO_SECTION_KEY, sectionId);
}

export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
) {
  document.getElementById(sectionId)?.scrollIntoView({behavior, block: "start"});
  window.history.replaceState(null, "", "/");
}

export function consumePendingSectionScroll() {
  const sectionId = sessionStorage.getItem(SCROLL_TO_SECTION_KEY);
  if (!sectionId) return;

  sessionStorage.removeItem(SCROLL_TO_SECTION_KEY);
  requestAnimationFrame(() => {
    setTimeout(() => scrollToSection(sectionId), 80);
  });
}

export function navigateHome(
  pathname: string,
  router: {push: (href: string) => void},
) {
  window.history.replaceState(null, "", "/");
  window.scrollTo({top: 0, behavior: pathname === "/" ? "smooth" : "auto"});

  if (pathname !== "/") {
    router.push("/");
  }
}

export function navigateToSection(
  sectionId: string,
  pathname: string,
  router: {push: (href: string) => void},
) {
  if (pathname === "/") {
    scrollToSection(sectionId);
    return;
  }

  queueSectionScroll(sectionId);
  router.push("/");
}
