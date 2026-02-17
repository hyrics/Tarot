import React from "react";
import { useNavigate } from "react-router-dom";
import { useTarotSession } from "../../hooks/useTarotSession";
import { QuestionInput } from "../../components/tarot/QuestionInput";

export default function HomePage() {
  const navigate = useNavigate();
  const { question, setQuestion, layoutId, setLayoutId, layoutIds, layouts, startNewReading } = useTarotSession();

  const handleSubmit = () => {
    if (!question.trim()) return;
    startNewReading();
    navigate("/draw");
  };

  return (
    <section>
      <div className="hero-section">
        <h1 className="hero-title">塔罗占卜</h1>
        <div className="hero-divider" aria-hidden />
        <p className="hero-subtitle">静心一问，让牌阵为你指引方向</p>
        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={() => document.getElementById("choose")?.scrollIntoView({ behavior: "smooth" })}>
            开始占卜
          </button>
          <button type="button" className="btn-ghost" onClick={() => navigate("/history")}>
            历史记录
          </button>
        </div>
      </div>

      <div id="choose" className="layout-select">
        <label className="question-label">选择占卜方式</label>
        <div className="layout-options">
          {layoutIds.map((id) => {
            const layout = layouts[id];
            return (
              <button
                key={id}
                type="button"
                className={`layout-option ${layoutId === id ? "active" : ""}`}
                onClick={() => setLayoutId(id)}
              >
                <span className="layout-option-name">{layout.name}</span>
                <span className="layout-option-desc">{layout.description}</span>
                <span className="layout-option-count">{layout.cardCount} 张</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="divider" aria-hidden />

      <p className="page-subtitle">在下方输入你此刻最想得到指引的问题，然后开始占卜。</p>
      <QuestionInput value={question} onChange={setQuestion} onSubmit={handleSubmit} />
    </section>
  );
}
