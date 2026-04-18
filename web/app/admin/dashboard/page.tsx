import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  Megaphone,
  Zap,
  FilePlus2,
  ListChecks,
  FileSignature,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { countByStatus, nhiemVuList } from "@/lib/mock-data/nhiem-vu";
import {
  adminCallingPrograms,
  programStatusStyle,
} from "@/lib/mock-data/admin-programs";
import { orgProfile, orgBank, orgVerification } from "@/lib/mock-data/organization";

type QuickAction = {
  label: string;
  href: string;
  icon: typeof FilePlus2;
  bg: string;
  iconBg: string;
  iconColor: string;
};

const quickActions: QuickAction[] = [
  {
    label: "Đăng ký nhiệm vụ mới",
    href: "/admin/nhiem-vu",
    icon: FilePlus2,
    bg: "bg-blue-50 hover:bg-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Xem danh sách nhiệm vụ",
    href: "/admin/nhiem-vu",
    icon: ListChecks,
    bg: "bg-violet-50 hover:bg-violet-100",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Ký kết hợp đồng",
    href: "/admin/ky-ket-hop-dong/1",
    icon: FileSignature,
    bg: "bg-emerald-50 hover:bg-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

export default function AdminDashboardPage() {
  const counts = countByStatus(nhiemVuList);

  return (
    <PageShell breadcrumb="Trang chủ / Tổng quan" title="Tổng quan">
      {/* Welcome banner */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">
          Chào mừng trở lại, Tổ chức Chủ trì! <span aria-hidden>👋</span>
        </h1>
        <p className="mt-1 text-sm text-ink-700">
          Theo dõi tổng quan các nhiệm vụ khoa học &amp; công nghệ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT — stats + table + quick actions */}
        <div className="space-y-6">
          {/* 2 stat cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatAccentCard
              label="Đang xét chọn"
              value={counts.review}
              delta="1 mới"
              accent="blue"
            />
            <StatAccentCard
              label="Đã ký hợp đồng"
              value={counts.signed}
              delta="Ổn định"
              accent="emerald"
            />
          </section>

          {/* Chương trình đang kêu gọi */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Megaphone aria-hidden className="size-4 text-brand-700" />
                Chương trình đang kêu gọi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-[12px]">
                <thead className="bg-surface-muted">
                  <tr>
                    <th className="h-11 px-5 text-left text-[11px] font-semibold text-ink-700">
                      Tên chương trình
                    </th>
                    <th className="h-11 px-3 text-left text-[11px] font-semibold text-ink-700 w-28">
                      Hạn nộp
                    </th>
                    <th className="h-11 px-3 text-left text-[11px] font-semibold text-ink-700 w-28">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adminCallingPrograms.map((p, i) => {
                    const s = programStatusStyle[p.status];
                    return (
                      <tr
                        key={p.id}
                        className={cn("h-12 border-t border-ink-300", i % 2 === 1 && "bg-surface-stripe")}
                      >
                        <td className="px-5 text-ink-900">{p.name}</td>
                        <td className="px-3 text-ink-700">{p.deadline}</td>
                        <td className="px-3">
                          <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold", s.bg, s.fg)}>
                            {s.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Thao tác nhanh */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap aria-hidden className="size-4 text-amber-500" />
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.label}
                    href={a.href}
                    className={cn("flex items-center gap-3 rounded-xl p-4 transition-colors", a.bg)}
                  >
                    <span className={cn("flex size-10 items-center justify-center rounded-lg shrink-0", a.iconBg)}>
                      <Icon aria-hidden className={cn("size-5", a.iconColor)} />
                    </span>
                    <span className="text-xs font-semibold text-ink-900">{a.label}</span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT — Thông tin cơ bản + Ngân hàng + Trạng thái */}
        <aside className="space-y-6">
          {/* Thông tin cơ bản */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <CardHeader className="border-b border-ink-300 pb-3">
              <CardTitle className="text-sm font-semibold">Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-5">
              <InfoRow label="Tên tổ chức" value={orgProfile.name} span={2} />
              <InfoRow label="Mã số thuế" value={orgProfile.taxCode} />
              <InfoRow label="Năm thành lập" value={String(orgProfile.foundedYear)} />
              <InfoRow label="Địa chỉ" value={orgProfile.address} span={2} />
              <InfoRow label="Người đại diện pháp lý" value={orgProfile.representative} />
              <InfoRow label="Chức danh" value={orgProfile.position} />
            </CardContent>
          </Card>

          {/* Thông tin ngân hàng */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <CardHeader className="border-b border-ink-300 pb-3">
              <CardTitle className="text-sm font-semibold">Thông tin tài khoản ngân hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-5">
              <InfoRow label="Tên tài khoản" value={orgBank.accountName} />
              <InfoRow label="Số tài khoản" value={orgBank.accountNumber} mono />
              <InfoRow label="Ngân hàng" value={orgBank.bank} />
              <InfoRow label="Tỉnh/Thành phố" value={orgBank.province} />
            </CardContent>
          </Card>

          {/* Trạng thái hồ sơ */}
          <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <BadgeCheck aria-hidden className="size-4 text-brand-700" />
              <span className="text-xs font-medium text-ink-900">Trạng thái hồ sơ:</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 aria-hidden className="size-3" />
                {orgVerification.label}
              </span>
            </div>
            <span className="text-[10px] text-ink-500">
              Cập nhật lần cuối: {orgVerification.lastUpdated}
            </span>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

// Left-accent bar stat card (Figma 02 layout).
function StatAccentCard({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: number;
  delta: string;
  accent: "blue" | "emerald";
}) {
  const accentBar = accent === "blue" ? "bg-blue-500" : "bg-emerald-500";
  const deltaColor = accent === "blue" ? "text-blue-600" : "text-emerald-600";
  const deltaIcon = accent === "blue" ? "↑" : "→";

  return (
    <div className="flex items-stretch gap-4 rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <div className={cn("w-1 shrink-0 rounded-full", accentBar)} />
      <div className="flex-1">
        <p className="text-xs text-ink-700">{label}</p>
        <p className="mt-1 text-4xl font-bold text-ink-900">{value}</p>
        <p className={cn("mt-2 flex items-center gap-1 text-[11px] font-medium", deltaColor)}>
          <span aria-hidden>{deltaIcon}</span> {delta}
        </p>
      </div>
    </div>
  );
}

// Grid info row for org info cards.
function InfoRow({
  label,
  value,
  mono,
  span = 1,
}: {
  label: string;
  value: string;
  mono?: boolean;
  span?: 1 | 2;
}) {
  return (
    <div className={cn(span === 2 && "col-span-2")}>
      <p className="text-[10px] text-ink-500">{label}</p>
      <p className={cn("mt-0.5 text-xs text-ink-900", mono && "font-mono")}>{value}</p>
    </div>
  );
}

// unused re-export to keep lucide tree-shake deterministic
export const _icons = { TrendingUp, ArrowRight };
