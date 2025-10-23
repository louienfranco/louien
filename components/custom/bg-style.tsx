import { useId } from "react";

import { cn } from "@/lib/utils";

interface DottedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cr?: number;
  squares?: Array<[x: number, y: number]>;
  className?: string;
  [key: string]: unknown;
}

function DottedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  cr = 1,
  squares,
  className,
  ...props
}: DottedGridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 h-full w-full fill-gray-400/20",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={width / 2} cy={height / 2} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x * width + width / 2}
              cy={y * height + height / 2}
              r={cr}
              fill="currentColor"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export { DottedGridPattern };
