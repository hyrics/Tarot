import React, { useState, useEffect } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { DIVINATION_LAYOUTS } from "../../data/divination_layouts";
import { getCardImageUrl } from "../../lib/tarotImageUtils";
import type { DivinationResult } from "../../types/tarot";

/**
 * Step 3: 抽牌
 * 洗牌和抽取塔罗牌 - 完成后显示牌，由用户点击进入结果页
 */
export default function Step3Draw() {
  const { question, selectedSpread, performDivination, addLayerToChain, nextStep, prevStep } = useDivinationChain();
  const [isShuffling, setIsShuffling] = useState(true); // 默认开始洗牌
  const [isDrawing, setIsDrawing] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [showDrawnCards, setShowDrawnCards] = useState(false);
  const [drawnResult, setDrawnResult] = useState<DivinationResult | null>(null);

  // 获取当前占卜方式的牌数
  const getCardCount = () => {
    const layout = DIVINATION_LAYOUTS[selectedSpread || "trinity"];
    return layout?.cardCount || 3;
  };

  const cardCount = getCardCount();

  // 自动开始洗牌流程（仅挂载时执行一次，避免依赖变化导致定时器被反复清除）
  useEffect(() => {
    let shuffleTimer: NodeJS.Timeout;
    let drawTimer: NodeJS.Timeout;
    let flipTimers: NodeJS.Timeout[] = [];
    let showCardsTimer: NodeJS.Timeout;

    // 洗牌 1s + 抽牌 0.5s = 1.5s 后进入翻牌并展示
    shuffleTimer = setTimeout(() => {
      setIsShuffling(false);
      setIsDrawing(true);

      drawTimer = setTimeout(() => {
        const divinationResult = performDivination();
        if (divinationResult) {
          addLayerToChain(divinationResult);
          setDrawnResult(divinationResult);

          const cardsToFlip = Array.from({ length: cardCount }, (_, i) => i);
          cardsToFlip.forEach((_, i) => {
            const timer = setTimeout(() => {
              setFlippedCards(prev => [...prev, i]);
            }, i * 150);
            flipTimers.push(timer);
          });

          showCardsTimer = setTimeout(() => {
            setIsDrawing(false);
            setShowDrawnCards(true);
          }, cardsToFlip.length * 150 + 300);
        }
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(shuffleTimer);
      clearTimeout(drawTimer);
      if (showCardsTimer) clearTimeout(showCardsTimer);
      flipTimers.forEach(timer => clearTimeout(timer));
    };
    // 只依赖 cardCount；performDivination/addLayerToChain 在挂载时调用一次即可
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    prevStep();
  };

  const handleViewResult = () => {
    nextStep();
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">
          {showDrawnCards ? "你的牌面" : isShuffling ? "洗牌中..." : "正在抽取塔罗牌..."}
        </h2>
        <p className="step-subtitle">
          静心等待塔罗的指引{question ? ` · 问题：${question}` : " · 通用解读"}
        </p>
      </div>

      <div className="draw-area">
        {(isShuffling || (isDrawing && !showDrawnCards)) && (
          <div className="shuffle-draw-unified">
            <div className="draw-message-container">
              <div
                className="shuffle-message phase-message"
                aria-hidden={!isShuffling}
                style={{ opacity: isShuffling ? 1 : 0 }}
              >
                <h3>洗牌中...</h3>
                <p>请闭上眼睛，放松呼吸...</p>
              </div>
              <div
                className="draw-message phase-message"
                aria-hidden={!isDrawing || showDrawnCards}
                style={{ opacity: isDrawing && !showDrawnCards ? 1 : 0 }}
              >
                <h3>正在抽取塔罗牌...</h3>
                <p>塔罗正在为你指引方向</p>
              </div>
            </div>
            <div className={`shuffle-placeholder ${isDrawing ? "draw-phase" : ""}`}>
              {Array.from({ length: cardCount }, (_, index) => (
                <div
                  key={index}
                  className={`card-back shuffle-card ${isDrawing ? "draw-phase" : ""} ${flippedCards.includes(index) ? "flipped" : ""}`}
                  style={{ animationDelay: isShuffling ? `${index * 0.2}s` : undefined }}
                >
                  <div className="card-inner">
                    <div className="card-front">🃏</div>
                    <div className="card-back-pattern"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showDrawnCards && drawnResult && (
          <div className="drawn-cards-preview">
            <p className="drawn-cards-hint">以下是本次抽到的牌，点击下方按钮查看完整解读</p>
            <div className="drawn-cards-list">
              {drawnResult.readings.map((reading, index) => (
                <div key={index} className="drawn-card-preview">
                  <div
                    className="drawn-card-preview-image"
                    style={{
                      backgroundImage: `url(${getCardImageUrl(reading.card.id, reading.card.name_en)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform: reading.card.isReversed ? "rotate(180deg)" : "none",
                    }}
                  />
                  <div className="drawn-card-preview-overlay" />
                  <span className="drawn-card-preview-position">{reading.position}</span>
                  <span className="drawn-card-preview-name">{reading.card.name_cn}</span>
                </div>
              ))}
            </div>
            <button type="button" className="primary-button drawn-view-result-btn" onClick={handleViewResult}>
              查看解读
            </button>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button
          type="button"
          className="btn-ghost"
          onClick={handleBack}
          disabled={isShuffling || isDrawing}
        >
          上一步
        </button>
      </div>
    </div>
  );
}
