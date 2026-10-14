import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clapperboard, Heart, Music, Stars, Film, Play, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, videoSource } from "@/lib/portfolio";
import { portfolioQuery } from "@/lib/portfolio.functions";

import { useLanguage } from "@/components/language";

const germanCategories = {
  narrative: { title: "Narrative Filme", text: "Geschichten mit Vintage-Charme — geschrieben, gedreht und geschnitten mit echter Textur." },
  weddings: { title: "Hochzeiten auf Super 8", text: "Euer Tag auf echtem Film. Eine Erinnerung mit Korn, Wärme und ganz eigenem Charakter." },
  music: { title: "Musikvideos & Werbung", text: "Eine visuelle Welt rund um deinen Sound, deine Idee, deine Identität." },
  imagefilms: { title: "Imagefilme & Events", text: "Menschen, Orte und Momente — mit Charakter festgehalten." },
};

const icons = [Clapperboard, Heart, Music, Stars];

function thumb(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : null;
}

export function PortfolioGallery() {
  const { t } = useLanguage();
  const localizedCategories = categories.map(category => ({ ...category, title: t(category.title, germanCategories[category.slug].title), text: t(category.text, germanCategories[category.slug].text) }));
  const { data } = useSuspenseQuery(portfolioQuery);
  return <section id="services" className="mx-auto max-w-6xl px-6 pb-16 pt-6 md:pb-20 md:pt-8">
    <div id="work" className="scroll-mt-24">
      <ProjectionHeadline title={t("Shot on feeling", "Mit Gefühl gedreht")} />
      <p className="mt-6 text-xs uppercase tracking-[0.35em] text-primary">{t("What we do", "Was wir tun")}</p>
    </div>
    <div className="mt-5 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
      {localizedCategories.map((category, i) => {
        const Icon = icons[i] ?? Film;
        return <a key={category.slug} href={`#${category.slug}`} className="flex flex-col border-b border-r border-border p-6 transition-colors hover:bg-foreground/5">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-2xl">{category.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{category.text}</p>
        </a>;
      })}
    </div>
    {localizedCategories.map(category => <CategoryGallery key={category.slug} category={category} featured={data.find(row => row.slug === category.slug)?.featured_url ?? ""} />)}
  </section>;
}

function CategoryGallery({ category, featured }: { category: { slug: typeof categories[number]["slug"]; title: string; text: string }; featured: string }) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const source = videoSource(featured, true);
  const thumbnail = thumb(featured);
  const Icon = icons[categories.findIndex(item => item.slug === category.slug)] ?? Film;
  return <article id={category.slug} className={`scroll-mt-24 py-10 md:py-12 ${category.slug === "imagefilms" ? "" : "border-b border-border"}`}>
    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
      <div>
        <div className="flex items-start gap-4"><Icon className="mt-2 size-7 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" /><h3 className="font-display text-3xl lg:text-4xl">{category.title}</h3></div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{category.text}</p>
        <FilmRollButton />
      </div>
      <div className="w-full max-w-md md:justify-self-end">
        <div className="relative aspect-video w-full border border-border bg-reel">
          {playing && source ? source.includes(".mp4") ? <video src={source} controls autoPlay className="h-full w-full" /> : <iframe src={source} title={`${category.title} spec film`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" /> : source ? <Button variant="ghost" onClick={() => setPlaying(true)} aria-label={t(`Play ${category.title}`, `${category.title} abspielen`)} className="group relative h-full w-full overflow-hidden rounded-none p-0">{thumbnail && <img src={thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />}<span className="relative flex size-14 items-center justify-center rounded-full bg-reel/70 transition-transform group-hover:scale-110"><Play className="size-7 text-primary" /></span></Button> : <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground"><Film className="size-9" strokeWidth={1} /></div>}
        </div>
        {category.slug !== "imagefilms" && <a
          href="https://www.youtube.com/@filmabent"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          <Youtube className="h-4 w-4 text-primary" /> {t("Full gallery on YouTube", "Mehr auf YouTube")}
        </a>}
      </div>
    </div>
  </article>;
}

function FilmRollButton() {
  const { t } = useLanguage();
  return <a href="#contact" className="group relative mt-8 inline-flex items-center gap-3 py-2 text-xs uppercase tracking-[0.25em] text-foreground">
    {t("Start your film", "Dein Film beginnt hier")}
    <span className="relative inline-flex">
      <svg viewBox="0 0 32 32" className="film-reel relative z-10 size-8" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="var(--background)" /><circle cx="16" cy="16" r="12.5" strokeWidth="0.6" />
        <circle cx="16" cy="16" r="3.2" /><circle cx="16" cy="16" r="1" fill="currentColor" />
        {[270, 30, 150].map(a => { const r = a * Math.PI / 180; return <path key={a} d={`M ${16 + 5 * Math.cos(r - 0.5)} ${16 + 5 * Math.sin(r - 0.5)} L ${16 + 10.5 * Math.cos(r - 0.42)} ${16 + 10.5 * Math.sin(r - 0.42)} A 10.5 10.5 0 0 1 ${16 + 10.5 * Math.cos(r + 0.42)} ${16 + 10.5 * Math.sin(r + 0.42)} L ${16 + 5 * Math.cos(r + 0.5)} ${16 + 5 * Math.sin(r + 0.5)} A 5 5 0 0 0 ${16 + 5 * Math.cos(r - 0.5)} ${16 + 5 * Math.sin(r - 0.5)} Z`} strokeLinejoin="round" />; })}
      </svg>
      <span className="film-unroll" aria-hidden="true" />
    </span>
  </a>;
}

function ProjectionHeadline({ title }: { title: string }) {
  const letters = Array.from(title);
  const [metrics, setMetrics] = useState<{ title: string; widths: number[] }>();
  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      const context = document.createElement("canvas").getContext("2d");
      if (!active || !context) return;
      context.font = '84px "DM Serif Display"';
      setMetrics({ title, widths: Array.from(title).map(letter => context.measureText(letter).width) });
    });
    return () => { active = false; };
  }, [title]);
  const widths = metrics?.title === title ? metrics.widths : letters.map(letter => letter === " " ? 21 : /[ilIt]/.test(letter) ? 25 : /[mwM]/.test(letter) ? 72 : 43);
  const growth = letters.map((_, index) => 0.55 + 1.05 * index / Math.max(1, letters.length - 1));
  const fit = 625 / widths.reduce((sum, width, index) => sum + width * (growth[index] ?? 1), 0);
  let offset = 0;
  return <h2 className="projection-screen">
    <span className="sr-only">{title}</span>
    <svg viewBox="0 0 850 210" className="projection-scene" aria-hidden="true">
      <defs>
        <linearGradient id="headline-light" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--projection-source)" />
          <stop offset="1" stopColor="var(--projection-spread)" />
        </linearGradient>
      </defs>
      <path className="projection-beam" d="M127 86 L846 0 L846 200 L127 106 Z" fill="url(#headline-light)" />
      <g className="projected-title">
        {letters.map((letter, index) => {
          const scale = (growth[index] ?? 1) * fit;
          const width = (widths[index] ?? 43) * scale;
          const x = 202 + offset;
          offset += width;
          return <text key={index} x="0" y="0" transform={`translate(${x} ${96 + 27 * scale}) scale(${scale})`}>{letter === " " ? "\u00a0" : letter}</text>;
        })}
      </g>
      <Projector />
    </svg>
  </h2>;
}

function Projector() {
  const bg = "var(--color-background)";
  return <svg x="0" y="30" width="150" height="120" className="projector text-foreground" viewBox="0 0 150 120" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    {/* two big spoked reels on top, close together */}
    <g className="projector-reel" style={{ transformOrigin: "70px 22px" }}>
      <circle cx="70" cy="22" r="17" strokeWidth="5" />
      <line x1="70" y1="7" x2="70" y2="37" strokeWidth="3" /><line x1="55" y1="22" x2="85" y2="22" strokeWidth="3" />
      <circle cx="70" cy="22" r="4.5" fill="currentColor" />
    </g>
    <g className="projector-reel" style={{ transformOrigin: "106px 28px" }}>
      <circle cx="106" cy="28" r="15" strokeWidth="5" />
      <line x1="106" y1="14" x2="106" y2="42" strokeWidth="3" /><line x1="92" y1="28" x2="120" y2="28" strokeWidth="3" />
      <circle cx="106" cy="28" r="4" fill="currentColor" />
    </g>
    <line x1="70" y1="39" x2="70" y2="48" strokeWidth="3" />
    {/* boxy body with cut-out knobs */}
    <rect x="56" y="48" width="62" height="40" rx="2" fill="currentColor" />
    <circle cx="76" cy="66" r="4.5" style={{ stroke: bg }} /><circle cx="90" cy="66" r="4.5" style={{ stroke: bg }} />
    <rect x="100" y="59" width="11" height="14" rx="1.5" style={{ stroke: bg }} />
    {/* conical lens hood pointing right, feeding the beam */}
    <polygon points="116,56 128,49 128,83 116,76" fill="currentColor" />
    {/* tripod: hub and three splayed legs */}
    <circle cx="86" cy="91" r="4" fill="currentColor" />
    <line x1="84" y1="92" x2="58" y2="118" strokeWidth="5" /><line x1="88" y1="92" x2="116" y2="118" strokeWidth="5" /><line x1="86" y1="93" x2="86" y2="118" strokeWidth="5" />
  </svg>;
}
