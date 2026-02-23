import React from "react";
import type { DrawnCard } from "../../types/tarot";
import type { ReadingItem } from "../../types/tarot";
import { getCardImageUrl } from "../../lib/tarotImageUtils";

interface CardProps {
  card: DrawnCard;
  position?: string;
  faceUp?: boolean;
  /** 若提供，则显示「查看详解」并点击时回调 */
  onDetailClick?: (reading: ReadingItem) => void;
  reading?: ReadingItem;
}

export function Card({ card, position, faceUp = true, onDetailClick, reading }: CardProps) {
  const isReversed = card.orientation === "逆位";
  
  // 使用 getCardImageUrl 获取正确的图片URL
  const imageUrl = card.image_url || getCardImageUrl(card.id || 0, card.name_en || "");

  return (
    <div 
      className={`tarot-card ${faceUp ? "tarot-card--face-up" : ""}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 半透明遮罩层，确保文字可读 */}
      <div className="card-overlay" />

      <div className="tarot-card-inner" style={{ position: "relative", zIndex: 2 }}>
        {card.id != null && (
          <span className="card-number" aria-hidden>
            {card.id + 1}
          </span>
        )}
        {position && <div className="tarot-card-position">{position}</div>}
        <div className="tarot-card-title">{card.name_cn}</div>
        <div className={`tarot-card-meta orientation-badge ${isReversed ? "reversed" : "upright"}`}>
          {card.orientation}
        </div>
        <p className="tarot-card-meaning">{card.meaning}</p>
        {card.keywords?.length > 0 && (
          <div className="tarot-card-keywords">{card.keywords.join(" · ")}</div>
        )}
        {onDetailClick && reading && (
          <button
            type="button"
            className="card-detail-btn"
            onClick={() => onDetailClick(reading)}
          >
            ▼ 查看详解
          </button>
        )}
      </div>
    </div>
  );
}
