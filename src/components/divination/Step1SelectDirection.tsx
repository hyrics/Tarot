import React from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

/**
 * Step 1: 选择占卜方向
 * 四个选项：情感关系、职业方向、内在状态、下一个决定
 */
export default function Step1SelectDirection() {
  const { direction, setDirection, nextStep } = useDivinationChain();

  const directions = [
    { id: "emotion", name: "情感关系", icon: "💕", description: "关于感受、沟通、关系的建议" },
    { id: "career", name: "职业方向", icon: "💼", description: "关于决策、行动、机会的建议" },
    { id: "inner", name: "内在状态", icon: "🧘", description: "关于成长、认知、接纳的建议" },
    { id: "decision", name: "下一个决定", icon: "🎯", description: "关于时机、勇气、方向的建议" },
  ] as const;

  const handleDirectionSelect = (selectedDirection: typeof directions[number]["id"]) => {
    setDirection(selectedDirection);
    // 选择后直接进入下一步
    nextStep();
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">选择占卜方向</h2>
        <p className="step-subtitle">你想了解哪个方面的指引？</p>
      </div>

      <div className="direction-select">
        {directions.map((dir) => (
          <button
            key={dir.id}
            type="button"
            className={`direction-card ${direction === dir.id ? 'active' : ''}`}
            onClick={() => handleDirectionSelect(dir.id)}
          >
            <div className="direction-icon">{dir.icon}</div>
            <h3 className="direction-name">{dir.name}</h3>
            <p className="direction-description">{dir.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
