import type { TarotCardBase } from "../types/tarot";

/**
 * 牌组管理：洗牌（Fisher-Yates）、抽牌、重置
 */
export class TarotDeck {
  constructor(public allCards: TarotCardBase[]) {
    this.deck = [...allCards];
  }

  private deck: TarotCardBase[];

  /** Fisher-Yates 洗牌 */
  shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  /** 抽取前 num 张牌（从牌组中移除） */
  drawCards(num: number): TarotCardBase[] {
    return this.deck.splice(0, num);
  }

  /** 重置牌组为初始顺序的完整 78 张 */
  reset(): void {
    this.deck = [...this.allCards];
  }
}
