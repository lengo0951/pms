"use client";

import { CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Tab 4 — Nộp hồ sơ (Figma NKH 34:2).
type CheckItem = { label: string; desc: string; done: boolean };

const checks: CheckItem[] = [
  { label: "Thông tin chung",           desc: "Tên nhiệm vụ, Chủ nhiệm, TCCT đã điền đầy đủ",    done: true },
  { label: "Thuyết minh khoa học (NCUD01)", desc: "File PDF đã upload, kích thước 2.4MB",         done: true },
  { label: "Dự toán kinh phí (NCUD02)",     desc: "File Excel đã upload, kích thước 88KB",       done: true },
  { label: "Lý lịch khoa học (NCUD03)",     desc: "Chưa upload — cần bổ sung",                    done: false },
  { label: "Danh sách thành viên",           desc: "4 thành viên, đủ yêu cầu tối thiểu",          done: true },
  { label: "Xác nhận Tổ chức Chủ trì",        desc: "Đã xác nhận bởi TCCT - Khoa CNTT UIT",       done: true },
];

const statusItems = [
  { label: "Thông tin chung",  done: true },
  { label: "Tài liệu",         done: true },
  { label: "Thành viên",       done: true },
  { label: "Lý lịch CNMT",     done: false },
  { label: "TCCT xác nhận",    done: true },
];

export function TabNopHoSo() {
  const doneCount = checks.filter((c) => c.done).length;
  const totalCount = checks.length;
  const percent = Math.round((doneCount / totalCount) * 100);
  const allDone = doneCount === totalCount;
  const missing = checks.find((c) => !c.done);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
      {/* MAIN */}
      <div className="space-y-4">
        {/* Banner */}
        <div className="rounded-xl bg-emerald-50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-emerald-800">
                Kiểm tra trước khi nộp - NCUD 2025 Đợt 1
              </h3>
              <p className="mt-1 text-xs text-ink-700">
                Vui lòng kiểm tra đầy đủ các mục dưới đây trước khi nộp chính thức
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white">
              <Clock aria-hidden className="size-3.5" /> Còn 12 ngày để nộp
            </span>
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-2">
          {checks.map((c) => (
            <div
              key={c.label}
              className={cn(
                "flex items-start justify-between gap-4 rounded-lg border p-4",
                c.done ? "border-ink-300 bg-white" : "border-amber-300 bg-amber-50",
              )}
            >
              <div className="flex items-start gap-3">
                {c.done ? (
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-600" />
                )}
                <div>
                  <p className="text-sm font-semibold text-ink-900">{c.label}</p>
                  <p className="text-xs text-ink-700">{c.desc}</p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                  c.done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
                )}
              >
                {c.done ? "Hoàn thành" : "Cần bổ sung"}
              </span>
            </div>
          ))}
        </div>

        {/* Warning if not all done */}
        {!allDone && missing && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
            <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-semibold">Có 1 mục chưa hoàn thành ({missing.label})</p>
              <p>Nút &ldquo;Nộp hồ sơ&rdquo; sẽ mở sau khi hoàn thành tất cả mục bắt buộc.</p>
            </div>
          </div>
        )}

        {/* Info */}
        <p className="rounded-lg bg-blue-50 p-3 text-xs text-blue-900">
          Sau khi nộp bản mềm, hệ thống sẽ gửi mã xác nhận qua email để thực hiện ký số.
        </p>
      </div>

      {/* SIDE — Trạng thái hồ sơ */}
      <aside className="h-fit rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <h3 className="mb-4 text-sm font-semibold text-ink-900">Trạng thái hồ sơ</h3>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-900">{doneCount}/{totalCount} mục hoàn thành</span>
            <span className="font-semibold text-emerald-600">{percent}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-page">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <ul className="space-y-2">
          {statusItems.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-[12px]">
              {s.done ? (
                <CheckCircle2 aria-hidden className="size-4 text-emerald-600" />
              ) : (
                <XCircle aria-hidden className="size-4 text-red-600" />
              )}
              <span className={s.done ? "text-ink-900" : "text-red-700 font-semibold"}>
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
