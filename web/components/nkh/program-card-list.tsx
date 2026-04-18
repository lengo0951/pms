"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RegisterProgramModal } from "./register-program-modal";
import type { ProgramOpen } from "@/lib/mock-data/nkh-dashboard";

const accent = {
  green:  { bg: "bg-emerald-50",  border: "border-l-emerald-500",  btn: "bg-emerald-600 hover:bg-emerald-700" },
  purple: { bg: "bg-violet-50",   border: "border-l-violet-500",   btn: "bg-violet-600 hover:bg-violet-700" },
  amber:  { bg: "bg-amber-50",    border: "border-l-amber-500",    btn: "bg-amber-500 hover:bg-amber-600" },
} as const;

type Props = {
  programs: ProgramOpen[];
  variant?: "compact" | "detailed";
};

// Shared list of program cards with modal trigger on "Đăng ký" click.
export function ProgramCardList({ programs, variant = "compact" }: Props) {
  const [selected, setSelected] = useState<ProgramOpen | null>(null);

  return (
    <>
      <div className="space-y-3">
        {programs.map((p) => {
          const c = accent[p.accent];
          return (
            <div
              key={p.id}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-lg border-l-4 px-4",
                variant === "detailed" ? "py-4" : "py-3",
                c.bg,
                c.border,
              )}
            >
              <div className="min-w-0 flex-1">
                <p className={cn("font-semibold text-ink-900", variant === "detailed" ? "text-base" : "text-sm")}>
                  {p.code}
                </p>
                <p className="text-xs text-ink-700">{p.ten}</p>
              </div>
              <span className="text-xs text-ink-700">
                {variant === "detailed" ? "Hạn nộp: " : "Hạn: "}
                <strong>{p.han}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSelected(p)}
                className={cn(
                  "rounded-lg font-semibold text-white",
                  variant === "detailed" ? "px-4 py-2 text-xs" : "px-4 py-1.5 text-xs",
                  c.btn,
                )}
              >
                {variant === "detailed" ? "Đăng ký tham gia" : "Đăng ký"}
              </button>
            </div>
          );
        })}
      </div>

      <RegisterProgramModal
        program={selected}
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </>
  );
}
