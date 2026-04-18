import type { WizardTab } from "@/components/shared/wizard-tabs";

// NKH wizard — only flow đăng ký. Admin không có wizard (admin chỉ xem).
export const nkhWizardTabs: WizardTab[] = [
  { id: "thong-tin-chung", label: "Thông tin chung" },
  { id: "thuyet-minh",     label: "Thuyết minh & TL" },
  { id: "thanh-vien",      label: "Danh sách TV" },
  { id: "nop-ho-so",       label: "Nộp hồ sơ" },
];

export function nextTabId(tabs: WizardTab[], currentId: string): string | null {
  const idx = tabs.findIndex((t) => t.id === currentId);
  if (idx === -1 || idx === tabs.length - 1) return null;
  return tabs[idx + 1].id;
}

export function prevTabId(tabs: WizardTab[], currentId: string): string | null {
  const idx = tabs.findIndex((t) => t.id === currentId);
  if (idx <= 0) return null;
  return tabs[idx - 1].id;
}
