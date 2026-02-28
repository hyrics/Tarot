/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// 未配置时不创建 client，避免启动报错
// 若要启用 Supabase，在 .env 中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY
export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null