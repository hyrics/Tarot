import React from "react";

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function QuestionInput({ value, onChange, onSubmit }: QuestionInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="question-input">
      <label className="question-label">
        请输入你此刻最想占卜的问题：
        <span className="question-label-sub">（尽量具体，专注一件事）</span>
      </label>
      <div className="question-input-row">
        <input
          className="question-input-field"
          type="text"
          placeholder="例如：我今年的职业发展方向如何？"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="primary-button"
          type="button"
          onClick={onSubmit}
          disabled={!value.trim()}
        >
          开始占卜
        </button>
      </div>
    </div>
  );
}

