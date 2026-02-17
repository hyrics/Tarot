import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginModal } from "../signin/LoginModal";
import { RegisterModal } from "../signin/RegisterModal";
import { UserMenu } from "../signin/UserMenu";

export default function NewNavigation() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  const handleRegisterSuccess = (email: string) => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

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
                <button 
                  type="button" 
                  className="btn-ghost"
                  onClick={() => setShowLoginModal(true)}
                >
                  登录
                </button>
                <button 
                  type="button" 
                  className="primary-button"
                  onClick={() => setShowRegisterModal(true)}
                >
                  注册
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
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
}
