"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.classList.contains("dark");
const isClient = () => true;
const serverSnapshot = () => false;

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, serverSnapshot);
  const mounted = useSyncExternalStore(subscribe, isClient, serverSnapshot);

  const toggle = () => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // 禁用存储时仍允许当前页面切换主题。
    }
  };

  if (!mounted) return <div className="w-9 h-9" />;
  return (
    <button onClick={toggle}
      className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
      aria-label={dark ? "切换到亮色模式" : "切换到暗色模式"}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
