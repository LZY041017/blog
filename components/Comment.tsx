"use client";

import { useEffect, useRef, useState } from "react";

export default function Comment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // 清除已有的 Giscus（防止重复加载）
    const existing = containerRef.current.querySelector("script");
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "LZY041017/blog");
    script.setAttribute("data-repo-id", "R_kgDOTP-5Tg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOTP-5Ts4DAr3z");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.current.appendChild(script);
  }, [mounted]);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        评论
      </h2>
      <div ref={containerRef} />
    </div>
  );
}
