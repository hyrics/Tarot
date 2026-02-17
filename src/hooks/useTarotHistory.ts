import { useState } from "react";
import type { TarotReadingRecord } from "../types/tarot";

const STORAGE_KEY = "tarot_history";

export function useTarotHistory() {
  const [history, setHistory] = useState<TarotReadingRecord[]>([]);

  // 从 localStorage 加载历史记录
  const loadHistory = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as TarotReadingRecord[];
      setHistory(parsed);
      return parsed;
    } catch {
      return [];
    }
  };

  // 初始化时加载
  if (history.length === 0) {
    loadHistory();
  }

  const saveRecord = (record: TarotReadingRecord) => {
    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const getHistory = () => {
    return loadHistory() || history;
  };

  return { history, saveRecord, getHistory };
}