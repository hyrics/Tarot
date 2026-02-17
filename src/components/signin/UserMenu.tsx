import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="settings-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="用户菜单"
        aria-expanded={isOpen}
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt="用户头像" />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>

          <div className="user-menu-items">
            <NavLink 
              to="/profile" 
              className="menu-item"
              onClick={() => setIsOpen(false)}
            >
              <span>👤</span> 个人信息
            </NavLink>
            
            <NavLink 
              to="/history" 
              className="menu-item"
              onClick={() => setIsOpen(false)}
            >
              <span>📜</span> 占卜记录
            </NavLink>
            
            <button 
              className="menu-item logout-btn"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              <span>🚪</span> 退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
};