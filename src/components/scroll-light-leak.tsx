import { useEffect, useRef } from "react";
import { chooseLeak, shouldShowFlare } from "@/lib/light-effects";

export function ScrollLightLeak() {
  const leak = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = leak.current;
    if (!element) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    let lastTrigger = -Infinity;
    let lastVariant = -1;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const spots = [0.04, 0.2, 0.39, 0.57, 0.74, 0.91].map(point => point + (Math.random() - 0.5) * 0.035);
    const onScroll = () => {
      const y = window.scrollY;
      const previous = lastY;
      lastY = y;
      if (motion.matches) return;
      const shift = Math.max(-150, Math.min(150, (y - startY) * 0.18));
      element.style.setProperty("--leak-x", `${baseX + shift * 0.3}px`);
      element.style.setProperty("--leak-y", `${baseY - shift}px`);
      element.style.setProperty("--leak-angle", `${shift * 0.035}deg`);
      if (performance.now() - lastTrigger < 2400) return;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (distance <= 0) return;
      const crossed = spots.find(point => (previous < distance * point && y >= distance * point) || (previous > distance * point && y <= distance * point));
      if (crossed === undefined) return;
      lastTrigger = performance.now();
      startY = y;
      baseX = (Math.random() - 0.5) * 70;
      baseY = (Math.random() - 0.5) * 140;
      lastVariant = chooseLeak(crossed, lastVariant);
      element.dataset["variant"] = String(lastVariant);
      element.dataset["flare"] = shouldShowFlare() ? "true" : "false";
      element.style.setProperty("--leak-x", `${baseX}px`);
      element.style.setProperty("--leak-y", `${baseY}px`);
      element.style.setProperty("--leak-angle", "0deg");
      element.classList.add("is-scrolling");
      clearTimeout(timer);
      timer = setTimeout(() => element.classList.remove("is-scrolling"), 1250);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);
  return <div ref={leak} className="scroll-light-leak" aria-hidden="true" />;
}