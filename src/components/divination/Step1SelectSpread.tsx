import React from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { DIVINATION_LAYOUTS } from "../../data/divination_layouts";

/**
 * Step 1: 选择牌阵
 * 分组布局：通用占卜 / 垂直占卜 / 高级占卜
 */
const SPREAD_CONFIG: Record<string, { name: string; shortDesc: string; icon: string }> = {
  single: { name: "单张牌", shortDesc: "快速洞察", icon: "🃏" },
  trinity: { name: "三张牌", shortDesc: "了解脉络", icon: "🎴" },
  five_cross: { name: "五张牌", shortDesc: "深度分析", icon: "✋" },
  love: { name: "爱情关系牌阵", shortDesc: "情感分析", icon: "💕" },
  career: { name: "求职占卜牌阵", shortDesc: "职业规划", icon: "💼" },
  seven_day: { name: "七日运势", shortDesc: "周期指引", icon: "📅" },
  celtic_cross: { name: "凯尔特十字", shortDesc: "全面解读", icon: "⭐" },
};

const SPREAD_GROUPS: { title: string; ids: string[] }[] = [
  { title: "通用占卜（探索内心）", ids: ["single", "trinity", "five_cross"] },
  { title: "垂直占卜（针对场景）", ids: ["love", "career"] },
  { title: "高级占卜（完整解读）", ids: ["seven_day", "celtic_cross"] },
];

export default function Step1SelectSpread() {
  const { selectedSpread, setSelectedSpread, setSelectedType, nextStep } = useDivinationChain();

  const handleSpreadSelect = (spreadId: string) => {
    setSelectedSpread(spreadId);
    setSelectedType(spreadId as any);
    nextStep();
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">选择占卜类型</h2>
        <p className="step-subtitle">选择适合你的牌阵</p>
      </div>

      <div className="spread-select-grouped">
        {SPREAD_GROUPS.map((group) => (
          <div key={group.title} className="spread-group">
            <h3 className="spread-group-title">{group.title}</h3>
            <div className="spread-group-cards">
              {group.ids.map((id) => {
                const layout = DIVINATION_LAYOUTS[id];
                if (!layout) return null;
                const config = SPREAD_CONFIG[id] || {
                  name: layout.name,
                  shortDesc: layout.description,
                  icon: "🔮",
                };
                return (
                  <button
                    key={id}
                    type="button"
                    className={`spread-card ${selectedSpread === id ? "active" : ""}`}
                    onClick={() => handleSpreadSelect(id)}
                  >
                    <div className="spread-icon">{config.icon}</div>
                    <h4 className="spread-name">{config.name}</h4>
                    <p className="spread-description">{config.shortDesc}</p>
                    <span className="spread-meta">{layout.cardCount} 张</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
