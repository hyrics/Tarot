import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section>
      <h1 className="page-title">页面走丢了</h1>
      <p className="page-subtitle">
        你来到了一片未知的塔罗领域，这里暂时没有内容。
      </p>
      <Link to="/" className="primary-link">
        返回首页
      </Link>
    </section>
  );
}

