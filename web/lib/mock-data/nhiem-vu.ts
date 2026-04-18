import type { StatusVariant } from "@/lib/tokens";

export type NhiemVu = {
  id: string;
  stt: number;
  ma: string;
  ten: string;
  chuNhiem: string;
  thoiGian: string;
  kinhPhi: string; // formatted: "500 tr."
  status: StatusVariant;
  chuongTrinh: string;
  nam: number;
  donVi: string;
};

// Realistic sample from Figma + expansion to 15 rows for pagination demo.
export const nhiemVuList: NhiemVu[] = [
  { id: "1",  stt: 1,  ma: "TN-2026-001", ten: "Ứng dụng AI trong dự báo thời tiết",        chuNhiem: "PGS.TS. Trần Văn Minh",  thoiGian: "01/2026 – 12/2027", kinhPhi: "500 tr.", status: "review", chuongTrinh: "KHCN cấp ĐHQG", nam: 2026, donVi: "Trường ĐH KHTN" },
  { id: "2",  stt: 2,  ma: "TN-2025-018", ten: "Nghiên cứu vật liệu nano ứng dụng",        chuNhiem: "TS. Nguyễn Thị Hà",     thoiGian: "06/2025 – 06/2027", kinhPhi: "380 tr.", status: "active", chuongTrinh: "KHCN cấp ĐHQG", nam: 2025, donVi: "Trường ĐH Bách khoa" },
  { id: "3",  stt: 3,  ma: "TN-2025-012", ten: "Hệ thống IoT quản lý năng lượng",          chuNhiem: "PGS.TS. Lê Đình Tuấn",   thoiGian: "01/2025 – 12/2026", kinhPhi: "420 tr.", status: "signed", chuongTrinh: "KHCN cấp ĐHQG", nam: 2025, donVi: "Trường ĐH Bách khoa" },
  { id: "4",  stt: 4,  ma: "TN-2024-033", ten: "Phát triển vaccine COVID thế hệ mới",       chuNhiem: "GS.TS. Phạm Văn An",     thoiGian: "06/2024 – 06/2026", kinhPhi: "800 tr.", status: "active", chuongTrinh: "Trọng điểm nhà nước", nam: 2024, donVi: "Trường ĐH Y Dược" },
  { id: "5",  stt: 5,  ma: "TN-2024-021", ten: "Nghiên cứu blockchain trong ngân hàng",     chuNhiem: "TS. Hoàng Minh Tuấn",    thoiGian: "01/2024 – 12/2025", kinhPhi: "250 tr.", status: "done",   chuongTrinh: "KHCN cấp ĐHQG", nam: 2024, donVi: "Trường ĐH CNTT" },
  { id: "6",  stt: 6,  ma: "TN-2024-007", ten: "Ứng dụng ML trong y học chẩn đoán",         chuNhiem: "PGS.TS. Trần Thanh Long", thoiGian: "06/2023 – 06/2025", kinhPhi: "600 tr.", status: "done",   chuongTrinh: "Trọng điểm nhà nước", nam: 2023, donVi: "Trường ĐH Y Dược" },
  { id: "7",  stt: 7,  ma: "TN-2026-003", ten: "Nghiên cứu quang tử học ứng dụng",          chuNhiem: "TS. Nguyễn Văn Bình",    thoiGian: "04/2026 – 04/2028", kinhPhi: "350 tr.", status: "review", chuongTrinh: "KHCN cấp ĐHQG", nam: 2026, donVi: "Trường ĐH KHTN" },
  { id: "8",  stt: 8,  ma: "TN-2023-044", ten: "Phân tích rủi ro môi trường biển",          chuNhiem: "GS.TS. Lê Văn Cường",    thoiGian: "01/2023 – 12/2024", kinhPhi: "450 tr.", status: "done",   chuongTrinh: "NAFOSTED", nam: 2023, donVi: "Trường ĐH KHTN" },
  { id: "9",  stt: 9,  ma: "TN-2026-006", ten: "Nghiên cứu pin thể rắn thế hệ mới",         chuNhiem: "TS. Phạm Thị Mai",       thoiGian: "06/2026 – 06/2028", kinhPhi: "700 tr.", status: "review", chuongTrinh: "Trọng điểm nhà nước", nam: 2026, donVi: "Trường ĐH Bách khoa" },
  { id: "10", stt: 10, ma: "TN-2025-030", ten: "Hệ thống xử lý ngôn ngữ tiếng Việt",         chuNhiem: "TS. Trần Quốc Bảo",      thoiGian: "03/2025 – 03/2027", kinhPhi: "280 tr.", status: "signed", chuongTrinh: "KHCN cấp ĐHQG", nam: 2025, donVi: "Trường ĐH CNTT" },
  { id: "11", stt: 11, ma: "TN-2025-041", ten: "Phát triển cảm biến khí ô nhiễm",            chuNhiem: "TS. Vũ Hoài Nam",        thoiGian: "09/2025 – 09/2027", kinhPhi: "320 tr.", status: "active", chuongTrinh: "KHCN cấp ĐHQG", nam: 2025, donVi: "Trường ĐH KHTN" },
  { id: "12", stt: 12, ma: "TN-2024-055", ten: "Mô hình học sâu cho giao thông đô thị",      chuNhiem: "PGS.TS. Đặng Quang Vinh", thoiGian: "12/2024 – 12/2026", kinhPhi: "550 tr.", status: "active", chuongTrinh: "Trọng điểm nhà nước", nam: 2024, donVi: "Trường ĐH CNTT" },
  { id: "13", stt: 13, ma: "TN-2026-010", ten: "Nghiên cứu tế bào gốc điều trị tim mạch",    chuNhiem: "GS.TS. Ngô Thị Lan",     thoiGian: "05/2026 – 05/2028", kinhPhi: "900 tr.", status: "signed", chuongTrinh: "Trọng điểm nhà nước", nam: 2026, donVi: "Trường ĐH Y Dược" },
  { id: "14", stt: 14, ma: "TN-2023-078", ten: "Ứng dụng GIS trong quy hoạch đô thị",        chuNhiem: "TS. Bùi Minh Thành",     thoiGian: "06/2023 – 06/2025", kinhPhi: "260 tr.", status: "done",   chuongTrinh: "KHCN cấp ĐHQG", nam: 2023, donVi: "Trường ĐH Bách khoa" },
  { id: "15", stt: 15, ma: "TN-2025-099", ten: "Nghiên cứu robot dịch vụ y tế",              chuNhiem: "PGS.TS. Lý Văn Tùng",    thoiGian: "02/2025 – 02/2027", kinhPhi: "480 tr.", status: "signed", chuongTrinh: "NAFOSTED", nam: 2025, donVi: "Trường ĐH Bách khoa" },
];

export function countByStatus(rows: NhiemVu[]) {
  return {
    all: rows.length,
    review: rows.filter((r) => r.status === "review").length,
    signed: rows.filter((r) => r.status === "signed").length,
    active: rows.filter((r) => r.status === "active").length,
    done: rows.filter((r) => r.status === "done").length,
  };
}
