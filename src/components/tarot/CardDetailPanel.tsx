import React, { useState } from "react";
import type { ReadingItem } from "../../types/tarot";
import { getNumerologyMeaning } from "../../lib/card-reader";

type TabId = "quick" | "basic" | "detailed" | "advanced";

interface CardDetailPanelProps {
  reading: ReadingItem;
  onClose: () => void;
}

export function CardDetailPanel({ reading, onClose }: CardDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("quick");
  const { card, position, basicReading, symbolism, personalInsight } = reading;

  const tabs: { id: TabId; label: string }[] = [
    { id: "quick", label: "速查" },
    { id: "basic", label: "基础" },
    { id: "detailed", label: "详细" },
    { id: "advanced", label: "深入" },
  ];

  const numerologyText = getNumerologyMeaning(card.lucky_number);
  const simpleText = card.meaning;
  const basicText = [personalInsight, symbolism].filter(Boolean).join("\n\n");
  const detailedText = card.description || card.meaning;
  const detailedBullets = card.keywords;
  const advancedText = `数字学：${numerologyText}\n\n象征：${symbolism}`;

  return (
    <div className="card-detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="牌面详解">
      <div className="card-detail-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="detail-close-btn" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
          {card.name_cn}（{card.orientation}）· {position}
        </h3>

        <div className="detail-tabs">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`detail-tab-btn ${activeTab === id ? "active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="detail-content">
          <div className={`detail-tab-content ${activeTab === "quick" ? "active" : ""}`}>
            <h4>一句话理解</h4>
            <p>{simpleText}</p>
          </div>
          <div className={`detail-tab-content ${activeTab === "basic" ? "active" : ""}`}>
            <h4>基础解读</h4>
            <p>{basicText || simpleText}</p>
          </div>
          <div className={`detail-tab-content ${activeTab === "detailed" ? "active" : ""}`}>
            <h4>详细解析</h4>
            <p>{detailedText}</p>
            {detailedBullets.length > 0 && (
              <ul>
                {detailedBullets.map((kw, i) => (
                  <li key={i}>{kw}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={`detail-tab-content ${activeTab === "advanced" ? "active" : ""}`}>
            <h4>深度研究</h4>
            <p style={{ whiteSpace: "pre-line" }}>{advancedText}</p>
          </div>
        </div>

        <div className="detail-meta">
          <div className="detail-meta-item">
            <label>关键词</label>
            <span>{card.keywords.join("、")}</span>
          </div>
          <div className="detail-meta-item">
            <label>数字学</label>
            <span>{card.lucky_number} — {numerologyText}</span>
          </div>
          <div className="detail-meta-item">
            <label>位置</label>
            <span>{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
