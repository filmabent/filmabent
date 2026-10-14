export function chooseLeak(progress: number, previous: number, random = Math.random) {
  const variants = progress < 0.5 ? [0, 2, 4] : [1, 3, 5];
  const choices = variants.filter(variant => variant !== previous);
  return choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))] ?? (progress < 0.5 ? 0 : 1);
}