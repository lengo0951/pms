"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTable, type Column } from "@/components/shared/data-table";
import { StatusChip } from "@/components/shared/status-chip";
import { nhiemVuList, type NhiemVu } from "@/lib/mock-data/nhiem-vu";

// Chỉ hiện nhiệm vụ đã ký HĐ (signed/active/done) — biến thể của danh sách nhiệm vụ.
const fundedStatuses: NhiemVu["status"][] = ["signed", "active", "done"];

const columns: Column<NhiemVu & { disbursed: string; tienDo: number }>[] = [
  { key: "stt",      header: "STT", width: "56px", render: (r) => r.stt },
  { key: "ma",       header: "Mã NV", width: "120px", render: (r) => <span className="font-mono">{r.ma}</span> },
  { key: "ten",      header: "Tên nhiệm vụ", render: (r) => <span className="font-medium">{r.ten}</span> },
  { key: "chuNhiem", header: "Chủ nhiệm", width: "180px", render: (r) => r.chuNhiem },
  { key: "kinhPhi",  header: "Kinh phí", width: "110px", align: "right", render: (r) => r.kinhPhi },
  { key: "disb",     header: "Đã giải ngân", width: "120px", align: "right", render: (r) => r.disbursed },
  {
    key: "prog",
    header: "Tiến độ",
    width: "160px",
    render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-page">
          <div className="h-full bg-brand-500" style={{ width: `${r.tienDo}%` }} />
        </div>
        <span className="text-[11px] text-ink-700">{r.tienDo}%</span>
      </div>
    ),
  },
  { key: "status", header: "Trạng thái", width: "140px", render: (r) => <StatusChip variant={r.status} /> },
];

function simulateFunded(n: NhiemVu) {
  const tienDo = n.status === "done" ? 100 : n.status === "active" ? 60 : 30;
  const amount = parseInt(n.kinhPhi);
  const disb = Math.round((amount * tienDo) / 100);
  return { ...n, tienDo, disbursed: `${disb} tr.` };
}

export default function NhiemVuTaiTroPage() {
  const [search, setSearch] = useState("");
  const rows = useMemo(() => {
    return nhiemVuList
      .filter((n) => fundedStatuses.includes(n.status))
      .filter((n) => !search || n.ten.toLowerCase().includes(search.toLowerCase()) || n.ma.toLowerCase().includes(search.toLowerCase()))
      .map(simulateFunded);
  }, [search]);

  return (
    <PageShell breadcrumb="Nhiệm vụ / Nhiệm vụ được tài trợ" title="Nhiệm vụ được tài trợ">
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="🔍  Tìm kiếm nhiệm vụ..." />
      <div className="mt-4">
        <DataTable columns={columns} rows={rows} />
      </div>
    </PageShell>
  );
}
