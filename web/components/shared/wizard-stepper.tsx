import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  steps: { label: string; description?: string }[];
  currentStep: number; // 1-based
  className?: string;
};

// Numbered horizontal stepper — used for contract signing (3 steps) and ký số (6 steps).
export function WizardStepper({ steps, currentStep, className }: Props) {
  return (
    <ol className={cn("flex items-start gap-0", className)}>
      {steps.map((step, idx) => {
        const n = idx + 1;
        const isDone = n < currentStep;
        const isActive = n === currentStep;
        return (
          <li key={idx} className="flex flex-1 items-start">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-sm font-bold",
                  isDone && "bg-[#d1fae5] text-[#10b981]",
                  isActive && "bg-brand-700 text-white",
                  !isDone && !isActive && "bg-white text-ink-500 ring-1 ring-ink-300",
                )}
              >
                {isDone ? <Check aria-hidden className="size-4" /> : n}
              </div>
              <div className="mt-2 text-center max-w-[120px]">
                <p
                  className={cn(
                    "text-[11px] font-semibold",
                    isActive ? "text-brand-700" : "text-ink-900",
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[10px] text-ink-500">{step.description}</p>
                )}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 mt-4 h-0.5 flex-1",
                  isDone ? "bg-[#10b981]" : "bg-ink-300",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
