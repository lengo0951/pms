# Phase 06 — Admin: Lý lịch tổ chức

## Overview
- **Priority:** Low-Medium
- **Status:** pending
- **Depends on:** Phase 03, Phase 02
- **Figma node:** `4:2`
- **Route:** `/admin/ly-lich-to-chuc`

## Mục tiêu
Trang hiển thị hồ sơ tổ chức chủ trì — thông tin đơn vị, danh sách phòng ban/thành viên chủ chốt.

## Implementation workflow
1. Fetch `mcp__figma__get_design_context` node `4:2`
2. Xác định structure: form read-only hay có edit mode?
3. Tables (nếu có) dùng `<DataTable>`
4. Form fields dùng `<FormField>` từ Phase 03

## Expected UI elements
- Page header với breadcrumb "Lý lịch tổ chức"
- Info card: tên đơn vị, địa chỉ, mã số, website, người đại diện
- Có thể có tabs: Thông tin chung / Danh sách phòng ban / Thành viên chủ chốt
- Button "Chỉnh sửa" (nếu Figma có)

## Mock data
```ts
// lib/mock-data/organization.ts
export const orgProfile = {
  name: "Tổ chức chủ trì PMS",
  code: "VNUHCM-PMS",
  address: "Phường Linh Trung, TP. Thủ Đức, TP. HCM",
  representative: "PGS.TS. Nguyễn Văn A",
  phone: "(028) 3724 4270",
  email: "tcct@vnuhcm.edu.vn",
  website: "pms.vnuhcm.edu.vn",
  ...
};
```

## Todo
- [ ] Fetch Figma node 4:2
- [ ] `lib/mock-data/organization.ts`
- [ ] `app/(admin)/ly-lich-to-chuc/page.tsx`
- [ ] Components tách theo section nếu page dài (>200 LOC)

## Success criteria
- Route render khớp Figma
- Nếu có tabs, chuyển tab state qua URL
- Read-only mode hoạt động đúng

## Risks
- **R1:** Page có thể chỉ là trang mocked với rất ít logic — không cần over-engineer.

## Next
→ Phase 07: Wizard đăng ký nhiệm vụ
