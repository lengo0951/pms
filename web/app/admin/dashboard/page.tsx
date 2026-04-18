import {
  LayoutDashboard,
  ClipboardList,
  FileSignature,
  Activity,
  CircleCheckBig,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { StatCard } from "@/components/shared/stat-card";
import { Timeline } from "@/components/shared/timeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/shared/status-chip";
import { BarChartMock } from "@/components/shared/bar-chart-mock";
import { DonutChartMock } from "@/components/shared/donut-chart-mock";
import {
  adminKpis,
  adminRecentActivity,
  nhiemVuByYear,
  kinhPhiByProgram,
  nhiemVuStatusBreakdown,
} from "@/lib/mock-data/dashboard";
import { nhiemVuList } from "@/lib/mock-data/nhiem-vu";

const kpiIcons = [LayoutDashboard, ClipboardList, FileSignature, Activity, CircleCheckBig];

export default function AdminDashboardPage() {
  const upcoming = nhiemVuList.filter((n) => n.status === "review" || n.status === "active").slice(0, 5);

  return (
    <PageShell breadcrumb="Trang chủ / Tổng quan" title="Tổng quan">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {adminKpis.map((kpi, i) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            accent={kpi.accent}
            icon={kpiIcons[i]}
          />
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Số nhiệm vụ đăng ký theo năm</CardTitle>
            <p className="text-xs text-ink-500">Thống kê từ 2023–2026</p>
          </CardHeader>
          <CardContent>
            <BarChartMock data={nhiemVuByYear} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Phân bố theo trạng thái</CardTitle>
            <p className="text-xs text-ink-500">Tổng số nhiệm vụ hiện có</p>
          </CardHeader>
          <CardContent>
            <DonutChartMock data={nhiemVuStatusBreakdown} centerLabel="nhiệm vụ" />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Kinh phí theo chương trình</CardTitle>
            <p className="text-xs text-ink-500">Đơn vị: triệu VND</p>
          </CardHeader>
          <CardContent>
            <BarChartMock data={kinhPhiByProgram} unit=" tr." height={200} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline events={adminRecentActivity} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Nhiệm vụ đang xét chọn / thực hiện</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {upcoming.length === 0 ? (
              <p className="p-6 text-center text-sm text-ink-500">
                Không có nhiệm vụ đang xét chọn hay đang thực hiện.
              </p>
            ) : (
              <ul className="divide-y divide-ink-300">
                {upcoming.map((n) => (
                  <li key={n.id} className="flex items-center gap-4 px-6 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">{n.ten}</p>
                      <p className="text-xs text-ink-500">{n.ma} · {n.chuNhiem}</p>
                    </div>
                    <p className="text-xs text-ink-700">{n.kinhPhi}</p>
                    <StatusChip variant={n.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
