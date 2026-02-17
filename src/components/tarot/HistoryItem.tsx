import React from "react";
import type { TarotReadingRecord } from "../../types/tarot";

interface HistoryItemProps {
  record: TarotReadingRecord;
  onClick?: (record: TarotReadingRecord) => void;
}

export function HistoryItem({ record, onClick }: HistoryItemProps) {
  const count = record.result?.readings?.length ?? 0;
  const summary = record.result?.overallAnalysis?.slice(0, 60) ?? "";

  return (
    <button
      type="button"
      className="history-item"
      onClick={() => onClick?.(record)}
    >
      <div className="history-item-main">
        <div className="history-item-question">{record.question || "（未填写问题）"}</div>
        <div className="history-item-time">
          {new Date(record.createdAt).toLocaleString()}
        </div>
      </div>
      <div className="history-item-summary">
        {record.layoutName} · 共 {count} 张牌
        {summary ? ` · ${summary}${summary.length >= 60 ? "…" : ""}` : ""}
      </div>
    </button>
  );
}
