"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundVideo() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setReady(false);
    setLoadVideo(false);
    if (!isHome) return;

    const timer = window.setTimeout(() => setLoadVideo(true), 180);
    return () => window.clearTimeout(timer);
  }, [isHome]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isHome || !loadVideo) {
      video.pause();
      return;
    }
    void video.play().catch(() => undefined);
  }, [isHome, loadVideo]);

  return (
    <div className="site-video-background" aria-hidden="true">
      <video
        ref={videoRef}
        className={`site-video ${ready ? "site-video-ready" : ""}`}
        autoPlay={isHome && loadVideo}
        muted
        loop
        playsInline
        preload={isHome && loadVideo ? "auto" : "none"}
        poster="/assets/visual/p3-inspired-city-night-hero.webp"
        onCanPlay={() => setReady(true)}
      >
        {isHome && loadVideo && <>
          <source media="(max-width: 767px)" src="/assets/video/mobile-main.mp4" type="video/mp4" />
          <source src="/assets/video/main.mp4" type="video/mp4" />
        </>}
      </video>
      <div className="site-video-overlay" />
    </div>
  );
}
