import React, { useState, useMemo, useEffect } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { useTarotHistory } from "../../hooks/useTarotHistory";
import { getCardImageUrl } from "../../lib/tarotImageUtils";
import { generateOverallInterpretationWithDeepSeek } from "../../lib/deepseek";
import { DIVINATION_LAYOUTS } from "../../data/divination_layouts";
import type { TarotReadingRecord } from "../../types/tarot";

export default function Step4Result() {
  const { 
    currentChain, 
    question,
    selectedSpread,
    prevStep,
    resetChain,
  } = useDivinationChain();
  const { saveRecord } = useTarotHistory();
  
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [aiOverall, setAiOverall] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleComplete = () => {
    // 保存到历史记录
    if (currentChain && currentChain.layers.length > 0) {
      const latestLayer = currentChain.layers[currentChain.layers.length - 1];
      const record: TarotReadingRecord = {
        id: `reading_${Date.now()}`,
        question: question || "未填写问题",
        layoutId: latestLayer.divinationType,
        layoutName: latestLayer.divinationType,
        result: {
          layout: {
            id: latestLayer.divinationType,
            name: latestLayer.divinationType,
            description: latestLayer.divinationType,
            cardCount: latestLayer.cards.length,
            positions: latestLayer.cards.map(c => c.position),
          },
          readings: latestLayer.cards.map((card, index) => ({
            position: card.position,
            positionIndex: index,
            card: {
              id: card.id || 0,
              name_cn: card.name,
              name_en: card.nameEn || "",
              category: "major",
              number: 0,
              image_url: getCardImageUrl(card.id || 0, card.nameEn || ""),
              meaning_upright: card.meaning,
              meaning_reversed: card.meaning,
              keywords_upright: card.keywords,
              keywords_reversed: card.keywords,
              description: card.meaning,
              lucky_number: 0,
              isReversed: card.isReversed,
              orientation: card.isReversed ? "逆位" as const : "正位" as const,
              meaning: card.meaning,
              keywords: card.keywords,
            },
            basicReading: { meaning: card.meaning, keywords: card.keywords, numerology: "0" },
            symbolism: card.meaning,
            personalInsight: card.meaning,
          })),
          overallAnalysis: latestLayer.reading,
          timestamp: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
      };
      
      saveRecord(record);
      setSaveMessage("✅ 保存成功！");
      
      // 2秒后清除消息
      setTimeout(() => setSaveMessage(""), 2000);
    }
  };

  const handleNewDivination = () => {
    resetChain();
    // 重新开始占卜流程
  };

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
  };

  const handleCloseDetail = () => {
    setSelectedCard(null);
  };

  if (!currentChain || currentChain.layers.length === 0) {
    return (
      <div className="step-content">
        <div className="error-message">
          <h3>占卜结果加载失败</h3>
          <p>请重新进行占卜</p>
          <button type="button" className="primary-button" onClick={prevStep}>
            返回上一步
          </button>
        </div>
      </div>
    );
  }

  const latestLayer = currentChain.layers[currentChain.layers.length - 1];
  
  // 显示所有牌（不限制数量）
  const displayCards = latestLayer.cards;

  // 进入结果页时请求 DeepSeek 生成整体解读（API 未配置则静默跳过）
  useEffect(() => {
    if (displayCards.length === 0 || !selectedSpread) return;
    const layout = DIVINATION_LAYOUTS[selectedSpread];
    if (!layout) return;

    setLoadingAi(true);
    setAiOverall(null);
    generateOverallInterpretationWithDeepSeek({
      spreadName: layout.name,
      question,
      cards: displayCards.map((c) => ({
        position: c.position,
        name_cn: c.name,
        name_en: c.nameEn ?? undefined,
        orientation: c.isReversed ? "逆位" : "正位",
        meaning: c.meaning,
        keywords: c.keywords || [],
      })),
    })
      .then((text) => {
        if (text) setAiOverall(text);
      })
      .finally(() => setLoadingAi(false));
  }, [displayCards, selectedSpread, question]);

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">占卜结果</h2>
        <p className="step-subtitle">
          塔罗为你指引方向{question ? ` · 问题：${question}` : " · 通用解读"}
        </p>
      </div>

      {/* 占卜结果展示 */}
      <div className="result-display">
        <div className="result-header">
          <h3>第 {latestLayer.layerId} 层占卜</h3>
          <span className="result-type">{latestLayer.divinationType}</span>
        </div>

        {/* 整体解读：仅使用 DeepSeek 生成，按 deepseek.ts 的 prompt 输出 */}
        <div className="overall-reading-new">
          <h3 className="reading-title-new">
            {displayCards.length}张牌的整体解读
          </h3>
          {loadingAi && (
            <div className="reading-content-new reading-loading">
              <p className="reading-analysis">正在生成整体解读…</p>
            </div>
          )}
          {!loadingAi && aiOverall && (
            <div className="reading-content-new">
              <p className="reading-analysis">{aiOverall}</p>
            </div>
          )}
          {!loadingAi && !aiOverall && (
            <div className="reading-content-new reading-loading">
              <p className="reading-analysis">暂无整体解读（请配置 DeepSeek API 或稍后重试）</p>
            </div>
          )}
        </div>

        {/* 显示所有牌 */}
        <div className="cards-result">
          {displayCards.map((card, index) => (
            <div 
              key={index} 
              className="result-card enhanced" 
              onClick={() => handleCardClick(card)}
              style={{
                backgroundImage: `url(${getCardImageUrl(card.id || 0, card.nameEn || "")})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* 半透明遮罩层，确保文字可读 */}
              <div className="card-overlay" />
              
              {/* 卡片内容 */}
              <div className="card-content">
                {/* 1. 牌名和英文名（大字，顶部） */}
                <div className="card-header">
                  <h4 className="card-name">
                    {card.name}
                    <span className="card-name-en">({card.nameEn})</span>
                  </h4>
                </div>
                
                {/* 2. 正/逆位标记（不同颜色区分） */}
                <div className="card-orientation-wrapper">
                  <span className={`card-orientation ${card.isReversed ? 'reversed' : 'upright'}`}>
                    {card.isReversed ? '逆位' : '正位'}
                  </span>
                </div>
                
                {/* 3. 在占卜中的位置 */}
                <div className="card-position">{card.position}</div>
                
                {/* 4. 快速解读（2-3句话） */}
                <div className="card-meaning">{card.meaning}</div>
                
                {/* 5. 关键词（3-5个） */}
                {card.keywords && card.keywords.length > 0 && (
                  <div className="card-keywords">
                    {card.keywords.slice(0, 5).map((keyword, i) => (
                      <span key={i} className="keyword">{keyword}</span>
                    ))}
                  </div>
                )}
                
                {/* 6. 数字学信息（简短） */}
                <div className="card-numerology">
                  <span className="numerology-label">数字学：</span>
                  <span className="numerology-value">{card.nameEn ? (card.nameEn.length % 9 || 9) : '—'}</span>
                </div>
                
                {/* 7. 点击"查看完整解读"可打开详解面板 */}
                <button 
                  className="detail-button" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleCardClick(card); 
                  }}
                >
                  查看完整解读
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 牌卡详情模态框 */}
      {selectedCard && (
        <div className="card-detail-modal" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCard.name} ({selectedCard.nameEn})</h3>
              <button className="close-button" onClick={handleCloseDetail}>×</button>
            </div>
            
            <div className="modal-body">
              {/* 详情模态框中的图片背景 */}
              <div 
                className="detail-card-background" 
                style={{
                  backgroundImage: `url(${getCardImageUrl(selectedCard.id || 0, selectedCard.nameEn || "")})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.15
                }} 
              />
              
              <div className="detail-overlay" />
              
              <div className="detail-content">
                <div className="detail-section">
                  <h4>基本信息</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">位置：</span>
                      <span className="value">{selectedCard.position}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">状态：</span>
                      <span className={`value orientation ${selectedCard.isReversed ? 'reversed' : 'upright'}`}>
                        {selectedCard.isReversed ? '逆位' : '正位'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">数字学：</span>
                      <span className="value">{selectedCard.nameEn.length % 9 || 9}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>快速解读</h4>
                  <p className="quick-meaning">{selectedCard.meaning}</p>
                </div>
                
                <div className="detail-section">
                  <h4>关键词</h4>
                  <div className="keywords-list">
                    {selectedCard.keywords.map((keyword: string, i: number) => (
                      <span key={i} className="keyword">{keyword}</span>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>完整解读</h4>
                  <p className="full-meaning">
                    {selectedCard.isReversed ? 
                      '逆位代表着挑战、阻碍或内在冲突，需要你特别关注这个方面的成长。' : 
                      '正位代表着顺利、和谐或外在机遇，是你当前可以积极利用的能量。'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 保存成功消息 */}
      {saveMessage && (
        <div className="save-message" style={{
          textAlign: "center",
          padding: "1rem",
          marginBottom: "1rem",
          background: "rgba(107, 142, 127, 0.2)",
          border: "1px solid rgba(107, 142, 127, 0.4)",
          borderRadius: "8px",
          color: "var(--upright)",
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
        }}>
          {saveMessage}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="step-actions">
        <button 
          type="button" 
          className="btn-ghost"
          onClick={handleNewDivination}
        >
          重新占卜
        </button>
        <button 
          type="button" 
          className="btn-ghost"
          onClick={handleComplete}
        >
          💾 保存结果
        </button>
        <button 
          type="button" 
          className="primary-button"
          onClick={() => console.log("分享功能")}
        >
          📤 分享结果
        </button>
      </div>
    </div>
  );
}
