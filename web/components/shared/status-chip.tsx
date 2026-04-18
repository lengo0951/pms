import { cn } from "@/lib/utils";
import { statusLabels, type StatusVariant } from "@/lib/tokens";

const variantClasses: Record<StatusVariant, string> = {
  review: "bg-[#dbeafe] text-[#3b82f6]",
  signed: "bg-[#d1fae5] text-[#10b981]",
  active: "bg-[#fef3c7] text-[#f59e0b]",
  done: "bg-[#ede9fe] text-[#8b5cf6]",
  draft: "bg-zinc-100 text-zinc-600",
};

type Props = {
  variant: StatusVariant;
  label?: string;
  className?: string;
};

// Rounded pill showing nhiệm vụ status. Label defaults from statusLabels map.
export function StatusChip({ variant, label, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {label ?? statusLabels[variant]}
    </span>
  );
}
