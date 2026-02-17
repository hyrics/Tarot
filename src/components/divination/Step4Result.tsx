import React, { useState } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { useTarotHistory } from "../../hooks/useTarotHistory";
import { getCardImageUrl } from "../../lib/tarotImageUtils";
import type { TarotReadingRecord } from "../../types/tarot";

export default function Step4Result() {
  const { 
    currentChain, 
    question, 
    generateAdvancedSuggestion, 
    completeChain, 
    prevStep,
    resetChain,
    goToStep,
    setQuestion
  } = useDivinationChain();
  const { saveRecord } = useTarotHistory();
  
  const [showAdvancedSuggestion, setShowAdvancedSuggestion] = useState(false);
  const [advancedSuggestion, setAdvancedSuggestion] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState("");

  const handleAdvancedDivination = () => {
    const suggestion = generateAdvancedSuggestion();
    setAdvancedSuggestion(suggestion);
    setShowAdvancedSuggestion(true);
  };

  const handleAcceptAdvanced = () => {
    // 这里会进入第二层占卜
    console.log("开始进阶占卜:", advancedSuggestion);
    // 保存进阶问题
    setQuestion(advancedSuggestion);
    // 跳转到 Step 3（洗牌和抽牌）
    goToStep(3);
    // 关闭进阶建议框
    setShowAdvancedSuggestion(false);
  };

  const handleRejectAdvanced = () => {
    setShowAdvancedSuggestion(false);
  };

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

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">占卜结果</h2>
        <p className="step-subtitle">
          塔罗为你指引方向 · 问题：{question}
        </p>
      </div>

      {/* 占卜结果展示 */}
      <div className="result-display">
        <div className="result-header">
          <h3>第 {latestLayer.layerId} 层占卜</h3>
          <span className="result-type">{latestLayer.divinationType}</span>
        </div>

        <div className="cards-result">
          {latestLayer.cards.map((card, index) => (
            <div key={index} className="result-card enhanced" onClick={() => handleCardClick(card)}>
              {/* 塔罗牌图片背景 */}
              <div 
                className="card-background" 
                style={{
                  backgroundImage: `url(${getCardImageUrl(card.id || 0, card.nameEn || "")})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.25
                }} 
              />
              
              {/* 遮罩层，确保文字可读 */}
              <div className="card-overlay" />
              
              <div className="card-content">
                <div className="card-header">
                  <h4 className="card-name">
                    {card.name}
                    <span className="card-name-en">({card.nameEn})</span>
                  </h4>
                  <span className={`card-orientation ${card.isReversed ? 'reversed' : 'upright'}`}>
                    {card.isReversed ? '逆位' : '正位'}
                  </span>
                </div>
                
                <div className="card-position">{card.position}</div>
                
                <div className="card-meaning">{card.meaning}</div>
                
                <div className="card-keywords">
                  {card.keywords.map((keyword, i) => (
                    <span key={i} className="keyword">{keyword}</span>
                  ))}
                </div>
                
                <div className="card-numerology">
                  <span className="numerology-label">数字学：</span>
                  <span className="numerology-value">{card.nameEn.length % 9 || 9}</span>
                </div>
                
                <button className="detail-button" onClick={(e) => { e.stopPropagation(); handleCardClick(card); }}>
                  查看完整解读
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="overall-reading">
          <h3>整体解读</h3>
          <p>{latestLayer.reading}</p>
        </div>
      </div>
      {/* 进阶建议 - 简化版 */}
      {!showAdvancedSuggestion && currentChain.layers.length === 1 && (
        <div className="advanced-suggestion">
          <h3>✨ 我有个有趣的建议</h3>
          <p>{generateAdvancedSuggestion()}</p>
          <div className="modal-actions">
            <button 
              type="button" 
              className="primary-button"
              onClick={handleAdvancedDivination}
            >
              同意深入
            </button>
            <button 
              type="button" 
              className="btn-ghost"
              onClick={handleRejectAdvanced}
            >
              暂时不了
            </button>
          </div>
        </div>
      )}

      {showAdvancedSuggestion && (
        <div className="advanced-modal">
          <div className="modal-content">
            <h3>💫 进阶建议</h3>
            <p className="suggestion-text">{advancedSuggestion}</p>
            <div className="modal-actions">
              <button 
                type="button" 
                className="primary-button"
                onClick={handleAcceptAdvanced}
              >
                同意深入
              </button>
              <button 
                type="button" 
                className="btn-ghost"
                onClick={handleRejectAdvanced}
              >
                暂时不了
              </button>
            </div>
          </div>
        </div>
      )}

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
                    这是{selectedCard.name}的完整解读内容...
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
