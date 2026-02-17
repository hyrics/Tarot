import React, { useState, useEffect } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

export default function Step3Draw() {
  const { question, selectedType, performDivination, addLayerToChain, nextStep, prevStep } = useDivinationChain();
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleStartShuffle = async () => {
    setIsShuffling(true);
    setFlippedCards([]);
    // 模拟洗牌动画时间 - 2秒
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsShuffling(false);
    setIsDrawing(true);
  };

  const handleDrawCards = async () => {
    const divinationResult = performDivination();
    if (divinationResult) {
      setResult(divinationResult);
      addLayerToChain(divinationResult);
      
      // 立即显示所有卡片，不再等待延迟
      setShowResult(true);
    }
    setIsDrawing(false);
  };

  const handleContinue = () => {
    nextStep();
  };

  const handleBack = () => {
    prevStep();
  };

  const getSelectedTypeName = () => {
    const typeNames: Record<string, string> = {
      single: "单牌占卜",
      trinity: "三位一体",
      five_cross: "五牌十字",
      celtic_cross: "凯尔特十字",
      love: "爱情占卜",
    };
    return typeNames[selectedType] || "未知类型";
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">洗牌和抽牌</h2>
        <p className="step-subtitle">
          静心等待塔罗的指引 · 问题：{question}
        </p>
      </div>

      <div className="draw-area">
        {!isShuffling && !isDrawing && !showResult && (
          <div className="draw-prompt">
            <div className="draw-icon">🔮</div>
            <h3>准备开始洗牌</h3>
            <p>请静心冥想你的问题，然后点击开始洗牌</p>
            <button 
              type="button" 
              className="primary-button"
              onClick={handleStartShuffle}
            >
              开始洗牌
            </button>
          </div>
        )}

        {isShuffling && (
          <div className="shuffle-animation">
            <div className="shuffle-message">
              正在洗牌中，请静心等待...
            </div>
            <div className="shuffle-placeholder">
              {[0, 1, 2].map((index) => (
                <div key={index} className="card-back shuffle-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="card-inner">
                    <div className="card-front">🃏</div>
                    <div className="card-back-pattern"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isDrawing && !showResult && (
          <div className="draw-animation">
            <div className="draw-message">
              洗牌完成！请点击抽牌
            </div>
            <button 
              type="button" 
              className="primary-button large"
              onClick={handleDrawCards}
            >
              抽取塔罗牌
            </button>
          </div>
        )}

        {showResult && result && (
          <div className="draw-result centered-result">
            <div className="result-preview">
              <h3>已抽取 {Math.min(result.readings?.length || 0, 3)} 张牌</h3>
              <div className="cards-preview">
                {result.readings?.slice(0, 3).map((reading: any, index: number) => (
                  <div key={index} className="mini-card">
                    <div className="mini-card-name">{reading.card.name_cn}</div>
                    <div className="mini-card-position">{reading.position}</div>
                  </div>
                ))}
              </div>
            </div>
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
        {showResult && (
          <button 
            type="button" 
            className="primary-button"
            onClick={handleContinue}
          >
            查看解读
          </button>
        )}
        {isDrawing && !showResult && (
          <button 
            type="button" 
            className="primary-button"
            onClick={handleDrawCards}
          >
            立刻查看结果
          </button>
        )}
      </div>
    </div>
  );
}
