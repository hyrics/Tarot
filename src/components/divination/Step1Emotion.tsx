import React, { useState } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

type Phase = "input" | "guide" | "confirm";

const Q3_EXAMPLES = [
  "怕承认自己选错了",
  "怕被所有人说「我早告诉过你」",
  "怕考上了也不快乐",
  "怕他回了之后，发现自己也没那么想要",
  "怕的不是他不回，是怕自己其实在等他回",
];

export default function Step1Emotion() {
  const { setQuestion, nextStep } = useDivinationChain();
  const [phase, setPhase] = useState<Phase>("input");

  // 主输入页三个词
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");

  // 引导页三个回答
  const [guideA1, setGuideA1] = useState("");
  const [guideA2, setGuideA2] = useState("");
  const [guideA3, setGuideA3] = useState("");

  // Q3 示例弹窗
  const [showQ3Modal, setShowQ3Modal] = useState(false);

  const threeWords = [word1.trim(), word2.trim(), word3.trim()];
  const hasAllWords = threeWords.every((w) => w.length > 0);

  const handleDirectNext = () => {
    if (hasAllWords) setPhase("confirm");
  };

  const handleGuideGenerate = () => {
    if (guideA1 && guideA2 && guideA3) {
      setWord1(guideA1);
      setWord2(guideA2);
      setWord3(guideA3);
      setPhase("confirm");
    }
  };

  const handleConfirm = () => {
    setQuestion(threeWords.join("、"));
    nextStep();
  };

  // ── 引导页 ─────────────────────────────────────
  if (phase === "guide") {
    return (
      <div className="step-content">
        <div className="emotion-page">
          <div className="emotion-guide">
            <h2 className="emotion-title">我们问，你答</h2>
            <p className="emotion-subtitle" style={{ marginTop: 0 }}>
              答不出来的，我们帮你
            </p>

            {/* Q1 */}
            <div className="guide-question">
              <p className="guide-label">
                Q1：这件事发生之后，<br />你最先失去的是什么？
              </p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder="请输入..."
                value={guideA1}
                onChange={(e) => setGuideA1(e.target.value)}
                maxLength={20}
              />
              <p className="guide-hint">
                ↪ 想不到？试试：时间 / 自尊 / 信任 / 那个还会笑的自己
              </p>
            </div>

            {/* Q2 */}
            <div className="guide-question">
              <p className="guide-label">
                Q2：如果给现在的痛苦起个名字，<br />你会叫它什么？
              </p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder="请输入..."
                value={guideA2}
                onChange={(e) => setGuideA2(e.target.value)}
                maxLength={20}
              />
              <p className="guide-hint">
                ↪ 举个例子："一个蹲在角落里的小孩" / "一块压在胸口的石头"
              </p>
            </div>

            {/* Q3 */}
            <div className="guide-question">
              <p className="guide-label">
                Q3：你怕的不是这件事本身，<br />你怕的是______？
              </p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder="请输入..."
                value={guideA3}
                onChange={(e) => setGuideA3(e.target.value)}
                maxLength={20}
              />
              <button
                type="button"
                className="guide-q3-link"
                onClick={() => setShowQ3Modal(true)}
              >
                ↪ 实在想不到？☞ 看看别人怎么填的
              </button>
            </div>

            <div className="step-actions">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setPhase("input")}
              >
                返回
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleGuideGenerate}
                disabled={!guideA1 || !guideA2 || !guideA3}
              >
                下一步
              </button>
            </div>
          </div>
        </div>

        {/* Q3 示例弹窗 */}
        {showQ3Modal && (
          <div className="guide-modal-mask" onClick={() => setShowQ3Modal(false)}>
            <div
              className="guide-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="guide-modal-title">别人这么填的：</h3>
              <ul className="guide-modal-list">
                {Q3_EXAMPLES.map((ex, i) => (
                  <li
                    key={i}
                    className="guide-modal-item"
                    onClick={() => {
                      setGuideA3(ex);
                      setShowQ3Modal(false);
                    }}
                  >
                    • {ex}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="primary-button"
                style={{ marginTop: "1rem", minWidth: "120px" }}
                onClick={() => setShowQ3Modal(false)}
              >
                知道了
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── 确认页 ─────────────────────────────────────
  if (phase === "confirm") {
    return (
      <div className="step-content">
        <div className="emotion-page">
          <div className="emotion-confirm">
            <h2 className="emotion-title">你的三个词：</h2>
            <div className="confirm-words">
              <span className="confirm-word">{word1}</span>
              <span className="confirm-word">{word2}</span>
              <span className="confirm-word">{word3}</span>
            </div>
            <p className="confirm-ask">是这样吗？</p>
            <div className="step-actions">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setPhase("input")}
              >
                不对
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleConfirm}
              >
                对，继续
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── 主输入页 ────────────────────────────────────
  return (
    <div className="step-content">
      <div className="emotion-page">
        <div className="emotion-input-section">
          <p className="emotion-lead">你一定有很多想分享的</p>
          <h2 className="emotion-title">冷静一下</h2>
          <p className="emotion-subtitle">
            用三个词<br />概括你心里的话
          </p>

          <div className="emotion-inputs">
            <input
              type="text"
              className="emotion-word-input"
              placeholder="第一个词"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              maxLength={10}
            />
            <span className="emotion-sep">、</span>
            <input
              type="text"
              className="emotion-word-input"
              placeholder="第二个词"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              maxLength={10}
            />
            <span className="emotion-sep">、</span>
            <input
              type="text"
              className="emotion-word-input"
              placeholder="第三个词"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              maxLength={10}
            />
          </div>

          <button
            type="button"
            className="primary-button emotion-next-btn"
            onClick={handleDirectNext}
            disabled={!hasAllWords}
          >
            下一步
          </button>

          <button
            type="button"
            className="emotion-guide-link"
            onClick={() => setPhase("guide")}
          >
            不知道怎么概括？点这里，我们引导你
          </button>
        </div>
      </div>
    </div>
  );
}
