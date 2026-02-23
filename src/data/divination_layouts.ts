import type { DivinationLayout } from "../types/tarot";

export const DIVINATION_LAYOUTS: Record<string, DivinationLayout> = {
  single: {
    id: "single",
    name: "单牌占卜",
    description: "一张牌代表当前形势或答案",
    cardCount: 1,
    positions: ["答案"],
    questionExamples: [
      "我现在的情况是什么？",
      "我应该关注什么？",
      "今天给我的指引是什么？",
    ],
  },
  trinity: {
    id: "trinity",
    name: "三位一体占卜",
    description: "代表过去、现在、未来的发展",
    cardCount: 3,
    positions: ["过去", "现在", "未来"],
    questionExamples: [
      "我该如何平衡工作与生活？",
      "最近工作不顺，要不要辞职？",
      "我最近很焦虑，不知道该怎么办",
      "我的未来会如何发展？",
    ],
  },
  five_cross: {
    id: "five_cross",
    name: "五牌十字",
    description: "中心牌与四个方向",
    cardCount: 5,
    positions: ["中心", "左边", "右边", "上方", "下方"],
    questionExamples: [
      "这个新机会对我来说是什么意思？",
      "我应该如何应对当前的挑战？",
      "我的事业发展方向是什么？",
      "这个决定会带来什么影响？",
    ],
  },
  seven_day: {
    id: "seven_day",
    name: "七日占卜",
    description: "一周每天的运势指引",
    cardCount: 7,
    positions: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    questionExamples: [
      "本周我应该关注什么？",
      "这周的运势如何？",
      "本周有什么需要注意的？",
    ],
  },
  love: {
    id: "love",
    name: "爱情占卜",
    description: "分析爱情关系的方方面面",
    cardCount: 6,
    positions: ["自己的感受", "对方的感受", "关系基础", "挑战", "建议", "结果"],
    questionExamples: [
      "我该不该和前任复合？",
      "我现在的爱情关系会如何发展？",
      "我们之间还有可能吗？",
      "我应该如何改善我们的关系？",
    ],
  },
  career: {
    id: "career",
    name: "求职占卜",
    description: "职业规划与求职指引",
    cardCount: 5,
    positions: ["当前优势", "面临的挑战", "机会与方向", "行动建议", "可能结果"],
    questionExamples: [
      "我该不该跳槽？",
      "这次面试能成功吗？",
      "我的职业方向在哪里？",
      "如何提升职场竞争力？",
    ],
  },
  celtic_cross: {
    id: "celtic_cross",
    name: "凯尔特十字",
    description: "十张牌的经典牌阵",
    cardCount: 10,
    positions: [
      "局势",
      "影响",
      "远期目标",
      "基础",
      "过去",
      "未来",
      "态度",
      "外部环境",
      "希望与恐惧",
      "结果",
    ],
    questionExamples: [
      "我在感情中面临的主要挑战是什么？",
      "我的整体运势如何？",
      "我应该如何规划未来？",
    ],
  },
};

export const LAYOUT_IDS = Object.keys(DIVINATION_LAYOUTS);
