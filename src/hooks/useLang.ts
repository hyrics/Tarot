import { useLangContext } from "../context/LangContext";
import type { Lang } from "../lib/i18n";

/**
 * 读取当前语言状态，响应实时切换。
 * 语言由 LangProvider 管理，初始值从 URL ?lang=en 读取，默认 zh。
 */
export function useLang(): Lang {
  return useLangContext().lang;
}
