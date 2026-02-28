import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignInCard from "../../components/signin/SignInCard";
import { t } from "../../lib/i18n";
import { useLang } from "../../hooks/useLang";

// Mock 数据
const mockRecentDivinations = [
  {
    id: "div_004",
    question: "我该跳槽吗？",
    layout: "三位一体占卜",
    time: "3天前",
    likes: 324,
    comments: 67
  },
  {
    id: "div_005",
    question: "今年的爱情运如何？",
    layout: "凯尔特十字",
    time: "5天前", 
    likes: 156,
    comments: 23
  }
];

// 未登录状态的首页
function NotLoggedInLandingPage() {
  const navigate = useNavigate();
  const lang = useLang();

  const handleStartDivination = () => {
    navigate("/divination");
  };

  return (
    <div className="landing-page">
      {/* Hero 区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t("hero.title.pre", lang)}
            <span className="hero-title-highlight">{t("hero.title.highlight", lang)}</span>
          </h1>
          <p className="hero-subtitle">
            {t("hero.subtitle", lang)}
          </p>
          <div className="hero-actions">
            <button 
              type="button" 
              className="primary-button hero-cta"
              onClick={handleStartDivination}
            >
              {t("hero.cta", lang)}
            </button>
          </div>
        </div>
      </section>

      {/* 信息区 */}
      <div className="info-section">
        <h2 className="section-title">{t("why.title", lang)}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>{t("feature1.title", lang)}</h3>
            <p>{t("feature1.desc", lang)}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>{t("feature2.title", lang)}</h3>
            <p>{t("feature2.desc", lang)}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>{t("feature3.title", lang)}</h3>
            <p>{t("feature3.desc", lang)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 已登录状态的首页
function LoggedInLandingPage() {
  const navigate = useNavigate();
  const lang = useLang();

  const handleStartDivination = () => {
    navigate("/divination");
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  const handleDailyCard = () => {
    navigate("/divination?type=daily");
  };

  return (
    <div className="landing-page">
      {/* 顶部签到区 */}
      <section className="signin-section">
        <SignInCard />
      </section>

      {/* 快速入口 */}
      <div className="quick-access">
        <h2 className="section-title">{t("quick.title", lang)}</h2>
        <div className="quick-cards">
          <button 
            type="button" 
            className="quick-card primary"
            onClick={handleStartDivination}
          >
            <div className="quick-icon">🔮</div>
            <h3>{t("quick.divination", lang)}</h3>
            <p>{t("quick.divination.sub", lang)}</p>
          </button>
          <button 
            type="button" 
            className="quick-card"
            onClick={handleDailyCard}
          >
            <div className="quick-icon">🌅</div>
            <h3>{t("quick.daily", lang)}</h3>
            <p>{t("quick.daily.sub", lang)}</p>
          </button>
          <button 
            type="button" 
            className="quick-card"
            onClick={handleViewHistory}
          >
            <div className="quick-icon">📚</div>
            <h3>{t("quick.history", lang)}</h3>
            <p>{t("quick.history.sub", lang)}</p>
          </button>
        </div>
      </div>

      

     
    </div>
  );
}

// 主组件
export default function LandingPage() {
  const { user } = useAuth();

  if (!user) {
    return <NotLoggedInLandingPage />;
  }
  return <LoggedInLandingPage />;
}
