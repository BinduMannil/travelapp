"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Auto-advancing image carousel. Pauses on hover/focus and on touch.
 * Falls back to a single static image when only one URL is provided, and
 * to nothing (caller renders the fallback) when the array is empty.
 */
export function ImageCarousel({
  images,
  alt,
  intervalMs = 4000,
  className = "",
  onAllFailed,
}: {
  images: string[];
  alt: string;
  intervalMs?: number;
  className?: string;
  /** Called when every image in the array has failed to load. */
  onAllFailed?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const valid = images
    .map((src, i) => ({ src, i }))
    .filter((x) => !failed.has(x.i));

  useEffect(() => {
    if (valid.length === 0 && images.length > 0) onAllFailed?.();
  }, [valid.length, images.length, onAllFailed]);

  useEffect(() => {
    if (paused || valid.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((cur) => (cur + 1) % valid.length);
    }, intervalMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, valid.length, intervalMs]);

  // Reset index if it falls outside the new (filtered) length.
  useEffect(() => {
    if (index >= valid.length && valid.length > 0) setIndex(0);
  }, [valid.length, index]);

  if (valid.length === 0) return null;

  const current = valid[index] ?? valid[0];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {valid.map(({ src, i }, vIdx) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={src}
          src={src}
          alt={vIdx === 0 ? alt : ""}
          loading="lazy"
          onError={() => {
            setFailed((prev) => {
              const next = new Set(prev);
              next.add(i);
              return next;
            });
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            current.i === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {valid.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {valid.map((v, vIdx) => (
            <button
              key={v.src}
              type="button"
              aria-label={`Show image ${vIdx + 1} of ${valid.length}`}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(vIdx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                vIdx === index
                  ? "w-6 bg-white/90"
                  : "w-1.5 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
