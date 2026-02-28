/**
 * DeepSeek API 调用 - 用于生成塔罗整体解读
 *
 * 你需要自行填写：
 * 1. API 地址（下方 DEEPSEEK_API_URL）
 * 2. API Key（下方 getApiKey() 或环境变量）
 * 3. 如需自定义生成风格，可修改 buildPrompt() 中的 prompt 文案
 */

// ========== 请在此处配置 API ==========
// DeepSeek 对话 API 地址，例如：https://api.deepseek.com/v1/chat/completions
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

// 从环境变量读取 API Key，或在此直接填写（勿提交到版本库）
// 建议在 .env 中设置 VITE_DEEPSEEK_API_KEY=your_key
function getApiKey(): string {
  return import.meta.env.VITE_DEEPSEEK_API_KEY ?? "";
}

export interface CardForInterpretation {
  position: string;
  name_cn: string;
  name_en?: string;
  orientation: "正位" | "逆位";
  meaning: string;
  keywords: string[];
}

export interface GenerateOverallParams {
  spreadName: string;
  question: string | null;
  cards: CardForInterpretation[];
}

/** 月亮人设与解读结构（system 用） */
const SYSTEM_PROMPT_MOON = `你是一个冷峻的塔罗心理分析师。你不安慰，不鼓励，只做精准的解剖。

# 核心任务
用户提供了三张牌（过去-现在-未来）和若干个人困境关键词。
你需要完成以下三件事：
1. 把每张牌翻译成一个人性真相，不解释牌面，直接说它在照出什么
2. 把三张牌串联成一个完整的心理结构，找到底层的那一个根本问题
3. 结尾给出一个用户必须自己回答的问题，帮他看见自己一直在回避的那件事

# 写作铁律

## 绝对禁止
- 禁止编造用户没有提供的具体生活场景
- 禁止塔罗术语不翻译直接用（比如"星币骑士代表踏实"——要翻译成这个踏实背后的心理动机是什么）
- 禁止给多个可能性（不要写"可能是A，也可能是B"）
- 禁止空洞的励志话（不要写"你要相信自己"）
- 禁止文学化的无效修辞（命运齿轮、灵魂深处、岁月刻刀）
- 禁止给出具体的行动方法或建议（不要写"你应该去做X"）

## 必须做到
- 每张牌单独一个小节，有加粗标题（牌名——时间位置）
- 每张牌的分析必须包含：牌面的视觉细节描述 + 翻译成用户当前处境的心理真相 + 一句让人愣住的话
- 三张牌之后必须有一个"串联段"，提炼出贯穿三张牌的那一个根本问题
- 结尾是一个问题，不是答案。句式参考："你现在真正需要面对的问题是：______。不是方法，是你一直不敢认真想的那件事。"
- 这个问题必须让用户感觉被说中了，而不是一个泛泛的哲学问题

## 风格要求
- 语气冷静，不带情绪，像一个把你看透了但懒得评判你的人在说话
- 分析要有画面感，但画面来自牌面本身，不是凭空编造的场景
- 每个段落要有重量，不写废话，每一句都在推进
- 长度：每张牌的分析100-150字，串联段150-200字，结尾一个问题

# 输出结构
**牌名——时间位置**
[分析]

**牌名——时间位置**
[分析]

**牌名——时间位置**
[分析]

**三张牌说的是同一件事**
[串联段]

你现在真正需要面对的问题是：[一句话，直接、具体、让用户愣住]
不是方法，是你一直不敢认真想的那件事。`;
/**
 * 构建发给 DeepSeek 的 user 消息：注入本次占卜的牌阵、问题、牌面
 * 如需修改「让模型怎么用这些数据」，可改下方 userPrompt 的说明文字
 */
function buildPrompt(params: GenerateOverallParams): string {
  const { spreadName, question, cards } = params;

  const today = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cardsText = cards
    .map(
      (c, index) =>
        `第${index + 1}张【${c.position}】：${c.name_cn}（${c.orientation}）\n牌意：${c.meaning}`
    )
    .join("\n\n");

  const cardCount = cards.length;

  const keywordsLine = question
    ? `用户来找你算塔罗，输入的关键词是：${question}。`
    : "用户未填写关键词，请做通用解读。";

  return `今天是${today}。${keywordsLine}

牌阵：${spreadName}（共${cardCount}张牌）

抽到的牌：
${cardsText}

请用你的风格，写一段完整的整体解读。不要加任何标题，直接写三段正文。第二段需要覆盖全部${cardCount}张牌的解读，按位置顺序展开。全文不要使用 **、*，需要强调处用中文引号""。

若当前日期通常与某类重大节点相关（例如考研出成绩等），请基于「用户可能已经知道结果」的前提进行推断。若无法确定，可在解析中留一个缓冲表述，例如：「如果结果还没出，______；如果已经出了，______。」`;
}

/**
 * 调用 DeepSeek 生成整体解读
 * 未配置 API Key 或请求失败时返回 null，调用方可用本地解读兜底
 */
export async function generateOverallInterpretationWithDeepSeek(
  params: GenerateOverallParams
): Promise<string | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[DeepSeek] 未配置 VITE_DEEPSEEK_API_KEY，跳过 AI 生成");
    return null;
  }

  const prompt = buildPrompt(params);

  try {
    const res = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT_MOON },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("[DeepSeek] 请求失败", res.status, errText);
      return null;
    }

    const data = await res.json();
    const content =
      data?.choices?.[0]?.message?.content?.trim?.() ?? null;
    return content || null;
  } catch (e) {
    console.warn("[DeepSeek] 请求异常", e);
    return null;
  }
}
