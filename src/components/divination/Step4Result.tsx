import React, { useState, useEffect, useRef } from "react";
import { useDivinationChain } from "../../context/DivinationChainContext";
import { useTarotHistory } from "../../hooks/useTarotHistory";
import { getCardImageUrl } from "../../lib/tarotImageUtils";
import { generateOverallInterpretationWithDeepSeek } from "../../lib/deepseek";
import { DIVINATION_LAYOUTS } from "../../data/divination_layouts";
import type { TarotReadingRecord } from "../../types/tarot";

const PURCHASE_URL = "https://xhslink.com/m/AiCdjbwJCUf";

// 将图片 URL 预加载为 base64 data URL
// 对同源图片（如 qrcode）直接 fetch；对跨域图片尝试 fetch，失败则静默跳过
async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const resp = await fetch(url, { cache: "force-cache", mode: "cors" });
    if (!resp.ok) return null;
    const blob = await resp.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    // 跨域 CORS 未配置时 fetch 失败，静默跳过
    return null;
  }
}

// 骨架屏动画 CSS（注入一次）
const SKELETON_STYLE = `
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton-block {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 400px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: 6px;
}
@keyframes tarot-progress {
  0%   { width: 0%; }
  15%  { width: 20%; }
  40%  { width: 45%; }
  70%  { width: 68%; }
  90%  { width: 85%; }
  100% { width: 92%; }
}
.tarot-progress-bar {
  animation: tarot-progress 12s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
`;

const loadingPhrases = [
  "星盘正在旋转…",
  "解读牌面能量中…",
  "连接宇宙意识…",
  "织入命运丝线…",
  "整合塔罗智慧…",
];

export default function Step4Result() {
  const {
    currentChain,
    question,
    selectedSpread,
    prevStep,
    resetChain,
  } = useDivinationChain();
  const { saveRecord } = useTarotHistory();

  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [aiOverall, setAiOverall] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const screenshotRef = useRef<HTMLDivElement>(null);

  // 轮换加载文案
  useEffect(() => {
    if (!loadingAi) return;
    const timer = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % loadingPhrases.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [loadingAi]);

  const handleNewDivination = () => resetChain();
  const handleCardClick = (card: any) => setSelectedCard(card);
  const handleCloseDetail = () => setSelectedCard(null);

  const captureCanvas = async () => {
    if (!screenshotRef.current) return null;

    // 1. 收集截图区域内所有 img 的原始 src
    const imgEls = Array.from(
      screenshotRef.current.querySelectorAll<HTMLImageElement>("img")
    );
    const qrcodeUrl = new URL("/images/tarot/qrcode.jpg", window.location.origin).href;
    const allUrls = [...new Set([qrcodeUrl, ...imgEls.map((el) => el.src)])];

    // 2. 并行 fetch 转 base64（跨域失败的静默跳过）
    const imageMap = new Map<string, string>();
    await Promise.all(
      allUrls.map(async (url) => {
        const b64 = await fetchImageAsBase64(url);
        if (b64) imageMap.set(url, b64);
      })
    );

    const html2canvas = (await import("html2canvas")).default;
    return html2canvas(screenshotRef.current, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#0a0814",
      scale: 2,
      logging: false,
      imageTimeout: 15000,
      onclone: (_clonedDoc, clonedEl) => {
        // 3. 把克隆节点里的 img src 全部换成 base64
        clonedEl.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
          const b64 = imageMap.get(img.src);
          if (b64) {
            img.src = b64;
          }
        });
      },
    });
  };

  const handleScreenshot = async () => {
    setCapturing(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      let dataUrl: string;
      try {
        dataUrl = canvas.toDataURL("image/png");
      } catch {
        // OSS 未配置 CORS 时 toDataURL 会抛出 SecurityError
        setSaveMessage("❌ 请先在阿里云OSS控制台开启跨域规则（CORS），才能保存含图片的截图");
        setTimeout(() => setSaveMessage(""), 5000);
        return;
      }
      const link = document.createElement("a");
      link.download = `塔罗解读_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setSaveMessage("✅ 图片已保存，可发送给朋友");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("❌ 截图失败，请重试");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setCapturing(false);
    }
  };

  const handleShare = async () => {
    setCapturing(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "塔罗解读.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "我的塔罗解读结果",
            text: `${question || "通用占卜"} · 快来看看我的塔罗解读！`,
            files: [file],
          });
        } else {
          const link = document.createElement("a");
          link.download = `塔罗解读_${Date.now()}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
          setSaveMessage("✅ 图片已下载，可分享给朋友");
          setTimeout(() => setSaveMessage(""), 3000);
        }
      }, "image/png");
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setSaveMessage("❌ 分享失败，请重试");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } finally {
      setCapturing(false);
    }
  };

  if (!currentChain || currentChain.layers.length === 0) {
    return (
      <div className="step-content">
        <div className="error-message">
          <h3>占卜结果加载失败</h3>
          <p>请重新进行占卜</p>
          <button type="button" className="primary-button" onClick={prevStep}>
            返回上一步
          </button>
        </div>
      </div>
    );
  }

  const latestLayer = currentChain.layers[currentChain.layers.length - 1];
  const displayCards = latestLayer.cards;

  useEffect(() => {
    if (displayCards.length === 0 || !selectedSpread) return;
    const layout = DIVINATION_LAYOUTS[selectedSpread];
    if (!layout) return;
    setLoadingAi(true);
    setAiOverall(null);
    generateOverallInterpretationWithDeepSeek({
      spreadName: layout.name,
      question,
      cards: displayCards.map((c) => ({
        position: c.position,
        name_cn: c.name,
        name_en: c.nameEn ?? undefined,
        orientation: c.isReversed ? "逆位" : "正位",
        meaning: c.meaning,
        keywords: c.keywords || [],
      })),
    })
      .then((text) => { if (text) setAiOverall(text); })
      .finally(() => setLoadingAi(false));
  }, [displayCards, selectedSpread, question]);

  return (
    <div className="step-content">
      {/* 注入骨架屏动画 */}
      <style>{SKELETON_STYLE}</style>

      <div className="step-header">
        <h2 className="step-title">占卜结果</h2>
        <p className="step-subtitle">
          塔罗为你指引方向{question ? ` · 问题：${question}` : " · 通用解读"}
        </p>
      </div>

      {/* ===== 截图区域 ===== */}
      <div
        ref={screenshotRef}
        style={{ background: "#0a0814", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}
      >
        {/* 顶部标题 */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "#c9a96e", margin: 0 }}>
            ✦ 塔罗占卜结果 ✦
          </p>
          {question && (
            <p style={{ fontSize: "1rem", color: "#e8e0d0", marginTop: "0.4rem", marginBottom: 0 }}>
              {question}
            </p>
          )}
        </div>

        {/* 整体解读 / 骨架屏 */}
        <div className="overall-reading-new">
          <h3 className="reading-title-new">{displayCards.length}张牌的整体解读</h3>

          {loadingAi ? (
            <div style={{ padding: "0.5rem 0" }}>
              {/* 进度条 */}
              <div style={{
                width: "100%", height: 4, borderRadius: 4,
                background: "rgba(255,255,255,0.08)", marginBottom: "1.25rem", overflow: "hidden",
              }}>
                <div
                  className="tarot-progress-bar"
                  style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #c9a96e, #e8c88a)" }}
                />
              </div>
              {/* 轮换文案 */}
              <p style={{
                textAlign: "center", fontSize: "0.85rem", color: "#c9a96e",
                marginBottom: "1.25rem", letterSpacing: "0.05em",
                transition: "opacity 0.4s",
              }}>
                {loadingPhrases[phraseIndex]}
              </p>
              {/* 骨架行 */}
              {[100, 90, 95, 80, 85, 70].map((w, i) => (
                <div key={i} className="skeleton-block" style={{ width: `${w}%`, height: 14, marginBottom: 10 }} />
              ))}
            </div>
          ) : aiOverall ? (
            <div className="reading-content-new">
              <p className="reading-analysis">{aiOverall.replace(/\*\*/g, "")}</p>
            </div>
          ) : (
            <div className="reading-content-new reading-loading">
              <p className="reading-analysis">暂无整体解读（请配置 DeepSeek API 或稍后重试）</p>
            </div>
          )}
        </div>

        {/* 牌卡列表（在截图内，二维码上方） */}
        <div className="cards-result" style={{ marginTop: "1.5rem" }}>
          {displayCards.map((card, index) => (
            <div
              key={index}
              className="result-card enhanced"
              onClick={() => handleCardClick(card)}
            >
              {/* 背景图片 - 不加 crossOrigin 避免 OSS 跨域问题 */}
              <img
                src={getCardImageUrl(card.id || 0, card.nameEn || "")}
                alt={card.name}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div className="card-overlay" />
              <div className="card-content">
                <div className="card-header">
                  <h4 className="card-name">
                    {card.name}
                    <span className="card-name-en">({card.nameEn})</span>
                  </h4>
                </div>
                <div className="card-orientation-wrapper">
                  <span className={`card-orientation ${card.isReversed ? "reversed" : "upright"}`}>
                    {card.isReversed ? "逆位" : "正位"}
                  </span>
                </div>
                <div className="card-position">{card.position}</div>
                <div className="card-meaning">{card.meaning}</div>
                {card.keywords && card.keywords.length > 0 && (
                  <div className="card-keywords">
                    {card.keywords.slice(0, 5).map((keyword, i) => (
                      <span key={i} className="keyword">{keyword}</span>
                    ))}
                  </div>
                )}
                <div className="card-numerology">
                  <span className="numerology-label">数字学：</span>
                  <span className="numerology-value">{card.nameEn ? (card.nameEn.length % 9 || 9) : "—"}</span>
                </div>
                <button
                  className="detail-button"
                  onClick={(e) => { e.stopPropagation(); handleCardClick(card); }}
                >
                  查看完整解读
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 截图底部：小红书引流卡片 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "1.5rem", paddingTop: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.08)", gap: "1rem",
        }}>
          <div>
            <p style={{ fontSize: "0.8rem", color: "#c9a96e", margin: "0 0 0.25rem", fontWeight: 600 }}>
              ✦ 想要你的专属塔罗解读？
            </p>
            <p style={{ fontSize: "0.75rem", color: "#a89880", margin: 0 }}>
              扫码找到我 · 小红书「南多」
            </p>
            <p style={{ fontSize: "0.7rem", color: "#6b5e4a", margin: "0.2rem 0 0" }}>
              ID: 9541747431
            </p>
          </div>
          <img
            src="/images/tarot/qrcode.jpg"
            alt="小红书二维码"
            style={{ width: 80, height: 80, borderRadius: 8, flexShrink: 0 }}
          />
        </div>
      </div>
      {/* ===== 截图区域结束 ===== */}

      {/* 牌卡详情模态框 */}
      {selectedCard && (
        <div className="card-detail-modal" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCard.name} ({selectedCard.nameEn})</h3>
              <button className="close-button" onClick={handleCloseDetail}>×</button>
            </div>
            <div className="modal-body">
              <div
                className="detail-card-background"
                style={{
                  backgroundImage: `url(${getCardImageUrl(selectedCard.id || 0, selectedCard.nameEn || "")})`,
                  backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15,
                }}
              />
              <div className="detail-overlay" />
              <div className="detail-content">
                <div className="detail-section">
                  <h4>基本信息</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">位置：</span>
                      <span className="value">{selectedCard.position}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">状态：</span>
                      <span className={`value orientation ${selectedCard.isReversed ? "reversed" : "upright"}`}>
                        {selectedCard.isReversed ? "逆位" : "正位"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">数字学：</span>
                      <span className="value">{selectedCard.nameEn.length % 9 || 9}</span>
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h4>快速解读</h4>
                  <p className="quick-meaning">{selectedCard.meaning}</p>
                </div>
                <div className="detail-section">
                  <h4>关键词</h4>
                  <div className="keywords-list">
                    {selectedCard.keywords.map((keyword: string, i: number) => (
                      <span key={i} className="keyword">{keyword}</span>
                    ))}
                  </div>
                </div>
                <div className="detail-section">
                  <h4>完整解读</h4>
                  <p className="full-meaning">
                    {selectedCard.isReversed
                      ? "逆位代表着挑战、阻碍或内在冲突，需要你特别关注这个方面的成长。"
                      : "正位代表着顺利、和谐或外在机遇，是你当前可以积极利用的能量。"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 操作反馈消息 */}
      {saveMessage && (
        <div style={{
          textAlign: "center", padding: "1rem", marginBottom: "1rem",
          background: "rgba(107, 142, 127, 0.2)", border: "1px solid rgba(107, 142, 127, 0.4)",
          borderRadius: "8px", color: "var(--upright)", fontFamily: "var(--font-body)", fontSize: "1rem",
        }}>
          {saveMessage}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="step-actions">
        <button type="button" className="btn-ghost" onClick={handleNewDivination}>
          重新占卜
        </button>
        <button type="button" className="btn-ghost" onClick={handleScreenshot} disabled={capturing || loadingAi}>
          {capturing ? "生成中…" : "💾 保存结果"}
        </button>
        
      </div>

      {/* 购买引导 */}
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#a89880", marginBottom: "0.75rem" }}>
          喜欢这次解读？想要更深度的占卜服务
        </p>
        <a
          href={PURCHASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block", padding: "0.85rem 2.5rem",
            background: "linear-gradient(135deg, #c9a96e, #a07840)",
            color: "#1a1410", borderRadius: 8, fontWeight: 600,
            fontSize: "1rem", textDecoration: "none", letterSpacing: "0.05em",
          }}
        >
          ✨ 还想占卜 →
        </a>
      </div>
    </div>
  );
}