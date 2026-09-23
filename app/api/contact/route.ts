import {NextResponse} from "next/server";
import {z} from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Message is required.").max(8000),
  /** Honeypot: hidden field; bots often fill this. */
  company: z.string().optional(),
});

const DEFAULT_TO = "earlbalitcha@gmail.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({error: "Invalid request body."}, {status: 400});
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.name?.[0] || first.email?.[0] || first.message?.[0] || "Please check the form and try again.";
    return NextResponse.json({error: msg}, {status: 400});
  }

  const {name, email, subject, message, company} = parsed.data;
  if (company?.trim()) {
    return NextResponse.json({ok: true});
  }

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const subjectLine = subject?.length
    ? `[Portfolio] ${subject}`
    : "[Portfolio] Inquiry from your site";

  const textBody = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
  const htmlBody = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(
    email,
  )}</p><hr style="border:none;border-top:1px solid #eee;margin:16px 0" /><p style="white-space:pre-wrap">${escapeHtml(
    message,
  )
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br/>")}</p>`;

  const web3Key =
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (web3Key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: subjectLine,
          name,
          email,
          replyto: email,
          message: textBody,
        }),
      });

      const raw = await res.text();
      let data: {success?: boolean; message?: string} = {};
      try {
        data = JSON.parse(raw) as {success?: boolean; message?: string};
      } catch {
        console.error("Web3Forms non-JSON response:", raw.slice(0, 200));
        return NextResponse.json(
          {
            error:
              "The email service could not be reached from the server. Please try again.",
          },
          {status: 502},
        );
      }

      if (!res.ok || !data.success) {
        console.error("Web3Forms error:", data.message || res.status);
        return NextResponse.json(
          {error: "The message could not be sent. Please try again later."},
          {status: 502},
        );
      }
      return NextResponse.json({ok: true});
    } catch (err) {
      console.error("Web3Forms fetch failed:", err);
      return NextResponse.json(
        {
          error:
            "The email service could not be reached. Please try again shortly.",
        },
        {status: 502},
      );
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: subjectLine,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Resend error:", res.status, errText);
      return NextResponse.json(
        {error: "The message could not be sent. Please try again later."},
        {status: 502},
      );
    }
    return NextResponse.json({ok: true});
  }

  return NextResponse.json(
    {
      error:
        "Contact email is not configured. Add WEB3FORMS_ACCESS_KEY (or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) to a file named .env.local in the project root, then restart the dev server. For production, add the same variable in your hosting provider's environment settings.",
    },
    {status: 503},
  );
}
