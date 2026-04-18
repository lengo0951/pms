import { cn } from "@/lib/utils";

type Props = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

// Label + input wrapper — dùng native <label> bọc children để auto-link focus
// (click label focus input mà không cần htmlFor/id).
export function FormField({ label, error, hint, required, children, className }: Props) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-ink-900">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden>*</span>}
        {required && <span className="sr-only"> (bắt buộc)</span>}
      </span>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="text-xs text-ink-500">{hint}</p>}
    </label>
  );
}
