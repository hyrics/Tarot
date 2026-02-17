import React, { createContext, useState, useCallback } from "react";
import type { DivinationChain, DivinationLayer, DivinationStep, DivinationType } from "../types/divinationChain";
import type { DivinationResult } from "../types/tarot";
import { performDivination as runDivination } from "../lib/divination";

interface DivinationChainValue {
  // 当前占卜流程状态
  currentStep: number;
  steps: DivinationStep[];
  currentChain: DivinationChain | null;
  
  // 占卜设置
  selectedType: DivinationType;
  question: string;
  
  // 操作方法
  setSelectedType: (type: DivinationType) => void;
  setQuestion: (question: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  
  // 占卜操作
  performDivination: () => DivinationResult | null;
  addLayerToChain: (result: DivinationResult) => void;
  generateAdvancedSuggestion: () => string;
  completeChain: (insight: string) => void;
  
  // 流程控制
  resetChain: () => void;
  isStepValid: (step: number) => boolean;
}

const STEPS: DivinationStep[] = [
  { step: 1, title: "选择占卜方式", description: "选择适合你的占卜类型", isCompleted: false, isActive: true },
  { step: 2, title: "输入问题", description: "清晰描述你想了解的问题", isCompleted: false, isActive: false },
  { step: 3, title: "洗牌和抽牌", description: "静心等待塔罗的指引", isCompleted: false, isActive: false },
  { step: 4, title: "查看结果", description: "解读牌面含义", isCompleted: false, isActive: false },
];

const DivinationChainContext = createContext<DivinationChainValue | null>(null);

export function DivinationChainProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<DivinationType>("trinity");
  const [question, setQuestion] = useState("");
  const [currentChain, setCurrentChain] = useState<DivinationChain | null>(null);

  // 更新步骤状态
  const updateStepsStatus = useCallback((step: number) => {
    return STEPS.map((s, index) => ({
      ...s,
      isCompleted: index < step - 1,
      isActive: index === step - 1,
    }));
  }, []);

  const steps = updateStepsStatus(currentStep);

  const nextStep = useCallback(() => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  }, []);

    const isStepValid = useCallback((step: number) => {
      switch (step) {
        case 1:
          return true;
        case 2:
          return true;
        case 3:
          return true;
        case 4:
          return currentChain !== null && currentChain.layers.length > 0;
        default:
          return false;
      }
  }, [currentChain]);

  const performDivination = useCallback(() => {
    if (!isStepValid(3)) return null;
    
    const result = runDivination(selectedType);
    return result;
  }, [selectedType, isStepValid]);

  const addLayerToChain = useCallback((result: DivinationResult) => {
    const newLayer: DivinationLayer = {
      layerId: currentChain ? currentChain.layers.length + 1 : 1,
      divinationType: selectedType,
      cards: result.readings.map((reading: any) => ({
        id: reading.card.id,
        name: reading.card.name_cn,
        nameEn: reading.card.name_en,
        position: reading.position,
        isReversed: reading.card.isReversed,
        meaning: reading.card.meaning,
        keywords: reading.card.keywords
      })),
      reading: result.overallAnalysis,
      createdAt: new Date().toISOString(),
    };

    if (currentChain) {
      // 添加到现有链
      setCurrentChain({
        ...currentChain,
        layers: [...currentChain.layers, newLayer],
        updatedAt: new Date().toISOString(),
      });
    } else {
      // 创建新链
      const newChain: DivinationChain = {
        chainId: `chain_${Date.now()}`,
        userId: "user_001", // 从 Auth 获取
        originalQuestion: question,
        layers: [newLayer],
        isPublished: false,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCurrentChain(newChain);
    }
  }, [currentChain, selectedType, question]);

  const generateAdvancedSuggestion = useCallback(() => {
    // Mock 进阶建议生成逻辑
    const suggestions = [
      "根据你的占卜结果，建议深入了解：这个机会的具体风险和收益是什么？",
      "塔罗显示有隐藏因素，建议进一步探索：你的内心真实想法是什么？",
      "牌面暗示需要更多时间，建议思考：如果给这个问题6个月时间，会发生什么？",
      "需要外部视角，建议占卜：你的朋友或家人会如何看待这个决定？",
    ];
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }, []);

  const completeChain = useCallback((insight: string) => {
    if (currentChain) {
      setCurrentChain({
        ...currentChain,
        coreInsight: insight,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [currentChain]);

  const resetChain = useCallback(() => {
    setCurrentStep(1);
    setSelectedType("trinity");
    setQuestion("");
    setCurrentChain(null);
  }, []);

  const value: DivinationChainValue = {
    currentStep,
    steps,
    currentChain,
    selectedType,
    question,
    setSelectedType,
    setQuestion,
    nextStep,
    prevStep,
    goToStep,
    performDivination,
    addLayerToChain,
    generateAdvancedSuggestion,
    completeChain,
    resetChain,
    isStepValid,
  };

  return (
    <DivinationChainContext.Provider value={value}>
      {children}
    </DivinationChainContext.Provider>
  );
}

export function useDivinationChain(): DivinationChainValue {
  const ctx = React.useContext(DivinationChainContext);
  if (!ctx) {
    throw new Error("useDivinationChain must be used within DivinationChainProvider");
  }
  return ctx;
}
