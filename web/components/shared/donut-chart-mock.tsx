import { cn } from "@/lib/utils";

export type DonutSlice = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  className?: string;
};

// SVG donut chart. Pure math, no lib. Used on dashboards for status breakdown.
export function DonutChartMock({
  data,
  size = 180,
  thickness = 28,
  centerLabel,
  className,
}: Props) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const slices = data.map((d) => {
    const length = (d.value / total) * circumference;
    const arc = {
      ...d,
      dashArray: `${length} ${circumference - length}`,
      dashOffset: -offset,
    };
    offset += length;
    return arc;
  });

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2} ${size / 2}) rotate(-90)`}>
            {slices.map((s) => (
              <circle
                key={s.label}
                r={radius}
                fill="transparent"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={s.dashArray}
                strokeDashoffset={s.dashOffset}
              />
            ))}
          </g>
        </svg>
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-ink-900">{total}</span>
            <span className="text-[11px] text-ink-500">{centerLabel}</span>
          </div>
        )}
      </div>

      <ul className="flex-1 space-y-2">
        {data.map((d) => {
          const pct = Math.round((d.value / total) * 100);
          return (
            <li key={d.label} className="flex items-center gap-2 text-xs">
              <span
                className="inline-block size-3 rounded-sm"
                style={{ backgroundColor: d.color }}
              />
              <span className="flex-1 text-ink-900">{d.label}</span>
              <span className="font-semibold text-ink-900">{d.value}</span>
              <span className="w-10 text-right text-ink-500">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
