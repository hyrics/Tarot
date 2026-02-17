import React from "react";
import type { DrawnCard } from "../../types/tarot";
import type { ReadingItem } from "../../types/tarot";

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

  return (
    <div className={`tarot-card ${faceUp ? "tarot-card--face-up" : ""}`}>
      {/* 背景层：塔罗牌图片，低透明度 */}
      <div className="card-background">
        <div
          className="card-background-image"
          style={{
            backgroundImage: `url(${card.image_url})`,
            opacity: 0.3,
            filter: "blur(2px)"
          }}
          aria-hidden
        />
      </div>

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
