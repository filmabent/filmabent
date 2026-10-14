import { z } from "zod";

export const categories = [
  { slug: "narrative", title: "Narrative Films", text: "Stories with a vintage pulse — written, shot and cut with real texture." },
  { slug: "weddings", title: "Weddings on Super 8", text: "Your day on real film. A memory with grain, warmth and a life of its own." },
  { slug: "music", title: "Music Videos & Advertisements", text: "A visual world built around your sound, your idea, your identity." },
  { slug: "imagefilms", title: "Imagefilms & Events", text: "People, places and moments — captured with character." },
] as const;

export function videoSource(value: string, autoplay = false): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "youtu.be") {
      const id = host === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v") ?? url.pathname.split("/")[2];
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}?rel=0${autoplay ? "&autoplay=1&playsinline=1" : ""}` : null;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}${autoplay ? "?autoplay=1&playsinline=1" : ""}` : null;
    }
    return /\.mp4$/i.test(url.pathname) ? url.href : null;
  } catch { return null; }
}

const videoUrl = z.string().trim().refine(value => value === "" || videoSource(value) !== null, "Use an HTTPS YouTube, Vimeo or MP4 link.");
export const portfolioSchema = z.object({
  slug: z.enum(["narrative", "weddings", "music", "imagefilms"]),
  featured_url: videoUrl,
  gallery_urls: z.array(videoUrl).max(30),
});
export type Portfolio = z.infer<typeof portfolioSchema>;