import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignInCard from "../../components/signin/SignInCard";

// Mock 数据
const mockCommunityDivinations = [
  {
    id: "div_001",
    question: "我该跳槽吗？",
    layout: "三位一体占卜",
    author: "小星",
    likes: 324,
    comments: 67,
    time: "3天前"
  },
  {
    id: "div_002", 
    question: "今年的爱情运如何？",
    layout: "凯尔特十字",
    author: "月光",
    likes: 156,
    comments: 23,
    time: "5天前"
  },
  {
    id: "div_003",
    question: "如何改善人际关系？",
    layout: "五牌十字",
    author: "清风",
    likes: 89,
    comments: 12,
    time: "1周前"
  }
];

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

  const handleStartDivination = () => {
    navigate("/divination");
  };

  const handleViewCommunity = () => {
    navigate("/community");
  };

  return (
    <div className="landing-page">
      {/* Hero 区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            探索内心的
            <span className="hero-title-highlight">塔罗智慧</span>
          </h1>
          <p className="hero-subtitle">
            通过78张塔罗牌，发现生活的指引与答案
          </p>
          <div className="hero-actions">
            <button 
              type="button" 
              className="primary-button hero-cta"
              onClick={handleStartDivination}
            >
              开始占卜
            </button>
            <button 
              type="button" 
              className="btn-ghost" 
              onClick={handleViewCommunity}
            >
              了解社区
            </button>
          </div>
        </div>
      </section>

      {/* 信息区 */}
      <div className="info-section">
        <h2 className="section-title">为什么选择我们？</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>78张经典塔罗牌</h3>
            <p>完整的伟特塔罗牌体系，每张牌都有深度解读</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>多种占卜方式</h3>
            <p>从单牌到凯尔特十字，满足不同需求</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>活跃的社区讨论</h3>
            <p>与塔罗爱好者分享心得，互相学习</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>个人占卜追踪</h3>
            <p>记录你的占卜历程，见证成长轨迹</p>
          </div>
        </div>
      </div>

      {/* 社区展示 */}
      <div className="community-showcase">
        <h2 className="section-title">社区精选占卜</h2>
        <div className="community-cards">
          {mockCommunityDivinations.map((divination) => (
            <div key={divination.id} className="community-card">
              <h3>{divination.question}</h3>
              <p className="community-meta">
                {divination.layout} · {divination.author}
              </p>
              <div className="community-stats">
                <span>👍 {divination.likes}</span>
                <span>💬 {divination.comments}</span>
                <span>🕐 {divination.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 已登录状态的首页
function LoggedInLandingPage() {
  const navigate = useNavigate();

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
        <h2 className="section-title">快速开始</h2>
        <div className="quick-cards">
          <button 
            type="button" 
            className="quick-card primary"
            onClick={handleStartDivination}
          >
            <div className="quick-icon">🔮</div>
            <h3>开始占卜</h3>
            <p>开启新问题</p>
          </button>
          <button 
            type="button" 
            className="quick-card"
            onClick={handleDailyCard}
          >
            <div className="quick-icon">🌅</div>
            <h3>每日一牌</h3>
            <p>今日指引</p>
          </button>
          <button 
            type="button" 
            className="quick-card"
            onClick={handleViewHistory}
          >
            <div className="quick-icon">📚</div>
            <h3>历史记录</h3>
            <p>查看过往</p>
          </button>
        </div>
      </div>

      {/* 最近占卜 */}
      <div className="recent-divinations">
        <h2 className="section-title">最近占卜</h2>
        <div className="recent-list">
          {mockRecentDivinations.map((divination) => (
            <div key={divination.id} className="recent-item">
              <h4>{divination.question}</h4>
              <p className="recent-meta">
                {divination.layout} · {divination.time}
              </p>
              <div className="recent-stats">
                <span>👍 {divination.likes}</span>
                <span>💬 {divination.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 热门话题 */}
      <div className="trending-topics">
        <h2 className="section-title">本周热门话题</h2>
        <div className="topic-tags">
          <span className="topic-tag">#跳槽季</span>
          <span className="topic-tag">#新年运势</span>
          <span className="topic-tag">#情人节</span>
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