import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Play, Youtube, Pause, X, ChevronLeft, ChevronRight, Clapperboard } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ContactForm } from "@/components/contact-form";
import { portfolioQuery } from "@/lib/portfolio.functions";
import { LanguageSwitch, useLanguage } from "@/components/language";
import { ScrollLightLeak } from "@/components/scroll-light-leak";

function TikTokIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M9 12a4 4 0 1 0 4 4V3c.5 2.6 2.4 4.5 5 5" />
  </svg>;
}

const bts7 = { url: "/bts/000163320033.jpg" };

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  component: Index,
  errorComponent: () => <div className="min-h-screen bg-background p-12 text-foreground">The galleries could not load. Please refresh and try again.</div>,
  notFoundComponent: () => <div>Page not found.</div>,
  head: () => ({
    meta: [
      { title: "filmabent — Film Production with a Vintage Soul" },
      {
        name: "description",
        content:
          "filmabent crafts films with a retro heart: narrative films, Super 8 weddings, music videos and advertisements, imagefilms and events. Based in Hamburg.",
      },
      { property: "og:title", content: "filmabent — Film Production with a Vintage Soul" },
      {
        property: "og:description",
        content:
          "Narrative films, Super 8 weddings, music videos and advertisements, imagefilms and events — film with real character.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const gallery = [
  { src: "/bts/new-dsc8801.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-1.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000049460017-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc8469.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc7497.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000163320024-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000049460020-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc8894.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-img_4676-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000049460021-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc8471.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc8596.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000163320022-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000163320033-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc8814.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dscf8670.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-img_4677-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-000163320027-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-img_4719-2.jpg", alt: "Behind the scenes on a filmabent set" },
  { src: "/bts/new-dsc8808.jpg", alt: "Behind the scenes on a filmabent set" },
];

function Index() {
  const { t } = useLanguage();
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <ScrollLightLeak />
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/90 to-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="vintage-glow font-display text-2xl tracking-tight">
            filmabent
          </a>
          <nav className="hidden items-center gap-5 whitespace-nowrap text-xs uppercase tracking-[0.2em] lg:gap-8 md:flex">
            <a href="#work" className="transition-colors hover:text-primary">{t("Work", "Filme")}</a>
            <a href="#services" className="transition-colors hover:text-primary">{t("Services", "Leistungen")}</a>
            <a href="#bts" className="transition-colors hover:text-primary">{t("Behind the Scenes", "Hinter den Kulissen")}</a>
            <a href="#contact" className="transition-colors hover:text-primary">{t("Contact", "Kontakt")}</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitch />
            <a href="#contact" className="cinema-ticket">
              <Clapperboard className="ticket-stub h-4 w-4 text-logo" aria-hidden="true" />
              <span className="flex flex-col items-start gap-[3px] leading-none">
                <span className="ticket-admit">{t("Admit one", "Eintritt")}</span>
                <span>{t("Get in touch", "Kontakt")}</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen items-end overflow-hidden">
        <img src={bts7.url} alt={t("Two cinema cameras in red light", "Zwei Filmkameras in rotem Licht")} className="animate-flicker absolute inset-0 h-full w-full object-cover" />
        <div className="vignette absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-10">
          <p className="hero-eyebrow mb-6 text-[11px] font-normal uppercase tracking-[0.28em] text-logo sm:text-[12px] sm:tracking-[0.34em]">{t("Stories with character · Shot on feeling", "Geschichten mit Charakter · Mit Gefühl gedreht")}</p>
          <h1 className="vintage-glow font-display text-[15vw] leading-[0.85] tracking-tight md:text-[10rem]">filmabent</h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("Films with a vintage soul. Grainy, warm, honest — made to be remembered, not scrolled past.", "Filme mit Vintage-Seele. Körnig, warm, ehrlich — gemacht, um zu bleiben, nicht um weggescrollt zu werden.")}
            </p>
            <a href="#work" className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/40 transition-colors group-hover:border-primary group-hover:text-primary">
                <Play className="h-4 w-4" />
              </span>
              {t("Watch", "Ansehen")}
            </a>
          </div>
        </div>
      </section>

      <PortfolioGallery />
      <BehindTheScenes />

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
<ContactForm>
        <h2 className="font-display text-[clamp(1.6rem,7vw,3.25rem)] leading-tight sm:whitespace-nowrap">{t("Let’s make something", "Lass uns was drehen")}</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t("A wedding, a record, a short film, an event — tell us what you’re dreaming of and we’ll bring the film.", "Eine Hochzeit, ein Musikvideo, ein Kurzfilm, ein Event — erzähl uns von deiner Idee, den Rest machen wir.")}
        </p>
        </ContactForm>
        <div className="mx-auto mt-12 max-w-xl border-t border-border pt-10">
          <div className="mx-auto grid w-fit gap-x-12 gap-y-5 text-left sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-logo">{t("Email", "E-Mail")}</p>
              <a href="mailto:filmabent@gmail.com" className="inline-flex items-center gap-3 text-sm tracking-wide transition-colors hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> filmabent@gmail.com
              </a>
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-logo">Instagram</p>
              <a
                href="https://www.instagram.com/filmabent"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm tracking-wide transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4 text-primary" /> @filmabent
              </a>
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-logo">YouTube</p>
              <a
                href="https://www.youtube.com/@filmabent"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm tracking-wide transition-colors hover:text-primary"
              >
                <Youtube className="h-4 w-4 text-primary" /> filmabent
              </a>
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-logo">TikTok</p>
              <a
                href="https://www.tiktok.com/@filmabent"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm tracking-wide transition-colors hover:text-primary"
              >
                <TikTokIcon className="h-4 w-4 text-primary" /> @filmabent
              </a>
            </div>
          </div>
          <div className="mt-5 text-center">
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-logo">{t("Based in", "Zuhause in")}</p>
            <a
              href="https://maps.app.goo.gl/whusxa1zkMY6TPmX8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-sm tracking-wide underline-offset-4 transition-colors hover:text-primary"
            >
              <MapPin className="h-4 w-4 text-primary" /> {t("Hamburg — filming across all of Europe", "Hamburg — Drehs in ganz Europa")}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-reel py-8 text-reel-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <span className="font-display text-3xl">filmabent</span>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/filmabent"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary"
            >
              <Instagram className="h-5 w-5" /> @filmabent
            </a>
            <a
              href="https://www.youtube.com/@filmabent"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary"
            >
              <Youtube className="h-5 w-5" /> filmabent
            </a>
            <a
              href="https://www.tiktok.com/@filmabent"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary"
            >
              <TikTokIcon className="h-5 w-5" /> @filmabent
            </a>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-reel-foreground/60">
            © 2022 filmabent — {t("shot with love", "mit Liebe gefilmt")}
          </span>
        </div>
      </footer>
    </div>
  );
}


function BehindTheScenes() {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const n = gallery.length;
  const strip = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const focused = useRef(false);
  const stopped = useRef(false);
  const travel = useRef(0);
  const slide = (d: number) => { travel.current += d * (strip.current?.clientWidth ?? 0) * 0.65; };
  const go = (d: number) => setOpen(i => i === null ? i : (i + d + n) % n);
  const currentPhoto = open === null ? undefined : gallery[open];
  useEffect(() => { stopped.current = paused || open !== null; }, [paused, open]);
  useEffect(() => {
    const el = strip.current;
    const photos = group.current;
    if (!el || !photos) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    // fractional position kept here: on 1x screens the browser rounds scrollLeft
    // to whole pixels, so adding ~0.5px per frame directly never moved the banner
    let pos = 0;
    const resize = new ResizeObserver(() => {
      const next = photos.offsetWidth;
      if (next <= 0) return;
      pos = width ? pos / width * next : next;
      el.scrollLeft = pos;
      width = next;
    });
    resize.observe(photos);
    const onUserScroll = () => { if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; };
    el.addEventListener("scroll", onUserScroll, { passive: true });
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      let distance = 0;
      if (Math.abs(travel.current) > 0.5) {
        distance = motion.matches ? travel.current : travel.current * (1 - Math.exp(-dt / 100));
        travel.current -= distance;
      } else {
        travel.current = 0;
        if (!motion.matches && !stopped.current && !hovering.current && !focused.current) distance = dt * 0.033;
      }
      if (width > 0) {
        pos += distance;
        if (pos < width * 0.5) pos += width;
        if (pos > width * 1.5) pos -= width;
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); el.removeEventListener("scroll", onUserScroll); };
  }, []);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return <section id="bts" className="overflow-hidden border-y border-border bg-reel py-8 text-reel-foreground">
    <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between gap-4 px-6">
      <div className="flex items-center gap-5">
        <div><p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-primary">{t("On set", "Am Set")}</p><h2 className="font-display text-3xl md:text-4xl">{t("Behind the scenes", "Hinter den Kulissen")}</h2></div>
      </div>
      <Button variant="outline" size="icon" aria-label={paused ? t("Resume photo banner", "Fotobanner fortsetzen") : t("Pause photo banner", "Fotobanner anhalten")} title={paused ? t("Resume", "Fortsetzen") : t("Pause", "Anhalten")} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
    </div>
    <div className="relative" onPointerEnter={() => { hovering.current = true; }} onPointerLeave={() => { hovering.current = false; focused.current = false; travel.current = 0; }} onFocusCapture={e => { focused.current = e.target.matches(":focus-visible"); }} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false; }}>
    <Button variant="outline" size="icon" aria-label={t("Scroll photos left", "Fotos nach links scrollen")} title={t("Scroll banner left", "Banner nach links scrollen")} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-reel/80" onClick={() => slide(-1)}><ChevronLeft /></Button>
    <Button variant="outline" size="icon" aria-label={t("Scroll photos right", "Fotos nach rechts scrollen")} title={t("Scroll banner right", "Banner nach rechts scrollen")} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-reel/80" onClick={() => slide(1)}><ChevronRight /></Button>
    <div ref={strip} className={`bts-strip overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${paused || open !== null ? "is-paused" : ""}`}>
      <div className="bts-track">
        {[0, 1, 2].map(copy => <div ref={copy === 1 ? group : undefined} className="bts-group" key={copy} aria-hidden={copy !== 1}>
          {gallery.map((img, i) => <Button variant="ghost" key={img.src} type="button" tabIndex={copy !== 1 ? -1 : 0} onClick={() => setOpen(i)} aria-label={t(`Open photo ${i + 1}`, `Foto ${i + 1} öffnen`)} className="h-auto shrink-0 cursor-zoom-in rounded-none p-0">
            <img src={img.src} alt={copy === 1 ? t(img.alt, "Hinter den Kulissen am filmabent-Set") : ""} className="h-44 w-auto max-w-none object-contain md:h-56" />
          </Button>)}
        </div>)}
      </div>
    </div>
    </div>
    {open !== null && currentPhoto && createPortal(<div role="dialog" aria-modal="true" aria-label={t("Photo viewer", "Fotoansicht")} className="fixed inset-0 z-[100] flex items-center justify-center bg-reel/95 p-4" onClick={() => setOpen(null)}>
      <img src={currentPhoto.src} alt={t(currentPhoto.alt, "Hinter den Kulissen am filmabent-Set")} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={e => e.stopPropagation()} />
      <Button variant="outline" size="icon" aria-label={t("Close", "Schließen")} className="absolute right-4 top-4" onClick={() => setOpen(null)}><X /></Button>
      <Button variant="outline" size="icon" aria-label={t("Previous photo", "Vorheriges Foto")} className="absolute left-4 top-1/2 -translate-y-1/2" onClick={e => { e.stopPropagation(); go(-1); }}><ChevronLeft /></Button>
      <Button variant="outline" size="icon" aria-label={t("Next photo", "Nächstes Foto")} className="absolute right-4 top-1/2 -translate-y-1/2" onClick={e => { e.stopPropagation(); go(1); }}><ChevronRight /></Button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-reel-foreground/70">{open + 1} / {n}</p>
    </div>, document.body)}
  </section>;
}
