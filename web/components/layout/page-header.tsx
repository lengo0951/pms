import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
};

// Page-level heading block above content cards.
export function PageHeader({ title, subtitle, action, className }: Props) {
  return (
    <div className={cn("mb-6 flex items-start justify-between gap-4", className)}>
      <div>
        <h2 className="text-xl font-bold text-ink-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-ink-700">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
