export type ConfirmStatus = "confirmed" | "pending";

export type ThanhVien = {
  id: string;
  hoTen: string;
  hocHamHocVi: string;
  coQuanCongTac: string;
  email: string;
  vaiTro: "Chủ nhiệm" | "Thành viên chính" | "Thành viên" | "Cố vấn KH" | "Thư ký";
  trangThai: ConfirmStatus;
  required?: boolean;
};

export type ChuNhiemFeatured = {
  name: string;
  org: string;
  email: string;
  trangThai: ConfirmStatus;
};

export const chuNhiemFeatured: ChuNhiemFeatured = {
  name: "PGS.TS. Trần Văn Minh",
  org: "Trường ĐH Bách Khoa – ĐHQG-HCM",
  email: "tranvanminh@hcmut.edu.vn",
  trangThai: "confirmed",
};

export const mockThanhVienList: ThanhVien[] = [
  {
    id: "t1",
    hoTen: "TS. Nguyễn Thị Lan",
    hocHamHocVi: "Tiến sĩ",
    coQuanCongTac: "ĐHQG-HCM",
    email: "lan@vnuhcm.edu.vn",
    vaiTro: "Thành viên chính",
    trangThai: "confirmed",
  },
  {
    id: "t2",
    hoTen: "ThS. Lê Văn Hùng",
    hocHamHocVi: "Thạc sĩ",
    coQuanCongTac: "Trường ĐH KHTN",
    email: "hung@hcmus.edu.vn",
    vaiTro: "Thành viên",
    trangThai: "pending",
  },
  {
    id: "t3",
    hoTen: "PGS.TS. Phạm Đức An",
    hocHamHocVi: "Phó Giáo sư",
    coQuanCongTac: "Viện CNTT",
    email: "an@ioit.vast.vn",
    vaiTro: "Cố vấn KH",
    trangThai: "confirmed",
  },
  {
    id: "t4",
    hoTen: "TS. Hoàng Minh Tuấn",
    hocHamHocVi: "Tiến sĩ",
    coQuanCongTac: "Trường ĐH CNTT",
    email: "tuan@uit.edu.vn",
    vaiTro: "Thành viên",
    trangThai: "pending",
  },
];
