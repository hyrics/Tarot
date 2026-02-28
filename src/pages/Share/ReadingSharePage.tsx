// src/pages/Share/ReadingSharePage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { getCardImageUrl } from "../../lib/tarotImageUtils";

interface CardData {
  name: string;
  nameEn: string;
  position: string;
  isReversed: boolean;
  meaning: string;
  keywords: string[];
}

interface ReadingData {
  id: string;
  question: string;
  spread_name: string;
  cards: CardData[];
  ai_result: string | null;
  created_at: string;
}

export default function ReadingSharePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reading, setReading] = useState<ReadingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    if (!supabase) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    supabase
      .from("readings")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setReading(data);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.center}>
        <p style={styles.loadingText}>正在召唤星盘…</p>
      </div>
    );
  }

  if (notFound || !reading) {
    return (
      <div style={styles.center}>
        <p style={styles.loadingText}>解读结果不存在或已过期</p>
        <button style={styles.ctaButton} onClick={() => navigate("/")}>
          返回首页
        </button>
      </div>
    );
  }

  const date = new Date(reading.created_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.page}>
      {/* 头部 */}
      <div style={styles.header}>
        <p style={styles.headerLabel}>塔罗解读结果</p>
        <h1 style={styles.question}>
          {reading.question || "通用解读"}
        </h1>
        <p style={styles.meta}>
          {reading.spread_name} · {date}
        </p>
      </div>

      {/* AI 整体解读 */}
      {reading.ai_result && (
        <div style={styles.aiSection}>
          <h2 style={styles.sectionTitle}>整体解读</h2>
          <p style={styles.aiText}>{reading.ai_result}</p>
        </div>
      )}

      {/* 牌卡列表 */}
      <div style={styles.cardsSection}>
        <h2 style={styles.sectionTitle}>抽到的牌</h2>
        <div style={styles.cardsGrid}>
          {reading.cards.map((card, index) => (
            <div key={index} style={styles.card}>
              <div
                style={{
                  ...styles.cardBg,
                  backgroundImage: `url(${getCardImageUrl(0, card.nameEn || "")})`,
                }}
              />
              <div style={styles.cardOverlay} />
              <div style={styles.cardContent}>
                <div style={styles.cardPosition}>{card.position}</div>
                <h3 style={styles.cardName}>{card.name}</h3>
                <p style={styles.cardNameEn}>{card.nameEn}</p>
                <span style={{
                  ...styles.orientation,
                  color: card.isReversed ? "#e07070" : "#7ec8a0",
                }}>
                  {card.isReversed ? "逆位" : "正位"}
                </span>
                <p style={styles.cardMeaning}>{card.meaning}</p>
                {card.keywords?.length > 0 && (
                  <div style={styles.keywords}>
                    {card.keywords.slice(0, 4).map((kw, i) => (
                      <span key={i} style={styles.keyword}>{kw}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <p style={styles.ctaText}>塔罗牌对你有什么启示？</p>
        <button style={styles.ctaButton} onClick={() => navigate("/")}>
          ✨ 我也要占卜
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "2rem 1.5rem 4rem",
    fontFamily: "var(--font-body, sans-serif)",
    color: "var(--text-primary, #e8e0d0)",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "1.5rem",
  },
  loadingText: {
    fontSize: "1.1rem",
    color: "var(--text-secondary, #a89880)",
    letterSpacing: "0.05em",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  headerLabel: {
    fontSize: "0.8rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold, #c9a96e)",
    marginBottom: "0.75rem",
  },
  question: {
    fontSize: "1.6rem",
    fontWeight: 600,
    margin: "0 0 0.75rem",
    lineHeight: 1.4,
  },
  meta: {
    fontSize: "0.85rem",
    color: "var(--text-secondary, #a89880)",
  },
  aiSection: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "1.5rem",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "0.8rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold, #c9a96e)",
    marginBottom: "1rem",
  },
  aiText: {
    lineHeight: 1.8,
    fontSize: "0.95rem",
    color: "var(--text-primary, #e8e0d0)",
    whiteSpace: "pre-wrap",
  },
  cardsSection: {
    marginBottom: "2.5rem",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 280,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  cardBg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(10,8,20,0.5) 0%, rgba(10,8,20,0.85) 100%)",
  },
  cardContent: {
    position: "relative",
    zIndex: 1,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    height: "100%",
    boxSizing: "border-box",
  },
  cardPosition: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--gold, #c9a96e)",
  },
  cardName: {
    fontSize: "1.05rem",
    fontWeight: 600,
    margin: 0,
  },
  cardNameEn: {
    fontSize: "0.75rem",
    color: "var(--text-secondary, #a89880)",
    margin: 0,
  },
  orientation: {
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  cardMeaning: {
    fontSize: "0.82rem",
    lineHeight: 1.6,
    color: "var(--text-secondary, #c8bfb0)",
    margin: "0.25rem 0 0",
  },
  keywords: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3rem",
    marginTop: "0.5rem",
  },
  keyword: {
    fontSize: "0.7rem",
    padding: "0.2rem 0.5rem",
    background: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    color: "var(--text-secondary, #a89880)",
  },
  ctaSection: {
    textAlign: "center",
    padding: "2rem",
    background: "rgba(201,169,110,0.06)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: 16,
  },
  ctaText: {
    fontSize: "1rem",
    color: "var(--text-secondary, #a89880)",
    marginBottom: "1.25rem",
  },
  ctaButton: {
    padding: "0.85rem 2.5rem",
    background: "linear-gradient(135deg, var(--gold, #c9a96e), #a07840)",
    color: "#1a1410",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.05em",
  },
};