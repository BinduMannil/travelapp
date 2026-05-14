import type { ElementType, ReactNode } from "react";

export const DESTINATION_PAGE_FRAME_CLASS =
  "journee-page-frame box-border mx-auto w-full max-w-[1440px] min-w-0 overflow-x-hidden px-4 py-0 sm:px-6 md:px-6 lg:px-10 xl:px-14";

export const DESTINATION_SAFE_GRID_CLASS = "journee-safe-grid grid min-w-0 max-w-full";
export const DESTINATION_CARD_CLASS = "journee-card min-w-0 max-w-full";

type DestinationPageFrameProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function DestinationPageFrame({
  as: Component = "div",
  children,
  className = "",
}: DestinationPageFrameProps) {
  return (
    <Component
      className={`${DESTINATION_PAGE_FRAME_CLASS} ${className}`.trim()}
      data-journee-ui="destination-page-frame"
    >
      {children}
    </Component>
  );
}
