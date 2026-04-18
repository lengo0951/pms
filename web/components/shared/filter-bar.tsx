"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type FilterDropdown = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
};

type Props = {
  searchValue: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  filters?: FilterDropdown[];
  primaryAction?: React.ReactNode;
  advancedAction?: React.ReactNode;
  className?: string;
};

// Filter bar on top of data tables — search + dropdowns + primary/advanced CTA.
export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  filters = [],
  primaryAction,
  advancedAction,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <div className="relative flex-1 min-w-[280px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 pl-9"
        />
      </div>

      {filters.map((f, i) => (
        <Select
          key={i}
          value={f.value}
          onValueChange={(v) => f.onChange(v ?? "all")}
        >
          <SelectTrigger className="h-10 w-44">
            <SelectValue placeholder={f.label} />
          </SelectTrigger>
          <SelectContent>
            {f.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {advancedAction}
      {primaryAction}
    </div>
  );
}
