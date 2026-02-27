import React, { useState } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

type Phase = "input" | "guide" | "confirm";

const GUIDE_OPTIONS = {
  q1: {
    label: "这件事跟谁有关？",
    options: ["他", "她", "老板", "自己", "家人", "朋友", "陌生人"],
  },
  q2: {
    label: "你现在最强烈的感觉？",
    options: ["恨", "累", "空", "怕", "迷茫", "焦虑", "期待", "委屈"],
  },
  q3: {
    label: "你最想要什么？",
    options: ["答案", "结束", "钱", "抱抱", "方向", "自由", "认可", "安全感"],
  },
};

export default function Step1Emotion() {
  const { setQuestion, nextStep } = useDivinationChain();
  const [phase, setPhase] = useState<Phase>("input");

  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");

  const [guideA1, setGuideA1] = useState("");
  const [guideA2, setGuideA2] = useState("");
  const [guideA3, setGuideA3] = useState("");

  const threeWords = [word1.trim(), word2.trim(), word3.trim()];
  const hasAllWords = threeWords.every((w) => w.length > 0);

  const handleDirectNext = () => {
    if (hasAllWords) {
      setPhase("confirm");
    }
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

  const handleReject = () => {
    setPhase("input");
  };

  if (phase === "guide") {
    return (
      <div className="step-content">
        <div className="emotion-page">
          <div className="emotion-guide">
            <h2 className="emotion-title">我们问，你答</h2>

            <div className="guide-question">
              <p className="guide-label">{GUIDE_OPTIONS.q1.label}</p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder="请输入..."
                value={guideA1}
                onChange={(e) => setGuideA1(e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="guide-question">
              <p className="guide-label">{GUIDE_OPTIONS.q2.label}</p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder="请输入..."
                value={guideA2}
                onChange={(e) => setGuideA2(e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="guide-question">
              <p className="guide-label">{GUIDE_OPTIONS.q3.label}</p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder="请输入..."
                value={guideA3}
                onChange={(e) => setGuideA3(e.target.value)}
                maxLength={10}
              />
            </div>

            {guideA1 && guideA2 && guideA3 && (
              <div className="guide-preview">
                <p className="guide-preview-label">你的三个词：</p>
                <div className="guide-preview-words">
                  <span className="preview-word">{guideA1}</span>
                  <span className="preview-sep">、</span>
                  <span className="preview-word">{guideA2}</span>
                  <span className="preview-sep">、</span>
                  <span className="preview-word">{guideA3}</span>
                </div>
                <p className="guide-preview-hint">（可在下一步修改）</p>
              </div>
            )}

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
                生成三个词
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                onClick={handleReject}
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

  // phase === "input"
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
