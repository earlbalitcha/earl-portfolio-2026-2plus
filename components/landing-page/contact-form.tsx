"use client";

import {useState, type FormEvent} from "react";
import {toast} from "sonner";
import {ArrowRight} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";

const WEB3_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

async function postWeb3Forms(accessKey: string, body: Record<string, string>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({access_key: accessKey, ...body}),
  });
  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };
  return {ok: res.ok && Boolean(data.success), detail: data.message};
}

const fieldClass =
  "h-11 rounded-md border-border bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary";

type ContactFormProps = {
  className?: string;
};

export default function ContactForm({className}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function resetForm() {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCompany("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    const subjectLine = trimmedSubject.length
      ? `[Portfolio] ${trimmedSubject}`
      : "[Portfolio] Inquiry from your site";
    const textBody = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      trimmedMessage,
    ].join("\n");

    setSubmitting(true);
    try {
      let lastError = "Please try again, or email earlbalitcha@gmail.com.";

      // Honeypot — browsers sometimes autofill "company"; ignore silently
      if (company.trim()) {
        return;
      }

      if (WEB3_PUBLIC_KEY) {
        const w = await postWeb3Forms(WEB3_PUBLIC_KEY, {
          subject: subjectLine,
          name: trimmedName,
          email: trimmedEmail,
          replyto: trimmedEmail,
          message: textBody,
        });
        if (w.ok) {
          toast.success("Message sent", {
            description:
              "Thank you. I received your message and will reply as soon as I can.",
          });
          resetForm();
          return;
        }
        if (w.detail) lastError = w.detail;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject || undefined,
          message: trimmedMessage,
          company: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        toast.success("Message sent", {
          description:
            "Thank you. I received your message and will reply as soon as I can.",
        });
        resetForm();
        return;
      }

      const detail = data.error || lastError;
      setSubmitError(detail);
      toast.error("Unable to send", {description: detail});
    } catch {
      const detail =
        "Network error. Check your connection and try again, or email earlbalitcha@gmail.com.";
      setSubmitError(detail);
      toast.error("Unable to send", {description: detail});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      <div
        className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px opacity-0"
        aria-hidden
        tabIndex={-1}>
        <Label htmlFor="contact-hp-field">Leave blank</Label>
        <Input
          id="contact-hp-field"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-muted-foreground">
            Your name
          </Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-muted-foreground">
            Email address
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject" className="text-muted-foreground">
          Subject
        </Label>
        <Input
          id="contact-subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Role, project, or question"
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-muted-foreground">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me a bit about the work or opportunity…"
          className="min-h-[140px] resize-y rounded-md border-border bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:opacity-60 sm:w-auto">
        {submitting ? "Sending…" : "Send message"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
      {submitError ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          {submitError}
        </p>
      ) : null}
      <p className="text-center text-xs text-muted-foreground sm:text-left">
        I read every message and usually reply within a day or two.
      </p>
    </form>
  );
}
