import type { StatusVariant } from "@/lib/tokens";

export type ProgramOpen = {
  id: string;
  code: string;
  ten: string;
  han: string;
  // tailwind classes for left-accent bar + button per Figma.
  accent: "green" | "purple" | "amber";
};

export const programsOpen: ProgramOpen[] = [
  {
    id: "p1",
    code: "NCUD 2025 - Đợt 1",
    ten: "Ứng dụng khoa học công nghệ vào thực tiễn sản xuất",
    han: "15/05/2025",
    accent: "green",
  },
  {
    id: "p2",
    code: "NCUD 2025 - Đợt 2",
    ten: "Nghiên cứu ứng dụng công nghệ tiên tiến",
    han: "30/06/2025",
    accent: "purple",
  },
  {
    id: "p3",
    code: "KHCB 2025",
    ten: "Khoa học cơ bản trong các lĩnh vực ưu tiên",
    han: "20/04/2025",
    accent: "amber",
  },
];

export type MyDossier = {
  id: string;
  ten: string;
  program: string;
  status: StatusVariant;
  statusLabel: string;
};

export const myDossiers: MyDossier[] = [
  {
    id: "d1",
    ten: "Nghiên cứu vật liệu nano trong y sinh...",
    program: "NCUD 2024 - Đợt 2",
    status: "active",
    statusLabel: "Đang xử lý",
  },
  {
    id: "d2",
    ten: "Ứng dụng AI trong chẩn đoán hình ảnh y tế...",
    program: "NCUD 2024 - Đợt 1",
    status: "done",
    statusLabel: "Đã phê duyệt",
  },
];

export const nkhStats = [
  { label: "Chương trình đang mở", value: 4, accent: "emerald" as const },
  { label: "Hồ sơ đã nộp",          value: 2, accent: "blue" as const },
  { label: "Đang xử lý",             value: 1, accent: "amber" as const },
  { label: "Đã phê duyệt",           value: 1, accent: "teal" as const },
];

export type QuickAction = {
  label: string;
  icon: string;
  bg: string;
  text: string;
  primary?: boolean;
};

export const quickActions: QuickAction[] = [
  { label: "Đăng ký nhiệm vụ",  icon: "✎",  bg: "bg-emerald-600 hover:bg-emerald-700", text: "text-white", primary: true },
  { label: "Xem hồ sơ của tôi", icon: "📋", bg: "bg-violet-100 hover:bg-violet-200", text: "text-violet-800" },
  { label: "Theo dõi tiến độ",   icon: "📊", bg: "bg-teal-100 hover:bg-teal-200", text: "text-teal-800" },
  { label: "Thông báo hệ thống", icon: "🔔", bg: "bg-amber-100 hover:bg-amber-200", text: "text-amber-800" },
  { label: "Tải mẫu biểu",       icon: "📥", bg: "bg-pink-100 hover:bg-pink-200", text: "text-pink-800" },
];
