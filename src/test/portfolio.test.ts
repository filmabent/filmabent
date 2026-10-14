import { describe, expect, it } from "vitest";
import { categories, portfolioSchema, videoSource } from "@/lib/portfolio";

describe("portfolio links", () => {
  it("accepts YouTube and normalizes the embed", () => {
    expect(videoSource("https://youtu.be/TeE6CvUIg0E")).toBe("https://www.youtube-nocookie.com/embed/TeE6CvUIg0E?rel=0");
  });
  it("accepts Vimeo links", () => {
    expect(videoSource("https://vimeo.com/123456789")).toBe("https://player.vimeo.com/video/123456789");
  });
  it("rejects unsafe or unsupported URLs", () => {
    expect(videoSource("javascript:alert(1)")).toBeNull();
    expect(videoSource("https://youtube.com.evil.test/watch?v=TeE6CvUIg0E")).toBeNull();
    expect(videoSource("http://youtu.be/TeE6CvUIg0E")).toBeNull();
  });
  it("allows empty frames until the owner supplies links", () => {
    expect(portfolioSchema.safeParse({ slug: "narrative", featured_url: "", gallery_urls: ["", ""] }).success).toBe(true);
  });
  it("rejects categories outside the four owner-selected sections", () => {
    expect(categories.map(category => category.slug)).toEqual(["narrative", "weddings", "music", "imagefilms"]);
    expect(portfolioSchema.safeParse({ slug: "documentaries", featured_url: "", gallery_urls: [] }).success).toBe(false);
  });
});