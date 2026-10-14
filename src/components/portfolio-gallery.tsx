import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clapperboard, Heart, Music, Sparkles, Film, Play, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, videoSource } from "@/lib/portfolio";
import { portfolioQuery } from "@/lib/portfolio.functions";

const icons = [Clapperboard, Heart, Music, Sparkles];

function thumb(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : null;
}

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
    {categories.map(category => <CategoryGallery key={category.slug} category={category} featured={data.find(row => row.slug === category.slug)?.featured_url ?? ""} />)}
  </section>;
}

function CategoryGallery({ category, featured }: { category: typeof categories[number]; featured: string }) {
  const [playing, setPlaying] = useState(false);
  const source = videoSource(featured);
  return <article id={category.slug} className="scroll-mt-24 border-b border-border py-10 md:py-12">
    <div className="grid items-center gap-8 md:grid-cols-[1fr_1.65fr] md:gap-14">
      <div>
        <h3 className="font-display text-4xl md:text-5xl">{category.title}</h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{category.text}</p>
      </div>
      <div>
        <div className="relative aspect-video max-h-[60vh] border border-border bg-reel">
          {playing && source ? source.includes(".mp4") ? <video src={source} controls autoPlay className="h-full w-full" /> : <iframe src={source} title={`${category.title} spec film`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" /> : source ? <Button variant="ghost" onClick={() => setPlaying(true)} aria-label={`Play ${category.title}`} className="group relative h-full w-full overflow-hidden rounded-none p-0">{thumb(featured) && <img src={thumb(featured)!} alt="" className="absolute inset-0 h-full w-full object-cover" />}<span className="relative flex size-16 items-center justify-center rounded-full bg-reel/70 transition-transform group-hover:scale-110"><Play className="size-8 text-primary" /></span></Button> : <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground"><Film className="size-9" strokeWidth={1} /></div>}
        </div>
        <a
          href="https://www.youtube.com/@filmabent"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          <Youtube className="h-4 w-4 text-primary" /> Full gallery on YouTube
        </a>
      </div>
    </div>
  </article>;
}