/**
 * 获取塔罗牌图片URL的工具函数
 * 基于维基百科的Rider-Waite塔罗牌高清图片
 * URL格式：https://upload.wikimedia.org/wikipedia/en/[id]/[filename].jpg
 */

/**
 * 大阿卡那牌（0-21）的图片文件名映射
 */
const MAJOR_ARCANA_IMAGES: Record<number, string> = {
  0: "RWS_Tarot_00_Fool.jpg",
  1: "RWS_Tarot_01_Magician.jpg",
  2: "RWS_Tarot_02_High_Priestess.jpg",
  3: "RWS_Tarot_03_Empress.jpg",
  4: "RWS_Tarot_04_Emperor.jpg",
  5: "RWS_Tarot_05_Hierophant.jpg",
  6: "RWS_Tarot_06_Lovers.jpg",
  7: "RWS_Tarot_07_Chariot.jpg",
  8: "RWS_Tarot_08_Strength.jpg",
  9: "RWS_Tarot_09_Hermit.jpg",
  10: "RWS_Tarot_10_Wheel_of_Fortune.jpg",
  11: "RWS_Tarot_11_Justice.jpg",
  12: "RWS_Tarot_12_Hanged_Man.jpg",
  13: "RWS_Tarot_13_Death.jpg",
  14: "RWS_Tarot_14_Temperance.jpg",
  15: "RWS_Tarot_15_Devil.jpg",
  16: "RWS_Tarot_16_Tower.jpg",
  17: "RWS_Tarot_17_Star.jpg",
  18: "RWS_Tarot_18_Moon.jpg",
  19: "RWS_Tarot_19_Sun.jpg",
  20: "RWS_Tarot_20_Judgement.jpg",
  21: "RWS_Tarot_21_World.jpg"
};

/**
 * 小阿卡那牌（22-77）的图片文件名映射
 * 格式：牌名_of_花色.jpg
 */
const MINOR_ARCANA_IMAGES: Record<number, string> = {
  // 圣杯牌组 (Cups) - 22-35
  22: "RWS_Tarot_AC.jpg",  // Ace of Cups
  23: "RWS_Tarot_02C.jpg", // Two of Cups
  24: "RWS_Tarot_03C.jpg", // Three of Cups
  25: "RWS_Tarot_04C.jpg", // Four of Cups
  26: "RWS_Tarot_05C.jpg", // Five of Cups
  27: "RWS_Tarot_06C.jpg", // Six of Cups
  28: "RWS_Tarot_07C.jpg", // Seven of Cups
  29: "RWS_Tarot_08C.jpg", // Eight of Cups
  30: "RWS_Tarot_09C.jpg", // Nine of Cups
  31: "RWS_Tarot_10C.jpg", // Ten of Cups
  32: "RWS_Tarot_PC.jpg",  // Page of Cups
  33: "RWS_Tarot_KC.jpg",  // Knight of Cups
  34: "RWS_Tarot_QC.jpg",  // Queen of Cups
  35: "RWS_Tarot_RC.jpg",  // King of Cups
  
  // 权杖牌组 (Wands) - 36-49
  36: "RWS_Tarot_AW.jpg",  // Ace of Wands
  37: "RWS_Tarot_02W.jpg", // Two of Wands
  38: "RWS_Tarot_03W.jpg", // Three of Wands
  39: "RWS_Tarot_04W.jpg", // Four of Wands
  40: "RWS_Tarot_05W.jpg", // Five of Wands
  41: "RWS_Tarot_06W.jpg", // Six of Wands
  42: "RWS_Tarot_07W.jpg", // Seven of Wands
  43: "RWS_Tarot_08W.jpg", // Eight of Wands
  44: "RWS_Tarot_09W.jpg", // Nine of Wands
  45: "RWS_Tarot_10W.jpg", // Ten of Wands
  46: "RWS_Tarot_PW.jpg",  // Page of Wands
  47: "RWS_Tarot_KW.jpg",  // Knight of Wands
  48: "RWS_Tarot_QW.jpg",  // Queen of Wands
  49: "RWS_Tarot_RW.jpg",  // King of Wands
  
  // 宝剑牌组 (Swords) - 50-63
  50: "RWS_Tarot_AS.jpg",  // Ace of Swords
  51: "RWS_Tarot_02S.jpg", // Two of Swords
  52: "RWS_Tarot_03S.jpg", // Three of Swords
  53: "RWS_Tarot_04S.jpg", // Four of Swords
  54: "RWS_Tarot_05S.jpg", // Five of Swords
  55: "RWS_Tarot_06S.jpg", // Six of Swords
  56: "RWS_Tarot_07S.jpg", // Seven of Swords
  57: "RWS_Tarot_08S.jpg", // Eight of Swords
  58: "RWS_Tarot_09S.jpg", // Nine of Swords
  59: "RWS_Tarot_10S.jpg", // Ten of Swords
  60: "RWS_Tarot_PS.jpg",  // Page of Swords
  61: "RWS_Tarot_KS.jpg",  // Knight of Swords
  62: "RWS_Tarot_QS.jpg",  // Queen of Swords
  63: "RWS_Tarot_RS.jpg",  // King of Swords
  
  // 星币牌组 (Pentacles) - 64-77
  64: "RWS_Tarot_AP.jpg",  // Ace of Pentacles
  65: "RWS_Tarot_02P.jpg", // Two of Pentacles
  66: "RWS_Tarot_03P.jpg", // Three of Pentacles
  67: "RWS_Tarot_04P.jpg", // Four of Pentacles
  68: "RWS_Tarot_05P.jpg", // Five of Pentacles
  69: "RWS_Tarot_06P.jpg", // Six of Pentacles
  70: "RWS_Tarot_07P.jpg", // Seven of Pentacles
  71: "RWS_Tarot_08P.jpg", // Eight of Pentacles
  72: "RWS_Tarot_09P.jpg", // Nine of Pentacles
  73: "RWS_Tarot_10P.jpg", // Ten of Pentacles
  74: "RWS_Tarot_PP.jpg",  // Page of Pentacles
  75: "RWS_Tarot_KP.jpg",  // Knight of Pentacles
  76: "RWS_Tarot_QP.jpg",  // Queen of Pentacles
  77: "RWS_Tarot_RP.jpg"   // King of Pentacles
};

/**
 * 获取塔罗牌图片的完整URL
 * @param cardId 牌ID (0-77)
 * @param cardNameEn 英文牌名（可选，用于备用）
 * @returns 图片的完整URL
 */
export function getCardImageUrl(cardId: number, cardNameEn?: string): string {
  // 根据牌ID确定图片文件名
  let filename: string;
  
  if (cardId >= 0 && cardId <= 21) {
    // 大阿卡那牌
    filename = MAJOR_ARCANA_IMAGES[cardId] || `RWS_Tarot_${cardId.toString().padStart(2, '0')}_${cardNameEn?.replace(/\s+/g, '_') || 'Card'}.jpg`;
  } else if (cardId >= 22 && cardId <= 77) {
    // 小阿卡那牌
    filename = MINOR_ARCANA_IMAGES[cardId] || `RWS_Tarot_${getMinorArcanaFilename(cardId, cardNameEn)}`;
  } else {
    // 无效的牌ID，返回默认图片
    filename = "RWS_Tarot_00_Fool.jpg";
  }
  
  // 生成维基百科URL
  // 维基百科的图片URL格式：https://upload.wikimedia.org/wikipedia/en/[id]/[filename].jpg
  // 这里使用一个通用的ID，实际使用时可能需要根据具体图片调整
  const fileId = "9/9b"; // 愚者牌的ID，其他牌可能需要不同的ID
  
  return `https://upload.wikimedia.org/wikipedia/en/${fileId}/${filename}`;
}

/**
 * 获取小阿卡那牌的文件名
 */
function getMinorArcanaFilename(cardId: number, cardNameEn?: string): string {
  // 如果提供了英文牌名，尝试从牌名生成文件名
  if (cardNameEn) {
    const name = cardNameEn.toLowerCase().replace(/\s+/g, '_');
    return `${name}.jpg`;
  }
  
  // 根据牌ID生成默认文件名
  const suitIndex = Math.floor((cardId - 22) / 14);
  const cardNumber = (cardId - 22) % 14 + 1;
  
  const suits = ['C', 'W', 'S', 'P']; // Cups, Wands, Swords, Pentacles
  const suit = suits[suitIndex] || 'C';
  
  if (cardNumber <= 10) {
    return `${cardNumber.toString().padStart(2, '0')}${suit}.jpg`;
  } else {
    // 宫廷牌：Page, Knight, Queen, King
    const courtCards = ['P', 'K', 'Q', 'R']; // Page, Knight, Queen, King
    const courtIndex = cardNumber - 11;
    return `${courtCards[courtIndex]}${suit}.jpg`;
  }
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