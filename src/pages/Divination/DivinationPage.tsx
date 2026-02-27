import React from "react";
import { useNavigate } from "react-router-dom";
import { useDivinationChain } from "../../context/DivinationChainContext";
import StepIndicator from "../../components/divination/StepIndicator";
import { BackButton } from "../../components/layout/BackButton";

const Step1Emotion = React.lazy(() => import("../../components/divination/Step1Emotion"));
const Step2Draw = React.lazy(() => import("../../components/divination/Step3Draw"));
const Step3Result = React.lazy(() => import("../../components/divination/Step4Result"));

export default function DivinationPage() {
  const navigate = useNavigate();
  const { currentStep, resetChain } = useDivinationChain();

  const handleBackToHome = () => {
    if (currentStep > 1) {
      const confirmLeave = window.confirm("确定要放弃这次占卜吗？");
      if (confirmLeave) {
        resetChain();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step1Emotion />
          </React.Suspense>
        );
      case 2:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step2Draw />
          </React.Suspense>
        );
      case 3:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step3Result />
          </React.Suspense>
        );
      default:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step1Emotion />
          </React.Suspense>
        );
    }
  };

  return (
    <div className="divination-page">
      <div className="divination-header-new">
        <div className="header-left">
          <BackButton onClick={handleBackToHome} className="back-button-large">
            ← 返回首页
          </BackButton>
        </div>
        <div className="header-center">
          <StepIndicator />
        </div>
        <div className="header-right">
          <div className="step-counter-new">
            Step {currentStep}/3
          </div>
        </div>
      </div>

      <div className="divination-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
