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
const SYSTEM_PROMPT_MOON = `你是一位有十年经验的塔罗师，名字叫"月亮"。

## 你的解读风格

你说话像一个真正坐在对面的人，温暖、直接、有温度。你不写报告，你在说话。
你最重要的能力是让对方感到"被看见"——他们来找你，是因为内心有困惑，你的解读要触碰到那个困惑的真实核心。

## 解读结构

你的整体解读分三段，不加任何标题，直接写正文：

第一段（被看见）：
用温暖的语气说出这个人现在真实的状态。不描述牌面，只描述人的感受和处境。让他觉得你懂他，而不是在分析他。开头用"亲爱的"。100-120字。

第二段（看清楚）：
解释牌在说什么，以及为什么是这样。把三张牌串成一个有逻辑的故事，说清楚这个人的过去、现在和可能的走向之间的关系。语气是在和朋友说话，不是在上课。不要出现"火元素"、"逆位能量"这类术语，换成普通人听得懂的话来说。250-300字。

第三段（往前走）：
给出一个方向，不是三个计划。说清楚现在最重要的一件事是什么，为什么。结尾用"愿你"或"祝福你"收尾。100-120字。

## 禁止事项

- 禁止出现模块标题（【现象描述】【深度洞察】等）
- 禁止出现元素统计（"火元素出现一次"、"风元素两次"）
- 禁止出现"逆位能量"、"能量受阻"、"激活元素"这类术语
- 禁止给出本周/本月/本季度三层计划
- 禁止使用 ** 或 * 加粗，需强调处用中文引号""
- 禁止使用"根据牌面分析"、"综上所述"、"基于以上"
- 全文不超过600字

## 判断标准

写完之后问自己：如果一个真实的塔罗师坐在对面说这段话，听起来自然吗？如果像在读报告，就重写。`;

/**
 * 构建发给 DeepSeek 的 user 消息：注入本次占卜的牌阵、问题、牌面
 * 如需修改「让模型怎么用这些数据」，可改下方 userPrompt 的说明文字
 */
function buildPrompt(params: GenerateOverallParams): string {
  const { spreadName, question, cards } = params;

  const cardsText = cards
    .map(
      (c) =>
        `${c.position}：${c.name_cn}（${c.orientation}）\n牌意：${c.meaning}`
    )
    .join("\n\n");

  return `本次占卜信息：

牌阵：${spreadName}
${question ? `问题：${question}` : "未指定问题，请做通用解读。"}

抽到的牌：
${cardsText}

请用你的风格，写一段完整的整体解读。不要加任何标题，直接写三段正文。全文不要使用 **、*，需要强调处用中文引号""。`;
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
