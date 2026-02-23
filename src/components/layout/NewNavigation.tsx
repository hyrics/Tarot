import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginModal } from "../signin/LoginModal";
import { UserMenu } from "../signin/UserMenu";

export default function NewNavigation() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="app-header">
        <nav className="app-nav">
          <div className="app-logo">塔罗占卜</div>
          <div className="app-nav-links">
            {user ? (
              <div className="user-nav">
                <span className="user-info">👤 {user.name}</span>
                <span className="notification-icon">🔔 3</span>
                <UserMenu />
              </div>
            ) : (
              <div className="auth-nav">
                {/* 登录按钮已隐藏，保留代码便于后续恢复 */}
                <button
                  type="button"
                  className="btn-ghost nav-login-hidden"
                  onClick={() => setShowLoginModal(true)}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  登录
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          // 注册功能已移除
        }}
      />
    </>
  );
}
