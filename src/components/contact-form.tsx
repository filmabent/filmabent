import { useRef, useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";
import { useLanguage } from "@/components/language";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(3000),
});

const field = "w-full rounded-none border-0 bg-transparent px-0 py-2 text-base placeholder:text-muted-foreground focus:outline-none";
const slateLabel = "font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-logo";

export function ContactForm({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const armRef = useRef<HTMLDivElement>(null);

  // every pointer entry plays its own clap on top of the periodic CSS clap;
  // a scripted animation always starts fresh, unlike toggling a CSS :hover rule
  const clapRef = useRef<Animation | null>(null);
  function clap(e: React.PointerEvent) {
    const el = armRef.current;
    if (!el || e.pointerType === "touch" || typeof el.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clapRef.current?.cancel();
    clapRef.current = el.animate([
      { transform: "rotate(0deg)", offset: 0 },
      { transform: "rotate(-9deg)", offset: 0.14 },
      { transform: "rotate(0deg)", offset: 0.3 },
      { transform: "rotate(-3.5deg)", offset: 0.38 },
      { transform: "rotate(0deg)", offset: 0.48 },
      { transform: "rotate(0deg)", offset: 1 },
    ], { duration: 1600, easing: "ease-out" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.path[0] === "name" ? "name" : parsed.error.issues[0]?.path[0] === "email" ? "email" : "message"); return; }
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

  if (status === "sent") return <p className="mx-auto mt-10 max-w-md text-sm text-primary">{t("Thank you — your message is on its way. We’ll get back to you soon.", "Vielen Dank — deine Nachricht ist unterwegs. Wir melden uns bald.")}</p>;

  return <div className="clapper-slate mx-auto mt-6 max-w-3xl text-left" onPointerEnter={clap}>
    <div ref={armRef} className="slate-arm" aria-hidden="true" />
    <div className="slate-hinge" aria-hidden="true" />
    <div className="slate-arm-fixed" aria-hidden="true" />
    <form onSubmit={onSubmit} className="slate-body grid gap-5 px-6 py-8 sm:px-10" noValidate>
      <div className="flex flex-wrap items-center gap-3">
        <span className="slate-tape">{t("Prod.", "Prod.")} filmabent</span>
        <span className="slate-tape alt">{t("Director", "Regie")}: {t("you", "du")}</span>
      </div>
      {children && <div className="text-center">{children}</div>}
      <div className="slate-grid">
        <label className="slate-cell">
          <span className={slateLabel}>{t("Name", "Name")}</span>
          <input name="name" placeholder={t("Your name", "Dein Name")} aria-label={t("Your name", "Dein Name")} className={field} maxLength={100} />
        </label>
        <label className="slate-cell">
          <span className={slateLabel}>{t("Email", "E-Mail")}</span>
          <input name="email" type="email" placeholder={t("Your email", "Deine E-Mail")} aria-label={t("Your email", "Deine E-Mail")} className={field} maxLength={255} />
        </label>
        <label className="slate-cell wide">
          <span className={slateLabel}>{t("Scene — your project idea", "Szene — deine Projektidee")}</span>
          <textarea name="message" rows={5} placeholder={t("Tell us about your project", "Erzähl uns von deinem Projekt")} aria-label={t("Message", "Nachricht")} className={field} maxLength={3000} />
        </label>
      </div>
      {(error || status === "error") && <p className="text-xs text-destructive">{error ? error === "name" ? t("Please add your name", "Bitte gib deinen Namen an") : error === "email" ? t("Please enter a valid email", "Bitte gib eine gültige E-Mail-Adresse ein") : t("Please write a message", "Bitte schreibe eine Nachricht") : t("Something went wrong — please try again or email filmabent@gmail.com.", "Etwas ist schiefgelaufen — bitte versuche es erneut oder schreibe an filmabent@gmail.com.")}</p>}
      <div className="flex justify-end pt-1"><button type="submit" disabled={status === "sending"} className="slate-tape slate-send inline-flex items-center gap-3 disabled:opacity-50">
        <Send className="h-4 w-4" /> {status === "sending" ? t("Sending…", "Wird gesendet…") : t("Send message", "Nachricht senden")}
      </button></div>
    </form>
  </div>;
}
