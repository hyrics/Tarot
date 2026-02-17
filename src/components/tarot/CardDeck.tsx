import React, { useState } from "react";
import type { TarotCardBase, DrawnCard } from "../../types/tarot";
import { determineOrientation } from "../../lib/divination";
import { Card } from "./Card";

interface CardDeckProps {
  cards: TarotCardBase[];
  onDrawComplete?: (selected: DrawnCard[]) => void;
}

/** 简易抽牌：洗牌后抽前 3 张并随机正逆位 */
export function CardDeck({ cards, onDrawComplete }: CardDeckProps) {
  const [selectedCards, setSelectedCards] = useState<DrawnCard[] | null>(null);

  const handleDraw = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, 3).map(determineOrientation);
    setSelectedCards(picked);
    onDrawComplete?.(picked);
  };

  return (
    <div className="tarot-deck">
      <button className="primary-button" type="button" onClick={handleDraw}>
        开始抽牌
      </button>
      <div className="tarot-deck-board">
        {selectedCards ? (
          <div className="tarot-deck-cards">
            {selectedCards.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        ) : (
          <p className="tarot-deck-hint">点击上方按钮开始抽牌。</p>
        )}
      </div>
    </div>
  );
}
