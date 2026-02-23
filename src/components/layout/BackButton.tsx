import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void; // 支持外部传入的 onClick
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  className = "", 
  children = "返回",
  onClick
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    if (onClick) {
      // 如果外部提供了 onClick，优先使用
      onClick();
    } else {
      // 否则使用默认的导航逻辑
      if (window.history.length > 1) {
        navigate(-1); // 返回上一页
      } else {
        navigate(user ? "/home" : "/"); // 如果没有历史记录，返回首页或登录页
      }
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`back-button ${className}`}
      aria-label="返回"
    >
      {children}
    </button>
  );
};