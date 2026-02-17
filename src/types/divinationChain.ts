export interface DivinationLayer {
  layerId: number;
  divinationType: string;
  focusQuestion?: string; // 第二层及之后的专项问题
  cards: DivinationCard[];
  reading: string;
  createdAt: string;
}

export interface DivinationCard {
  id: number;
  name: string;
  nameEn: string;
  position: string;
  isReversed: boolean;
  meaning: string;
  keywords: string[];
}

export interface DivinationChain {
  chainId: string;
  userId: string;
  originalQuestion: string;
  layers: DivinationLayer[];
  coreInsight?: string;
  isPublished: boolean;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface DivinationStep {
  step: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export type DivinationType = 
  | "single"      // 单牌占卜
  | "trinity"     // 三位一体
  | "five_cross"  // 五牌十字
  | "celtic_cross" // 凯尔特十字
  | "love"        // 爱情占卜
  | "specialization"; // 专项占卜（第二层）
