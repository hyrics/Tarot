import type { DivinationLayout } from "../types/tarot";

export const DIVINATION_LAYOUTS: Record<string, DivinationLayout> = {
  single: {
    id: "single",
    name: "单牌占卜",
    description: "一张牌代表当前形势或答案",
    cardCount: 1,
    positions: ["答案"],
  },
  trinity: {
    id: "trinity",
    name: "三位一体占卜",
    description: "代表过去、现在、未来的发展",
    cardCount: 3,
    positions: ["过去", "现在", "未来"],
  },
  five_cross: {
    id: "five_cross",
    name: "五牌十字",
    description: "中心牌与四个方向",
    cardCount: 5,
    positions: ["中心", "左边", "右边", "上方", "下方"],
  },
  seven_day: {
    id: "seven_day",
    name: "七日占卜",
    description: "一周每天的运势指引",
    cardCount: 7,
    positions: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  love: {
    id: "love",
    name: "爱情占卜",
    description: "分析爱情关系的方方面面",
    cardCount: 6,
    positions: ["自己的感受", "对方的感受", "关系基础", "挑战", "建议", "结果"],
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
  },
};

export const LAYOUT_IDS = Object.keys(DIVINATION_LAYOUTS);
