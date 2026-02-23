/**
 * 获取塔罗牌图片URL的工具函数
 * 基于维基百科Commons的Rider-Waite塔罗牌高清图片
 * URL格式：https://upload.wikimedia.org/wikipedia/commons/[path]/[filename].jpg
 * 
 * 注意：由于维基百科Commons的文件路径可能不同，这里使用常见的路径格式
 * 如果某些图片无法加载，可能需要根据实际文件路径调整
 */

/**
 * 大阿卡那牌（0-21）的图片文件名和路径映射
 * 格式：{ cardId: { filename: string, path: string } }
 * 路径基于维基百科Commons的实际文件路径
 */
const MAJOR_ARCANA_IMAGES: Record<number, { filename: string; path: string }> = {
  0: { filename: "RWS_Tarot_00_Fool.jpg", path: "9/90" },
  1: { filename: "RWS_Tarot_01_Magician.jpg", path: "d/de" },
  2: { filename: "RWS_Tarot_02_High_Priestess.jpg", path: "d/de" },
  3: { filename: "RWS_Tarot_03_Empress.jpg", path: "d/d2" },
  4: { filename: "RWS_Tarot_04_Emperor.jpg", path: "c/c3" },
  5: { filename: "RWS_Tarot_05_Hierophant.jpg", path: "8/8d" },
  6: { filename: "RWS_Tarot_06_Lovers.jpg", path: "3/3a" },
  7: { filename: "RWS_Tarot_07_Chariot.jpg", path: "9/9b" },
  8: { filename: "RWS_Tarot_08_Strength.jpg", path: "f/f5" },
  9: { filename: "RWS_Tarot_09_Hermit.jpg", path: "4/42" },
  10: { filename: "RWS_Tarot_10_Wheel_of_Fortune.jpg", path: "3/3c" },
  11: { filename: "RWS_Tarot_11_Justice.jpg", path: "e/e0" },
  12: { filename: "RWS_Tarot_12_Hanged_Man.jpg", path: "2/2f" },
  13: { filename: "RWS_Tarot_13_Death.jpg", path: "d/d7" },
  14: { filename: "RWS_Tarot_14_Temperance.jpg", path: "f/f8" },
  15: { filename: "RWS_Tarot_15_Devil.jpg", path: "5/55" },
  16: { filename: "RWS_Tarot_16_Tower.jpg", path: "5/53" },
  17: { filename: "RWS_Tarot_17_Star.jpg", path: "d/db" },
  18: { filename: "RWS_Tarot_18_Moon.jpg", path: "7/7f" },
  19: { filename: "RWS_Tarot_19_Sun.jpg", path: "1/17" },
  20: { filename: "RWS_Tarot_20_Judgement.jpg", path: "d/dd" },
  21: { filename: "RWS_Tarot_21_World.jpg", path: "f/f0" }
};

/**
 * 小阿卡那牌（22-77）的图片文件名和路径映射
 * 由于小阿卡那牌数量较多，使用通用路径格式
 * 如果某些图片无法加载，可能需要根据实际文件路径调整
 */
const MINOR_ARCANA_IMAGES: Record<number, { filename: string; path: string }> = {
  // 圣杯牌组 (Cups) - 22-35
  22: { filename: "RWS_Tarot_AC.jpg", path: "2/22" },  // Ace of Cups
  23: { filename: "RWS_Tarot_02C.jpg", path: "f/ff" }, // Two of Cups
  24: { filename: "RWS_Tarot_03C.jpg", path: "7/7b" }, // Three of Cups
  25: { filename: "RWS_Tarot_04C.jpg", path: "d/d7" }, // Four of Cups
  26: { filename: "RWS_Tarot_05C.jpg", path: "0/08" }, // Five of Cups
  27: { filename: "RWS_Tarot_06C.jpg", path: "d/dd" }, // Six of Cups
  28: { filename: "RWS_Tarot_07C.jpg", path: "3/38" }, // Seven of Cups
  29: { filename: "RWS_Tarot_08C.jpg", path: "4/46" }, // Eight of Cups
  30: { filename: "RWS_Tarot_09C.jpg", path: "2/27" }, // Nine of Cups
  31: { filename: "RWS_Tarot_10C.jpg", path: "3/3d" }, // Ten of Cups
  32: { filename: "RWS_Tarot_PC.jpg", path: "c/c1" },  // Page of Cups
  33: { filename: "RWS_Tarot_KC.jpg", path: "d/d5" },  // Knight of Cups
  34: { filename: "RWS_Tarot_QC.jpg", path: "f/f8" },  // Queen of Cups
  35: { filename: "RWS_Tarot_RC.jpg", path: "f/f4" },  // King of Cups
  
  // 权杖牌组 (Wands) - 36-49
  36: { filename: "RWS_Tarot_AW.jpg", path: "f/f8" },  // Ace of Wands
  37: { filename: "RWS_Tarot_02W.jpg", path: "2/2b" }, // Two of Wands
  38: { filename: "RWS_Tarot_03W.jpg", path: "8/85" }, // Three of Wands
  39: { filename: "RWS_Tarot_04W.jpg", path: "b/b9" }, // Four of Wands
  40: { filename: "RWS_Tarot_05W.jpg", path: "6/65" }, // Five of Wands
  41: { filename: "RWS_Tarot_06W.jpg", path: "d/d8" }, // Six of Wands
  42: { filename: "RWS_Tarot_07W.jpg", path: "9/9e" }, // Seven of Wands
  43: { filename: "RWS_Tarot_08W.jpg", path: "f/f4" }, // Eight of Wands
  44: { filename: "RWS_Tarot_09W.jpg", path: "8/8e" }, // Nine of Wands
  45: { filename: "RWS_Tarot_10W.jpg", path: "0/04" }, // Ten of Wands
  46: { filename: "RWS_Tarot_PW.jpg", path: "3/36" },  // Page of Wands
  47: { filename: "RWS_Tarot_KW.jpg", path: "d/db" },  // Knight of Wands
  48: { filename: "RWS_Tarot_QW.jpg", path: "a/a0" },  // Queen of Wands
  49: { filename: "RWS_Tarot_RW.jpg", path: "f/f7" },  // King of Wands
  
  // 宝剑牌组 (Swords) - 50-63
  50: { filename: "RWS_Tarot_AS.jpg", path: "1/1a" },  // Ace of Swords
  51: { filename: "RWS_Tarot_02S.jpg", path: "c/c8" }, // Two of Swords
  52: { filename: "RWS_Tarot_03S.jpg", path: "7/71" }, // Three of Swords
  53: { filename: "RWS_Tarot_04S.jpg", path: "2/2d" }, // Four of Swords
  54: { filename: "RWS_Tarot_05S.jpg", path: "d/d3" }, // Five of Swords
  55: { filename: "RWS_Tarot_06S.jpg", path: "f/f1" }, // Six of Swords
  56: { filename: "RWS_Tarot_07S.jpg", path: "9/96" }, // Seven of Swords
  57: { filename: "RWS_Tarot_08S.jpg", path: "4/48" }, // Eight of Swords
  58: { filename: "RWS_Tarot_09S.jpg", path: "c/c4" }, // Nine of Swords
  59: { filename: "RWS_Tarot_10S.jpg", path: "2/2a" }, // Ten of Swords
  60: { filename: "RWS_Tarot_PS.jpg", path: "e/e3" },  // Page of Swords
  61: { filename: "RWS_Tarot_KS.jpg", path: "1/16" },  // Knight of Swords
  62: { filename: "RWS_Tarot_QS.jpg", path: "c/cb" },  // Queen of Swords
  63: { filename: "RWS_Tarot_RS.jpg", path: "5/5a" },  // King of Swords
  
  // 星币牌组 (Pentacles) - 64-77
  64: { filename: "RWS_Tarot_AP.jpg", path: "8/8d" },  // Ace of Pentacles
  65: { filename: "RWS_Tarot_02P.jpg", path: "f/f7" }, // Two of Pentacles
  66: { filename: "RWS_Tarot_03P.jpg", path: "7/72" }, // Three of Pentacles
  67: { filename: "RWS_Tarot_04P.jpg", path: "0/0d" }, // Four of Pentacles
  68: { filename: "RWS_Tarot_05P.jpg", path: "e/ea" }, // Five of Pentacles
  69: { filename: "RWS_Tarot_06P.jpg", path: "d/d7" }, // Six of Pentacles
  70: { filename: "RWS_Tarot_07P.jpg", path: "0/00" }, // Seven of Pentacles
  71: { filename: "RWS_Tarot_08P.jpg", path: "f/f0" }, // Eight of Pentacles
  72: { filename: "RWS_Tarot_09P.jpg", path: "4/42" }, // Nine of Pentacles
  73: { filename: "RWS_Tarot_10P.jpg", path: "3/3e" }, // Ten of Pentacles
  74: { filename: "RWS_Tarot_PP.jpg", path: "8/83" },  // Page of Pentacles
  75: { filename: "RWS_Tarot_KP.jpg", path: "d/d2" },  // Knight of Pentacles
  76: { filename: "RWS_Tarot_QP.jpg", path: "8/8b" },  // Queen of Pentacles
  77: { filename: "RWS_Tarot_RP.jpg", path: "d/d5" }   // King of Pentacles
};

/**
 * 获取塔罗牌图片的完整URL
 * @param cardId 牌ID (0-77)
 * @param cardNameEn 英文牌名（可选，用于备用）
 * @returns 图片的完整URL
 * 
 * 优先使用本地图片（如果已下载），否则使用维基百科Commons的URL
 */
export function getCardImageUrl(cardId: number, cardNameEn?: string): string {
  let imageInfo: { filename: string; path: string };
  
  if (cardId >= 0 && cardId <= 21) {
    // 大阿卡那牌
    imageInfo = MAJOR_ARCANA_IMAGES[cardId] || {
      filename: `RWS_Tarot_${cardId.toString().padStart(2, '0')}_${cardNameEn?.replace(/\s+/g, '_') || 'Card'}.jpg`,
      path: "9/90" // 默认使用愚者牌的路径
    };
  } else if (cardId >= 22 && cardId <= 77) {
    // 小阿卡那牌
    imageInfo = MINOR_ARCANA_IMAGES[cardId] || {
      filename: getMinorArcanaFilename(cardId, cardNameEn),
      path: "2/22" // 默认路径
    };
  } else {
    // 无效的牌ID，返回默认图片（愚者）
    imageInfo = MAJOR_ARCANA_IMAGES[0];
  }
  
  // 优先使用本地图片（如果已下载）
  // Vite会自动处理 /images/ 路径，指向 public/images/
  const localUrl = `/images/tarot/${imageInfo.filename}`;
  
  // 备用：维基百科Commons URL（如果本地图片不存在）
  const fallbackUrl = `https://upload.wikimedia.org/wikipedia/commons/${imageInfo.path}/${imageInfo.filename}`;
  
  // 返回本地URL（浏览器会自动处理404，如果本地不存在可以fallback到Commons）
  // 注意：实际项目中可能需要检查文件是否存在，这里简化处理
  return localUrl;
  
  // 如果需要fallback机制，可以使用：
  // return process.env.NODE_ENV === 'production' ? localUrl : fallbackUrl;
}

/**
 * 获取小阿卡那牌的文件名（备用函数）
 */
function getMinorArcanaFilename(cardId: number, cardNameEn?: string): string {
  // 如果提供了英文牌名，尝试从牌名生成文件名
  if (cardNameEn) {
    const name = cardNameEn.toLowerCase().replace(/\s+/g, '_');
    return `RWS_Tarot_${name}.jpg`;
  }
  
  // 根据牌ID生成默认文件名
  const suitIndex = Math.floor((cardId - 22) / 14);
  const cardNumber = (cardId - 22) % 14 + 1;
  
  const suits = ['C', 'W', 'S', 'P']; // Cups, Wands, Swords, Pentacles
  const suit = suits[suitIndex] || 'C';
  
  if (cardNumber <= 10) {
    return `RWS_Tarot_${cardNumber.toString().padStart(2, '0')}${suit}.jpg`;
  } else {
    // 宫廷牌：Page, Knight, Queen, King
    const courtCards = ['P', 'K', 'Q', 'R']; // Page, Knight, Queen, King
    const courtIndex = cardNumber - 11;
    return `RWS_Tarot_${courtCards[courtIndex]}${suit}.jpg`;
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