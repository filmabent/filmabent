import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Language = "en" | "de";
const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_: Language) => {}, t: (en: string, _de: string) => en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    try { if (localStorage.getItem("filmabent-language") === "de") setLanguage("de"); } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const changeLanguage = (next: Language) => {
    setLanguage(next);
    try { localStorage.setItem("filmabent-language", next); } catch {}
  };
  return <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t: (en, de) => language === "de" ? de : en }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  return <div role="group" aria-label={t("Language", "Sprache")} className="flex shrink-0 items-center gap-0.5">
    {(["en", "de"] as const).map(value => <Button key={value} variant="ghost" size="sm" aria-label={value === "en" ? "English" : "Deutsch"} aria-pressed={language === value} onClick={() => setLanguage(value)} className={`h-8 rounded-none px-2 text-[10px] uppercase tracking-widest ${language === value ? "text-primary underline underline-offset-4" : "text-muted-foreground"}`}>{value}</Button>)}
  </div>;
}