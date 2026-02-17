import type { DrawnCard, ReadingItem, DivinationLayout } from "../types/tarot";

const NUMEROLOGY: Record<number, string> = {
  0: "潜力、零点、新的开始",
  1: "独立、领导力、自我意识",
  2: "二元性、平衡、伙伴关系",
  3: "创意、表达、成长",
  4: "稳定、基础、秩序",
  5: "变化、冒险、自由",
  6: "和谐、爱、责任",
  7: "神秘、内省、精神",
  8: "力量、丰盛、物质成功",
  9: "完成、智慧、启蒙",
};

const SYMBOLISM: Record<string, string> = {
  "愚者": "新的开始和冒险精神",
  "魔术师": "能力和意志力",
  "女祭司": "直觉与内在智慧",
  "皇后": "丰饶与创造力",
  "皇帝": "秩序与权威",
  "教皇": "传统与信仰",
  "恋人": "选择与爱的结合",
  "战车": "意志与胜利",
  "力量": "以柔克刚的勇气",
  "隐者": "内省与真理",
  "命运之轮": "周期与转变",
  "正义": "因果与公平",
  "倒吊人": "换位思考与牺牲",
  "死神": "结束与重生",
  "节制": "平衡与调和",
  "恶魔": "欲望与束缚",
  "高塔": "剧变与觉醒",
  "星星": "希望与灵感",
  "月亮": "潜意识与直觉",
  "太阳": "成功与喜悦",
  "审判": "觉醒与召唤",
  "世界": "完成与圆满",
};

export function getNumerologyMeaning(num: number): string {
  const n = num >= 0 && num <= 9 ? num : num % 10;
  return NUMEROLOGY[n] ?? "未知含义";
}

export function getBasicReading(card: DrawnCard): ReadingItem["basicReading"] {
  return {
    meaning: card.meaning,
    keywords: card.keywords,
    numerology: getNumerologyMeaning(card.lucky_number),
  };
}

export function getSymbolism(card: DrawnCard): string {
  return SYMBOLISM[card.name_cn] ?? "这张牌代表变革与成长的力量。";
}

export function getPersonalInsight(
  card: DrawnCard,
  _allCards: DrawnCard[],
  index: number
): string {
  let insight = card.description ?? card.meaning;
  if (index === 0) insight += " 这是形势的基础与起点。";
  return insight;
}

export function generateOverallAnalysis(
  readings: ReadingItem[],
  layout: DivinationLayout
): string {
  if (readings.length === 0) return "暂无综合解读。";

  const parts = readings.map(
    (r) => `【${r.position}】${r.card.name_cn}（${r.card.orientation}）\n${r.basicReading.meaning}`
  );

  let analysis = `根据「${layout.name}」抽到的牌：\n\n`;
  analysis += parts.join("\n\n");
  analysis += "\n\n【综合】";
  if (layout.id === "trinity" && readings.length >= 3) {
    analysis += "从过去到未来呈现清晰脉络，建议把握当下选择，为未来铺路。";
  } else if (layout.id === "love" && readings.length >= 6) {
    analysis += "关系中的感受、挑战与建议已显现，可结合各位置含义做整体考量。";
  } else {
    analysis += "各张牌共同指向当前问题的不同面向，请结合你的问题综合理解。";
  }
  return analysis;
}
