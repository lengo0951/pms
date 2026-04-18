"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, FileSignature } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTable, type Column } from "@/components/shared/data-table";
import { StatusChip } from "@/components/shared/status-chip";
import { LinkButton } from "@/components/ui/link-button";
import { hopDongList, type HopDong } from "@/lib/mock-data/hop-dong";

const columns: Column<HopDong>[] = [
  { key: "stt",        header: "STT",         width: "56px",  render: (r) => r.stt },
  { key: "soHd",       header: "Số hợp đồng", width: "140px", render: (r) => <span className="font-mono font-semibold">{r.soHd}</span> },
  { key: "nhiemVu",    header: "Nhiệm vụ",                     render: (r) => (
      <div>
        <p className="font-medium">{r.nhiemVuTen}</p>
        <p className="text-[11px] text-ink-500 font-mono">{r.nhiemVuMa}</p>
      </div>
    )
  },
  { key: "ngayKy",  header: "Ngày ký",    width: "120px", render: (r) => r.ngayKy },
  { key: "giaTri",  header: "Giá trị",    width: "100px", align: "right", render: (r) => r.giaTri },
  { key: "benKy",   header: "Bên ký",     width: "120px", render: (r) => r.benKy },
  { key: "status",  header: "Trạng thái", width: "140px", render: (r) => <StatusChip variant={r.status} /> },
  {
    key: "actions",
    header: "Thao tác",
    width: "130px",
    render: (r) => (
      <Link
        href={`/admin/ky-ket-hop-dong/3?hd=${r.id}`}
        className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700 hover:bg-brand-100"
      >
        <FileSignature className="size-3" /> Quản lý
      </Link>
    ),
  },
];

export default function HopDongPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return hopDongList.filter((h) => {
      if (status !== "all" && h.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!h.nhiemVuTen.toLowerCase().includes(q) && !h.soHd.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, status]);

  return (
    <PageShell breadcrumb="Nhiệm vụ / Hợp đồng tài trợ" title="Hợp đồng tài trợ">
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="🔍  Tìm theo số HĐ, tên nhiệm vụ..."
        filters={[
          {
            label: "Trạng thái",
            value: status,
            onChange: setStatus,
            options: [
              { value: "all", label: "Tất cả trạng thái" },
              { value: "signed", label: "Đã ký HĐ" },
              { value: "active", label: "Đang thực hiện" },
              { value: "done", label: "Hoàn thành" },
            ],
          },
        ]}
        primaryAction={
          <LinkButton
            href="/admin/ky-ket-hop-dong/1"
            className="bg-brand-700 text-white hover:bg-brand-800"
          >
            <Plus className="mr-1 size-4" /> Ký hợp đồng mới
          </LinkButton>
        }
      />
      <div className="mt-4">
        <DataTable columns={columns} rows={filtered} />
      </div>
    </PageShell>
  );
}
