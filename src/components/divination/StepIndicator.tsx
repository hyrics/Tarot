import React from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

/**
 * 步骤指示器组件
 * 显示进度条和步骤圆点，支持点击已完成步骤跳转
 */
export default function StepIndicator() {
  const { steps, currentStep, goToStep } = useDivinationChain();

  // 步骤名称映射
  const stepNames: Record<number, string> = {
    1: "选择牌阵",
    2: "输入问题（可选）",
    3: "抽牌",
    4: "解读",
  };

  return (
    <div className="step-indicator-new">
      {/* 进度条容器 */}
      <div className="step-progress-container-new">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            {/* 步骤圆点 */}
            <div
              className={`step-circle-new ${step.isCompleted ? 'completed' : ''} ${step.isActive ? 'active' : ''}`}
              onClick={() => step.isCompleted && goToStep(step.step)}
              title={step.title}
            >
              {step.isCompleted ? '✓' : step.isActive ? '●' : '○'}
            </div>
            {/* 连接线 */}
            {index < steps.length - 1 && (
              <div 
                className={`step-line-new ${step.isCompleted ? 'completed' : ''}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* 当前步骤标签 */}
      <div className="step-label-new">
        Step {currentStep}/4: {stepNames[currentStep] || "未知步骤"}
      </div>
    </div>
  );
}
