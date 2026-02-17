import type { TarotCardBase } from "../types/tarot";

const IMG = (path: string) => path; // 可改为实际 CDN 或 /images/...

/** 大阿尔卡那 22 张 */
const MAJOR_ARCANA: TarotCardBase[] = [
  { id: 0, name_cn: "愚者", name_en: "The Fool", category: "major", number: 0, image_url: IMG("major/00_fool.jpg"), meaning_upright: "新的开始、冒险、自发性、天真", meaning_reversed: "鲁莽、不负责任、缺乏方向", keywords_upright: ["新开始", "冒险", "信心", "跳跃"], keywords_reversed: ["鲁莽", "无准备", "缺乏计划"], description: "愚者代表开启一段新的旅程，带着信任与开放的心。", lucky_number: 1 },
  { id: 1, name_cn: "魔术师", name_en: "The Magician", category: "major", number: 1, image_url: IMG("major/01_magician.jpg"), meaning_upright: "能力、意志力、资源齐备、行动", meaning_reversed: "欺骗、犹豫、能力未用", keywords_upright: ["能力", "意志", "创造", "行动"], keywords_reversed: ["犹豫", "浪费", "欺骗"], description: "魔术师象征将想法化为现实的能力。", lucky_number: 1 },
  { id: 2, name_cn: "女祭司", name_en: "The High Priestess", category: "major", number: 2, image_url: IMG("major/02_priestess.jpg"), meaning_upright: "直觉、内在智慧、神秘、冷静", meaning_reversed: "压抑直觉、表面化、秘密", keywords_upright: ["直觉", "智慧", "神秘", "静观"], keywords_reversed: ["压抑", "肤浅"], description: "女祭司代表内在声音与未显化的真相。", lucky_number: 2 },
  { id: 3, name_cn: "皇后", name_en: "The Empress", category: "major", number: 3, image_url: IMG("major/03_empress.jpg"), meaning_upright: "丰盛、创意、滋养、美感", meaning_reversed: "依赖、创意受阻、过度放纵", keywords_upright: ["丰盛", "创造", "滋养", "美"], keywords_reversed: ["依赖", "停滞"], description: "皇后象征生命与创造的丰饶。", lucky_number: 3 },
  { id: 4, name_cn: "皇帝", name_en: "The Emperor", category: "major", number: 4, image_url: IMG("major/04_emperor.jpg"), meaning_upright: "权威、结构、规则、掌控", meaning_reversed: "僵化、专制、缺乏弹性", keywords_upright: ["权威", "秩序", "领导", "稳定"], keywords_reversed: ["僵化", "独裁"], description: "皇帝代表秩序与责任的建立。", lucky_number: 4 },
  { id: 5, name_cn: "教皇", name_en: "The Hierophant", category: "major", number: 5, image_url: IMG("major/05_hierophant.jpg"), meaning_upright: "传统、信仰、教导、归属", meaning_reversed: "打破常规、质疑教条、独立", keywords_upright: ["传统", "信仰", "教导", "仪式"], keywords_reversed: ["反叛", "质疑"], description: "教皇象征传承与集体智慧。", lucky_number: 5 },
  { id: 6, name_cn: "恋人", name_en: "The Lovers", category: "major", number: 6, image_url: IMG("major/06_lovers.jpg"), meaning_upright: "选择、爱、和谐、结盟", meaning_reversed: "失衡、逃避选择、冲突", keywords_upright: ["爱", "选择", "和谐", "结盟"], keywords_reversed: ["失衡", "逃避"], description: "恋人代表重要选择与关系的结合。", lucky_number: 6 },
  { id: 7, name_cn: "战车", name_en: "The Chariot", category: "major", number: 7, image_url: IMG("major/07_chariot.jpg"), meaning_upright: "胜利、决心、自律、前进", meaning_reversed: "失控、方向错误、固执", keywords_upright: ["胜利", "决心", "控制", "前进"], keywords_reversed: ["失控", "固执"], description: "战车象征意志力带来的突破。", lucky_number: 7 },
  { id: 8, name_cn: "力量", name_en: "Strength", category: "major", number: 8, image_url: IMG("major/08_strength.jpg"), meaning_upright: "勇气、耐心、以柔克刚、内在力量", meaning_reversed: "怀疑、软弱、滥用力量", keywords_upright: ["勇气", "耐心", "柔韧", "力量"], keywords_reversed: ["怀疑", "软弱"], description: "力量代表以温和方式驾驭挑战。", lucky_number: 8 },
  { id: 9, name_cn: "隐者", name_en: "The Hermit", category: "major", number: 9, image_url: IMG("major/09_hermit.jpg"), meaning_upright: "内省、独处、寻找真理、智慧", meaning_reversed: "孤独、逃避、过度封闭", keywords_upright: ["内省", "独处", "真理", "智慧"], keywords_reversed: ["孤独", "逃避"], description: "隐者象征向内寻找答案。", lucky_number: 9 },
  { id: 10, name_cn: "命运之轮", name_en: "Wheel of Fortune", category: "major", number: 10, image_url: IMG("major/10_wheel.jpg"), meaning_upright: "转变、周期、机遇、命运", meaning_reversed: "抗拒改变、坏运、无常", keywords_upright: ["转变", "周期", "机遇", "命运"], keywords_reversed: ["抗拒", "无常"], description: "命运之轮象征生命的起伏与转机。", lucky_number: 0 },
  { id: 11, name_cn: "正义", name_en: "Justice", category: "major", number: 11, image_url: IMG("major/11_justice.jpg"), meaning_upright: "公平、因果、真相、平衡", meaning_reversed: "不公、逃避责任、偏见", keywords_upright: ["公平", "因果", "真相", "平衡"], keywords_reversed: ["不公", "偏见"], description: "正义代表因果与公正的裁决。", lucky_number: 1 },
  { id: 12, name_cn: "倒吊人", name_en: "The Hanged Man", category: "major", number: 12, image_url: IMG("major/12_hanged.jpg"), meaning_upright: "放手、换角度、牺牲、等待", meaning_reversed: "无谓牺牲、拖延、抗拒", keywords_upright: ["放手", "换视角", "牺牲", "等待"], keywords_reversed: ["拖延", "抗拒"], description: "倒吊人象征以退为进的智慧。", lucky_number: 2 },
  { id: 13, name_cn: "死神", name_en: "Death", category: "major", number: 13, image_url: IMG("major/13_death.jpg"), meaning_upright: "结束、转化、新生、放手", meaning_reversed: "抗拒改变、僵持、恐惧", keywords_upright: ["结束", "转化", "新生", "放手"], keywords_reversed: ["抗拒", "僵持"], description: "死神象征必要的结束与重生。", lucky_number: 3 },
  { id: 14, name_cn: "节制", name_en: "Temperance", category: "major", number: 14, image_url: IMG("major/14_temperance.jpg"), meaning_upright: "平衡、调和、耐心、中庸", meaning_reversed: "失衡、急躁、极端", keywords_upright: ["平衡", "调和", "耐心", "中庸"], keywords_reversed: ["失衡", "急躁"], description: "节制象征在两端之间找到和谐。", lucky_number: 4 },
  { id: 15, name_cn: "恶魔", name_en: "The Devil", category: "major", number: 15, image_url: IMG("major/15_devil.jpg"), meaning_upright: "欲望、束缚、物质、执念", meaning_reversed: "挣脱、觉醒、释放", keywords_upright: ["欲望", "束缚", "物质", "执念"], keywords_reversed: ["挣脱", "觉醒"], description: "恶魔象征需要觉察的执念与诱惑。", lucky_number: 5 },
  { id: 16, name_cn: "高塔", name_en: "The Tower", category: "major", number: 16, image_url: IMG("major/16_tower.jpg"), meaning_upright: "剧变、觉醒、崩塌、真相", meaning_reversed: "逃避剧变、延迟、恐惧", keywords_upright: ["剧变", "觉醒", "崩塌", "真相"], keywords_reversed: ["逃避", "延迟"], description: "高塔象征突如其来的觉醒与重建。", lucky_number: 6 },
  { id: 17, name_cn: "星星", name_en: "The Star", category: "major", number: 17, image_url: IMG("major/17_star.jpg"), meaning_upright: "希望、灵感、疗愈、信心", meaning_reversed: "绝望、失去信心、幻灭", keywords_upright: ["希望", "灵感", "疗愈", "信心"], keywords_reversed: ["绝望", "幻灭"], description: "星星象征希望与灵性指引。", lucky_number: 7 },
  { id: 18, name_cn: "月亮", name_en: "The Moon", category: "major", number: 18, image_url: IMG("major/18_moon.jpg"), meaning_upright: "潜意识、直觉、幻觉、不安", meaning_reversed: "拨云见日、面对恐惧、澄清", keywords_upright: ["潜意识", "直觉", "幻觉", "不安"], keywords_reversed: ["澄清", "面对"], description: "月亮象征潜意识与未被照见的部分。", lucky_number: 8 },
  { id: 19, name_cn: "太阳", name_en: "The Sun", category: "major", number: 19, image_url: IMG("major/19_sun.jpg"), meaning_upright: "成功、喜悦、活力、清晰", meaning_reversed: "暂时阴霾、过度乐观、延迟", keywords_upright: ["成功", "喜悦", "活力", "清晰"], keywords_reversed: ["阴霾", "延迟"], description: "太阳象征光明与成功。", lucky_number: 9 },
  { id: 20, name_cn: "审判", name_en: "Judgement", category: "major", number: 20, image_url: IMG("major/20_judgement.jpg"), meaning_upright: "觉醒、召唤、重生、反思", meaning_reversed: "自我怀疑、拒绝召唤、后悔", keywords_upright: ["觉醒", "召唤", "重生", "反思"], keywords_reversed: ["怀疑", "拒绝"], description: "审判象征内心的召唤与新生。", lucky_number: 0 },
  { id: 21, name_cn: "世界", name_en: "The World", category: "major", number: 21, image_url: IMG("major/21_world.jpg"), meaning_upright: "完成、圆满、整合、成就", meaning_reversed: "未完成、需要收尾、小成", keywords_upright: ["完成", "圆满", "整合", "成就"], keywords_reversed: ["未完成", "收尾"], description: "世界象征一个周期的圆满与下一段开始。", lucky_number: 1 },
];

const SUIT_NAMES_CN: Record<string, string> = { cups: "圣杯", wands: "权杖", swords: "宝剑", pentacles: "星币" };
const SUIT_NAMES_EN: Record<string, string> = { cups: "Cups", wands: "Wands", swords: "Swords", pentacles: "Pentacles" };
const NUM_NAMES_CN = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "侍从", "骑士", "皇后", "国王"];
const NUM_NAMES_EN = ["", "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];

const MINOR_MEANINGS: Record<string, { up: string; rev: string; kwUp: string[]; kwRev: string[] }> = {
  cups: { up: "情感、直觉、关系、流动", rev: "情感阻塞、压抑、表里不一", kwUp: ["情感", "直觉", "关系"], kwRev: ["阻塞", "压抑"] },
  wands: { up: "行动、热情、创造、成长", rev: "拖延、冲动、方向不明", kwUp: ["行动", "热情", "创造"], kwRev: ["拖延", "冲动"] },
  swords: { up: "思维、真相、决断、挑战", rev: "混乱、逃避、伤害", kwUp: ["思维", "真相", "决断"], kwRev: ["混乱", "逃避"] },
  pentacles: { up: "物质、工作、稳定、务实", rev: "财务不稳、短视、固执", kwUp: ["物质", "工作", "稳定"], kwRev: ["不稳", "固执"] },
};

function buildMinorArcana(): TarotCardBase[] {
  const out: TarotCardBase[] = [];
  const suits: TarotCategory[] = ["cups", "wands", "swords", "pentacles"];
  let id = 22;
  for (const category of suits) {
    const suitNameCn = SUIT_NAMES_CN[category];
    const suitNameEn = SUIT_NAMES_EN[category];
    const m = MINOR_MEANINGS[category];
    for (let n = 1; n <= 14; n++) {
      out.push({
        id,
        name_cn: n <= 10 ? `${suitNameCn}${NUM_NAMES_CN[n]}` : `${suitNameCn}${NUM_NAMES_CN[n]}`,
        name_en: `${NUM_NAMES_EN[n]} of ${suitNameEn}`,
        category,
        number: n,
        image_url: IMG(`${category}/${n}.jpg`),
        meaning_upright: m.up,
        meaning_reversed: m.rev,
        keywords_upright: m.kwUp,
        keywords_reversed: m.kwRev,
        lucky_number: n > 10 ? n - 10 : n === 10 ? 0 : n,
      });
      id++;
    }
  }
  return out;
}

const MINOR_ARCANA = buildMinorArcana();

/** 全部 78 张牌 */
export const ALL_TAROT_CARDS: TarotCardBase[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];
