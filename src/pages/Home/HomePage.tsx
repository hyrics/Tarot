import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleStartDivination = () => {
    navigate("/divination");
  };

  return (
    <section>
      <div className="hero-section">
        <h1 className="hero-title">塔罗占卜</h1>
        <div className="hero-divider" aria-hidden />
        <p className="hero-subtitle">静心一问，让牌阵为你指引方向</p>
        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={handleStartDivination}>
            开始占卜
          </button>
        </div>
      </div>
    </section>
  );
}
