/**
 * 极简国际化模块 - 中英双语
 * 用法：t("key", lang)  或  getTranslation("key", lang)
 * lang 来源：URL 参数 ?lang=en，默认 zh
 */

export type Lang = "zh" | "en";

const translations: Record<string, Record<Lang, string>> = {
  // ── LandingPage ─────────────────────────────────────────────
  "hero.title.pre":       { zh: "探索内心的",                       en: "Explore Your" },
  "hero.title.highlight": { zh: "塔罗智慧",                         en: "Inner Tarot" },
  "hero.subtitle":        { zh: "通过78张塔罗牌，发现生活的指引与答案",   en: "Discover guidance and answers through 78 tarot cards" },
  "hero.cta":             { zh: "开始占卜",                         en: "Start Reading" },
  "why.title":            { zh: "为什么选择我们？",                   en: "Why Choose Us?" },
  "feature1.title":       { zh: "78张经典塔罗牌",                    en: "78 Classic Tarot Cards" },
  "feature1.desc":        { zh: "每一张牌照见的都不是命运，是你自己不敢承认的那部分", en: "Each card reveals not fate, but the part of yourself you dare not admit" },
  "feature2.title":       { zh: "过去-现在-未来三张牌",               en: "Past · Present · Future" },
  "feature2.desc":        { zh: "不直接给你答案，而是让你冷静下来，带你整理自己的答案", en: "Not giving you answers, but helping you calm down and organize your own answers" },
  "feature3.title":       { zh: "个人占卜追踪",                      en: "Personal Reading Tracker" },
  "feature3.desc":        { zh: "占卜结束后可保存结果，见证你的成长轨迹",  en: "Save your readings and witness your journey of growth" },
  "quick.title":          { zh: "快速开始",                         en: "Quick Start" },
  "quick.divination":     { zh: "开始占卜",                         en: "New Reading" },
  "quick.divination.sub": { zh: "开启新问题",                        en: "Start a new question" },


  // ── DivinationPage / 导航 ────────────────────────────────────
  "nav.logo":             { zh: "塔罗占卜",                         en: "Tarot" },
  "nav.back":             { zh: "← 返回首页",                       en: "← Home" },
  "nav.abandon":          { zh: "确定要放弃这次占卜吗？",              en: "Are you sure you want to abandon this reading?" },
  "loading":              { zh: "加载中...",                         en: "Loading..." },

  // ── Step1Emotion — 输入页 ──────────────────────────────────
  "emotion.lead":         { zh: "你一定有很多想分享的",               en: "You must have a lot on your mind" },
  "emotion.title":        { zh: "冷静一下",                         en: "Take a breath" },
  "emotion.subtitle":     { zh: "用几句短句概括你的心里话",           en: "Summarize what's on your mind in a few short phrases" },
  "emotion.thanks.hint":  { zh: "也可以致谢一句话",                   en: "Or a sentence of thanks" },
  "emotion.word1":        { zh: "第一组词",                         en: "First phrase" },
  "emotion.word2":        { zh: "你的疑问",                         en: "Your question" },
  "emotion.word3":        { zh: "你的纠结",                         en: "Your dilemma" },
  "emotion.placeholder.confusion": { zh: "陈述你的困惑。", en: "State your confusion." },
  "emotion.sep":          { zh: "、",                              en: " · " },
  "emotion.next":         { zh: "下一步",                           en: "Next" },
  "emotion.guide.link":   { zh: "不知道怎么概括？点这里，我们引导你",   en: "Not sure how? Click here — we'll guide you" },

  // ── Step1Emotion — 引导页 ──────────────────────────────────
  "guide.title":          { zh: "我们问，你答",                      en: "We ask, you answer" },
  "guide.subtitle":       { zh: "答不出来的，我们帮你",               en: "Can't find the words? We'll help" },
  "guide.q1":             { zh: "Q1：这件事发生之后，\n你最先失去的是什么？",          en: "Q1: After this happened,\nwhat did you lose first?" },
  "guide.q1.hint":        { zh: "↪ 想不到？试试：时间 / 自尊 / 信任 / 那个还会笑的自己", en: "↪ Try: time / self-esteem / trust / the version of you who could still smile" },
  "guide.q2":             { zh: "Q2：如果给现在的痛苦起个名字，\n你会叫它什么？",     en: "Q2: If you gave your pain a name,\nwhat would you call it?" },
  "guide.q2.hint":        { zh: "↪ 举个例子：\"一个蹲在角落里的小孩\" / \"一块压在胸口的石头\"", en: "↪ e.g. \"a child crouching in the corner\" / \"a stone pressing on my chest\"" },
  "guide.q3":             { zh: "Q3：你怕的不是这件事本身，\n你怕的是______？",       en: "Q3: You're not afraid of this itself —\nyou're afraid of ______?" },
  "guide.q3.link":        { zh: "↪ 实在想不到？☞ 看看别人怎么填的",                  en: "↪ Can't think of one? ☞ See what others wrote" },
  "guide.placeholder":    { zh: "请输入...",                         en: "Type here..." },
  "guide.back":           { zh: "返回",                             en: "Back" },
  "guide.generate":       { zh: "下一步",                           en: "Next" },
  "guide.modal.title":    { zh: "别人这么填的：",                     en: "Others wrote:" },
  "guide.modal.ok":       { zh: "知道了",                           en: "Got it" },

  // ── Step1Emotion — 确认页 ──────────────────────────────────
  "confirm.title":        { zh: "你的概括：",                        en: "Your summary:" },
  "confirm.ask":          { zh: "是这样吗？",                        en: "Is that right?" },
  "confirm.no":           { zh: "不对",                             en: "Change it" },
  "confirm.yes":          { zh: "对，继续",                         en: "Yes, continue" },

  // ── 牌位/位置（抽牌与结果页卡片内）────────────────────────────
  "position.past":        { zh: "过去",   en: "Past" },
  "position.present":     { zh: "现在",   en: "Present" },
  "position.future":      { zh: "未来",   en: "Future" },

  // ── Step3Draw ───────────────────────────────────────────────
  "draw.title.drawn":     { zh: "你的牌面",                         en: "Your Cards" },
  "draw.title.shuffling": { zh: "洗牌中...",                        en: "Shuffling..." },
  "draw.title.drawing":   { zh: "正在抽取塔罗牌...",                 en: "Drawing your cards..." },
  "draw.subtitle":        { zh: "静心等待塔罗的指引",                 en: "Clear your mind and await the guidance" },
  "draw.subtitle.question": { zh: " · 问题：",                     en: " · Keywords: " },
  "draw.subtitle.general":  { zh: " · 通用解读",                    en: " · General Reading" },
  "draw.shuffle.h3":      { zh: "洗牌中...",                        en: "Shuffling..." },
  "draw.shuffle.p":       { zh: "请闭上眼睛，放松呼吸...",             en: "Close your eyes, breathe slowly..." },
  "draw.drawing.h3":      { zh: "正在抽取塔罗牌...",                 en: "Drawing your cards..." },
  "draw.drawing.p":       { zh: "塔罗正在为你指引方向",               en: "The tarot is finding your path" },
  "draw.hint":            { zh: "以下是本次抽到的牌，点击下方按钮查看完整解读", en: "Here are your cards — click below for the full reading" },
  "draw.view.result":     { zh: "查看解读",                         en: "View Reading" },
  "draw.stripping":       { zh: "正在剥离现实幻觉...",               en: "Stripping away illusions..." },
  "draw.prev":            { zh: "上一步",                           en: "Back" },

  // ── Step4Result ─────────────────────────────────────────────
  "result.title":           { zh: "占卜结果",                       en: "Your Reading" },
  "result.subtitle.pre":    { zh: "塔罗为你指引方向",                 en: "The tarot guides your path" },
  "result.subtitle.question": { zh: " · 问题：",                   en: " · Keywords: " },
  "result.subtitle.general":  { zh: " · 通用解读",                  en: " · General Reading" },
  "result.overall.suffix":  { zh: "张牌的整体解读",                  en: "-card Overall Reading" },
  "result.no.ai":           { zh: "暂无整体解读（请配置 DeepSeek API 或稍后重试）", en: "No AI reading available (configure DeepSeek API or try again later)" },
  "result.card.upright":    { zh: "正位",                           en: "Upright" },
  "result.card.reversed":   { zh: "逆位",                           en: "Reversed" },
  "result.card.numerology": { zh: "数字学：",                       en: "Numerology:" },
  "result.card.detail":     { zh: "查看完整解读",                    en: "Full Reading" },
  "result.reset":           { zh: "重新占卜",                       en: "New Reading" },
  "result.save":            { zh: "💾 保存结果",                     en: "💾 Save Image" },
  "result.generating":      { zh: "生成中…",                        en: "Generating…" },
  "result.xhs.title":       { zh: "✦ 想要你的专属塔罗解读？",          en: "✦ Want a personalized tarot reading?" },
  "result.xhs.sub":         { zh: "扫码找到我 · 小红书「南多」",        en: "Scan to find me · 南多 on Xiaohongshu" },
  "result.more.pre":        { zh: "喜欢这次解读？想要更深度的占卜服务",   en: "Enjoyed this reading? Get a deeper divination" },
  "result.more":            { zh: "✨ 还想占卜 →",                    en: "✨ Read Again →" },
  "result.save.success":    { zh: "✅ 图片已保存，可发送给朋友",          en: "✅ Image saved — share with friends" },
  "result.share.success":   { zh: "✅ 图片已下载，可分享给朋友",          en: "✅ Downloaded — ready to share" },
  "result.save.fail":       { zh: "❌ 截图失败，请重试",               en: "❌ Screenshot failed, please try again" },
  "result.share.fail":      { zh: "❌ 分享失败，请重试",               en: "❌ Share failed, please try again" },
  "result.cors.fail":       { zh: "❌ 请先在阿里云OSS控制台开启跨域规则（CORS），才能保存含图片的截图", en: "❌ Please enable CORS on Aliyun OSS before saving screenshots with images" },
  "result.error.title":     { zh: "占卜结果加载失败",                  en: "Failed to load reading" },
  "result.error.desc":      { zh: "请重新进行占卜",                    en: "Please start a new reading" },
  "result.error.back":      { zh: "返回上一步",                       en: "Go Back" },
  "result.share.label":     { zh: "分享结果",                        en: "Share" },

  // ── 加载动画文案 ──────────────────────────────────────────────
  "loading.phrase1":  { zh: "星盘正在旋转…",    en: "The star chart spins…" },
  "loading.phrase2":  { zh: "解读牌面能量中…",  en: "Reading card energies…" },
  "loading.phrase3":  { zh: "连接宇宙意识…",   en: "Connecting to cosmic consciousness…" },
  "loading.phrase4":  { zh: "织入命运丝线…",   en: "Weaving threads of fate…" },
  "loading.phrase5":  { zh: "整合塔罗智慧…",   en: "Integrating tarot wisdom…" },

  // ── 牌详情模态框 ──────────────────────────────────────────────
  "modal.basic":          { zh: "基本信息",     en: "Basic Info" },
  "modal.position":       { zh: "位置：",       en: "Position:" },
  "modal.status":         { zh: "状态：",       en: "Status:" },
  "modal.numerology":     { zh: "数字学：",     en: "Numerology:" },
  "modal.quick":          { zh: "快速解读",     en: "Quick Reading" },
  "modal.keywords":       { zh: "关键词",       en: "Keywords" },
  "modal.full":           { zh: "完整解读",     en: "Full Reading" },
  "modal.full.upright":   { zh: "正位代表着顺利、和谐或外在机遇，是你当前可以积极利用的能量。",      en: "Upright represents flow, harmony, or external opportunities — energy you can actively harness now." },
  "modal.full.reversed":  { zh: "逆位代表着挑战、阻碍或内在冲突，需要你特别关注这个方面的成长。",    en: "Reversed represents challenges, blocks, or inner conflict — an area calling for your growth and attention." },
};

export function getTranslation(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] missing translation key: "${key}"`);
    }
    return key;
  }
  return entry[lang] ?? entry.zh;
}

/** 简写别名 */
export const t = getTranslation;

/** 牌位名称按语言显示（过去/现在/未来等） */
const POSITION_KEY_MAP: Record<string, string> = {
  "过去": "position.past",
  "现在": "position.present",
  "未来": "position.future",
};

export function getPositionLabel(position: string, lang: Lang): string {
  const key = POSITION_KEY_MAP[position];
  return key ? getTranslation(key, lang) : position;
}
