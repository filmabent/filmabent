import { createFileRoute } from "@tanstack/react-router";
import { Camera, Clapperboard, Film, Heart, Instagram, Mail, MapPin, Youtube } from "lucide-react";

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
  component: Index,
  head: () => ({
    meta: [
      { title: "filmabent — Film Production with a Vintage Soul" },
      {
        name: "description",
        content:
          "filmabent crafts films with a retro heart: Super 8 weddings, vintage-style documentaries and retro product shoots. Based in Berlin.",
      },
      { property: "og:title", content: "filmabent — Film Production with a Vintage Soul" },
      {
        property: "og:description",
        content:
          "Super 8 weddings, vintage-style documentaries and retro product shoots — film with real character.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const videos = [
  { id: "TeE6CvUIg0E", title: "Project 01" },
  { id: "pNX1XCQijRQ", title: "Project 02" },
  { id: "qBle2vkQjCg", title: "Project 03" },
  { id: "ifzdD7G0ugA", title: "Project 04" },
];

const services = [
  {
    icon: Heart,
    title: "Weddings on Super 8",
    text: "Your day, captured on real film. Grain, warmth and light leaks included — a memory that feels like it was always there.",
  },
  {
    icon: Film,
    title: "Vintage Documentaries",
    text: "Stories told with a retro eye. Documentary work that trades sterile sharpness for texture, soul and honesty.",
  },
  {
    icon: Camera,
    title: "Retro Product Shoots",
    text: "Products with character. Analog-inspired visuals that make brands feel timeless instead of disposable.",
  },
  {
    icon: Clapperboard,
    title: "Music & Commercial Film",
    text: "From music videos to brand spots — cinematic craft with a look nobody can mistake for stock footage.",
  },
];

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
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
            className="border border-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-primary">
            Est. on film · Berlin
          </p>
          <h1 className="font-display text-[13vw] leading-[0.9] tracking-tight md:text-[9rem]">
            filmabent
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A film production company with a vintage soul. We shoot stories the
            way they deserve to be remembered — warm, grainy, honest, and
            impossible to scroll past.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-85"
            >
              Watch the work
            </a>
            <a
              href="#contact"
              className="border border-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background"
            >
              Book a shoot
            </a>
          </div>
        </div>

        {/* marquee strip */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-border bg-reel py-3 text-reel-foreground">
          <div className="animate-marquee flex w-max whitespace-nowrap text-xs uppercase tracking-[0.3em]">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex">
                {["Super 8", "Weddings", "Documentaries", "Product Films", "Music Videos", "Analog Soul", "16mm", "Retro Commercials"].map((w) => (
                  <span key={w} className="mx-6 flex items-center gap-6">
                    {w} <span className="text-primary">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-28">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">Selected work</p>
            <h2 className="font-display text-5xl md:text-7xl">The Reel</h2>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground md:block">
            01 — 04
          </span>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {videos.map((v) => (
            <figure key={v.id} className="group">
              <div className="relative overflow-hidden border border-border bg-reel shadow-[8px_8px_0_0_var(--color-foreground)]">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>{v.title}</span>
                <span className="text-primary">▶ Play</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          More on{" "}
          <a
            href="https://www.youtube.com/@filmabent"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4"
          >
            YouTube
          </a>
        </p>
      </section>

      <div className="sprocket mx-auto max-w-6xl" />

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-28">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">What we do</p>
        <h2 className="mb-6 font-display text-5xl md:text-7xl">Shot on feeling</h2>
        <p className="mb-14 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Everything we make carries that analog warmth — the kind of look that
          makes people feel something before they know why. Here's what that
          can look like for you:
        </p>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="group bg-card p-10 transition-colors hover:bg-secondary">
              <s.icon className="mb-6 h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="mb-3 font-display text-2xl">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Behind the scenes */}
      <section id="bts" className="bg-reel py-28 text-reel-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">On set</p>
          <h2 className="mb-14 font-display text-5xl md:text-7xl">Behind the scenes</h2>
          <div className="columns-2 gap-4 space-y-4 md:columns-3">
            {gallery.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="photo-vintage w-full border border-reel-foreground/20 transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-28 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">Roll camera</p>
        <h2 className="font-display text-5xl md:text-7xl">Let's make something</h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          A wedding, a documentary, a product with a story — tell us what
          you're dreaming of and we'll bring the film.
        </p>
        <a
          href="mailto:filmabent@gmail.com"
          className="mt-10 inline-flex items-center gap-3 bg-primary px-10 py-5 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-85"
        >
          <Mail className="h-4 w-4" /> filmabent@gmail.com
        </a>
        <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <a
            href="https://maps.app.goo.gl/whusxa1zkMY6TPmX8"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Find us on the map
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-reel py-12 text-reel-foreground">
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
