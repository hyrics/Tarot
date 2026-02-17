// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TarotSessionProvider } from "./context/TarotSessionContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { DivinationChainProvider } from "./context/DivinationChainContext.tsx";
import NewNavigation from "./components/layout/NewNavigation.tsx";
import LandingPage from "./pages/Home/LandingPage.tsx";
import DivinationPage from "./pages/Divination/DivinationPage.tsx";
import HistoryPage from "./pages/History/HistoryPage.tsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";

// 导入全局样式
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TarotSessionProvider>
          <DivinationChainProvider>
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
              
              <NewNavigation />
              
              <main className="app-main">
                <Routes>
                  {/* 首页：Landing 页面 */}
                  <Route path="/" element={<LandingPage />} />
                  
                  {/* 占卜流程页面：单页应用 */}
                  <Route path="/divination" element={<DivinationPage />} />
                  
                  {/* 社区页面 */}
                  <Route path="/community" element={<div>社区页面 - 开发中...</div>} />
                  
                  {/* 历史记录页 */}
                  <Route path="/history" element={<HistoryPage />} />
                  
                  {/* 个人资料页 */}
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  {/* 兼容旧链接或默认跳转 */}
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="/draw" element={<Navigate to="/divination" replace />} />
                  <Route path="/result" element={<Navigate to="/divination" replace />} />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </DivinationChainProvider>
        </TarotSessionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;