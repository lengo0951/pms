import { CalendarCheck, CalendarClock, Target } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { StatusChip } from "@/components/shared/status-chip";
import { milestones } from "@/lib/mock-data/nhat-ky";
import { cn } from "@/lib/utils";

const milestoneStatusColor: Record<string, string> = {
  completed: "bg-[#10b981]",
  current:   "bg-brand-700",
  upcoming:  "bg-ink-300",
};

export default function TheoDoiPage() {
  const completed = milestones.filter((m) => m.status === "completed").length;
  const overall = Math.round(milestones.reduce((s, m) => s + m.progress, 0) / milestones.length);

  return (
    <PageShell breadcrumb="Nhiệm vụ / Theo dõi nhiệm vụ" title="Theo dõi nhiệm vụ">
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Mốc hoàn thành" value={`${completed}/${milestones.length}`} icon={CalendarCheck} accent="done" />
        <StatCard label="Tiến độ tổng thể" value={`${overall}%`} icon={Target} accent="brand" />
        <StatCard label="Hạn chót kế tiếp" value="30/09/2026" icon={CalendarClock} accent="active" />
      </section>

      <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <CardHeader>
          <CardTitle className="text-base">Nhiệm vụ: TN-2026-001 — Ứng dụng AI trong dự báo thời tiết</CardTitle>
          <p className="text-xs text-ink-500">PGS.TS. Trần Văn Minh · Trường ĐH KHTN · 2026–2028</p>
        </CardHeader>
        <CardContent className="space-y-0">
          {milestones.map((m, idx) => (
            <div key={m.id} className={cn("flex gap-4 py-5", idx < milestones.length - 1 && "border-b border-ink-300")}>
              <div className={cn("mt-1 size-4 shrink-0 rounded-full", milestoneStatusColor[m.status])} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{m.title}</p>
                    <p className="text-xs text-ink-500">Hạn: {m.dueDate}</p>
                  </div>
                  <StatusChip
                    variant={m.status === "completed" ? "done" : m.status === "current" ? "active" : "draft"}
                    label={m.status === "completed" ? "Hoàn thành" : m.status === "current" ? "Đang thực hiện" : "Sắp tới"}
                  />
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-page">
                    <div
                      className="h-full bg-brand-500 transition-all"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-[11px] font-medium text-ink-700">{m.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
