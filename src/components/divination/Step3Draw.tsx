import React, { useState, useEffect } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { DIVINATION_LAYOUTS } from "../../data/divination_layouts";
import { getCardImageUrl } from "../../lib/tarotImageUtils";
import { t, getPositionLabel } from "../../lib/i18n";
import { useLang } from "../../hooks/useLang";
import type { DivinationResult } from "../../types/tarot";

/**
 * Step 3: 抽牌
 * 洗牌和抽取塔罗牌 - 完成后显示牌，由用户点击进入结果页
 */
export default function Step3Draw() {
  const { question, selectedSpread, performDivination, addLayerToChain, nextStep, prevStep } = useDivinationChain();
  const lang = useLang();
  const [isShuffling, setIsShuffling] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [showDrawnCards, setShowDrawnCards] = useState(false);
  const [drawnResult, setDrawnResult] = useState<DivinationResult | null>(null);

  const getCardCount = () => {
    const layout = DIVINATION_LAYOUTS[selectedSpread || "trinity"];
    return layout?.cardCount || 3;
  };

  const cardCount = getCardCount();

  useEffect(() => {
    let shuffleTimer: NodeJS.Timeout;
    let drawTimer: NodeJS.Timeout;
    let flipTimers: NodeJS.Timeout[] = [];
    let showCardsTimer: NodeJS.Timeout;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => prevStep();
  const handleViewResult = () => nextStep();

  const drawTitle = showDrawnCards
    ? t("draw.title.drawn", lang)
    : isShuffling
      ? t("draw.title.shuffling", lang)
      : t("draw.title.drawing", lang);

  const drawSubtitle = t("draw.subtitle", lang)
    + (question
      ? t("draw.subtitle.question", lang) + question
      : t("draw.subtitle.general", lang));

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">{drawTitle}</h2>
        <p className="step-subtitle">{drawSubtitle}</p>
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
                <h3>{t("draw.shuffle.h3", lang)}</h3>
                <p>{t("draw.shuffle.p", lang)}</p>
              </div>
              <div
                className="draw-message phase-message"
                aria-hidden={!isDrawing || showDrawnCards}
                style={{ opacity: isDrawing && !showDrawnCards ? 1 : 0 }}
              >
                <h3>{t("draw.drawing.h3", lang)}</h3>
                <p>{t("draw.drawing.p", lang)}</p>
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
            <p className="drawn-cards-hint">{t("draw.hint", lang)}</p>
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
                  <span className="drawn-card-preview-position">{getPositionLabel(reading.position, lang)}</span>
                  <span className="drawn-card-preview-name">
                    {lang === "en" ? (reading.card.name_en || reading.card.name_cn) : reading.card.name_cn}
                  </span>
                </div>
              ))}
            </div>
            <button type="button" className="primary-button drawn-view-result-btn" onClick={handleViewResult}>
              {t("draw.view.result", lang)}
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
          {t("draw.prev", lang)}
        </button>
      </div>
    </div>
  );
}
