import type { TarotCardBase, DrawnCard, ReadingItem, DivinationResult } from "../types/tarot";
import type { DivinationLayout } from "../types/tarot";
import { TarotDeck } from "./tarot-deck";
import {
  getBasicReading,
  getSymbolism,
  getPersonalInsight,
  generateOverallAnalysis,
} from "./card-reader";
import { ALL_TAROT_CARDS } from "../data/tarot_cards";
import { DIVINATION_LAYOUTS } from "../data/divination_layouts";

export function determineOrientation(card: TarotCardBase): DrawnCard {
  const isReversed = Math.random() < 0.5;
  return {
    ...card,
    isReversed,
    orientation: isReversed ? "逆位" : "正位",
    meaning: isReversed ? card.meaning_reversed : card.meaning_upright,
    keywords: isReversed ? card.keywords_reversed : card.keywords_upright,
  };
}

/**
 * 执行一次占卜：洗牌 → 抽牌 → 正逆位 → 生成解读
 */
export function performDivination(layoutId: string): DivinationResult | null {
  const layout = DIVINATION_LAYOUTS[layoutId];
  if (!layout || layout.cardCount <= 0) return null;

  const deck = new TarotDeck([...ALL_TAROT_CARDS]);
  deck.shuffle();
  const rawCards = deck.drawCards(layout.cardCount);
  if (rawCards.length < layout.cardCount) return null;

  const drawnCards = rawCards.map(determineOrientation);
  const readings: ReadingItem[] = drawnCards.map((card, index) => ({
    position: layout.positions[index] ?? `位置${index + 1}`,
    positionIndex: index,
    card,
    basicReading: getBasicReading(card),
    symbolism: getSymbolism(card),
    personalInsight: getPersonalInsight(card, drawnCards, index),
  }));

  const overallAnalysis = generateOverallAnalysis(readings, layout);

  return {
    layout,
    readings,
    overallAnalysis,
    timestamp: new Date().toISOString(),
  };
}
