import React from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

/**
 * 步骤指示器组件
 * 显示进度条和步骤圆点，支持点击已完成步骤跳转
 */
export default function StepIndicator() {
  const { steps, currentStep, goToStep } = useDivinationChain();

  return (
    <div className="step-indicator-new">
      <div className="step-progress-container-new">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <div
              className={`step-circle-new ${step.isCompleted ? 'completed' : ''} ${step.isActive ? 'active' : ''}`}
              onClick={() => step.isCompleted && goToStep(step.step)}
              title={step.title}
            >
              {step.isCompleted ? '✓' : step.isActive ? '●' : '○'}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line-new ${step.isCompleted ? 'completed' : ''}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
