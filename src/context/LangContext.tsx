import React, { createContext, useContext, useState, useCallback } from "react";
import type { Lang } from "../lib/i18n";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

function getInitialLang(): Lang {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "zh";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    // 同步更新 URL 参数（不刷新页面）
    const url = new URL(window.location.href);
    if (next === "zh") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", next);
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLangContext(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLangContext must be used inside LangProvider");
  return ctx;
}
