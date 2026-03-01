// api/proxy.ts
// Vercel Serverless Function - 代理 OSS 图片请求，解决跨域问题
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  // 只允许代理阿里云 OSS 的图片，防止被滥用
  if (!url.startsWith("https://nanduo.oss-cn-beijing.aliyuncs.com/")) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch image" });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/png";

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400"); // 缓存1天
    return res.send(Buffer.from(buffer));
  } catch (e) {
    return res.status(500).json({ error: "Proxy error" });
  }
}