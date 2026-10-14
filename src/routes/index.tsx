import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Play, Youtube, Pause } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ContactForm } from "@/components/contact-form";
import { portfolioQuery } from "@/lib/portfolio.functions";

import bts1 from "@/assets/bts/000049460017.jpg.asset.json";
import bts2 from "@/assets/bts/000049460020.jpg.asset.json";
import bts3 from "@/assets/bts/000049460021.jpg.asset.json";
import bts4 from "@/assets/bts/000163320022.jpg.asset.json";
import bts5 from "@/assets/bts/000163320024.jpg.asset.json";
import bts6 from "@/assets/bts/000163320027.jpg.asset.json";
import bts7 from "@/assets/bts/000163320033.jpg.asset.json";
import bts8 from "@/assets/bts/IMG_4676.JPG.asset.json";
import bts9 from "@/assets/bts/IMG_4677.JPG.asset.json";
import bts10 from "@/assets/bts/IMG_4719.JPG.asset.json";

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
          "filmabent crafts films with a retro heart: narrative films, Super 8 weddings, music videos and advertisements, imagefilms and events. Based in Berlin.",
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
  { src: bts2.url, alt: "ARRI camera rig by the lake", wide: true },
  { src: bts8.url, alt: "Crew filming on the beach", wide: false },
  { src: bts10.url, alt: "Operator adjusting the camera", wide: false },
  { src: bts3.url, alt: "Camera rig among roses", wide: false },
  { src: bts7.url, alt: "Two cinema cameras with red light leak", wide: true },
  { src: bts9.url, alt: "filmmaker with drone on set", wide: false },
  { src: bts1.url, alt: "Steadicam operator on set", wide: false },
  { src: bts5.url, alt: "Camera on GF Mini Jib in autumn", wide: false },
  { src: bts4.url, alt: "Operator with ARRI rig indoors", wide: false },
  { src: bts6.url, alt: "Focus puller at work", wide: true },
];

function Index() {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/90 to-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-2xl tracking-tight">
            filmabent
          </a>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] md:flex">
            <a href="#work" className="transition-colors hover:text-primary">Work</a>
            <a href="#services" className="transition-colors hover:text-primary">Services</a>
            <a href="#bts" className="transition-colors hover:text-primary">Behind the Scenes</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </nav>
          <a
            href="mailto:filmabent@gmail.com"
            className="border border-foreground/40 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen items-end overflow-hidden">
        <img src={bts7.url} alt="Two cinema cameras in red light" className="animate-flicker absolute inset-0 h-full w-full object-cover" />
        <div className="vignette absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24">
          <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-ember">Stories with character · Shot on feeling</p>
          <h1 className="font-display text-[15vw] leading-[0.85] tracking-tight md:text-[10rem]">filmabent</h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Films with a vintage soul. Grainy, warm, honest —
              made to be remembered, not scrolled past.
            </p>
            <a href="#work" className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/40 transition-colors group-hover:border-primary group-hover:text-primary">
                <Play className="h-4 w-4" />
              </span>
              Watch
            </a>
          </div>
        </div>
      </section>

      <PortfolioGallery />
      <BehindTheScenes />

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">Roll camera</p>
        <h2 className="font-display text-5xl md:text-7xl">Let's make something</h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          A wedding, a record, a short film, an event — tell us what
          you're dreaming of and we'll bring the film.
        </p>
        <ContactForm />
        <div className="mx-auto mt-12 grid max-w-xl gap-5 border-t border-border pt-10 text-left sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-ember">Email</p>
            <a href="mailto:filmabent@gmail.com" className="inline-flex items-center gap-3 text-sm tracking-wide transition-colors hover:text-primary">
              <Mail className="h-4 w-4 text-primary" /> filmabent@gmail.com
            </a>
          </div>
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-ember">Studio</p>
            <a
              href="https://maps.app.goo.gl/whusxa1zkMY6TPmX8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-sm tracking-wide underline-offset-4 transition-colors hover:text-primary"
            >
              <MapPin className="h-4 w-4 text-primary" /> Berlin — on the map
            </a>
          </div>
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-ember">Instagram</p>
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
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-ember">YouTube</p>
            <a
              href="https://www.youtube.com/@filmabent"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-sm tracking-wide transition-colors hover:text-primary"
            >
              <Youtube className="h-4 w-4 text-primary" /> filmabent
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
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-reel-foreground/60">
            © {new Date().getFullYear()} filmabent — shot with love
          </span>
        </div>
      </footer>
    </div>
  );
}


function BehindTheScenes() {
  const [paused, setPaused] = useState(false);
  return <section id="bts" className="overflow-hidden border-y border-border bg-reel py-8 text-reel-foreground">
    <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between gap-4 px-6">
      <div><p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-primary">On set</p><h2 className="font-display text-3xl md:text-4xl">Behind the scenes</h2></div>
      <Button variant="outline" size="icon" aria-label={paused ? "Resume photo banner" : "Pause photo banner"} title={paused ? "Resume" : "Pause"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
    </div>
    <div className={`bts-strip ${paused ? "is-paused" : ""}`}>
      <div className="bts-track">
        {[0, 1].map(copy => <div className="bts-group" key={copy} aria-hidden={copy === 1}>
          {gallery.map(img => <img key={img.src} src={img.src} alt={copy === 0 ? img.alt : ""} loading="lazy" className="h-44 w-auto shrink-0 object-contain md:h-56" />)}
        </div>)}
      </div>
    </div>
  </section>;
}
