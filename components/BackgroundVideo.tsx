"use client";

import { useState } from "react";

export default function BackgroundVideo() {
  const [ready, setReady] = useState(false);

  return (
    <div className="site-video-background" aria-hidden="true">
      <video
        className={`site-video ${ready ? "site-video-ready" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
