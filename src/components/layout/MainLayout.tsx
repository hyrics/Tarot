import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

import "../../styles/global.css";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <div className="particles-bg" aria-hidden />
      <div className="decoration-corner top-left" aria-hidden>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 L90 10 L90 40" stroke="var(--gold)" strokeWidth="1.5" opacity="0.35" />
        </svg>
      </div>
      <div className="decoration-corner bottom-right" aria-hidden>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" stroke="var(--gold)" strokeWidth="1" opacity="0.25" />
        </svg>
      </div>
      <header className="app-header">
        <nav className="app-nav">
          <div className="app-logo">塔罗</div>
          <div className="app-nav-links">
            <NavLink to="/" end>
              首页
            </NavLink>
            <NavLink to="/draw">抽牌</NavLink>
            <NavLink to="/result">结果</NavLink>
            <NavLink to="/history">历史记录</NavLink>
          </div>
        </nav>
      </header>

      <main className="app-main">{children}</main>
    </div>
  );
}

