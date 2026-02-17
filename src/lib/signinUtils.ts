/**
 * 签到工具函数
 * 处理日期计算、连续签到天数、积分奖励等逻辑
 */

export interface SignInData {
  lastSignDate: string; // ISO 字符串，例如 "2026-02-17T00:00:00.000Z"
  consecutiveDays: number;
  totalPoints: number;
}

// localStorage 键名
const SIGNIN_STORAGE_KEY = 'tarotSignInData';

/**
 * 获取今天的日期字符串（仅日期部分，用于比较）
 */
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * 获取昨天的日期字符串
 */
export function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

/**
 * 从 localStorage 加载签到数据
 */
export function loadSignInData(): SignInData {
  const stored = localStorage.getItem(SIGNIN_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // 数据损坏，返回默认值
    }
  }
  // 默认数据
  return {
    lastSignDate: '',
    consecutiveDays: 0,
    totalPoints: 0,
  };
}

/**
 * 保存签到数据到 localStorage
 */
export function saveSignInData(data: SignInData): void {
  localStorage.setItem(SIGNIN_STORAGE_KEY, JSON.stringify(data));
}

/**
 * 检查今天是否可以签到
 * @param lastSignDate 最后签到日期字符串
 * @returns 是否可以签到
 */
export function canSignInToday(lastSignDate: string): boolean {
  if (!lastSignDate) return true;
  const today = getTodayDateString();
  return lastSignDate !== today;
}

/**
 * 计算连续签到天数
 * @param lastSignDate 最后签到日期字符串
 * @param currentConsecutiveDays 当前的连续签到天数
 * @returns 新的连续签到天数
 */
export function calculateConsecutiveDays(
  lastSignDate: string,
  currentConsecutiveDays: number
): number {
  if (!lastSignDate) return 1; // 从未签到过

  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  if (lastSignDate === today) {
    // 今天已经签到，返回当前天数（理论上不会调用）
    return currentConsecutiveDays;
  }

  if (lastSignDate === yesterday) {
    // 昨天签到了，连续天数+1
    return currentConsecutiveDays + 1;
  }

  // 中断了，重新开始
  return 1;
}

/**
 * 计算签到奖励积分
 * @param consecutiveDays 签到后的连续天数（新的连续天数）
 * @param basePoints 基础积分（每次签到获得的积分）
 * @returns 本次签到获得的总积分
 */
export function calculateSignInReward(
  consecutiveDays: number,
  basePoints: number = 10
): number {
  let reward = basePoints;

  // 连续7天奖励
  if (consecutiveDays === 7) {
    reward += 50;
  }

  // 连续30天奖励
  if (consecutiveDays === 30) {
    reward += 200;
  }

  // 连续60天奖励（可选）
  if (consecutiveDays === 60) {
    reward += 500;
  }

  return reward;
}

/**
 * 获取下一次里程碑信息
 * @param consecutiveDays 当前连续天数
 * @returns 下一个里程碑的天数和奖励，如果没有下一个里程碑则返回 null
 */
export function getNextMilestone(consecutiveDays: number): { days: number; reward: number } | null {
  const milestones = [
    { days: 7, reward: 50 },
    { days: 30, reward: 200 },
    { days: 60, reward: 500 },
  ];

  for (const milestone of milestones) {
    if (consecutiveDays < milestone.days) {
      return milestone;
    }
  }

  return null; // 已达成所有里程碑
}

/**
 * 执行签到操作
 * @param currentData 当前的签到数据
 * @returns 新的签到数据和本次获得的积分
 */
export function performSignIn(currentData: SignInData): { newData: SignInData; earnedPoints: number } {
  const today = getTodayDateString();
  const newConsecutiveDays = calculateConsecutiveDays(
    currentData.lastSignDate,
    currentData.consecutiveDays
  );
  const earnedPoints = calculateSignInReward(newConsecutiveDays);
  const newTotalPoints = currentData.totalPoints + earnedPoints;

  const newData: SignInData = {
    lastSignDate: today,
    consecutiveDays: newConsecutiveDays,
    totalPoints: newTotalPoints,
  };

  saveSignInData(newData);
  return { newData, earnedPoints };
}

/**
 * 获取签到状态摘要
 * @param data 签到数据
 * @returns 状态摘要信息
 */
export function getSignInStatus(data: SignInData): {
  canSignIn: boolean;
  consecutiveDays: number;
  totalPoints: number;
  nextMilestone: { days: number; reward: number; daysLeft: number } | null;
} {
  const canSignIn = canSignInToday(data.lastSignDate);
  const nextMilestoneRaw = getNextMilestone(data.consecutiveDays);
  let nextMilestone = null;
  if (nextMilestoneRaw) {
    nextMilestone = {
      ...nextMilestoneRaw,
      daysLeft: nextMilestoneRaw.days - data.consecutiveDays,
    };
  }

  return {
    canSignIn,
    consecutiveDays: data.consecutiveDays,
    totalPoints: data.totalPoints,
    nextMilestone,
  };
}