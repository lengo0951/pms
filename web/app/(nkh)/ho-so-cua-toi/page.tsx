import Link from "next/link";
import { FolderArchive } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { StatusChip } from "@/components/shared/status-chip";
import { myDossiers } from "@/lib/mock-data/nkh-dashboard";

export default function HoSoCuaToiPage() {
  return (
    <PageShell breadcrumb="PMS / Hồ sơ của tôi" title="Hồ sơ của tôi" userInitials="NA">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-700">Tất cả hồ sơ đã nộp & đang soạn thảo</p>
        <Link
          href="/dang-ky/thong-tin-chung"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
        >
          + Tạo hồ sơ mới
        </Link>
      </div>

      <div className="rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <ul className="divide-y divide-ink-300">
          {myDossiers.map((d) => (
            <li key={d.id} className="flex items-center gap-4 px-6 py-4">
              <FolderArchive aria-hidden className="size-5 text-emerald-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900">{d.ten}</p>
                <p className="text-xs text-ink-500">{d.program}</p>
              </div>
              <StatusChip variant={d.status} label={d.statusLabel} />
              <button type="button" className="rounded-md border border-ink-300 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-surface-page">
                Chi tiết
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
