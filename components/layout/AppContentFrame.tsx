import type { ElementType, ReactNode } from "react";

export const APP_CONTENT_FRAME_CLASS =
  "journee-page-frame box-border w-full max-w-full min-w-0 overflow-x-hidden";

const APP_CONTENT_FRAME_VARIANTS = {
  safe: "px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  flush: "",
  shell: "px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:pl-[calc(184px+2.5rem)] xl:pr-12",
} as const;

type AppContentFrameProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: keyof typeof APP_CONTENT_FRAME_VARIANTS;
};

export function AppContentFrame({
  as: Component = "div",
  children,
  className = "",
  variant = "safe",
}: AppContentFrameProps) {
  return (
    <Component
      className={`${APP_CONTENT_FRAME_CLASS} ${APP_CONTENT_FRAME_VARIANTS[variant]} ${className}`.trim()}
      data-journee-ui="app-content-frame"
    >
      {children}
    </Component>
  );
}
