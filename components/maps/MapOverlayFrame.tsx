import type { ReactNode } from "react";

export const MAP_PREVIEW_CARD_CLASS =
  "journee-glass-panel pointer-events-auto absolute left-4 top-4 z-30 w-[min(calc(100vw-2rem),360px)] max-w-[360px] rounded-lg border border-[#d8aa4f]/28 bg-[#050807]/82 p-4 shadow-[0_18px_58px_rgba(0,0,0,.42)] backdrop-blur-xl sm:left-8 sm:top-8 lg:left-10 lg:top-10 lg:p-6";

export const MAP_ROUTE_BADGE_CLASS =
  "journee-glass-panel pointer-events-auto absolute right-4 top-24 z-30 rounded-md border border-[#d8aa4f]/35 bg-black/46 px-3 py-2 text-left text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#f1ce7f] backdrop-blur-xl transition hover:bg-[#d8aa4f]/10 sm:right-8 lg:right-10 lg:top-8";

export const MAP_CONTROL_BAR_CLASS =
  "journee-map-controls pointer-events-auto absolute bottom-6 left-1/2 z-30 flex w-[min(calc(100vw-2rem),calc(100vw-80px))] max-w-[calc(100vw-80px)] -translate-x-1/2 gap-3 overflow-x-auto rounded-lg border border-white/14 bg-[#050807]/76 p-2 shadow-[0_18px_58px_rgba(0,0,0,.42)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:bottom-8 lg:w-auto lg:min-w-[560px] lg:justify-center";

export const MAP_CONTROL_ITEM_CLASS =
  "min-h-16 min-w-[120px] shrink-0 rounded-md px-6 py-[18px] text-xs font-semibold";

type MapOverlayFrameProps = {
  preview?: ReactNode;
  routeBadge?: ReactNode;
  controls?: ReactNode;
};

export function MapOverlayFrame({ preview, routeBadge, controls }: MapOverlayFrameProps) {
  return (
    <>
      {preview ? <div className={MAP_PREVIEW_CARD_CLASS}>{preview}</div> : null}
      {routeBadge ? <div className={MAP_ROUTE_BADGE_CLASS}>{routeBadge}</div> : null}
      {controls ? <div className={MAP_CONTROL_BAR_CLASS}>{controls}</div> : null}
    </>
  );
}
