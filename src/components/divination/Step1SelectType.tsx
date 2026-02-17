import React from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { DIVINATION_LAYOUTS, LAYOUT_IDS } from "../../data/divination_layouts";

export default function Step1SelectType() {
  const { selectedType, setSelectedType, nextStep } = useDivinationChain();

  const handleTypeSelect = (type: string) => {
    setSelectedType(type as any);
    // 选择后直接进入下一步
    nextStep();
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">选择占卜方式</h2>
        <p className="step-subtitle">选择适合你问题的占卜类型</p>
      </div>

      <div className="divination-types">
        {LAYOUT_IDS.map((id) => {
          const layout = DIVINATION_LAYOUTS[id];
          return (
            <button
              key={id}
              type="button"
              className={`divination-type-card ${selectedType === id ? 'active' : ''}`}
              onClick={() => handleTypeSelect(id)}
            >
              <div className="type-icon">
                {layout.cardCount === 1 && '🃏'}
                {layout.cardCount === 3 && '🎴'}
                {layout.cardCount === 5 && '✋'}
                {layout.cardCount === 6 && '💕'}
                {layout.cardCount === 10 && '⭐'}
              </div>
              <h3 className="type-name">{layout.name}</h3>
              <p className="type-description">{layout.description}</p>
              <div className="type-meta">
                <span className="card-count">{layout.cardCount} 张牌</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
