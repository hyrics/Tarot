// src/pages/Admin/AdminPage.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const ADMIN_PASSWORD = "nanduo2026"; // 改成你自己的密码

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) result += "-";
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result; // 格式：XXXX-XXXX-XXXX-XXXX
}

interface Token {
  id: string;
  token: string;
  used: boolean;
  used_at: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setMessage("❌ 密码错误");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const fetchTokens = async () => {
    const { data } = await supabase
      .from("tokens")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setTokens(data);
  };

  useEffect(() => {
    if (authed) fetchTokens();
  }, [authed]);

  const handleGenerate = async (count: number = 1) => {
    setLoading(true);
    try {
      const newTokens = Array.from({ length: count }, () => ({
        token: generateToken(),
        used: false,
      }));
      const { error } = await supabase.from("tokens").insert(newTokens);
      if (error) throw error;
      setMessage(`✅ 成功生成 ${count} 个 Token`);
      setTimeout(() => setMessage(""), 3000);
      fetchTokens();
    } catch (e) {
      setMessage("❌ 生成失败，请重试");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (token: string, id: string) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("tokens").delete().eq("id", id);
    fetchTokens();
  };

  if (!authed) {
    return (
      <div style={s.page}>
        <div style={s.loginBox}>
          <h2 style={s.title}>🔐 管理后台</h2>
          <input
            type="password"
            placeholder="输入管理密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={s.input}
          />
          <button style={s.btn} onClick={handleLogin}>进入</button>
          {message && <p style={s.msg}>{message}</p>}
        </div>
      </div>
    );
  }

  const unusedTokens = tokens.filter((t) => !t.used);
  const usedTokens = tokens.filter((t) => t.used);

  return (
    <div style={s.page}>
      <div style={s.container}>
        <h2 style={s.title}>🎴 Token 管理后台</h2>

        {/* 统计 */}
        <div style={s.statsRow}>
          <div style={s.statCard}>
            <p style={s.statNum}>{unusedTokens.length}</p>
            <p style={s.statLabel}>未使用</p>
          </div>
          <div style={s.statCard}>
            <p style={s.statNum}>{usedTokens.length}</p>
            <p style={s.statLabel}>已使用</p>
          </div>
          <div style={s.statCard}>
            <p style={s.statNum}>{tokens.length}</p>
            <p style={s.statLabel}>总计</p>
          </div>
        </div>

        {/* 生成按钮 */}
        <div style={s.btnRow}>
          <button style={s.btn} onClick={() => handleGenerate(1)} disabled={loading}>
            {loading ? "生成中…" : "＋ 生成 1 个"}
          </button>
          <button style={s.btnOutline} onClick={() => handleGenerate(5)} disabled={loading}>
            批量生成 5 个
          </button>
          <button style={s.btnOutline} onClick={() => handleGenerate(10)} disabled={loading}>
            批量生成 10 个
          </button>
        </div>

        {message && <p style={s.msg}>{message}</p>}

        {/* 未使用的 token */}
        <h3 style={s.sectionTitle}>未使用的 Token（发给用户）</h3>
        {unusedTokens.length === 0 ? (
          <p style={s.empty}>暂无未使用的 Token，点击上方按钮生成</p>
        ) : (
          <div style={s.tokenList}>
            {unusedTokens.map((t) => (
              <div key={t.id} style={s.tokenRow}>
                <code style={s.tokenCode}>{t.token}</code>
                <span style={s.tokenDate}>
                  {new Date(t.created_at).toLocaleDateString("zh-CN")}
                </span>
                <button
                  style={copiedId === t.id ? s.btnCopied : s.btnCopy}
                  onClick={() => handleCopy(t.token, t.id)}
                >
                  {copiedId === t.id ? "✅ 已复制" : "复制"}
                </button>
                <button style={s.btnDel} onClick={() => handleDelete(t.id)}>删除</button>
              </div>
            ))}
          </div>
        )}

        {/* 已使用的 token */}
        {usedTokens.length > 0 && (
          <>
            <h3 style={{ ...s.sectionTitle, marginTop: "2rem" }}>已使用的 Token</h3>
            <div style={s.tokenList}>
              {usedTokens.map((t) => (
                <div key={t.id} style={{ ...s.tokenRow, opacity: 0.4 }}>
                  <code style={s.tokenCode}>{t.token}</code>
                  <span style={s.tokenDate}>
                    使用于 {t.used_at ? new Date(t.used_at).toLocaleDateString("zh-CN") : "—"}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#888" }}>已使用</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0a0814",
    display: "flex",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "var(--font-body, sans-serif)",
    color: "#e8e0d0",
  },
  loginBox: {
    width: 320,
    marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 700,
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#c9a96e",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  statsRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  statCard: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: "1rem",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  statNum: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#c9a96e",
    margin: 0,
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "#a89880",
    margin: "0.25rem 0 0",
  },
  btnRow: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  btn: {
    padding: "0.7rem 1.5rem",
    background: "linear-gradient(135deg, #c9a96e, #a07840)",
    color: "#1a1410",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  btnOutline: {
    padding: "0.7rem 1.5rem",
    background: "transparent",
    color: "#c9a96e",
    border: "1px solid #c9a96e",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  msg: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#7ec8a0",
    margin: "0.5rem 0",
  },
  sectionTitle: {
    fontSize: "0.85rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#c9a96e",
    marginBottom: "0.75rem",
  },
  empty: {
    color: "#6b5e4a",
    fontSize: "0.9rem",
    textAlign: "center",
    padding: "1.5rem",
  },
  tokenList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  tokenRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "0.65rem 1rem",
    flexWrap: "wrap",
  },
  tokenCode: {
    flex: 1,
    fontSize: "1rem",
    fontFamily: "monospace",
    color: "#e8e0d0",
    letterSpacing: "0.1em",
    minWidth: 160,
  },
  tokenDate: {
    fontSize: "0.75rem",
    color: "#6b5e4a",
    whiteSpace: "nowrap",
  },
  btnCopy: {
    padding: "0.3rem 0.8rem",
    background: "rgba(201,169,110,0.15)",
    color: "#c9a96e",
    border: "1px solid rgba(201,169,110,0.3)",
    borderRadius: 6,
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  btnCopied: {
    padding: "0.3rem 0.8rem",
    background: "rgba(126,200,160,0.15)",
    color: "#7ec8a0",
    border: "1px solid rgba(126,200,160,0.3)",
    borderRadius: 6,
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  btnDel: {
    padding: "0.3rem 0.8rem",
    background: "transparent",
    color: "#e07070",
    border: "1px solid rgba(224,112,112,0.3)",
    borderRadius: 6,
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "#e8e0d0",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
};