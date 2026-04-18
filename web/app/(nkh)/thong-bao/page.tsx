import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

type Notif = {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  body: string;
  time: string;
  read?: boolean;
};

const notifications: Notif[] = [
  { id: "n1", type: "success", title: "Hồ sơ TN-2026-001 đã được phê duyệt", body: "Hội đồng xét chọn đã thông qua hồ sơ của bạn. Tiếp theo: ký hợp đồng.", time: "2 giờ trước" },
  { id: "n2", type: "warning",  title: "Sắp đến hạn nộp hồ sơ NCUD 2025 - Đợt 2", body: "Còn 3 ngày để hoàn thiện và nộp hồ sơ. Hạn chót: 30/06/2025.", time: "1 ngày trước" },
  { id: "n3", type: "info",     title: "Cập nhật biểu mẫu NCUD01 v2.1", body: "Vui lòng tải lại biểu mẫu Thuyết minh KH&CN phiên bản mới nhất.", time: "3 ngày trước", read: true },
];

const style = {
  success: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  warning: { icon: AlertTriangle, color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200" },
  info:    { icon: Info,          color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200" },
} as const;

export default function ThongBaoPage() {
  return (
    <PageShell breadcrumb="PMS / Thông báo" title="Thông báo hệ thống" userInitials="NA">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-700">
          <Bell aria-hidden className="mr-1 inline size-4 text-emerald-600" />
          {notifications.filter((n) => !n.read).length} thông báo chưa đọc
        </p>
        <button type="button" className="text-xs font-medium text-emerald-600 hover:underline">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const s = style[n.type];
          const Icon = s.icon;
          return (
            <div key={n.id} className={`flex gap-3 rounded-xl border ${s.border} ${s.bg} p-4 ${n.read ? "opacity-60" : ""}`}>
              <Icon aria-hidden className={`mt-0.5 size-5 shrink-0 ${s.color}`} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{n.title}</p>
                <p className="mt-1 text-xs text-ink-700">{n.body}</p>
                <p className="mt-2 text-[11px] text-ink-500">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
