import { cn } from "@/lib/utils";

export type BarDatum = {
  label: string;
  value: number;
  color?: string;
};

type Props = {
  data: BarDatum[];
  unit?: string;
  className?: string;
  height?: number;
};

// Lightweight vertical bar chart — pure SVG, no charting lib.
// Keeps bundle small (Figma dashboards only need simple comparison visuals).
export function BarChartMock({ data, unit = "", className, height = 220 }: Props) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${data.length * 100} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((p) => (
          <line
            key={p}
            x1="0"
            x2={data.length * 100}
            y1={height - 30 - (height - 50) * p}
            y2={height - 30 - (height - 50) * p}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
        {/* Bars */}
        {data.map((d, i) => {
          const h = ((d.value / max) * (height - 50));
          const y = height - 30 - h;
          const x = i * 100 + 100 * 0.2;
          const w = 100 * 0.6;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={d.color ?? "var(--color-brand-700)"}
                rx="4"
              />
              <text
                x={i * 100 + 50}
                y={y - 6}
                textAnchor="middle"
                className="fill-ink-900 text-[11px] font-semibold"
                style={{ fontSize: "11px" }}
              >
                {d.value}
                {unit}
              </text>
              <text
                x={i * 100 + 50}
                y={height - 8}
                textAnchor="middle"
                className="fill-ink-700"
                style={{ fontSize: "11px" }}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
