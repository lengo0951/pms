import Link from "next/link";
import { BarChart3, ClipboardList, Clock4, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { StatusChip } from "@/components/shared/status-chip";
import { ProgramCardList } from "@/components/nkh/program-card-list";
import { cn } from "@/lib/utils";
import {
  programsOpen,
  myDossiers,
  nkhStats,
  quickActions,
} from "@/lib/mock-data/nkh-dashboard";

const statColor = {
  emerald: { bar: "bg-emerald-500", text: "text-emerald-600" },
  blue:    { bar: "bg-blue-500",    text: "text-blue-600" },
  amber:   { bar: "bg-amber-500",   text: "text-amber-600" },
  teal:    { bar: "bg-teal-500",    text: "text-teal-600" },
} as const;

// Rotate icons across KPI cards (theo Figma — mỗi card 1 icon khác).
const kpiIcons = [ClipboardList, BarChart3, Clock4, CheckCircle2];

type SearchParams = { signed?: string };

export default async function NkhDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const justSigned = params.signed === "1";

  return (
    <PageShell breadcrumb="PMS / Trang chủ" title="Trang chủ" userInitials="NA">
      {justSigned && (
        <div role="status" className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500 bg-emerald-50 p-4">
          <CheckCircle2 aria-hidden className="size-5 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold text-ink-900">Hồ sơ đã được ký và gửi thành công!</p>
            <p className="text-xs text-ink-700">Kết quả xét duyệt sẽ được thông báo qua email.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        {/* MAIN */}
        <div className="space-y-6">
          {/* Stat cards */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {nkhStats.map((s, i) => {
              const c = statColor[s.accent];
              const Icon = kpiIcons[i];
              return (
                <div key={s.label} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                  <div className={cn("h-full w-1 shrink-0 rounded-full", c.bar)} />
                  <div>
                    <Icon aria-hidden className={cn("size-5", c.text)} />
                    <p className={cn("mt-2 text-3xl font-bold", c.text)}>{s.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-ink-700">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Chuong trinh dang mo */}
          <section className="rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-ink-900">Chương trình đang mở</h2>
              <p className="text-xs text-ink-500">Nhấn &ldquo;Đăng ký&rdquo; để nộp hồ sơ tham gia</p>
            </div>
            <ProgramCardList programs={programsOpen} />
          </section>

          {/* Ho so cua toi */}
          <section className="rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <h2 className="mb-4 text-base font-semibold text-ink-900">Hồ sơ của tôi</h2>
            <ul className="divide-y divide-ink-300">
              {myDossiers.map((d) => (
                <li key={d.id} className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{d.ten}</p>
                    <p className="text-xs text-ink-500">{d.program}</p>
                  </div>
                  <StatusChip variant={d.status} label={d.statusLabel} />
                  <Link
                    href="/ho-so-cua-toi"
                    className="rounded-md border border-ink-300 bg-white px-3 py-1 text-[11px] font-medium text-ink-700 hover:bg-surface-page"
                  >
                    Xem
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* SIDE — Thao tac nhanh */}
        <aside className="h-fit rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <h2 className="mb-4 text-base font-semibold text-ink-900">Thao tác nhanh</h2>
          <div className="space-y-3">
            {quickActions.map((a, i) => {
              const href =
                a.primary ? "/dang-ky/thong-tin-chung" :
                i === 1 ? "/ho-so-cua-toi" :
                i === 2 ? "/ho-so-cua-toi" :
                i === 3 ? "/thong-bao" :
                "/chuong-trinh-mo";
              return (
                <Link
                  key={i}
                  href={href}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors",
                    a.bg,
                    a.text,
                  )}
                >
                  <span aria-hidden>{a.icon}</span>
                  {a.label}
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
