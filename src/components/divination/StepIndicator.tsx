import React from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";

export default function StepIndicator() {
  const { steps, currentStep, goToStep } = useDivinationChain();

  return (
    <div className="step-indicator">
      <div className="step-progress-container">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <div
              className={`step-circle ${step.isCompleted ? 'completed' : ''} ${step.isActive ? 'active' : ''}`}
              onClick={() => step.isCompleted && goToStep(step.step)}
            >
              {step.isCompleted ? '✓' : step.isActive ? '' : ''}
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`step-line ${step.isCompleted ? 'completed' : ''}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
