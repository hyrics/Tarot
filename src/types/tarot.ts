/** 牌组分类：大阿尔卡那 / 四组小阿尔卡那 */
export type TarotCategory = "major" | "cups" | "wands" | "swords" | "pentacles";

/** 牌库中的单张牌（未抽牌前） */
export interface TarotCardBase {
  id: number;
  name_cn: string;
  name_en: string;
  category: TarotCategory;
  number: number;
  image_url: string;
  meaning_upright: string;
  meaning_reversed: string;
  keywords_upright: string[];
  keywords_reversed: string[];
  description?: string;
  lucky_number: number;
}

/** 抽出的牌（含正逆位结果） */
export interface DrawnCard extends TarotCardBase {
  isReversed: boolean;
  orientation: "正位" | "逆位";
  meaning: string;
  keywords: string[];
}

/** 占卜布局 */
export interface DivinationLayout {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
}

/** 单张牌的解读项 */
export interface ReadingItem {
  position: string;
  positionIndex: number;
  card: DrawnCard;
  basicReading: { meaning: string; keywords: string[]; numerology: string };
  symbolism: string;
  personalInsight: string;
}

/** 一次完整占卜结果 */
export interface DivinationResult {
  layout: DivinationLayout;
  readings: ReadingItem[];
  overallAnalysis: string;
  timestamp: string;
}

/** 历史记录（持久化用） */
export interface TarotReadingRecord {
  id: string;
  question: string;
  layoutId: string;
  layoutName: string;
  result: DivinationResult;
  createdAt: string;
}
