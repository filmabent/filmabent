import { useState } from "react";
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
  return <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
    <div id="work" className="scroll-mt-24">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">{t("What we do", "Was wir tun")}</p>
      <div className="flex items-end gap-4 md:gap-6"><h2 className="font-display text-5xl md:text-7xl">{t("Shot on feeling", "Mit Gefühl gedreht")}</h2><Projector /></div>
    </div>
    <div className="mt-10 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
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

function Projector() {
  return <svg className="projector mb-1 h-16 w-auto shrink-0 text-foreground md:mb-3 md:h-24" viewBox="0 0 96 120" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polygon className="projector-beam" points="78,50 96,44 96,68" stroke="none" />
    {([[30, 18], [64, 18]] as const).map(([cx, cy]) => <g key={cx} className="projector-reel" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r="14" /><circle cx={cx} cy={cy} r="2.5" fill="currentColor" />
      <line x1={cx} y1={cy - 12} x2={cx} y2={cy - 5} /><line x1={cx - 10.5} y1={cy + 6} x2={cx - 4} y2={cy + 2.5} /><line x1={cx + 10.5} y1={cy + 6} x2={cx + 4} y2={cy + 2.5} />
    </g>)}
    <path d="M 30 32 L 30 42 L 64 42 L 64 32" />
    <rect x="26" y="42" width="44" height="50" rx="3" />
    <rect x="70" y="50" width="10" height="12" />
    <circle cx="48" cy="62" r="7" />
    <line x1="34" y1="92" x2="24" y2="116" /><line x1="62" y1="92" x2="72" y2="116" />
  </svg>;
}
