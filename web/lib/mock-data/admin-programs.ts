export type ProgramStatus = "open" | "upcoming" | "closed";

export type AdminProgram = {
  id: string;
  name: string;
  deadline: string; // dd/mm/yyyy
  status: ProgramStatus;
};

// Chương trình đang kêu gọi hiển thị dashboard admin (Figma 02 dashboard).
export const adminCallingPrograms: AdminProgram[] = [
  { id: "p1", name: "Nghiên cứu cơ bản – KH Tự nhiên 2026",    deadline: "31/03/2026", status: "open" },
  { id: "p2", name: "Nghiên cứu ứng dụng - Công nghệ TT 2026", deadline: "15/04/2026", status: "open" },
  { id: "p3", name: "Chương trình KH&CN cấp Quốc gia 2026",    deadline: "30/04/2026", status: "upcoming" },
  { id: "p4", name: "Tài trợ dự án đổi mới sáng tạo 2026",      deadline: "01/05/2026", status: "open" },
  { id: "p5", name: "Hợp tác Quốc tế trong NC khoa học",         deadline: "20/04/2026", status: "open" },
];

export const programStatusStyle: Record<ProgramStatus, { label: string; bg: string; fg: string }> = {
  open:     { label: "Đang mở",    bg: "bg-emerald-100", fg: "text-emerald-700" },
  upcoming: { label: "Sắp mở",     bg: "bg-amber-100",   fg: "text-amber-700" },
  closed:   { label: "Đã đóng",    bg: "bg-zinc-100",    fg: "text-zinc-600" },
};
