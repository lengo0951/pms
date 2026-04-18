export const orgProfile = {
  name: "Trường ĐH Bách Khoa - ĐHQG-HCM",
  code: "VNUHCM-BK",
  address: "268 Lý Thường Kiệt, P.14, Q.10, TP. Hồ Chí Minh",
  representative: "PGS.TS. Nguyễn Văn A",
  position: "Hiệu trưởng",
  phone: "(028) 3724 4270",
  email: "tcct@vnuhcm.edu.vn",
  website: "pms.vnuhcm.edu.vn",
  foundedYear: 1957,
  taxCode: "0302140799",
};

// Thông tin tài khoản ngân hàng của tổ chức (hiển thị dashboard + lý lịch).
export const orgBank = {
  accountName: "Trường ĐH Bách Khoa TP. HCM",
  accountNumber: "012345678901",
  bank: "Vietcombank - CN TP. HCM",
  province: "Thành phố Hồ Chí Minh",
};

// Trạng thái xác minh hồ sơ tổ chức.
export const orgVerification = {
  status: "verified" as const,
  label: "Đã xác minh",
  lastUpdated: "08/03/2026",
};

export const orgDepartments = [
  { id: "d1", name: "Phòng Quản lý Khoa học", head: "PGS.TS. Nguyễn Văn A", staffCount: 12 },
  { id: "d2", name: "Phòng Tài chính — Kế toán", head: "TS. Lê Thị B", staffCount: 8 },
  { id: "d3", name: "Phòng Hợp tác Quốc tế", head: "TS. Trần Văn C", staffCount: 6 },
  { id: "d4", name: "Phòng Đào tạo Sau đại học", head: "PGS.TS. Phạm Thị D", staffCount: 10 },
];

export const orgKeyMembers = [
  { id: "m1", name: "GS.TS. Vũ Hải Quân",  role: "Giám đốc ĐHQG-HCM",         since: "2021" },
  { id: "m2", name: "PGS.TS. Nguyễn Minh Tâm", role: "Phó Giám đốc",            since: "2022" },
  { id: "m3", name: "PGS.TS. Nguyễn Văn A", role: "Trưởng phòng KH&CN",        since: "2023" },
];
