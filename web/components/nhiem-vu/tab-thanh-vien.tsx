"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";

// Tab 3 — Danh sách thành viên (Figma NKH 33:129).
type Member = {
  id: string;
  hoTen: string;
  email: string;
  donVi: string;
  vaiTro: "Chủ nhiệm" | "Thư ký KH" | "Thành viên NC" | "Chuyên gia UD";
};

const initialMembers: Member[] = [
  { id: "m1", hoTen: "Nguyễn Văn A", email: "nva@uit.edu.vn",     donVi: "Khoa CNTT - UIT",        vaiTro: "Chủ nhiệm" },
  { id: "m2", hoTen: "Trần Thị B",   email: "ttb@vnuhcm.edu.vn",   donVi: "Viện CNTT - VNUHCM",     vaiTro: "Thư ký KH" },
  { id: "m3", hoTen: "Lê Văn C",     email: "lvc@hcmus.edu.vn",    donVi: "Khoa Vật lý - HCMUS",    vaiTro: "Thành viên NC" },
  { id: "m4", hoTen: "Phạm Thị D",    email: "ptd@hcmus.edu.vn",    donVi: "Bệnh viện Đại học Y Dược", vaiTro: "Chuyên gia UD" },
];

const roleBadgeColor: Record<Member["vaiTro"], string> = {
  "Chủ nhiệm":      "bg-emerald-100 text-emerald-700",
  "Thư ký KH":      "bg-blue-100 text-blue-700",
  "Thành viên NC":  "bg-violet-100 text-violet-700",
  "Chuyên gia UD":  "bg-amber-100 text-amber-700",
};

export function TabThanhVien() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const remove = (id: string) => setMembers((m) => m.filter((x) => x.id !== id));

  const count = members.length;
  const hasChief = members.some((m) => m.vaiTro === "Chủ nhiệm");
  const validEmails = members.filter((m) => /^\S+@\S+\.\S+$/.test(m.email)).length;
  const verifiedOrgs = members.filter((m) => !m.donVi.includes("Bệnh viện")).length; // Simulate verification

  const requirements = [
    { label: "Tối thiểu 3 người",  status: count >= 3 ? "ok" : "fail",  value: `Đã đạt (${count})` },
    { label: "Phải có Chủ nhiệm",  status: hasChief ? "ok" : "fail",    value: hasChief ? "Đã có" : "Chưa có" },
    { label: "Email hợp lệ",        status: validEmails === count ? "ok" : "warn", value: `${validEmails}/${count} hợp lệ` },
    { label: "Đơn vị xác thực",     status: verifiedOrgs === count ? "ok" : "warn", value: `${verifiedOrgs}/${count} xác thực` },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
      {/* MAIN */}
      <div className="space-y-5">
        {/* Banner + add */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 px-5 py-4">
          <h3 className="text-sm font-semibold text-emerald-800">
            Danh sách thành viên tham gia (tối thiểu 3 người)
          </h3>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus aria-hidden className="mr-1 size-4" /> Thêm thành viên
          </Button>
        </div>

        {/* Members table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <table className="w-full text-[12px]">
            <thead className="bg-surface-muted">
              <tr>
                <th className="h-11 w-16 px-3 text-left text-[11px] font-semibold text-ink-700">STT</th>
                <th className="px-3 text-left text-[11px] font-semibold text-ink-700">Họ tên</th>
                <th className="px-3 text-left text-[11px] font-semibold text-ink-700">Đơn vị</th>
                <th className="w-36 px-3 text-left text-[11px] font-semibold text-ink-700">Vai trò</th>
                <th className="w-20 px-3 text-right text-[11px] font-semibold text-ink-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.id} className="border-t border-ink-300 h-14">
                  <td className="px-3 text-ink-900">{i + 1}</td>
                  <td className="px-3">
                    <p className="font-semibold text-ink-900">{m.hoTen}</p>
                    <p className="text-[10px] text-ink-500">{m.email}</p>
                  </td>
                  <td className="px-3 text-ink-700">{m.donVi}</td>
                  <td className="px-3">
                    <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${roleBadgeColor[m.vaiTro]}`}>
                      {m.vaiTro}
                    </span>
                  </td>
                  <td className="px-3 text-right">
                    <Button variant="ghost" size="icon" className="size-7 text-blue-600" aria-label={`Sửa ${m.hoTen}`}>
                      <Pencil aria-hidden className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7 text-red-600" onClick={() => remove(m.id)} aria-label={`Xoá ${m.hoTen}`}>
                      <Trash2 aria-hidden className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Summary footer */}
          <div className="border-t border-ink-300 bg-emerald-50 px-5 py-3 text-xs">
            <p className="text-emerald-800">
              Tổng: <strong>{count} thành viên</strong> &nbsp;|&nbsp;
              Chủ nhiệm: <strong>{hasChief ? 1 : 0}</strong> &nbsp;|&nbsp;
              Thành viên NC: <strong>{members.filter((m) => m.vaiTro === "Thành viên NC").length}</strong>
              {count >= 3 && <span className="ml-2 font-semibold text-emerald-700">· Đã đủ yêu cầu tối thiểu</span>}
            </p>
          </div>
        </div>

        {/* Add member form */}
        <div className="rounded-xl bg-surface-page p-5">
          <h4 className="mb-3 text-sm font-semibold text-ink-900">Thêm thành viên mới</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Họ tên">
              <Input placeholder="Nguyễn Văn..." />
            </FormField>
            <FormField label="Email">
              <Input type="email" placeholder="email@institution.edu.vn" />
            </FormField>
            <FormField label="Đơn vị công tác">
              <Input placeholder="Khoa / Bộ môn..." />
            </FormField>
            <FormField label="Vai trò">
              <Input placeholder="Chọn vai trò +" />
            </FormField>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Lưu thành viên</Button>
          </div>
        </div>
      </div>

      {/* SIDE — Yêu cầu thành viên */}
      <aside className="h-fit rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <h3 className="mb-4 text-sm font-semibold text-ink-900">Yêu cầu thành viên</h3>
        <ul className="space-y-3">
          {requirements.map((r) => {
            const isOk = r.status === "ok";
            const isWarn = r.status === "warn";
            return (
              <li
                key={r.label}
                className={`rounded-lg border p-3 ${
                  isOk ? "border-emerald-200 bg-emerald-50" :
                  isWarn ? "border-amber-200 bg-amber-50" :
                  "border-red-200 bg-red-50"
                }`}
              >
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-900">
                  {isOk ? <CheckCircle2 aria-hidden className="size-3.5 text-emerald-600" /> :
                    <AlertCircle aria-hidden className={`size-3.5 ${isWarn ? "text-amber-600" : "text-red-600"}`} />}
                  {r.label}
                </p>
                <p className={`mt-0.5 pl-5 text-[11px] ${isOk ? "text-emerald-700" : isWarn ? "text-amber-700" : "text-red-700"}`}>
                  {r.value}
                </p>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
