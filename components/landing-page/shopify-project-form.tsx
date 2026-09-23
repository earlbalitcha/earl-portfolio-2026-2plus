"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import {toast} from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  Menu,
  Settings2,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";

const WEB3_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

const DRAFT_KEY = "shopify-project-brief-draft-v1";

const HELP_OPTIONS = [
  "New Shopify store",
  "Shopify redesign",
  "New landing page",
  "Product / collection pages",
  "Shopify customization",
  "Store optimization",
  "Shopify maintenance",
  "Other",
] as const;

const STYLE_OPTIONS = [
  "Modern",
  "Minimal",
  "Premium",
  "Bold",
  "Clean",
  "Colorful",
  "Other",
] as const;

const ASSET_OPTIONS = [
  "Logo",
  "Product images",
  "Product information",
  "Brand colors / fonts",
  "Website copy",
  "Partial assets available",
  "Not available yet",
] as const;

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "1–2 weeks",
  "2–4 weeks",
  "Flexible",
  "Specific date",
] as const;

const BUDGET_OPTIONS = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000+",
  "To be discussed",
] as const;

const STEPS = [
  {
    id: "who",
    label: "Contact",
    hint: "Name, brand & store",
    icon: UserRound,
  },
  {
    id: "what",
    label: "Scope",
    hint: "Needs & objectives",
    icon: ClipboardList,
  },
  {
    id: "fit",
    label: "Requirements",
    hint: "Design, timeline & budget",
    icon: Settings2,
  },
] as const;

function ProgressRing({
  value,
  size = 40,
  stroke = 3,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{width: size, height: size}}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(243 62% 70%)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute text-[9px] font-semibold tabular-nums text-white/80">
        {Math.round(clamped)}
      </span>
    </div>
  );
}

const fieldClass =
  "h-11 rounded-lg border-white/15 bg-[#101010]/55 text-foreground placeholder:text-white/40 focus-visible:ring-primary";

type FormState = {
  name: string;
  brand: string;
  email: string;
  hasStore: "" | "yes" | "no";
  storeUrl: string;
  helpWith: string[];
  businessBrief: string;
  goal: string;
  improveNotes: string;
  references: string;
  styles: string[];
  assets: string[];
  timeline: string;
  specificDate: string;
  budget: string;
  notes: string;
  /** Honeypot — must stay empty. Named to avoid browser autofill. */
  hpField: string;
};

const initialState: FormState = {
  name: "",
  brand: "",
  email: "",
  hasStore: "",
  storeUrl: "",
  helpWith: [],
  businessBrief: "",
  goal: "",
  improveNotes: "",
  references: "",
  styles: [],
  assets: [],
  timeline: "",
  specificDate: "",
  budget: "",
  notes: "",
  hpField: "",
};

type DraftPayload = {
  form: FormState;
  step: number;
  savedAt: number;
};

function draftHasContent(form: FormState, step: number) {
  if (step > 0) return true;
  return Boolean(
    form.name.trim() ||
      form.brand.trim() ||
      form.email.trim() ||
      form.hasStore ||
      form.storeUrl.trim() ||
      form.helpWith.length ||
      form.businessBrief.trim() ||
      form.goal.trim() ||
      form.improveNotes.trim() ||
      form.references.trim() ||
      form.styles.length ||
      form.assets.length ||
      form.timeline ||
      form.budget ||
      form.notes.trim(),
  );
}

function readDraft(): DraftPayload | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftPayload;
    if (!parsed?.form || typeof parsed.step !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeDraft(form: FormState, step: number) {
  const payload: DraftPayload = {
    form: {...form, hpField: ""},
    step,
    savedAt: Date.now(),
  };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

function formatDraftTime(ts: number) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(ts));
  } catch {
    return "earlier";
  }
}

function toggleInList(list: string[], value: string, exclusive?: string[]) {
  const isOn = list.includes(value);
  if (isOn) return list.filter((v) => v !== value);
  if (exclusive?.includes(value)) return [value];
  const withoutExclusive = exclusive
    ? list.filter((v) => !exclusive.includes(v))
    : list;
  return [...withoutExclusive, value];
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-left text-[13px] font-medium transition-colors sm:min-h-11 sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-sm",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-white/20 bg-[#101010]/70 text-white/90 hover:border-primary/50 hover:bg-primary/15 hover:text-white",
        )}>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
          selected
            ? "border-white/30 bg-white/20 text-white"
            : "border-white/25 bg-white/5 text-transparent",
        )}>
        <Check className="h-3 w-3" strokeWidth={2.5} />
      </span>
      <span className="leading-snug">{children}</span>
    </button>
  );
}

async function postWeb3Forms(accessKey: string, body: Record<string, string>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({access_key: accessKey, ...body}),
  });
  const raw = await res.text();
  let data: {success?: boolean; message?: string} = {};
  try {
    data = JSON.parse(raw) as {success?: boolean; message?: string};
  } catch {
    return {
      ok: false,
      detail:
        "The email service could not be reached. Please try again or email earlbalitcha@gmail.com.",
    };
  }
  return {
    ok: res.ok && Boolean(data.success),
    detail: data.message,
  };
}

export default function ShopifyProjectForm() {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const skipBeforeUnloadRef = useRef(false);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [draftMeta, setDraftMeta] = useState<DraftPayload | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      if (mq.matches) setNavOpen(true);
      else setNavOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const existing = readDraft();
    if (existing && draftHasContent(existing.form, existing.step)) {
      setDraftMeta(existing);
      setResumeOpen(true);
    }
    setHydrated(true);
  }, []);

  const isDirty = useMemo(
    () => !done && draftHasContent(form, step),
    [done, form, step],
  );

  useEffect(() => {
    if (!hydrated || done || resumeOpen) return;
    if (!draftHasContent(form, step)) {
      clearDraft();
      setDraftSavedAt(null);
      return;
    }
    const id = window.setTimeout(() => {
      writeDraft(form, step);
      setDraftSavedAt(Date.now());
    }, 450);
    return () => window.clearTimeout(id);
  }, [form, step, done, hydrated, resumeOpen]);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (skipBeforeUnloadRef.current || done || !isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [done, isDirty]);

  function scrollFormToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
    panelRef.current?.scrollIntoView({block: "start", behavior: "smooth"});
  }

  useEffect(() => {
    if (!hydrated) return;
    scrollFormToTop();
  }, [step, done, hydrated]);

  const showStoreFields = form.hasStore === "yes";
  const showSpecificDate = form.timeline === "Specific date";

  /** Progress from answered required fields — not which step you're on. */
  const progress = useMemo(() => {
    const checks: boolean[] = [
      Boolean(form.name.trim()),
      Boolean(form.brand.trim()),
      Boolean(form.email.trim()),
      Boolean(form.hasStore),
      Boolean(form.helpWith.length),
      Boolean(form.businessBrief.trim()),
      Boolean(form.goal.trim()),
      Boolean(form.styles.length),
      Boolean(form.assets.length),
      Boolean(form.timeline),
      Boolean(form.budget),
    ];

    if (form.hasStore === "yes") {
      checks.push(Boolean(form.storeUrl.trim()));
    }
    if (form.timeline === "Specific date") {
      checks.push(Boolean(form.specificDate.trim()));
    }

    const filled = checks.filter(Boolean).length;
    return (filled / checks.length) * 100;
  }, [form]);

  const progressValue = done ? 100 : progress;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({...prev, [key]: value}));
  }

  function validateStep(index: number) {
    if (index === 0) {
      if (!form.name.trim() || !form.brand.trim() || !form.email.trim()) {
        toast.error("Required fields incomplete", {
          description: "Please provide your name, brand, and email address.",
        });
        return false;
      }
      if (!form.hasStore) {
        toast.error("Store status required", {
          description:
            "Please indicate whether you already have a Shopify store.",
        });
        return false;
      }
      if (form.hasStore === "yes" && !form.storeUrl.trim()) {
        toast.error("Store URL required", {
          description: "Please provide your Shopify store URL for review.",
        });
        return false;
      }
      return true;
    }

    if (index === 1) {
      if (form.helpWith.length === 0) {
        toast.error("Project scope required", {
          description: "Please select at least one service you need.",
        });
        return false;
      }
      if (!form.businessBrief.trim() || !form.goal.trim()) {
        toast.error("Additional details required", {
          description:
            "Please briefly describe your business and the primary project goal.",
        });
        return false;
      }
      return true;
    }

    if (index === 2) {
      if (form.styles.length === 0) {
        toast.error("Design direction required", {
          description: "Please select at least one preferred look and feel.",
        });
        return false;
      }
      if (form.assets.length === 0) {
        toast.error("Asset status required", {
          description:
            "Please indicate which content or brand assets you already have.",
        });
        return false;
      }
      if (!form.timeline || !form.budget) {
        toast.error("Timeline and budget required", {
          description:
            "Please select a preferred timeline and approximate budget.",
        });
        return false;
      }
      if (form.timeline === "Specific date" && !form.specificDate.trim()) {
        toast.error("Target date required", {
          description: "Please provide your preferred completion date.",
        });
        return false;
      }
      return true;
    }

    return true;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function goToStep(index: number) {
    if (index === step) return;
    if (index < step) {
      setStep(index);
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setNavOpen(false);
      }
      return;
    }
    for (let i = step; i < index; i++) {
      if (!validateStep(i)) return;
    }
    setStep(index);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setNavOpen(false);
    }
  }

  function resumeDraft() {
    if (!draftMeta) {
      setResumeOpen(false);
      return;
    }
    setForm({...initialState, ...draftMeta.form, hpField: ""});
    setStep(Math.min(Math.max(draftMeta.step, 0), STEPS.length - 1));
    setDraftSavedAt(draftMeta.savedAt);
    setResumeOpen(false);
    setDraftMeta(null);
  }

  function discardDraft() {
    clearDraft();
    setForm(initialState);
    setStep(0);
    setDraftSavedAt(null);
    setResumeOpen(false);
    setDraftMeta(null);
  }

  function requestLeave(href: string) {
    if (!isDirty) {
      skipBeforeUnloadRef.current = true;
      router.push(href);
      return;
    }
    setPendingHref(href);
    setLeaveOpen(true);
  }

  function confirmLeave({save}: {save: boolean}) {
    if (save) {
      writeDraft(form, step);
      setDraftSavedAt(Date.now());
    } else {
      clearDraft();
      setDraftSavedAt(null);
    }
    skipBeforeUnloadRef.current = true;
    setLeaveOpen(false);
    const href = pendingHref || "/";
    setPendingHref(null);
    router.push(href);
  }

  function saveDraftNow() {
    if (!draftHasContent(form, step)) {
      toast.message("Nothing to save yet", {
        description: "Add a few details first, then your draft can be saved.",
      });
      return;
    }
    writeDraft(form, step);
    setDraftSavedAt(Date.now());
    toast.success("Draft saved", {
      description: "You can leave and continue this brief later on this device.",
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    // Enter key on earlier steps was submitting and validating Requirements —
    // advance instead of showing false validation toasts.
    if (step < STEPS.length - 1) {
      goNext();
      return;
    }

    if (!validateStep(2)) return;

    // Honeypot: bots fill this; do not show success or send mail
    if (form.hpField.trim()) {
      return;
    }

    const timelineLabel =
      form.timeline === "Specific date"
        ? `Specific date: ${form.specificDate}`
        : form.timeline;

    const message = [
      "Shopify project inquiry (Stage 1 — Project brief)",
      "",
      `Name: ${form.name.trim()}`,
      `Brand: ${form.brand.trim()}`,
      `Email: ${form.email.trim()}`,
      `Has Shopify store: ${form.hasStore}`,
      form.hasStore === "yes" ? `Store URL: ${form.storeUrl.trim()}` : null,
      "",
      `Requested services: ${form.helpWith.join(", ")}`,
      "",
      "Business overview:",
      form.businessBrief.trim(),
      "",
      "Primary goal:",
      form.goal.trim(),
      form.improveNotes.trim()
        ? `\nPriority improvement:\n${form.improveNotes.trim()}`
        : null,
      form.references.trim()
        ? `\nReference websites:\n${form.references.trim()}`
        : null,
      "",
      `Preferred look and feel: ${form.styles.join(", ")}`,
      `Available assets: ${form.assets.join(", ")}`,
      `Timeline: ${timelineLabel}`,
      `Budget: ${form.budget}`,
      form.notes.trim() ? `\nAdditional notes:\n${form.notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `[Shopify Project] ${form.brand.trim()}`;
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject,
      message,
    };

    setSubmitting(true);
    try {
      let lastError =
        "Please try again shortly, or email earlbalitcha@gmail.com.";

      // Browser → Web3Forms first (more reliable in local dev / client TLS)
      if (WEB3_PUBLIC_KEY) {
        const w = await postWeb3Forms(WEB3_PUBLIC_KEY, {
          subject,
          name: payload.name,
          email: payload.email,
          replyto: payload.email,
          message: payload.message,
        });
        if (w.ok) {
          clearDraft();
          setDraftSavedAt(null);
          toast.success("Request submitted", {
            description:
              "Thank you. I will review your brief and follow up with next steps.",
          });
          setDone(true);
          return;
        }
        if (w.detail) lastError = w.detail;
      }

      // Fallback: Next.js API route (works on Vercel / production hosts)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...payload, company: ""}),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        clearDraft();
        setDraftSavedAt(null);
        toast.success("Request submitted", {
          description:
            "Thank you. I will review your brief and follow up with next steps.",
        });
        setDone(true);
        return;
      }

      const detail = data.error || lastError;
      setSubmitError(detail);
      toast.error("Submission failed", {description: detail});
    } catch {
      const detail =
        "A network error occurred. Please check your connection and try again, or email earlbalitcha@gmail.com.";
      setSubmitError(detail);
      toast.error("Submission failed", {description: detail});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative z-10 flex min-h-[100svh]">
      {/* Page veil — quiet the chess ambient, keep a soft hint of motion */}
      <div
        className="pointer-events-none fixed inset-0 z-[5]"
        aria-hidden
        style={{
          background: `
            linear-gradient(180deg, rgba(16,16,16,0.88) 0%, rgba(16,16,16,0.82) 45%, rgba(16,16,16,0.9) 100%),
            radial-gradient(ellipse 90% 60% at 70% 20%, hsl(243 62% 55% / 0.12), transparent 55%)
          `,
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Mobile backdrop when drawer is open */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={() => setNavOpen(false)}
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden",
          navOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      {/* Collapsible sidebar — icon rail when closed, full labels when open */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/10 bg-[#101010]/95 backdrop-blur-xl transition-[width] duration-300 ease-out",
          navOpen ? "w-[17.5rem] shadow-2xl shadow-black/50" : "w-16",
          "lg:w-[17.5rem] lg:shadow-none",
        )}>
        <div
          className={cn(
            "flex border-b border-white/10 px-3 py-3 lg:px-6 lg:py-5",
            navOpen
              ? "flex-row items-center justify-between gap-2"
              : "flex-col items-center gap-3",
            "lg:flex-row lg:items-center lg:justify-between",
          )}>
          <button
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary lg:hidden"
            aria-expanded={navOpen}
            aria-label={navOpen ? "Collapse menu" : "Expand menu"}>
            {navOpen ? (
              <X className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>

          <button
            type="button"
            onClick={() => requestLeave("/")}
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-primary/80",
              navOpen ? "block" : "hidden lg:block",
            )}>
            ← Portfolio
          </button>
        </div>

        <div
          className={cn(
            "border-b border-white/10",
            navOpen ? "px-5 py-4" : "flex justify-center px-2 py-4",
            "lg:px-6 lg:py-5",
          )}>
          <div
            className={cn(
              "flex items-center gap-3",
              !navOpen && "justify-center lg:justify-start",
            )}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/15 text-primary">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div className={cn("min-w-0", navOpen ? "block" : "hidden lg:block")}>
              <p className="text-sm font-semibold text-white">Project brief</p>
              <p className="text-xs text-white/55">Shopify · Stage 1</p>
            </div>
          </div>
        </div>

        <nav
          className={cn(
            "flex flex-1 flex-col overflow-y-auto py-4",
            navOpen ? "gap-1.5 px-3" : "items-center gap-2 px-2",
            "lg:items-stretch lg:gap-1.5 lg:px-4 lg:py-6",
          )}
          aria-label="Form steps">
          {STEPS.map((s, i) => {
            const active = i === step;
            const complete = i < step || done;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                title={s.label}
                onClick={() => !done && goToStep(i)}
                disabled={done}
                className={cn(
                  "flex items-center rounded-xl border text-left transition-colors",
                  navOpen
                    ? "w-full gap-3 px-3.5 py-3.5"
                    : "h-11 w-11 justify-center",
                  "lg:w-full lg:justify-start lg:gap-3 lg:px-3.5 lg:py-3.5",
                  active
                    ? "border-primary/45 bg-primary/15"
                    : complete
                      ? "border-white/10 bg-white/[0.04] hover:border-primary/30"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
                )}>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                    active || complete
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/20 bg-white/5 text-white/60",
                  )}>
                  {complete && !active ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  )}
                </span>
                <span
                  className={cn(
                    "min-w-0",
                    navOpen ? "block" : "hidden lg:block",
                  )}>
                  <span
                    className={cn(
                      "block text-sm font-semibold",
                      active || complete ? "text-white" : "text-white/55",
                    )}>
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/45">
                    {s.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className={cn(
            "border-t border-white/10",
            navOpen ? "px-5 py-4" : "flex flex-col items-center gap-2 px-2 py-4",
            "lg:px-6 lg:py-5",
          )}>
          <div className={cn(navOpen ? "hidden" : "block", "lg:hidden")}>
            <ProgressRing value={progressValue} size={42} stroke={3} />
          </div>

          <div className={cn(navOpen ? "block" : "hidden", "w-full lg:block")}>
            <div className="mb-2 flex items-center justify-between text-[11px] text-white/50">
              <span>Progress</span>
              <span className="tabular-nums text-white/70">
                {Math.round(progressValue)}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{width: `${progressValue}%`}}
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/45">
              Approximately 5–8 minutes. Store credentials are never requested.
              A detailed discovery follows once engagement terms are agreed.
            </p>
          </div>
        </div>
      </aside>

      {/* Main form panel */}
      <div
        className={cn(
          "relative z-10 flex min-h-[100svh] w-full flex-col transition-[padding] duration-300 ease-out",
          navOpen ? "pl-16 lg:pl-[17.5rem]" : "pl-16",
          "lg:pl-[17.5rem]",
        )}>
        <div className="flex flex-1 flex-col justify-start px-3 py-8 sm:px-6 sm:py-10 md:px-8 lg:justify-center lg:px-12 lg:py-12 xl:px-16">
          <div
            ref={panelRef}
            className="mx-auto w-full max-w-2xl scroll-mt-6 rounded-xl border border-white/12 bg-[#101010]/90 p-4 backdrop-blur-xl sm:rounded-2xl sm:p-6 md:p-8 lg:p-10">
            {done ? (
              <div className="py-6 text-center sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Submission received
                </p>
                <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Thank you for your brief
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65">
                  I will review your responses and follow up by email. Next
                  steps typically include a short discovery call, followed by
                  detailed onboarding once engagement terms are confirmed.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15">
                  Return to portfolio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div
                  className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px opacity-0"
                  aria-hidden
                  tabIndex={-1}>
                  <Label htmlFor="project-hp-field">Leave blank</Label>
                  <Input
                    id="project-hp-field"
                    name="hp_field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.hpField}
                    onChange={(e) => update("hpField", e.target.value)}
                  />
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{opacity: 0, y: 14}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}>
                    {step === 0 ? (
                      <div className="space-y-5">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Step 01
                          </p>
                          <h1 className="font-display mt-2 text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                            Contact information
                          </h1>
                          <p className="mt-2 text-sm text-white/60">
                            Please provide your contact details and brand
                            information.
                          </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="project-name"
                              className="text-white/80">
                              Full name *
                            </Label>
                            <Input
                              id="project-name"
                              required={step === 0}
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                              placeholder="Jane Doe"
                              className={fieldClass}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="project-brand"
                              className="text-white/80">
                              Business / brand name *
                            </Label>
                            <Input
                              id="project-brand"
                              required={step === 0}
                              value={form.brand}
                              onChange={(e) => update("brand", e.target.value)}
                              placeholder="Acme Co."
                              className={fieldClass}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="project-email"
                            className="text-white/80">
                            Business email *
                          </Label>
                          <Input
                            id="project-email"
                            type="email"
                            required={step === 0}
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane@brand.com"
                            className={fieldClass}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white/80">
                            Do you currently have a Shopify store? *
                          </Label>
                          <div className="flex flex-wrap gap-2.5">
                            {(
                              [
                                {v: "yes" as const, l: "Yes"},
                                {v: "no" as const, l: "Not yet"},
                              ] as const
                            ).map((opt) => (
                              <Chip
                                key={opt.v}
                                selected={form.hasStore === opt.v}
                                onClick={() => update("hasStore", opt.v)}>
                                {opt.l}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        {showStoreFields ? (
                          <div className="space-y-2 rounded-xl border border-white/15 bg-black/25 p-4">
                            <Label
                              htmlFor="project-store"
                              className="text-white/80">
                              Shopify store URL *
                            </Label>
                            <Input
                              id="project-store"
                              type="url"
                              value={form.storeUrl}
                              onChange={(e) =>
                                update("storeUrl", e.target.value)
                              }
                              placeholder="https://your-store.myshopify.com"
                              className={fieldClass}
                            />
                            <p className="text-xs text-white/50">
                              Please do not share login credentials.
                              Collaborator access is arranged after engagement.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div className="space-y-5">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Step 02
                          </p>
                          <h1 className="font-display mt-2 text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                            Project scope
                          </h1>
                          <p className="mt-2 text-sm text-white/60">
                            Outline your requirements and primary business
                            objectives.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white/80">
                            Which services do you require? *
                          </Label>
                          <div className="flex flex-wrap gap-2.5">
                            {HELP_OPTIONS.map((opt) => (
                              <Chip
                                key={opt}
                                selected={form.helpWith.includes(opt)}
                                onClick={() =>
                                  update(
                                    "helpWith",
                                    toggleInList(form.helpWith, opt),
                                  )
                                }>
                                {opt}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="project-brief"
                            className="text-white/80">
                            Brief overview of your business *
                          </Label>
                          <Textarea
                            id="project-brief"
                            required={step === 1}
                            rows={4}
                            value={form.businessBrief}
                            onChange={(e) =>
                              update("businessBrief", e.target.value)
                            }
                            placeholder="Describe what you sell and your primary customer segment."
                            className="min-h-[110px] resize-y rounded-lg border-white/15 bg-[#101010]/55 text-foreground placeholder:text-white/40"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="project-goal"
                            className="text-white/80">
                            What is the primary goal of this project? *
                          </Label>
                          <Textarea
                            id="project-goal"
                            required={step === 1}
                            rows={3}
                            value={form.goal}
                            onChange={(e) => update("goal", e.target.value)}
                            placeholder="e.g. increase conversion, refresh the brand presentation, launch a new product line"
                            className="min-h-[90px] resize-y rounded-lg border-white/15 bg-[#101010]/55 text-foreground placeholder:text-white/40"
                          />
                        </div>

                        {showStoreFields ? (
                          <div className="space-y-2">
                            <Label
                              htmlFor="project-improve"
                              className="text-white/80">
                              If you could improve only one aspect of your
                              current website, what would it be?
                            </Label>
                            <Textarea
                              id="project-improve"
                              rows={3}
                              value={form.improveNotes}
                              onChange={(e) =>
                                update("improveNotes", e.target.value)
                              }
                              placeholder="Describe the highest-priority issue or opportunity."
                              className="min-h-[90px] resize-y rounded-lg border-white/15 bg-[#101010]/55 text-foreground placeholder:text-white/40"
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="space-y-5">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Step 03
                          </p>
                          <h1 className="font-display mt-2 text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                            Design, timeline &amp; budget
                          </h1>
                          <p className="mt-2 text-sm text-white/60">
                            This information supports an initial proposal. A
                            full discovery is conducted after engagement terms
                            are agreed.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white/80">
                            Preferred look and feel *
                          </Label>
                          <div className="flex flex-wrap gap-2.5">
                            {STYLE_OPTIONS.map((opt) => (
                              <Chip
                                key={opt}
                                selected={form.styles.includes(opt)}
                                onClick={() =>
                                  update(
                                    "styles",
                                    toggleInList(form.styles, opt),
                                  )
                                }>
                                {opt}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="project-refs"
                            className="text-white/80">
                            Reference websites (optional, 1–3 links)
                          </Label>
                          <Textarea
                            id="project-refs"
                            rows={3}
                            value={form.references}
                            onChange={(e) =>
                              update("references", e.target.value)
                            }
                            placeholder="Share links and briefly note what you appreciate about each."
                            className="min-h-[90px] resize-y rounded-lg border-white/15 bg-[#101010]/55 text-foreground placeholder:text-white/40"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white/80">
                            Which assets do you already have available? *
                          </Label>
                          <div className="flex flex-wrap gap-2.5">
                            {ASSET_OPTIONS.map((opt) => (
                              <Chip
                                key={opt}
                                selected={form.assets.includes(opt)}
                                onClick={() =>
                                  update(
                                    "assets",
                                    toggleInList(form.assets, opt, [
                                      "Partial assets available",
                                      "Not available yet",
                                    ]),
                                  )
                                }>
                                {opt}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white/80">
                            Preferred timeline *
                          </Label>
                          <div className="flex flex-wrap gap-2.5">
                            {TIMELINE_OPTIONS.map((opt) => (
                              <Chip
                                key={opt}
                                selected={form.timeline === opt}
                                onClick={() => update("timeline", opt)}>
                                {opt}
                              </Chip>
                            ))}
                          </div>
                          {showSpecificDate ? (
                            <Input
                              type="date"
                              value={form.specificDate}
                              onChange={(e) =>
                                update("specificDate", e.target.value)
                              }
                              className={cn(fieldClass, "mt-2 max-w-xs")}
                            />
                          ) : null}
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white/80">
                            Approximate budget range *
                          </Label>
                          <div className="flex flex-wrap gap-2.5">
                            {BUDGET_OPTIONS.map((opt) => (
                              <Chip
                                key={opt}
                                selected={form.budget === opt}
                                onClick={() => update("budget", opt)}>
                                {opt}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="project-notes"
                            className="text-white/80">
                            Additional notes (optional)
                          </Label>
                          <Textarea
                            id="project-notes"
                            rows={3}
                            value={form.notes}
                            onChange={(e) => update("notes", e.target.value)}
                            placeholder="Deadlines, campaigns, technical constraints, or other relevant context."
                            className="min-h-[90px] resize-y rounded-lg border-white/15 bg-[#101010]/55 text-foreground placeholder:text-white/40"
                          />
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:pt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 sm:w-auto sm:justify-start">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <span className="order-2 text-center text-xs text-white/45 sm:order-1 sm:text-left">
                      Credentials are never requested on this form
                    </span>
                  )}

                  <div className="flex w-full flex-col gap-2 sm:order-2 sm:w-auto sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={saveDraftNow}
                      className="inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 sm:w-auto">
                      Save draft
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white px-5 py-2.5 text-sm font-medium text-[#101010] transition-colors hover:bg-white/90 sm:w-auto">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white px-5 py-2.5 text-sm font-medium text-[#101010] transition-colors hover:bg-white/90 disabled:opacity-60 sm:w-auto">
                        {submitting ? "Submitting…" : "Submit brief"}
                        {!submitting ? (
                          <ArrowRight className="h-4 w-4" />
                        ) : null}
                      </button>
                    )}
                  </div>
                </div>

                {draftSavedAt ? (
                  <p className="text-center text-[11px] text-white/40 sm:text-left">
                    Draft saved locally · {formatDraftTime(draftSavedAt)}
                  </p>
                ) : null}

                {submitError ? (
                  <p
                    role="alert"
                    className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={resumeOpen}
        onOpenChange={(open) => {
          if (!open && draftMeta) return;
          setResumeOpen(open);
        }}>
        <DialogContent className="border-white/12 bg-[#101010] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">
              Continue your project brief?
            </DialogTitle>
            <DialogDescription className="text-white/60">
              A saved draft was found on this device
              {draftMeta
                ? " from " + formatDraftTime(draftMeta.savedAt)
                : ""}
              . You can resume where you left off or start a new brief.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={discardDraft}
              className="inline-flex items-center justify-center rounded-md border border-white/15 bg-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10">
              Start fresh
            </button>
            <button
              type="button"
              onClick={resumeDraft}
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-[#101010] transition-colors hover:bg-white/90">
              Continue draft
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DialogContent className="border-white/12 bg-[#101010] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">
              Leave this page?
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Your answers can be saved on this device so you can continue
              later. If you leave without saving, unsaved changes may be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <button
              type="button"
              onClick={() => confirmLeave({save: true})}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-[#101010] transition-colors hover:bg-white/90">
              Save draft &amp; leave
            </button>
            <button
              type="button"
              onClick={() => confirmLeave({save: false})}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10">
              Leave without saving
            </button>
            <button
              type="button"
              onClick={() => {
                setLeaveOpen(false);
                setPendingHref(null);
              }}
              className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
              Stay on this page
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
