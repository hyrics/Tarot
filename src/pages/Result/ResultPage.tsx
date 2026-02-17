import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTarotSession } from "../../hooks/useTarotSession";
import { useTarotHistory } from "../../hooks/useTarotHistory";
import { Card } from "../../components/tarot/Card";
import { CardDetailPanel } from "../../components/tarot/CardDetailPanel";
import { BackButton } from "../../components/layout/BackButton";
import type { ReadingItem } from "../../types/tarot";

export default function ResultPage() {
  const navigate = useNavigate();
  const { question, lastResult } = useTarotSession();
  const { saveRecord } = useTarotHistory();
  const [detailReading, setDetailReading] = useState<ReadingItem | null>(null);

  const handleSave = () => {
    if (!lastResult) return;
    saveRecord({
      id: `reading_${Date.now()}`,
      question,
      layoutId: lastResult.layout.id,
      layoutName: lastResult.layout.name,
      result: lastResult,
      createdAt: new Date().toISOString(),
    });
    navigate("/history");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "塔罗占卜结果",
        text: `我的占卜：${question || "未填写"} · ${lastResult?.layout.name ?? ""}`,
      }).catch(() => {});
    } else {
      window.alert("已复制链接到剪贴板");
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  if (!lastResult) {
    return (
      <section>
        <h1 className="page-title">占卜结果</h1>
        <p className="page-subtitle">尚无本次占卜结果，请先完成抽牌。</p>
        <button type="button" className="primary-button" onClick={() => navigate("/draw")}>
          去抽牌
        </button>
      </section>
    );
  }

  const { layout, readings, overallAnalysis } = lastResult;
  const timestamp = new Date(lastResult.timestamp).toLocaleString("zh-CN");

  return (
    <section>
      <div className="page-header">
        <BackButton>返回</BackButton>
        <h1 className="page-title">占卜结果</h1>
      </div>
      <div className="divination-badge">
        <div className="badge-icon">🔮</div>
        <div className="badge-text">
          <p>占卜方式</p>
          <strong>{layout.name}</strong>
        </div>
        <div className="badge-timestamp">{timestamp}</div>
      </div>

      <p className="page-subtitle">基于你提出的问题和抽到的牌给出的解读。</p>

      <div className="result-block">
        <h2 className="result-title">你的问题</h2>
        <p className="result-question">{question || "（未填写问题）"}</p>
      </div>

      <div className="result-block">
        <h2 className="result-title">牌阵解读</h2>
        <div className="divination-results">
          {readings.map((r, i) => (
            <Card
              key={i}
              card={r.card}
              position={r.position}
              onDetailClick={() => setDetailReading(r)}
              reading={r}
            />
          ))}
        </div>
      </div>

      <div className="result-block synthesis-panel">
        <h3>综合分析</h3>
        <p className="result-interpretation">{overallAnalysis}</p>
        <div className="synthesis-insight">
          <h5>💡 核心洞察</h5>
          <p>
            {readings.length >= 2
              ? `本次占卜中，${readings.map((r) => r.card.name_cn).join("、")} 共同呈现了当前形势的脉络，建议结合各位置含义综合理解。`
              : "单张牌已给出明确指向，可结合你的问题与直觉做判断。"}
          </p>
        </div>
        <div className="synthesis-advice">
          <h5>🎯 建议</h5>
          <p>
            将占卜结果作为参考而非唯一答案；可保存此次结果以便日后回顾，或过一段时间再针对同一问题重新占卜。
          </p>
        </div>
      </div>

      <div className="advice-panel">
        <h3>🎯 根据占卜结果的建议</h3>
        <div className="advice-grid">
          <div className="advice-card">
            <h4>短期（1–3 周）</h4>
            <p>留意当前牌阵中「现在」或中心位置的提示，优先处理最牵动情绪的一两件事。</p>
            <ul>
              <li>可把关键词写在便签上，提醒自己</li>
              <li>避免在未想清楚时做重大决定</li>
            </ul>
          </div>
          <div className="advice-card">
            <h4>中期（1–3 月）</h4>
            <p>结合「未来」或结果位的牌义，为接下来几个月设定小目标，保持弹性调整。</p>
            <ul>
              <li>定期回顾这次解读是否仍贴合现状</li>
              <li>若情况变化大，可再次占卜</li>
            </ul>
          </div>
          <div className="advice-card">
            <h4>长期（3–12 月）</h4>
            <p>整副牌阵可视为一段发展轨迹，长期来看重在心态与选择的积累，而非单次结果。</p>
            <ul>
              <li>保存本次结果，方便日后对比</li>
              <li>把塔罗当作自我觉察的工具</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button type="button" className="primary-button" onClick={handleSave}>
          💾 保存占卜
        </button>
        <button type="button" className="btn-ghost" onClick={handleShare}>
          📤 分享
        </button>
        <button type="button" className="btn-ghost" onClick={() => window.print()}>
          🖼️ 打印 / 导出
        </button>
        <button type="button" className="btn-ghost" onClick={() => navigate("/")}>
          🔄 重新占卜
        </button>
      </div>

      {detailReading && (
        <CardDetailPanel reading={detailReading} onClose={() => setDetailReading(null)} />
      )}
    </section>
  );
}
