"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  interval?: number;
}

export default function PhotoCarousel({ photos, interval = 5000 }: PhotoCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || photos.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, isPlaying, photos.length]);

  if (!photos.length) return null;

  const photo = photos[active];
  const goTo = (index: number) => setActive((index + photos.length) % photos.length);

  return (
    <section className="qixia-carousel overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/60" aria-label="栖霞山现场影像">
      <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden bg-gray-100 sm:aspect-[16/9] sm:min-h-0 dark:bg-gray-950">
        <img
          key={`backdrop-${photo.src}`}
          src={photo.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
        />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/30" />
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="qixia-carousel-image relative h-full w-full object-contain"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-16 text-white sm:px-6 sm:pb-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium sm:text-base">{photo.caption}</p>
            <p className="mt-1 text-xs text-white/65">{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</p>
          </div>
          <a
            href={photo.src}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-white/30 bg-black/20 p-2 text-white/90 transition hover:bg-black/45"
            aria-label="在新窗口查看当前照片"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        <button type="button" onClick={() => goTo(active - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/25 p-2 text-white transition hover:bg-black/50" aria-label="上一张照片">
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => goTo(active + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/25 p-2 text-white transition hover:bg-black/50" aria-label="下一张照片">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-1.5" role="tablist" aria-label="选择照片">
          {photos.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-primary-500" : "w-1.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-500"}`}
              role="tab"
              aria-selected={index === active}
              aria-label={`第 ${index + 1} 张：${item.caption}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => setIsPlaying((playing) => !playing)} className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-xs text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white" aria-label={isPlaying ? "暂停轮播" : "继续轮播"}>
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          {isPlaying ? "自动播放" : "已暂停"}
        </button>
      </div>
    </section>
  );
}
