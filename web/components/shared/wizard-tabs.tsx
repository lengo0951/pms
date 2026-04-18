"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type WizardTab = {
  id: string;
  label: string;
  placeholder?: boolean;
};

type Props = {
  tabs: WizardTab[];
  currentId: string;
  basePath: string;
  completedIds?: string[];
};

// Tab navigation for admin (5-tab) and NKH (4-tab) wizards. Each tab = route segment.
export function WizardTabs({ tabs, currentId, basePath, completedIds = [] }: Props) {
  return (
    <nav className="flex overflow-x-auto rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      {tabs.map((tab, idx) => {
        const isActive = tab.id === currentId;
        const isDone = completedIds.includes(tab.id);
        return (
          <Link
            key={tab.id}
            href={`${basePath}/${tab.id}`}
            className={cn(
              "group relative flex min-w-40 flex-1 items-center gap-2 border-b-2 px-4 py-3 text-[13px] transition-colors",
              isActive
                ? "border-emerald-600 bg-emerald-50/40 font-semibold text-emerald-700"
                : "border-transparent text-ink-700 hover:bg-surface-page",
            )}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-[11px] font-bold",
                isActive && "bg-emerald-600 text-white",
                !isActive && isDone && "bg-emerald-100 text-emerald-700",
                !isActive && !isDone && "bg-surface-page text-ink-500",
              )}
            >
              {isDone ? <Check aria-hidden className="size-3.5" /> : idx + 1}
            </span>
            <span>{tab.label}</span>
            {tab.placeholder && (
              <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
                WIP
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
