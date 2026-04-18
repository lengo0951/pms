"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTable, type Column } from "@/components/shared/data-table";
import { StatusChip } from "@/components/shared/status-chip";
import { cn } from "@/lib/utils";
import { nhiemVuList, countByStatus, type NhiemVu } from "@/lib/mock-data/nhiem-vu";
import type { StatusVariant } from "@/lib/tokens";

const PAGE_SIZE = 10;

const columns: Column<NhiemVu>[] = [
  { key: "stt",        header: "STT",         width: "56px",  render: (r) => r.stt },
  { key: "ma",         header: "Mã nhiệm vụ", width: "120px", render: (r) => <span className="font-mono">{r.ma}</span> },
  { key: "ten",        header: "Tên nhiệm vụ",                  render: (r) => <span className="font-medium">{r.ten}</span> },
  { key: "chuNhiem",   header: "Chủ nhiệm",   width: "180px", render: (r) => r.chuNhiem },
  { key: "thoiGian",   header: "Thời gian",   width: "140px", render: (r) => r.thoiGian },
  { key: "kinhPhi",    header: "Kinh phí",    width: "100px", align: "right", render: (r) => r.kinhPhi },
  { key: "status",     header: "Trạng thái",  width: "140px", render: (r) => <StatusChip variant={r.status} /> },
  {
    key: "actions",
    header: "Thao tác",
    width: "150px",
    render: (r) => (
      <div className="flex gap-2">
        <Link
          href={`/admin/nhiem-vu/${r.id}`}
          className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700 hover:bg-brand-100"
        >
          Chi tiết
        </Link>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-ink-300 bg-white px-2 py-1 text-[11px] font-medium text-ink-700 hover:bg-surface-page"
          aria-label={`Tải hồ sơ nhiệm vụ ${r.ma}`}
        >
          <Download aria-hidden className="size-3" /> Tải
        </button>
      </div>
    ),
  },
];

const chipColors: Record<"all" | StatusVariant, string> = {
  all:    "bg-[#ede9fe] text-[#8b5cf6]",
  review: "bg-[#dbeafe] text-[#3b82f6]",
  signed: "bg-[#d1fae5] text-[#10b981]",
  active: "bg-[#fef3c7] text-[#f59e0b]",
  done:   "bg-[#ede9fe] text-[#8b5cf6]",
  draft:  "bg-zinc-100 text-zinc-600",
};

export default function NhiemVuListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusVariant>("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [page, setPage] = useState(1);

  const counts = countByStatus(nhiemVuList);

  const filtered = useMemo(() => {
    return nhiemVuList.filter((n) => {
      if (statusFilter !== "all" && n.status !== statusFilter) return false;
      if (yearFilter !== "all" && String(n.nam) !== yearFilter) return false;
      if (programFilter !== "all" && n.chuongTrinh !== programFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!n.ten.toLowerCase().includes(q) && !n.ma.toLowerCase().includes(q) && !n.chuNhiem.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [search, statusFilter, yearFilter, programFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <PageShell breadcrumb="Nhiệm vụ / Danh sách nhiệm vụ" title="Danh sách nhiệm vụ">
      <FilterBar
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="🔍  Tìm kiếm theo tên, mã nhiệm vụ..."
        filters={[
          {
            label: "Trạng thái",
            value: statusFilter,
            onChange: (v) => { setStatusFilter(v as typeof statusFilter); setPage(1); },
            options: [
              { value: "all", label: "Tất cả trạng thái" },
              { value: "review", label: "Đang xét chọn" },
              { value: "signed", label: "Đã ký HĐ" },
              { value: "active", label: "Đang thực hiện" },
              { value: "done", label: "Hoàn thành" },
            ],
          },
          {
            label: "Năm",
            value: yearFilter,
            onChange: (v) => { setYearFilter(v); setPage(1); },
            options: [
              { value: "all", label: "Tất cả năm" },
              { value: "2023", label: "2023" },
              { value: "2024", label: "2024" },
              { value: "2025", label: "2025" },
              { value: "2026", label: "2026" },
            ],
          },
          {
            label: "Chương trình",
            value: programFilter,
            onChange: (v) => { setProgramFilter(v); setPage(1); },
            options: [
              { value: "all", label: "Tất cả chương trình" },
              { value: "KHCN cấp ĐHQG", label: "KHCN cấp ĐHQG" },
              { value: "Trọng điểm nhà nước", label: "Trọng điểm nhà nước" },
              { value: "NAFOSTED", label: "NAFOSTED" },
            ],
          },
        ]}
      />

      {/* Chip filter row */}
      <div className="my-4 flex flex-wrap gap-2">
        {([
          ["all", `Tất cả: ${counts.all}`],
          ["review", `Đang xét chọn: ${counts.review}`],
          ["signed", `Đã ký HĐ: ${counts.signed}`],
          ["active", `Đang thực hiện: ${counts.active}`],
          ["done", `Hoàn thành: ${counts.done}`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => { setStatusFilter(key); setPage(1); }}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold transition-all",
              chipColors[key],
              statusFilter === key && "ring-2 ring-offset-1 ring-current",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <DataTable columns={columns} rows={pageRows} />

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <p className="text-xs text-ink-700">
          Hiển thị {pageRows.length} / {filtered.length} nhiệm vụ
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={cn(
                "size-8 rounded-md border text-[13px] font-medium transition-colors",
                n === page
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-ink-300 bg-white text-ink-900 hover:bg-surface-page",
              )}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="flex h-8 items-center gap-1 rounded-md border border-ink-300 bg-white px-3 text-xs font-medium text-ink-700 hover:bg-surface-page disabled:opacity-50"
          >
            Tiếp <ChevronRight className="size-3" />
          </button>
        </div>
      </div>
    </PageShell>
  );
}
