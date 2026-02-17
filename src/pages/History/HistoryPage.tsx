import React from "react";
import { useTarotHistory } from "../../hooks/useTarotHistory";
import { HistoryItem } from "../../components/tarot/HistoryItem";
import { BackButton } from "../../components/layout/BackButton";

export default function HistoryPage() {
  const { history } = useTarotHistory();

  return (
    <section>
      <div className="page-header">
        <BackButton>返回</BackButton>
        <h1 className="page-title">历史记录</h1>
      </div>
      <p className="page-subtitle">
        这里会显示你过去的占卜记录（当前示例使用本地存储，可以根据需要接后端）。
      </p>

      {history.length === 0 ? (
        <p className="history-empty">当前还没有任何占卜记录。</p>
      ) : (
        <div className="history-list">
          {history.map((record) => (
            <HistoryItem key={record.id} record={record} />
          ))}
        </div>
      )}
    </section>
  );
}

