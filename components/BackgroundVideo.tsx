"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

function SiteVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [readySource, setReadySource] = useState("");
  const [loadVideo, setLoadVideo] = useState(false);
  const mobile = useMediaQuery("(max-width: 767px)");
  const source = mobile ? "/assets/video/mobile-main.mp4" : "/assets/video/main.mp4";

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadVideo(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (document.hidden) video.pause();
      else void video.play().catch(() => undefined);
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [loadVideo, mobile]);

  if (!loadVideo) return null;
  return (
    <video
      ref={videoRef}
      className={`site-video ${readySource === source ? "site-video-ready" : ""}`}
      src={source}
      muted loop playsInline preload="auto"
      poster="/assets/visual/p3-inspired-city-night-hero.webp"
      onCanPlay={() => setReadySource(source)}
    />
  );
}

export default function BackgroundVideo() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <div className="site-video-background" aria-hidden="true">
      {!reducedMotion && <SiteVideo />}
      <div className="site-video-overlay" />
    </div>
  );
}
