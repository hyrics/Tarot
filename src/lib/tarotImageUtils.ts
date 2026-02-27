/**
 * 获取塔罗牌图片 URL 的工具函数
 *
 * 当前项目使用阿里云 OSS 上的自定义素材，而不是维基百科图片。
 * 基础前缀通过环境变量 VITE_TAROT_CDN_BASE 配置，例如：
 *
 * VITE_TAROT_CDN_BASE=https://nanduo.oss-cn-beijing.aliyuncs.com/tarot_card_assets-main/Cards-png
 *
 * 命名规则示例：
 * - 大阿卡那：00-TheFool.png、01-TheMagician.png、…、21-TheWorld.png
 * - 圣杯（Cups）：Cups01.png、Cups02.png、…、Cups14.png（11-14 为侍从/骑士/皇后/国王）
 * - 权杖（Wands）：Wands01.png … Wands14.png
 * - 宝剑（Swords）：Swords01.png … Swords14.png
 * - 星币（Pentacles）：Pentacles01.png … Pentacles14.png
 */

const TAROT_CDN_BASE =
  (import.meta as any).env?.VITE_TAROT_CDN_BASE ??
  "https://nanduo.oss-cn-beijing.aliyuncs.com/tarot_card_assets-main/Cards-png";

// 大阿卡那文件名：根据编号 + 英文牌名拼接，例如 00-TheFool.png
function getMajorArcanaFilename(cardId: number, cardNameEn?: string): string {
  const index = cardId.toString().padStart(2, "0");
  const rawName = cardNameEn ?? "";
  const safeName = rawName.replace(/[^A-Za-z]/g, "");
  return safeName ? `${index}-${safeName}.png` : `${index}.png`;
}

// 小阿卡那：根据花色与数字生成文件名，例如 Cups01.png
function getMinorArcanaFilename(cardId: number, cardNameEn?: string): string {
  // 优先从英文牌名解析，例如 "Ace of Cups"
  if (cardNameEn) {
    const parts = cardNameEn.split(" of ");
    const rankText = parts[0];
    const suitText = parts[1] ?? "";

    const rankMap: Record<string, number> = {
      Ace: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
      Six: 6,
      Seven: 7,
      Eight: 8,
      Nine: 9,
      Ten: 10,
      Page: 11,
      Knight: 12,
      Queen: 13,
      King: 14,
    };

    const rankNumber = rankMap[rankText] ?? 1;
    const num = rankNumber.toString().padStart(2, "0");

    let suit = "Cups";
    const lowerSuit = suitText.toLowerCase();
    if (lowerSuit.includes("wands")) suit = "Wands";
    else if (lowerSuit.includes("swords")) suit = "Swords";
    else if (lowerSuit.includes("pentacles")) suit = "Pentacles";

    return `${suit}${num}.png`;
  }

  // 没有英文名时，根据 cardId 推算
  const suitIndex = Math.floor((cardId - 22) / 14);
  const cardNumber = (cardId - 22) % 14 + 1;

  const suits = ["Cups", "Wands", "Swords", "Pentacles"];
  const suit = suits[suitIndex] || "Cups";
  const num = cardNumber.toString().padStart(2, "0");

  return `${suit}${num}.png`;
}

/**
 * 获取塔罗牌图片的完整 URL（统一指向阿里云 OSS）
 * @param cardId 牌ID (0-77)
 * @param cardNameEn 英文牌名（可选，用于备用）
 * @returns 图片的完整 URL
 */
export function getCardImageUrl(cardId: number, cardNameEn?: string): string {
  let filename: string;

  if (cardId >= 0 && cardId <= 21) {
    filename = getMajorArcanaFilename(cardId, cardNameEn);
  } else if (cardId >= 22 && cardId <= 77) {
    filename = getMinorArcanaFilename(cardId, cardNameEn);
  } else {
    // 无效的牌ID，兜底使用愚者牌
    filename = getMajorArcanaFilename(0, "The Fool");
  }

  return `${TAROT_CDN_BASE}/${filename}`;
}

/**
 * 获取所有塔罗牌图片URL的映射
 */
export function getAllTarotImageUrls(): Record<number, string> {
  const urls: Record<number, string> = {};
  
  // 大阿卡那牌
  for (let i = 0; i <= 21; i++) {
    urls[i] = getCardImageUrl(i);
  }
  
  // 小阿卡那牌
  for (let i = 22; i <= 77; i++) {
    urls[i] = getCardImageUrl(i);
  }
  
  return urls;
}

/**
 * 预加载塔罗牌图片
 */
export function preloadTarotImages(): void {
  const urls = getAllTarotImageUrls();
  
  Object.values(urls).forEach(url => {
    const img = new Image();
    img.src = url;
  });
}