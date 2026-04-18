// Brand tokens mirror — use for TS code where CSS vars not ergonomic.
export const brand = {
  50:  "#e8f4fd",
  100: "#dbeafe",
  200: "#93c5fd",
  300: "#60a5fa",
  400: "#3b82f6",
  500: "#0055b3",
  600: "#1e4d8c",
  700: "#003087",
  800: "#002070",
} as const;

export type StatusVariant = "review" | "signed" | "active" | "done" | "draft";

export const statusLabels: Record<StatusVariant, string> = {
  review: "Đang xét chọn",
  signed: "Đã ký HĐ",
  active: "Đang thực hiện",
  done: "Hoàn thành",
  draft: "Bản nháp",
};
