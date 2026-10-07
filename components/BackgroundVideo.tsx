"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/lib/use-media-query";

function HomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const mobile = useMediaQuery("(max-width: 767px)");

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
      className={`site-video ${ready ? "site-video-ready" : ""}`}
      src={mobile ? "/assets/video/mobile-main.mp4" : "/assets/video/main.mp4"}
      muted loop playsInline preload="auto"
      poster="/assets/visual/p3-inspired-city-night-hero.webp"
      onCanPlay={() => setReady(true)}
    />
  );
}

export default function BackgroundVideo() {
  const pathname = usePathname();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <div className="site-video-background" aria-hidden="true">
      {pathname === "/" && !reducedMotion && <HomeVideo />}
      <div className="site-video-overlay" />
    </div>
  );
}
