import React, { useState } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegisterSuccess: (email: string) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ 
  isOpen, 
  onClose, 
  onSwitchToLogin,
  onRegisterSuccess 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码至少需要6位');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 模拟注册成功
      setTimeout(() => {
        localStorage.setItem('tarotUser', JSON.stringify({
          id: `user_${Date.now()}`,
          name,
          email,
          points: 0,
          signInStreak: 0,
          avatar: '/images/avatar.jpg'
        }));
        
        setIsSuccess(true);
        setTimeout(() => {
          setIsLoading(false);
          onRegisterSuccess(email);
          onClose();
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          setIsSuccess(false);
        }, 1500);
      }, 1000);
    } catch (err) {
      setError('注册失败，请重试');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>注册</h2>
          <button className="modal-close" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="register-name">昵称</label>
            <input
              id="register-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入昵称"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">邮箱</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">密码</label>
            <div className="password-input-wrapper">
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="请输入密码（至少6位）"
                disabled={isLoading}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-confirm">确认密码</label>
            <div className="password-input-wrapper">
              <input
                id="register-confirm"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="请再次输入密码"
                disabled={isLoading}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
              >
                {showConfirmPassword ? '??️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {isSuccess && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              注册成功！正在跳转...
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit-button"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? '注册中...' : isSuccess ? '注册成功' : '注册'}
          </button>
        </form>

        <div className="auth-switch">
          <span>已有账号？</span>
          <button 
            type="button" 
            className="auth-switch-button"
            onClick={onSwitchToLogin}
          >
            立即登录
          </button>
        </div>
      </div>
    </div>
  );
};