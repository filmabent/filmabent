import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clapperboard, Heart, Music, Camera, Film, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, videoSource } from "@/lib/portfolio";
import { portfolioQuery } from "@/lib/portfolio.functions";

const icons = [Clapperboard, Heart, Music, Camera];

export function PortfolioGallery() {
  const { data } = useSuspenseQuery(portfolioQuery);
  return <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
    <div id="work" className="scroll-mt-24">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">What we do</p>
      <h2 className="font-display text-5xl md:text-7xl">Shot on feeling</h2>
    </div>
    <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, i) => {
        const Icon = icons[i] ?? Film;
        return <a key={category.slug} href={`#${category.slug}`} className="flex flex-col bg-background p-6 transition-colors hover:bg-card">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-2xl">{category.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{category.text}</p>
        </a>;
      })}
    </div>
    {categories.map((category, i) => <CategoryGallery key={category.slug} category={category} index={i} featured={data.find(row => row.slug === category.slug)?.featured_url ?? ""} urls={data.find(row => row.slug === category.slug)?.gallery_urls ?? []} />)}
  </section>;
}

function CategoryGallery({ category, index, featured, urls }: { category: typeof categories[number]; index: number; featured: string; urls: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const active = selected ?? featured;
  const source = videoSource(active);
  const frames = urls.length ? urls : ["", "", ""];
  return <article id={category.slug} className="scroll-mt-24 border-b border-border py-10 md:py-12">
    <div className="grid items-center gap-8 md:grid-cols-[1fr_1.65fr] md:gap-14">
      <div>
        <h3 className="font-display text-4xl md:text-5xl">{category.title}</h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{category.text}</p>
      </div>
      <div className="relative aspect-video max-h-[60vh] border border-border bg-reel">
        {playing && source ? source.includes(".mp4") ? <video src={source} controls autoPlay className="h-full w-full" /> : <iframe src={source} title={`${category.title} spec film`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" /> : source ? <Button variant="ghost" onClick={() => setPlaying(true)} aria-label={`Play ${category.title}`} className="h-full w-full rounded-none"><Play className="size-10 text-primary" /></Button> : <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground"><Film className="size-9" strokeWidth={1} /></div>}
      </div>
    </div>
    <div className="mt-6 grid grid-cols-3 gap-3 md:ml-[calc(37.7358%+1.3rem)]">
      {frames.map((url, i) => <Button key={`${i}-${url}`} disabled={!url} variant="ghost" aria-label={`Select ${category.title} gallery film ${i + 1}`} onClick={() => { setSelected(url); setPlaying(true); }} className="aspect-video h-auto w-full flex-col gap-2 rounded-none border border-border bg-reel p-2 disabled:opacity-100">
        {url ? <Play className="text-primary" /> : <Film className="text-muted-foreground" strokeWidth={1} />}
      </Button>)}
    </div>
  </article>;
}