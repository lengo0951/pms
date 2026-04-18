import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  delta?: string;
  icon?: LucideIcon;
  accent?: "brand" | "signed" | "active" | "done";
  className?: string;
};

const accentColors: Record<NonNullable<Props["accent"]>, string> = {
  brand: "bg-brand-50 text-brand-700",
  signed: "bg-[#d1fae5] text-[#10b981]",
  active: "bg-[#fef3c7] text-[#f59e0b]",
  done: "bg-[#ede9fe] text-[#8b5cf6]",
};

// Dashboard KPI card — icon + label + big number + optional delta.
export function StatCard({ label, value, delta, icon: Icon, accent = "brand", className }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-700">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink-900">{value}</p>
        </div>
        {Icon && (
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-lg",
              accentColors[accent],
            )}
          >
            <Icon aria-hidden className="size-5" />
          </div>
        )}
      </div>
      {delta && (
        <div className="mt-3 flex items-center gap-1 text-[11px] text-[#10b981]">
          <TrendingUp className="size-3" />
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}
