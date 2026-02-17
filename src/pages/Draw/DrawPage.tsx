import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTarotSession } from "../../hooks/useTarotSession";
import { Card } from "../../components/tarot/Card";
import { BackButton } from "../../components/layout/BackButton";

const SHUFFLE_DURATION_MS = 1200;

export default function DrawPage() {
  const navigate = useNavigate();
  const [isShuffling, setIsShuffling] = useState(false);
  const {
    question,
    layoutId,
    layouts,
    lastResult,
    performDivination,
    hasQuestion,
  } = useTarotSession();

  const layout = layouts[layoutId];
  const cardCount = layout?.cardCount ?? 3;

  const handleDraw = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const result = performDivination();
      setIsShuffling(false);
      if (!result) return;
    }, SHUFFLE_DURATION_MS);
  };

  const hasDrawn = lastResult && lastResult.readings.length > 0;

  return (
    <section>
      <div className="page-header">
        <BackButton>返回</BackButton>
        <h1 className="page-title">抽牌</h1>
      </div>
      <p className="page-subtitle">
        {hasQuestion ? `当前问题：${question}` : "建议先在首页输入问题并选择牌阵。"}
        {layout && ` · 牌阵：${layout.name}`}
      </p>

      {isShuffling ? (
        <div className="tarot-deck">
          <p className="tarot-deck-hint">正在为您占卜…</p>
          <div className="shuffle-placeholder">
            {Array.from({ length: Math.min(cardCount, 5) }, (_, i) => (
              <div key={i} className="card-back" aria-hidden />
            ))}
          </div>
          <p className="shuffle-message">洗牌中，请稍候</p>
        </div>
      ) : !hasDrawn ? (
        <div className="tarot-deck">
          <button type="button" className="primary-button" onClick={handleDraw}>
            开始抽牌
          </button>
          <p className="tarot-deck-hint">点击后将洗牌并抽取 {cardCount} 张牌，随机正逆位。</p>
        </div>
      ) : (
        <>
          <div className="draw-readings">
            {lastResult!.readings.map((r, i) => (
              <Card key={i} card={r.card} position={r.position} />
            ))}
          </div>
          <div className="draw-actions" style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/result")}
            >
              查看解读
            </button>
          </div>
        </>
      )}
    </section>
  );
}
