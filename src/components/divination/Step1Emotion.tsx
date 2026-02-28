import React, { useState } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { t } from "../../lib/i18n";
import { useLang } from "../../hooks/useLang";

type Phase = "input" | "guide" | "confirm";

const Q3_EXAMPLES_ZH = [
  "怕承认自己选错了",
  "怕被所有人说「我早告诉过你」",
  "怕考上了也不快乐",
  "怕他回了之后，发现自己也没那么想要",
  "怕的不是他不回，是怕自己其实在等他回",
];

const Q3_EXAMPLES_EN = [
  "I'll regret staying when I should have left",
  "Everyone will say 'I told you so'",
  "Getting what I want won't make me happy",
  "If they come back, I'll realize I didn't really want them to",
  "I'm not afraid they won't return — I'm afraid I'm still waiting",
];

export default function Step1Emotion() {
  const { setQuestion, nextStep } = useDivinationChain();
  const lang = useLang();
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
  const q3Examples = lang === "en" ? Q3_EXAMPLES_EN : Q3_EXAMPLES_ZH;

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
    setQuestion(threeWords.join(t("emotion.sep", lang)));
    nextStep();
  };

  // ── 引导页 ─────────────────────────────────────
  if (phase === "guide") {
    return (
      <div className="step-content">
        <div className="emotion-page">
          <div className="emotion-guide">
            <h2 className="emotion-title">{t("guide.title", lang)}</h2>
            <p className="emotion-subtitle" style={{ marginTop: 0 }}>
              {t("guide.subtitle", lang)}
            </p>

            {/* Q1 */}
            <div className="guide-question">
              <p className="guide-label">
                {t("guide.q1", lang).split("\n").map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
              </p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder={t("guide.placeholder", lang)}
                value={guideA1}
                onChange={(e) => setGuideA1(e.target.value)}
                maxLength={20}
              />
              <p className="guide-hint">{t("guide.q1.hint", lang)}</p>
            </div>

            {/* Q2 */}
            <div className="guide-question">
              <p className="guide-label">
                {t("guide.q2", lang).split("\n").map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
              </p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder={t("guide.placeholder", lang)}
                value={guideA2}
                onChange={(e) => setGuideA2(e.target.value)}
                maxLength={20}
              />
              <p className="guide-hint">{t("guide.q2.hint", lang)}</p>
            </div>

            {/* Q3 */}
            <div className="guide-question">
              <p className="guide-label">
                {t("guide.q3", lang).split("\n").map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
              </p>
              <input
                type="text"
                className="emotion-word-input guide-word-input"
                placeholder={t("guide.placeholder", lang)}
                value={guideA3}
                onChange={(e) => setGuideA3(e.target.value)}
                maxLength={20}
              />
              <button
                type="button"
                className="guide-q3-link"
                onClick={() => setShowQ3Modal(true)}
              >
                {t("guide.q3.link", lang)}
              </button>
            </div>

            <div className="step-actions">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setPhase("input")}
              >
                {t("guide.back", lang)}
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleGuideGenerate}
                disabled={!guideA1 || !guideA2 || !guideA3}
              >
                {t("guide.generate", lang)}
              </button>
            </div>
          </div>
        </div>

        {/* Q3 示例弹窗 */}
        {showQ3Modal && (
          <div className="guide-modal-mask" onClick={() => setShowQ3Modal(false)}>
            <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="guide-modal-title">{t("guide.modal.title", lang)}</h3>
              <ul className="guide-modal-list">
                {q3Examples.map((ex, i) => (
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
                {t("guide.modal.ok", lang)}
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
            <h2 className="emotion-title">{t("confirm.title", lang)}</h2>
            <div className="confirm-words">
              <span className="confirm-word">{word1}</span>
              <span className="confirm-word">{word2}</span>
              <span className="confirm-word">{word3}</span>
            </div>
            <p className="confirm-ask">{t("confirm.ask", lang)}</p>
            <div className="step-actions">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setPhase("input")}
              >
                {t("confirm.no", lang)}
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleConfirm}
              >
                {t("confirm.yes", lang)}
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
          <p className="emotion-lead">{t("emotion.lead", lang)}</p>
          <h2 className="emotion-title">{t("emotion.title", lang)}</h2>
          <p className="emotion-subtitle">
            {t("emotion.subtitle", lang).split("\n").map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </p>

          <div className="emotion-inputs">
            <input
              type="text"
              className="emotion-word-input"
              placeholder={t("emotion.word1", lang)}
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              maxLength={40}
            />
            <input
              type="text"
              className="emotion-word-input"
              placeholder={t("emotion.word2", lang)}
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              maxLength={40}
            />
            <input
              type="text"
              className="emotion-word-input"
              placeholder={t("emotion.word3", lang)}
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              maxLength={40}
            />
          </div>

          <button
            type="button"
            className="primary-button emotion-next-btn"
            onClick={handleDirectNext}
            disabled={!hasAllWords}
          >
            {t("emotion.next", lang)}
          </button>

          <button
            type="button"
            className="emotion-guide-link"
            onClick={() => setPhase("guide")}
          >
            {t("emotion.guide.link", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
