import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(3000),
});

const field = "w-full border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setError(""); setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/filmabent@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...parsed.data, _replyto: parsed.data.email, _subject: `filmabent enquiry from ${parsed.data.name}`, _template: "table", _captcha: "false" }),
      });
      if (!res.ok) throw new Error();
      form.reset(); setStatus("sent");
    } catch { setStatus("error"); }
  }

  if (status === "sent") return <p className="mx-auto mt-10 max-w-md text-sm text-primary">Thank you — your message is on its way. We'll get back to you soon.</p>;

  return <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-xl gap-3 text-left" noValidate>
    <div className="grid gap-3 sm:grid-cols-2">
      <input name="name" placeholder="Your name" aria-label="Your name" className={field} maxLength={100} />
      <input name="email" type="email" placeholder="Your email" aria-label="Your email" className={field} maxLength={255} />
    </div>
    <textarea name="message" rows={5} placeholder="Tell us about your project" aria-label="Message" className={field} maxLength={3000} />
    {(error || status === "error") && <p className="text-xs text-destructive">{error || "Something went wrong — please try again or email filmabent@gmail.com."}</p>}
    <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center gap-3 bg-primary px-10 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50">
      <Send className="h-4 w-4" /> {status === "sending" ? "Sending…" : "Send message"}
    </button>
  </form>;
}
