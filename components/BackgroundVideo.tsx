"use client";

import { useEffect, useState } from "react";

export default function BackgroundVideo() {
  const [ready, setReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadVideo(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="site-video-background" aria-hidden="true">
      <video
        className={`site-video ${ready ? "site-video-ready" : ""}`}
        autoPlay={loadVideo}
        muted
        loop
        playsInline
        preload={loadVideo ? "auto" : "none"}
        poster="/assets/visual/p3-inspired-city-night-hero.webp"
        onCanPlay={() => setReady(true)}
      >
        <source media="(max-width: 767px)" src="/assets/video/mobile-main.mp4" type="video/mp4" />
        <source src="/assets/video/main.mp4" type="video/mp4" />
      </video>
      <div className="site-video-overlay" />
    </div>
  );
}
