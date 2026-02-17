import React, { useState } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { QuestionInput } from "../tarot/QuestionInput";

export default function Step2Question() {
  const { question, setQuestion, selectedType, prevStep, nextStep } = useDivinationChain();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    prevStep();
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    nextStep();
  };

  const getSelectedTypeName = () => {
    const typeNames: Record<string, string> = {
      single: "单牌占卜",
      trinity: "三位一体",
      five_cross: "五牌十字",
      celtic_cross: "凯尔特十字",
      love: "爱情占卜",
    };
    return typeNames[selectedType] || "未知类型";
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">输入你的问题</h2>
        <p className="step-subtitle">
          清晰描述你想了解的问题 · 已选择：{getSelectedTypeName()}
        </p>
      </div>

      <div className="question-section">
        <div className="question-guidance">
          <h3>如何提出一个好问题？</h3>
          <ul>
            <li>✅ 具体明确：避免模糊的问题</li>
            <li>✅ 关注自己：问"我该如何..."而不是"他是否会..."</li>
            <li>✅ 开放式：选择"如何"、"什么"而非是否题</li>
            <li>✅ 正向导向：关注解决方案而非问题本身</li>
          </ul>
        </div>

        <div className="question-input-section">
          <div className="question-input">
            <label className="question-label">
              请输入你此刻最想占卜的问题：
              <span className="question-label-sub">（尽量具体，专注一件事）</span>
            </label>
            <div className="question-input-row">
              <input
                className="question-input-field"
                type="text"
                placeholder="例如：我该如何改善当前的工作状况？"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="question-examples">
          <h4>问题示例：</h4>
          <div className="example-questions">
            <button 
              type="button" 
              className="example-question"
              onClick={() => setQuestion("我该如何平衡工作与生活？")}
            >
              我该如何平衡工作与生活？
            </button>
            <button 
              type="button" 
              className="example-question"
              onClick={() => setQuestion("什么在阻碍我的个人成长？")}
            >
              什么在阻碍我的个人成长？
            </button>
            <button 
              type="button" 
              className="example-question"
              onClick={() => setQuestion("我该如何改善人际关系？")}
            >
              我该如何改善人际关系？
            </button>
          </div>
        </div>
      </div>

      <div className="step-actions">
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
          disabled={!question.trim() || isSubmitting}
        >
          {isSubmitting ? "确认中..." : "开始占卜"}
        </button>
      </div>
    </div>
  );
}
