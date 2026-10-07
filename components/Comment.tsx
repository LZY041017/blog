"use client";

import { useEffect, useRef } from "react";

export default function Comment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let frame: HTMLIFrameElement | null = null;
    const sendTheme = () => frame?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: document.documentElement.classList.contains("dark") ? "dark" : "light" } } },
      "https://giscus.app",
    );
    const syncFrame = () => {
      const nextFrame = container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (nextFrame !== frame) {
        frame?.removeEventListener("load", sendTheme);
        frame = nextFrame;
        frame?.addEventListener("load", sendTheme);
      }
      sendTheme();
    };
    const themeObserver = new MutationObserver(sendTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const frameObserver = new MutationObserver(syncFrame);
    frameObserver.observe(container, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    const attributes = {
      "data-repo": "LZY041017/blog",
      "data-repo-id": "R_kgDOTP-5Tg",
      "data-category": "General",
      "data-category-id": "DIC_kwDOTP-5Ts4DAr3z",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": document.documentElement.classList.contains("dark") ? "dark" : "light",
      "data-lang": "zh-CN",
      crossorigin: "anonymous",
    };
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
    script.async = true;
    container.appendChild(script);
    return () => {
      themeObserver.disconnect();
      frameObserver.disconnect();
      frame?.removeEventListener("load", sendTheme);
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">评论</h2>
      <div ref={containerRef} className="giscus-shell" />
    </div>
  );
}
