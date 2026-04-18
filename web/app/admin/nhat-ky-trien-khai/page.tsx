"use client";

import { useMemo, useState } from "react";
import { Plus, History, Pencil, RotateCcw, CheckCircle2, Check } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/shared/status-chip";
import { cn } from "@/lib/utils";
import {
  taskLogContext,
  taskLogEntries,
  availableMonths,
  type LogEntry,
  type LogStatus,
} from "@/lib/mock-data/nhat-ky";

function statusBadge(s: LogStatus) {
  if (s === "done") return <StatusChip variant="done" label="Hoàn thành" />;
  return <StatusChip variant="active" label="Đang thực hiện" />;
}

// Nhật ký triển khai (Figma 8:2) — task header + month filter + event cards with actions.
export default function NhatKyPage() {
  const [currentMonth, setCurrentMonth] = useState(availableMonths[0].key);

  const entries = useMemo(
    () => taskLogEntries.filter((e) => e.monthKey === currentMonth),
    [currentMonth],
  );

  return (
    <PageShell breadcrumb="Nhiệm vụ / Nhiệm vụ được tài trợ / Nhật ký" title="Nhật ký triển khai">
      {/* Task header card */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <div>
          <p className="text-base font-bold text-ink-900">
            <span className="font-mono">{taskLogContext.ma}</span> · {taskLogContext.ten}
          </p>
          <p className="mt-1 text-xs text-ink-700">
            Chủ nhiệm: {taskLogContext.chuNhiem} &nbsp;|&nbsp; {taskLogContext.thoiGian} &nbsp;|&nbsp; Kinh phí: {taskLogContext.kinhPhi}
          </p>
        </div>
        <StatusChip variant="active" label={taskLogContext.status} />
      </div>

      {/* Toolbar: actions + month tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button className="bg-brand-700 hover:bg-brand-800">
          <Plus aria-hidden className="mr-1 size-4" /> Thêm công việc mới
        </Button>
        <Button variant="outline">
          <History aria-hidden className="mr-1 size-4" /> Xem lịch sử nhật ký
        </Button>

        <div className="ml-auto flex flex-wrap gap-2">
          {availableMonths.map((m) => {
            const active = m.key === currentMonth;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setCurrentMonth(m.key)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-ink-300 bg-white text-ink-700 hover:bg-surface-page",
                )}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event cards */}
      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-ink-500 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            Chưa có mục nào trong tháng này.
          </p>
        ) : (
          entries.map((e) => <EventCard key={e.id} entry={e} />)
        )}
      </div>
    </PageShell>
  );
}

function EventCard({ entry }: { entry: LogEntry }) {
  const inProgress = entry.status === "in_progress";
  return (
    <div
      className={cn(
        "flex gap-4 rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-colors",
        entry.highlighted && "ring-2 ring-brand-400",
      )}
    >
      {/* Status dot */}
      <div className="mt-1 shrink-0">
        {entry.status === "done" ? (
          <CheckCircle2 aria-hidden className="size-5 text-[#10b981]" />
        ) : (
          <div className="relative size-5">
            <div className="absolute inset-0 rounded-full bg-[#fef3c7]" />
            <div className="absolute inset-1 rounded-full bg-[#f59e0b] animate-pulse" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-ink-500">{entry.date}</span>
              <p className="text-sm font-semibold text-ink-900">{entry.title}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-700">{entry.description}</p>
            <p className="mt-2 text-[11px] text-ink-500">
              Báo cáo bởi: <span className="font-medium text-ink-700">{entry.reporter}</span>
            </p>
          </div>
          {statusBadge(entry.status)}
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Pencil aria-hidden className="mr-1 size-3.5" /> Sửa
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw aria-hidden className="mr-1 size-3.5" /> Lịch sử cập nhật
          </Button>
          {inProgress && (
            <Button size="sm" className="bg-[#10b981] text-white hover:bg-[#059669]">
              <Check aria-hidden className="mr-1 size-3.5" /> Đánh dấu hoàn thành
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
