import React, { createContext, useState, useCallback } from "react";
import type { DivinationResult } from "../types/tarot";
import { performDivination as runDivination } from "../lib/divination";
import { DIVINATION_LAYOUTS, LAYOUT_IDS } from "../data/divination_layouts";

interface TarotSessionValue {
  question: string;
  setQuestion: (q: string) => void;
  layoutId: string;
  setLayoutId: (id: string) => void;
  layoutIds: string[];
  layouts: typeof DIVINATION_LAYOUTS;
  lastResult: DivinationResult | null;
  setLastResult: (r: DivinationResult | null) => void;
  startNewReading: () => void;
  performDivination: () => DivinationResult | null;
  hasQuestion: boolean;
}

const defaultLayoutId = "trinity";
const TarotSessionContext = createContext<TarotSessionValue | null>(null);

export function TarotSessionProvider({ children }: { children: React.ReactNode }) {
  const [question, setQuestion] = useState("");
  const [layoutId, setLayoutId] = useState(defaultLayoutId);
  const [lastResult, setLastResult] = useState<DivinationResult | null>(null);

  const startNewReading = useCallback(() => {
    setLastResult(null);
  }, []);

  const performDivination = useCallback(() => {
    const result = runDivination(layoutId);
    if (result) setLastResult(result);
    return result;
  }, [layoutId]);

  const value: TarotSessionValue = {
    question,
    setQuestion,
    layoutId,
    setLayoutId,
    layoutIds: LAYOUT_IDS,
    layouts: DIVINATION_LAYOUTS,
    lastResult,
    setLastResult,
    startNewReading,
    performDivination,
    hasQuestion: Boolean(question.trim()),
  };

  return (
    <TarotSessionContext.Provider value={value}>
      {children}
    </TarotSessionContext.Provider>
  );
}

export function useTarotSession(): TarotSessionValue {
  const ctx = React.useContext(TarotSessionContext);
  if (!ctx) {
    throw new Error("useTarotSession must be used within TarotSessionProvider");
  }
  return ctx;
}
