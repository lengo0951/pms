"use client";

import { useState } from "react";
import { FileText, Download, Upload, Trash2, CheckCircle2, Circle, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tab 2 — Thuyết minh & Tài liệu (Figma NKH 33:2).
type TemplateFile = { code: string; name: string; desc: string };

const templates: TemplateFile[] = [
  { code: "NCUD01", name: "Thuyết minh Khoa học & Công nghệ (.docx)", desc: "File Word, 3-5 trang" },
  { code: "NCUD02", name: "Dự toán kinh phí nghiên cứu (.xlsx)",       desc: "File Excel, theo biểu mẫu" },
  { code: "NCUD03", name: "Lý lịch khoa học Chủ nhiệm (.docx)",         desc: "File Word, 2 trang" },
];

type UploadedFile = { id: string; name: string; size: string; valid: boolean };

const initialUploads: UploadedFile[] = [
  { id: "u1", name: "NCUD01_Nguyen-Van-A_Thuyet-minh.docx", size: "245 KB", valid: true },
  { id: "u2", name: "NCUD02_DuToan_NhiemVu_2025.xlsx",      size: "88 KB",  valid: true },
];

type ProgressItem = { label: string; status: "done" | "doing" | "todo" };
const progress: ProgressItem[] = [
  { label: "Thông tin chung",  status: "done" },
  { label: "Thuyết minh & TL", status: "doing" },
  { label: "Danh sách TV",     status: "todo" },
  { label: "Nộp hồ sơ",         status: "todo" },
];

export function TabThuyetMinh() {
  const [uploads, setUploads] = useState<UploadedFile[]>(initialUploads);
  const remove = (id: string) => setUploads((u) => u.filter((x) => x.id !== id));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
      {/* MAIN */}
      <div className="space-y-5">
        {/* Section A — Templates */}
        <section className="rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div className="rounded-t-xl bg-emerald-50 px-5 py-3">
            <h3 className="text-sm font-semibold text-emerald-800">
              A. Tải mẫu biểu (bắt buộc tải trước khi điền)
            </h3>
          </div>
          <div className="space-y-3 p-5">
            <p className="text-xs text-ink-700">
              Vui lòng tải các mẫu biểu sau, điền thông tin và upload lên hệ thống:
            </p>
            {templates.map((t) => (
              <div key={t.code} className="flex items-center gap-4 rounded-lg border border-ink-300 p-3">
                <FileText aria-hidden className="size-8 shrink-0 text-emerald-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">
                    {t.code} - {t.name}
                  </p>
                  <p className="text-xs text-ink-500">{t.desc}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                  Bắt buộc
                </span>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Download aria-hidden className="mr-1 size-3.5" /> Tải mẫu biểu
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Section B — Upload zone */}
        <section className="rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div className="rounded-t-xl bg-emerald-50 px-5 py-3">
            <h3 className="text-sm font-semibold text-emerald-800">
              B. Upload tài liệu đã điền (PDF hoặc Word)
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="rounded-xl border-2 border-dashed border-ink-300 bg-surface-page py-10 text-center">
              <Upload aria-hidden className="mx-auto size-10 text-ink-500" />
              <p className="mt-2 text-sm text-ink-700">Kéo thả file vào đây hoặc nhấn để chọn</p>
              <p className="text-xs text-ink-500">Hỗ trợ: PDF, DOCX, XLSX — Tối đa 10MB mỗi file</p>
              <Button size="sm" className="mt-3 bg-emerald-600 hover:bg-emerald-700">
                Chọn file từ máy tính
              </Button>
            </div>

            {uploads.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold text-ink-700">
                  Đã upload ({uploads.length}/3 files bắt buộc):
                </p>
                <ul className="space-y-2">
                  {uploads.map((f) => (
                    <li key={f.id} className="flex items-center gap-3 rounded-lg bg-surface-page px-3 py-2">
                      <FileText aria-hidden className="size-4 text-emerald-600" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-ink-900">{f.name}</p>
                        <p className="text-[10px] text-ink-500">{f.size}</p>
                      </div>
                      {f.valid && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          Hợp lệ
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-red-600 hover:bg-red-50"
                        onClick={() => remove(f.id)}
                        aria-label={`Xoá ${f.name}`}
                      >
                        <Trash2 aria-hidden className="size-3.5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* SIDE — Tiến độ điền hồ sơ */}
      <aside className="h-fit rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <h3 className="mb-4 text-sm font-semibold text-ink-900">Tiến độ điền hồ sơ</h3>
        <ul className="space-y-3">
          {progress.map((p) => {
            const Icon = p.status === "done" ? CheckCircle2 : p.status === "doing" ? CircleDot : Circle;
            const color =
              p.status === "done" ? "text-emerald-600" :
              p.status === "doing" ? "text-amber-500" : "text-ink-300";
            const labelStyle =
              p.status === "done" ? "text-ink-900" :
              p.status === "doing" ? "text-ink-900 font-semibold" : "text-ink-500";
            const note =
              p.status === "done" ? "Hoàn thành" :
              p.status === "doing" ? "Đang điền" : "Chưa điền";
            return (
              <li key={p.label} className="flex items-start gap-2">
                <Icon aria-hidden className={`mt-0.5 size-4 ${color}`} />
                <div>
                  <p className={`text-[12px] ${labelStyle}`}>{p.label}</p>
                  <p className={`text-[10px] ${color}`}>{note}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
