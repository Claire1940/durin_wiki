"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldPlay(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(() => {
    const base = `https://www.youtube.com/embed/${videoId}`;
    const query = shouldPlay
      ? "autoplay=1&mute=1&loop=1&playlist=" + videoId + "&playsinline=1&rel=0"
      : "autoplay=0&mute=1&playsinline=1&rel=0";
    return `${base}?${query}`;
  }, [videoId, shouldPlay]);

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="flex justify-center gap-3">
        {!shouldPlay && (
          <button
            onClick={() => setShouldPlay(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <PlayCircle className="h-4 w-4" />
            Play Video
          </button>
        )}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
