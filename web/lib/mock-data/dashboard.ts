import type { TimelineEvent } from "@/components/shared/timeline";
import type { BarDatum } from "@/components/shared/bar-chart-mock";
import type { DonutSlice } from "@/components/shared/donut-chart-mock";
import { countByStatus, nhiemVuList } from "./nhiem-vu";

// Derive tất cả KPI/chart từ nhiemVuList để tránh drift số liệu.
const counts = countByStatus(nhiemVuList);

export const adminKpis = [
  { label: "Tổng nhiệm vụ",  value: counts.all,    delta: "+3 tháng này", accent: "brand"  as const },
  { label: "Đang xét chọn",  value: counts.review,                         accent: "brand"  as const },
  { label: "Đã ký HĐ",        value: counts.signed,                         accent: "signed" as const },
  { label: "Đang thực hiện",  value: counts.active,                         accent: "active" as const },
  { label: "Hoàn thành",      value: counts.done,                           accent: "done"   as const },
];

export const nkhKpis = [
  { label: "Nhiệm vụ của tôi", value: 4, accent: "brand"  as const },
  { label: "Đang thực hiện",    value: 2, accent: "active" as const },
  { label: "Hoàn thành",        value: 1, accent: "done"   as const },
  { label: "Hồ sơ chờ ký",      value: 1, accent: "signed" as const },
];

// Nhiệm vụ đăng ký theo năm — derive từ list.
export const nhiemVuByYear: BarDatum[] = (() => {
  const byYear: Record<number, number> = {};
  for (const n of nhiemVuList) byYear[n.nam] = (byYear[n.nam] ?? 0) + 1;
  const years = Object.keys(byYear).map(Number).sort();
  const palette = ["#93c5fd", "#60a5fa", "#3b82f6", "#003087"];
  return years.map((y, i) => ({
    label: String(y),
    value: byYear[y],
    color: palette[i % palette.length],
  }));
})();

// Kinh phí (triệu VND) theo chương trình — derive từ list.
export const kinhPhiByProgram: BarDatum[] = (() => {
  const byProgram: Record<string, number> = {};
  for (const n of nhiemVuList) {
    const mil = parseInt(n.kinhPhi) || 0;
    byProgram[n.chuongTrinh] = (byProgram[n.chuongTrinh] ?? 0) + mil;
  }
  const palette: Record<string, string> = {
    "KHCN cấp ĐHQG":       "#003087",
    "Trọng điểm nhà nước": "#1e4d8c",
    "NAFOSTED":            "#3b82f6",
  };
  return Object.entries(byProgram).map(([label, value]) => ({
    label: label === "Trọng điểm nhà nước" ? "Trọng điểm NN" : label,
    value,
    color: palette[label] ?? "#3b82f6",
  }));
})();

// Phân bố nhiệm vụ theo trạng thái (donut).
export const nhiemVuStatusBreakdown: DonutSlice[] = [
  { label: "Đang xét chọn", value: counts.review, color: "#3b82f6" },
  { label: "Đã ký HĐ",       value: counts.signed, color: "#10b981" },
  { label: "Đang thực hiện", value: counts.active, color: "#f59e0b" },
  { label: "Hoàn thành",     value: counts.done,   color: "#8b5cf6" },
];

export const adminRecentActivity: TimelineEvent[] = [
  { id: "a1", date: "15/04/2026", title: "Ký hợp đồng tài trợ TN-2026-001", description: "PGS.TS. Trần Văn Minh — Ứng dụng AI trong dự báo thời tiết", author: "Tổ chức chủ trì", type: "sign" },
  { id: "a2", date: "12/04/2026", title: "Duyệt hồ sơ đăng ký TN-2026-006", description: "TS. Phạm Thị Mai — Nghiên cứu pin thể rắn thế hệ mới", author: "Hội đồng xét chọn", type: "approve" },
  { id: "a3", date: "08/04/2026", title: "Nộp báo cáo tiến độ quý I", description: "5 nhiệm vụ đã gửi báo cáo kỳ", type: "report" },
  { id: "a4", date: "01/04/2026", title: "Tạo nhiệm vụ mới TN-2026-010", description: "GS.TS. Ngô Thị Lan — Nghiên cứu tế bào gốc điều trị tim mạch", type: "create" },
];
