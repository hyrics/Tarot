import React, { useState } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { DIVINATION_LAYOUTS } from "../../data/divination_layouts";

/**
 * Step 2: 输入问题（可选）
 * 用户可以输入具体问题，也可以跳过获取通用解读
 */
export default function Step2Question() {
  const { question, setQuestion, selectedSpread, prevStep, nextStep } = useDivinationChain();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 获取当前牌阵的问题建议
  const questionSuggestions = selectedSpread 
    ? (DIVINATION_LAYOUTS[selectedSpread]?.questionExamples || [])
    : [];

  const handleBack = () => {
    prevStep();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSubmitting(false);
    nextStep();
  };

  const handleSkip = () => {
    setQuestion(null);
    nextStep();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuestion(suggestion);
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">输入问题（可选）</h2>
        <p className="step-subtitle">
          你可以输入具体问题，也可以跳过获取通用解读
        </p>
      </div>

      <div className="question-section">
        <div className="question-input-section">
          <div className="question-input">
            <label className="question-label">
              请输入你此刻最想占卜的问题：
              <span className="question-label-sub">（可选，不输入将获得通用解读）</span>
            </label>
            <div className="question-input-row">
              <input
                className="question-input-field"
                type="text"
                placeholder="例如：我该如何改善当前的工作状况？"
                value={question || ""}
                onChange={(e) => setQuestion(e.target.value || null)}
              />
            </div>
            <p className="question-hint">
              提示：你可以不输入问题，我们会根据牌阵给出通用解读
            </p>
            
            {/* 问题建议 */}
            {questionSuggestions.length > 0 && (
              <div className="question-suggestions">
                <p className="suggestions-title">常见问题：</p>
                <div className="suggestions-list">
                  {questionSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className="suggestion-item"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="step-actions step-actions-question">
        <button
          type="button"
          className="btn-ghost"
          onClick={handleBack}
        >
          上一步
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={handleSubmit}
          disabled={isSubmitting || !(question || "").trim()}
        >
          {isSubmitting ? "确认中..." : "继续"}
        </button>
        <button 
          type="button" 
          className="btn-ghost"
          onClick={handleSkip}
          disabled={isSubmitting}
        >
          跳过，获取通用解读
        </button>
      </div>
    </div>
  );
}
