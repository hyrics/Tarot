import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loadSignInData, performSignIn, getSignInStatus, canSignInToday } from "../lib/signinUtils";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  points: number;
  signInStreak: number;
  lastSignInDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signIn: () => boolean; // 返回是否签到成功
  canSignIn: boolean; // 是否可以签到
  updateUser: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [canSignIn, setCanSignIn] = useState(false);

  // 检查今天是否可以签到
  const checkSignInStatus = useCallback((currentUser: User | null) => {
    if (!currentUser) {
      setCanSignIn(false);
      return;
    }

    // 加载签到数据
    const signInData = loadSignInData();
    const { canSignIn } = getSignInStatus(signInData);
    setCanSignIn(canSignIn);
  }, []);

  // 从 localStorage 恢复用户状态
  useEffect(() => {
    const savedUser = localStorage.getItem("tarotUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        checkSignInStatus(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("tarotUser");
      }
    }
  }, [checkSignInStatus]);

  // 保存用户状态到 localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("tarotUser", JSON.stringify(user));
      checkSignInStatus(user);
    } else {
      localStorage.removeItem("tarotUser");
      setCanSignIn(false);
    }
  }, [user, checkSignInStatus]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // 模拟登录逻辑
    if (email && password) {
      // 加载签到数据
      const signInData = loadSignInData();
      const { totalPoints, consecutiveDays, lastSignDate } = signInData;
      
      const mockUser: User = {
        id: "user_001",
        name: "塔罗师",
        email: email,
        avatar: "/images/avatar.jpg",
        points: totalPoints,
        signInStreak: consecutiveDays,
        lastSignInDate: lastSignDate,
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCanSignIn(false);
  };

  const signIn = (): boolean => {
    if (!user || !canSignIn) return false;

    // 从 localStorage 加载签到数据
    const signInData = loadSignInData();
    
    // 执行签到
    const { newData, earnedPoints } = performSignIn(signInData);
    
    // 更新用户对象
    const updatedUser: User = {
      ...user,
      points: user.points + earnedPoints,
      signInStreak: newData.consecutiveDays,
      lastSignInDate: newData.lastSignDate,
    };

    setUser(updatedUser);
    setCanSignIn(false);
    return true;
  };

  const updateUser = (newData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...newData };
    localStorage.setItem("tarotUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signIn, canSignIn, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
