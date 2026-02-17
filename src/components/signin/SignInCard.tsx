import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  loadSignInData,
  performSignIn,
  getSignInStatus,
  SignInData,
} from '../../lib/signinUtils';


/**
 * 签到卡片组件
 * 显示在已登录用户的首页顶部
 */
const SignInCard: React.FC = () => {
  const { user, signIn } = useAuth();
  const [signInData, setSignInData] = useState<SignInData>(loadSignInData());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  // 加载签到数据
  useEffect(() => {
    const data = loadSignInData();
    setSignInData(data);
  }, []);

  // 获取签到状态
  const status = getSignInStatus(signInData);
  const { canSignIn, consecutiveDays, totalPoints, nextMilestone } = status;

  // 处理签到
  const handleSignIn = () => {
    if (!canSignIn || isLoading) return;

    setIsLoading(true);
    setMessage('');

    // 模拟网络延迟
    setTimeout(() => {
      try {
        const success = signIn();
        if (success) {
          // 重新加载签到数据以更新显示
          const newData = loadSignInData();
          setSignInData(newData);
          // 获取最新的状态来计算获得的积分
          const status = getSignInStatus(newData);
          const earnedPoints = status.totalPoints - signInData.totalPoints;
          setMessage(`签到成功！获得 ${earnedPoints} 积分`);
        } else {
          setMessage('签到失败，请重试');
        }
      } catch (error) {
        setMessage('签到失败，请重试');
        console.error('Sign in error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // 如果用户未登录，不显示组件
  if (!user) {
    return null;
  }

  return (
    <div className="signin-card-container">
      <div className="signin-card">
        {/* 标题 */}
        <div className="signin-card-header">
          <h2 className="signin-card-title">每日签到</h2>
          <div className="signin-card-subtitle">每日签到赢取积分，解锁更多功能</div>
        </div>

        {/* 连续签到天数 */}
        <div className="signin-stats">
          <div className="consecutive-days">
            <div className="days-number">{consecutiveDays}</div>
            <div className="days-label">连续签到天数</div>
          </div>
          <div className="points-info">
            <div className="points-number">{totalPoints}</div>
            <div className="points-label">已获得积分</div>
          </div>
        </div>

        {/* 签到按钮 */}
        <div className="signin-action">
          {canSignIn ? (
            <button
              className="signin-button"
              onClick={handleSignIn}
              disabled={isLoading}
              aria-label="每日签到"
            >
              {isLoading ? '签到中...' : '立即签到'}
            </button>
          ) : (
            <button
              className="signin-button signed"
              disabled
              aria-label="今日已签到"
            >
              ✓ 今日已签到
            </button>
          )}
        </div>

        {/* 奖励说明 */}
        <div className="signin-rewards">
          <div className="reward-item">
            <span className="reward-icon">✨</span>
            <span className="reward-text">每次签到 +10 积分</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🔥</span>
            <span className="reward-text">连续7天 +50 积分</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🌟</span>
            <span className="reward-text">连续30天 +200 积分</span>
          </div>
        </div>

        {/* 里程碑提示 */}
        {nextMilestone && (
          <div className="milestone-hint">
            <span className="hint-icon">🎯</span>
            <span className="hint-text">
              再坚持 <strong>{nextMilestone.daysLeft}</strong> 天，
              可额外获得 <strong>{nextMilestone.reward}</strong> 积分！
            </span>
          </div>
        )}

        {/* 状态消息 */}
        {message && (
          <div className="signin-message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInCard;