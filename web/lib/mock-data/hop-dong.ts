import type { StatusVariant } from "@/lib/tokens";

export type HopDong = {
  id: string;
  stt: number;
  soHd: string;
  nhiemVuMa: string;
  nhiemVuTen: string;
  ngayKy: string;
  giaTri: string;
  benKy: string;
  status: StatusVariant;
};

export const hopDongList: HopDong[] = [
  { id: "c1", stt: 1, soHd: "HĐ-2026-001", nhiemVuMa: "TN-2026-001", nhiemVuTen: "Ứng dụng AI trong dự báo thời tiết",     ngayKy: "15/04/2026", giaTri: "500 tr.", benKy: "ĐHQG-HCM", status: "signed" },
  { id: "c2", stt: 2, soHd: "HĐ-2025-018", nhiemVuMa: "TN-2025-018", nhiemVuTen: "Nghiên cứu vật liệu nano ứng dụng",     ngayKy: "20/06/2025", giaTri: "380 tr.", benKy: "ĐHQG-HCM", status: "active" },
  { id: "c3", stt: 3, soHd: "HĐ-2025-012", nhiemVuMa: "TN-2025-012", nhiemVuTen: "Hệ thống IoT quản lý năng lượng",       ngayKy: "10/01/2025", giaTri: "420 tr.", benKy: "ĐHQG-HCM", status: "signed" },
  { id: "c4", stt: 4, soHd: "HĐ-2024-033", nhiemVuMa: "TN-2024-033", nhiemVuTen: "Phát triển vaccine COVID thế hệ mới",    ngayKy: "05/06/2024", giaTri: "800 tr.", benKy: "Bộ KH&CN",  status: "active" },
  { id: "c5", stt: 5, soHd: "HĐ-2025-030", nhiemVuMa: "TN-2025-030", nhiemVuTen: "Hệ thống xử lý ngôn ngữ tiếng Việt",     ngayKy: "15/03/2025", giaTri: "280 tr.", benKy: "ĐHQG-HCM", status: "signed" },
  { id: "c6", stt: 6, soHd: "HĐ-2026-010", nhiemVuMa: "TN-2026-010", nhiemVuTen: "Nghiên cứu tế bào gốc điều trị tim mạch", ngayKy: "08/05/2026", giaTri: "900 tr.", benKy: "Bộ KH&CN",  status: "signed" },
  { id: "c7", stt: 7, soHd: "HĐ-2025-099", nhiemVuMa: "TN-2025-099", nhiemVuTen: "Nghiên cứu robot dịch vụ y tế",           ngayKy: "25/02/2025", giaTri: "480 tr.", benKy: "ĐHQG-HCM", status: "signed" },
];
