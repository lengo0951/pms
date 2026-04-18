import type { TimelineEvent } from "@/components/shared/timeline";

export const nhatKyEvents: TimelineEvent[] = [
  { id: "e1",  date: "15/04/2026", title: "Ký hợp đồng tài trợ TN-2026-001", description: "Hợp đồng số HĐ-2026-001, giá trị 500 triệu VND", author: "PGS.TS. Nguyễn Văn A", type: "sign" },
  { id: "e2",  date: "12/04/2026", title: "Duyệt hồ sơ đăng ký TN-2026-006", description: "Hội đồng xét chọn thống nhất thông qua", author: "Hội đồng xét chọn",  type: "approve" },
  { id: "e3",  date: "05/04/2026", title: "Nhận đơn đăng ký TN-2026-010", description: "GS.TS. Ngô Thị Lan gửi hồ sơ đăng ký nhiệm vụ tế bào gốc", author: "Phòng KH&CN",       type: "create" },
  { id: "e4",  date: "28/03/2026", title: "Báo cáo tiến độ quý I/2026", description: "5 nhiệm vụ đã nộp báo cáo. 1 nhiệm vụ chậm tiến độ.", type: "report" },
];

// Task execution log entries (Figma 8:2 — richer format).
export type LogStatus = "done" | "in_progress";

export type LogEntry = {
  id: string;
  date: string;        // dd/mm/yyyy
  monthKey: string;    // "2026-03" for tab grouping
  title: string;
  description: string;
  reporter: string;
  status: LogStatus;
  highlighted?: boolean;
};

export const taskLogContext = {
  ma: "TN-2025-018",
  ten: "Nghiên cứu vật liệu nano ứng dụng trong công nghệ y sinh",
  chuNhiem: "TS. Nguyễn Thị Hà",
  thoiGian: "06/2025 – 06/2027",
  kinhPhi: "380 tr.",
  status: "Đang thực hiện" as const,
};

export const taskLogEntries: LogEntry[] = [
  {
    id: "l1",
    date: "25/03/2026",
    monthKey: "2026-03",
    title: "Hoàn thành tổng hợp mẫu vật liệu giai đoạn 1",
    description:
      "Đã thu thập và xử lý 150 mẫu nano-cellulose từ nguồn sinh khối tự nhiên. Kết quả sơ bộ cho thấy độ tinh khiết đạt 94.2%, vượt chỉ tiêu đặt ra.",
    reporter: "TS. Nguyễn Thị Hà",
    status: "done",
  },
  {
    id: "l2",
    date: "18/03/2026",
    monthKey: "2026-03",
    title: "Báo cáo kết quả thử nghiệm in vitro lần 1",
    description:
      "Hoàn thành 2/3 thử nghiệm in vitro. Kết quả sơ bộ tích cực với tỷ lệ tế bào sống sót 87%. Đang phân tích dữ liệu thống kê.",
    reporter: "TS. Nguyễn Thị Hà",
    status: "done",
    highlighted: true,
  },
  {
    id: "l3",
    date: "10/03/2026",
    monthKey: "2026-03",
    title: "Hội thảo khoa học nội bộ – Chia sẻ kết quả bước đầu",
    description:
      "Tổ chức hội thảo với 12 nhà khoa học tham dự. Nhận được 8 góp ý quan trọng để cải thiện phương pháp nghiên cứu.",
    reporter: "ThS. Lê Văn Hùng",
    status: "done",
  },
  {
    id: "l4",
    date: "05/03/2026",
    monthKey: "2026-03",
    title: "Cập nhật tiến độ giai đoạn 3 – Phân tích tính tương thích sinh học",
    description:
      "Đang thực hiện phân tích XRD và FTIR. Dự kiến hoàn thành cuối tháng 3/2026.",
    reporter: "TS. Nguyễn Thị Hà",
    status: "in_progress",
  },
];

export const availableMonths: { key: string; label: string }[] = [
  { key: "2026-03", label: "Tháng 3/2026" },
  { key: "2026-02", label: "Tháng 2/2026" },
  { key: "2026-01", label: "Tháng 1/2026" },
  { key: "2025-12", label: "Tháng 12/2025" },
];

export type Milestone = {
  id: string;
  title: string;
  dueDate: string;
  status: "completed" | "current" | "upcoming";
  progress: number;
};

export const milestones: Milestone[] = [
  { id: "m1", title: "Khảo sát tài liệu & tổng quan",       dueDate: "31/03/2026", status: "completed", progress: 100 },
  { id: "m2", title: "Thiết kế mô hình & thu thập dữ liệu", dueDate: "30/06/2026", status: "completed", progress: 100 },
  { id: "m3", title: "Huấn luyện mô hình & đánh giá",       dueDate: "30/09/2026", status: "current",   progress: 62  },
  { id: "m4", title: "Triển khai thử nghiệm",                dueDate: "31/12/2026", status: "upcoming",  progress: 0   },
  { id: "m5", title: "Viết báo cáo & nghiệm thu",            dueDate: "31/03/2027", status: "upcoming",  progress: 0   },
];
