"use client";

import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type RGBButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "smooth" | "pulse";
};

const RGBButton = forwardRef<HTMLButtonElement, RGBButtonProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const animationClass = {
      default: "rgb-button-animated rgb-button-glow",
      smooth: "rgb-button-smooth rgb-button-glow",
      pulse: "rgb-button-animated rgb-button-glow-pulse",
    }[variant];

    return (
      <button
        ref={ref}
        style={{
          color: "var(--rgb-btn-foreground)",
          background: `linear-gradient(var(--rgb-btn-base-bg), var(--rgb-btn-base-bg)) padding-box,
                       var(--rgb-btn-border) border-box`,
          border: "2px solid transparent",
        }}
        className={cn(
          "rgb-button", // Base class that defines the CSS variables
          "relative inline-flex h-11 items-center justify-center rounded-xl px-8 py-2 font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          animationClass,
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

RGBButton.displayName = "RGBButton";

export default RGBButton;
export { RGBButton };
