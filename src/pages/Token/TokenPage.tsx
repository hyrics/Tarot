// src/pages/Token/TokenPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function TokenPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    const cleaned = token.trim().toUpperCase();
    if (!cleaned) {
      setError("请输入 Token");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 查找 token
      const { data, error: fetchError } = await supabase
        .from("tokens")
        .select("*")
        .eq("token", cleaned)
        .single();

      if (fetchError || !data) {
        setError("❌ Token 无效，请检查是否输入正确");
        setLoading(false);
        return;
      }

      if (data.used) {
        setError("❌ 此 Token 已被使用过，每个 Token 只能使用一次");
        setLoading(false);
        return;
      }

      // 标记为已使用
      const { error: updateError } = await supabase
        .from("tokens")
        .update({ used: true, used_at: new Date().toISOString() })
        .eq("id", data.id);

      if (updateError) {
        setError("验证失败，请重试");
        setLoading(false);
        return;
      }

      // 验证成功，跳转占卜页面
      navigate("/divination");
    } catch (e) {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* 装饰 */}
        <div style={s.decoration}>✦</div>

        <h1 style={s.title}>塔罗占卜</h1>
        <p style={s.subtitle}>输入你的专属 Token 开始占卜</p>

        <div style={s.inputGroup}>
          <input
            type="text"
            value={token}
            onChange={(e) => {
              setToken(e.target.value.toUpperCase());
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            maxLength={19}
            style={s.input}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {error && <p style={s.error}>{error}</p>}

        <button
          style={loading ? { ...s.btn, opacity: 0.6 } : s.btn}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "验证中…" : "✨ 开始占卜"}
        </button>

        <div style={s.divider} />

        <p style={s.hint}>还没有 Token？</p>
        <a
          href="https://xhslink.com/m/AiCdjbwJCUf"
          target="_blank"
          rel="noopener noreferrer"
          style={s.buyLink}
        >
          前往小红书购买 →
        </a>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0a0814",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "var(--font-body, sans-serif)",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: 20,
    padding: "2.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  decoration: {
    fontSize: "1.5rem",
    color: "#c9a96e",
    lineHeight: 1,
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#e8e0d0",
    margin: 0,
    letterSpacing: "0.05em",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#a89880",
    margin: 0,
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginTop: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.9rem 1rem",
    borderRadius: 10,
    border: "1px solid rgba(201,169,110,0.3)",
    background: "rgba(255,255,255,0.05)",
    color: "#e8e0d0",
    fontSize: "1.1rem",
    fontFamily: "monospace",
    letterSpacing: "0.15em",
    textAlign: "center",
    boxSizing: "border-box",
    outline: "none",
  },
  error: {
    fontSize: "0.85rem",
    color: "#e07070",
    margin: 0,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    padding: "0.9rem",
    background: "linear-gradient(135deg, #c9a96e, #a07840)",
    color: "#1a1410",
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    letterSpacing: "0.05em",
  },
  divider: {
    width: "100%",
    height: 1,
    background: "rgba(255,255,255,0.08)",
    margin: "0.5rem 0",
  },
  hint: {
    fontSize: "0.85rem",
    color: "#6b5e4a",
    margin: 0,
  },
  buyLink: {
    fontSize: "0.9rem",
    color: "#c9a96e",
    textDecoration: "none",
    fontWeight: 600,
  },
};