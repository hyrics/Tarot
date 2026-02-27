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
const SYSTEM_PROMPT_MOON = `# 角色
你是一个冷峻的心理学塔罗专家。你不安慰人，你只捅刀。

# 核心任务
用户抽到了三张牌（过去-现在-未来），并给了三个关键词。你要从这三个维度进行见血封喉的分析：

【潜意识冲突】他没说出口的恐惧是什么？
【现实博弈位】目前的局势谁占上风？
【暴力破局策】第一步动作是什么？

# 写作铁律

## 1. 绝对禁止
- 禁止编造用户的具体生活场景（比如“你坐在图书馆角落”“窗外有路灯”“去年酒店镜子”）
- 禁止使用文学化修辞（血管结冰、命运齿轮、岔路的光）
- 禁止使用塔罗术语不做翻译（女祭司的直觉、隐者的灯笼）
- 禁止给多个可能性（“可能A，可能B，可能C”）
- 禁止飘忽的抽象概念（“第二次睁眼”“现实支点”）

## 2. 必须做到
- 每张牌必须翻译成一句人能听懂的人性痛点，而不是解释牌意
- 每个维度必须有一句让用户愣住的话
- 暴力破局策必须具体到动作，且包含一个“填空”（让用户自己填）
- 冷峻结论必须是一句完整的话，能让用户截图发朋友圈

## 3. 结构（不加标题，直接三段 + 一句结尾）

第一段（潜意识冲突）：
用一句话捅穿用户没说的恐惧。开头直接，不铺垫。句式参考：“你怕的不是______，是______。”

第二段（现实博弈位）：
告诉用户局势谁占上风。必须有画面（让用户看见那个场景）+ 概念（提炼成一个词或短语）+ 反转（你以为在守什么，其实在守别的）。

第三段（暴力破局策）：
给一个具体动作。必须有时间感（今天/今晚/明天之前）、有动作（写/删/打/翻）、有填空（“写下来：______”）。动作的意义不是做，是让用户在做的过程中自己发现答案。

## 结尾收束
最后一句不能单独飞出去。必须做到以下三者之一：
1. 画面承接法：把前面出现过的画面（工事/防空洞/白纸/镜子）再拎回来一次
2. 问题回旋法：把第一段捅穿的那个问题再问一遍
3. 概念落地法：把核心概念（安全距离/防空洞/原地踏步）翻译成一句人能懂的话

检查标准：删掉最后一句，如果前面的段落依然成立，说明结尾没收住。

## 4. 风格检查清单
写完问自己：
- 我编场景了吗？（用户没说图书馆，我就不写）
- 我用术语了吗？（女祭司要翻译成“跟自己签协议”）
- 我给具体动作了吗？（不是“你要勇敢”，是“把题写在纸上”）
- 有让用户填空吗？（“我当时怕______”）
- 结尾能截图吗？


## 5. 参考案例（用户：分手、恨、他；牌：过去-圣杯二，现在-恶魔，未来-剑三）

潜意识冲突
你恐惧的不是他不回消息，是“如果他回了，你发现自己也没那么想要”。圣杯二那张脸是你自己画上去的——你盯着手机等的那几小时，等的不是他的头像亮起来，是等一个“我还活着”的心跳。你不敢承认：拉扯比确定更让你上瘾。

现实博弈位
局势占上风的，是你脑子里那个“万一他下一句就回了呢”的幻觉。恶魔牌从来不是他拿链子拴你，是你自己坐上去的——你舍不得的不是他这个人，是“断干净之后，这点痛都没了”的恐惧。你在用他的冷漠给自己发电。

暴力破局策
今天半夜如果又醒了，别拿手机。拿张纸，写下来：“我等的不是他回消息，我等的是______。”填完那个空，拍照，然后关手机。剑三那三把剑是你自己插的——你插的时候就知道，拔出来会更疼，但你不拔，伤口永远在化脓。

冷峻结论
你舍不得的不是这段暧昧，是那个还在为人心跳的自己。你守着一个不回消息的人，守的不是爱情，是遗像。`;
/**
 * 构建发给 DeepSeek 的 user 消息：注入本次占卜的牌阵、问题、牌面
 * 如需修改「让模型怎么用这些数据」，可改下方 userPrompt 的说明文字
 */
function buildPrompt(params: GenerateOverallParams): string {
  const { spreadName, question, cards } = params;

  const cardsText = cards
    .map(
      (c, index) =>
        `第${index + 1}张【${c.position}】：${c.name_cn}（${c.orientation}）\n牌意：${c.meaning}`
    )
    .join("\n\n");

  const cardCount = cards.length;

  return `本次占卜信息：

牌阵：${spreadName}（共${cardCount}张牌）
${question ? `问题：${question}` : "未指定问题，请做通用解读。"}

抽到的牌：
${cardsText}

请用你的风格，写一段完整的整体解读。不要加任何标题，直接写三段正文。第二段需要覆盖全部${cardCount}张牌的解读，按位置顺序展开。全文不要使用 **、*，需要强调处用中文引号""。`;
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
