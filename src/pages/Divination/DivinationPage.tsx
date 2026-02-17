import React from "react";
import { useNavigate } from "react-router-dom";
import { useDivinationChain } from "../../context/DivinationChainContext";
import StepIndicator from "../../components/divination/StepIndicator";
import { BackButton } from "../../components/layout/BackButton";

// 将 lazy 组件放到组件外部，避免每次渲染都重新创建导致 Step 组件反复卸载/挂载
const Step1SelectType = React.lazy(() => import("../../components/divination/Step1SelectType"));
const Step2Question = React.lazy(() => import("../../components/divination/Step2Question"));
const Step3Draw = React.lazy(() => import("../../components/divination/Step3Draw"));
const Step4Result = React.lazy(() => import("../../components/divination/Step4Result"));

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
            <Step1SelectType />
          </React.Suspense>
        );
      case 2:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step2Question />
          </React.Suspense>
        );
      case 3:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step3Draw />
          </React.Suspense>
        );
      case 4:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step4Result />
          </React.Suspense>
        );
      default:
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <Step1SelectType />
          </React.Suspense>
        );
    }
  };

  return (
    <div className="divination-page">
      {/* 顶部导航 - 左中右布局 */}
      <div className="divination-header">
        <BackButton onClick={handleBackToHome}>返回首页</BackButton>
        
        <div className="step-indicator-wrapper">
          <StepIndicator />
        </div>
        
        <div className="step-counter">
          Step {currentStep}/4
        </div>
      </div>

      {/* 主体内容 */}
      <div className="divination-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
