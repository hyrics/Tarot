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

/**
 * 推断问题类别
 * 通过关键词匹配推断问题的大类
 */
export function inferCategory(question: string | null): "emotion" | "career" | "growth" | null {
  if (!question) return null;
  
  const q = question.toLowerCase();
  
  // 情感类关键词
  const emotionKeywords = ["爱", "前任", "恋爱", "关系", "感情", "婚姻", "伴侣", "分手", "复合", "喜欢", "心动"];
  if (emotionKeywords.some(keyword => q.includes(keyword))) {
    return "emotion";
  }
  
  // 职业类关键词
  const careerKeywords = ["工作", "辞职", "跳槽", "职业", "升职", "老板", "事业", "收入", "薪资", "面试", "公司"];
  if (careerKeywords.some(keyword => q.includes(keyword))) {
    return "career";
  }
  
  // 成长类关键词
  const growthKeywords = ["焦虑", "迷茫", "成长", "改变", "决定", "困惑", "选择", "方向", "未来", "怎么办"];
  if (growthKeywords.some(keyword => q.includes(keyword))) {
    return "growth";
  }
  
  return null;
}

/**
 * 生成解读（核心洞察）
 * 根据牌阵、类别、牌面和问题生成一句有力量的话（15-25字）
 */
export function generateInterpretation(params: {
  spread: string;
  category: "emotion" | "career" | "growth" | null;
  cards: DrawnCard[];
  question: string | null;
}): string {
  const { category, cards, question } = params;
  
  if (cards.length === 0) return "请先抽取塔罗牌。";

  // 获取主要牌的含义（取前3张）
  const mainCards = cards.slice(0, Math.min(3, cards.length));
  const hasReversed = mainCards.some(c => c.isReversed);

  // 如果有类别，生成类别化解读
  if (category) {
    const categoryInsights: Record<typeof category, string[]> = {
      emotion: [
        "真诚沟通是关系的基础，倾听彼此的心声才能找到平衡点。",
        "情感需要时间和耐心，给彼此空间去理解和成长。",
        "爱是相互的给予，在付出与接受之间找到和谐。",
        "感受是真实的指引，相信你的直觉去表达内心。",
        "关系中的挑战是成长的契机，勇敢面对才能深化连接。",
      ],
      career: [
        "机会需要主动把握，行动比犹豫更能带来转机。",
        "职业发展需要清晰的规划，每一步都指向你的目标。",
        "相信自己的能力，在挑战中展现你的专业价值。",
        "时机很重要，做好准备才能在机会来临时抓住它。",
        "职业道路需要坚持和适应，保持学习的心态。",
      ],
      growth: [
        "内在的成长需要时间，接纳当下的自己才能前行。",
        "自我认知是改变的开始，了解自己才能超越自己。",
        "情绪是内在的指引，学会倾听它们传递的信息。",
        "成长是一个过程，不必急于求成，每一步都算数。",
        "迷茫是成长的信号，它指引你寻找真正的方向。",
      ],
    };

    let insight = categoryInsights[category][Math.floor(Math.random() * categoryInsights[category].length)];

    // 如果有逆位牌，调整洞察的语气
    if (hasReversed) {
      const reversedInsights: Record<typeof category, string[]> = {
        emotion: [
          "关系中需要更多的理解和包容，换位思考能化解矛盾。",
          "情感上的阻碍是暂时的，通过沟通可以找到解决方案。",
        ],
        career: [
          "职业道路上的挑战是成长的必经之路，坚持下去会有转机。",
          "工作中的困难需要耐心应对，保持积极的心态很重要。",
        ],
        growth: [
          "内在的冲突需要被看见和接纳，这是成长的开始。",
          "自我怀疑是正常的，但不要让它们阻止你前进。",
        ],
      };
      if (Math.random() < 0.5) {
        insight = reversedInsights[category][Math.floor(Math.random() * reversedInsights[category].length)];
      }
    }

    // 确保长度在15-25字之间
    if (insight.length < 15) {
      insight += "相信你的直觉，勇敢前行。";
    } else if (insight.length > 25) {
      insight = insight.substring(0, 25) + "。";
    }

    return insight;
  }

  // 如果没有类别，生成通用解读
  const generalInsights = [
    "塔罗牌为你揭示当下的能量，静心感受其中的指引。",
    "每张牌都承载着智慧，结合你的直觉去理解它们。",
    "牌面反映的是当前的能量状态，相信你的内在智慧。",
    "塔罗是镜子，照见你内心的真实想法和潜在可能。",
    "牌阵中的每一张牌都在诉说着不同的面向，综合理解。",
  ];

  let insight = generalInsights[Math.floor(Math.random() * generalInsights.length)];

  if (hasReversed) {
    const reversedGeneral = [
      "逆位牌提醒你注意内在的阻碍，正视它们才能突破。",
      "挑战是成长的机会，牌面指引你如何转化这些能量。",
    ];
    if (Math.random() < 0.5) {
      insight = reversedGeneral[Math.floor(Math.random() * reversedGeneral.length)];
    }
  }

  // 确保长度在15-25字之间
  if (insight.length < 15) {
    insight += "相信你的直觉，勇敢前行。";
  } else if (insight.length > 25) {
    insight = insight.substring(0, 25) + "。";
  }

  return insight;
}

/**
 * 生成核心洞察（保留旧函数以兼容）
 * @deprecated 使用 generateInterpretation 代替
 */
export function generateInsight(
  direction: "emotion" | "career" | "inner" | "decision",
  question: string,
  cards: DrawnCard[]
): string {
  if (cards.length === 0) return "请先抽取塔罗牌。";

  // 获取主要牌的含义（取前3张）
  const mainCards = cards.slice(0, Math.min(3, cards.length));
  const cardMeanings = mainCards.map(c => c.meaning).join(" ");
  const hasReversed = mainCards.some(c => c.isReversed);

  // 根据方向生成不同类型的洞察
  const insights: Record<typeof direction, string[]> = {
    emotion: [
      "真诚沟通是关系的基础，倾听彼此的心声才能找到平衡点。",
      "情感需要时间和耐心，给彼此空间去理解和成长。",
      "爱是相互的给予，在付出与接受之间找到和谐。",
      "感受是真实的指引，相信你的直觉去表达内心。",
      "关系中的挑战是成长的契机，勇敢面对才能深化连接。",
    ],
    career: [
      "机会需要主动把握，行动比犹豫更能带来转机。",
      "职业发展需要清晰的规划，每一步都指向你的目标。",
      "相信自己的能力，在挑战中展现你的专业价值。",
      "时机很重要，做好准备才能在机会来临时抓住它。",
      "职业道路需要坚持和适应，保持学习的心态。",
    ],
    inner: [
      "内在的成长需要时间，接纳当下的自己才能前行。",
      "自我认知是改变的开始，了解自己才能超越自己。",
      "情绪是内在的指引，学会倾听它们传递的信息。",
      "成长是一个过程，不必急于求成，每一步都算数。",
      "内在的平静来自接纳，允许自己有不完美的地方。",
    ],
    decision: [
      "决定需要勇气，但更重要的是跟随内心的声音。",
      "时机已到，相信你的判断，勇敢地迈出这一步。",
      "每个选择都有其意义，相信你正在走向正确的方向。",
      "犹豫是正常的，但不要让恐惧阻止你前进。",
      "决定之后是行动，用行动去验证你的选择。",
    ],
  };

  // 根据牌的含义和方向选择合适的洞察
  let insight = insights[direction][Math.floor(Math.random() * insights[direction].length)];

  // 如果有逆位牌，调整洞察的语气
  if (hasReversed) {
    const reversedInsights: Record<typeof direction, string[]> = {
      emotion: [
        "关系中需要更多的理解和包容，换位思考能化解矛盾。",
        "情感上的阻碍是暂时的，通过沟通可以找到解决方案。",
      ],
      career: [
        "职业道路上的挑战是成长的必经之路，坚持下去会有转机。",
        "工作中的困难需要耐心应对，保持积极的心态很重要。",
      ],
      inner: [
        "内在的冲突需要被看见和接纳，这是成长的开始。",
        "自我怀疑是正常的，但不要让它们阻止你前进。",
      ],
      decision: [
        "决定前的犹豫是谨慎的表现，但不要让它成为拖延的借口。",
        "选择需要勇气，即使不确定也要相信自己的判断。",
      ],
    };
    if (Math.random() < 0.5) {
      insight = reversedInsights[direction][Math.floor(Math.random() * reversedInsights[direction].length)];
    }
  }

  // 确保长度在15-25字之间
  if (insight.length < 15) {
    insight += "相信你的直觉，勇敢前行。";
  } else if (insight.length > 25) {
    insight = insight.substring(0, 25) + "。";
  }

  return insight;
}
