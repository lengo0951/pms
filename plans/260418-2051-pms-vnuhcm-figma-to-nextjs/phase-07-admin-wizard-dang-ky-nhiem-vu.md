# Phase 07 — Admin: Wizard đăng ký nhiệm vụ (3 tab có thiết kế)

## Overview
- **Priority:** Medium
- **Status:** pending
- **Depends on:** Phase 03 (`<WizardTabs>`, `<FormField>`, `<DataTable>`, `<FileUploadBox>`)
- **Figma nodes:** `4:110` (Tab 1), `4:215` (Tab 3), `6:2` (Tab 5)
- **Tab 2 & 4 chưa có thiết kế** → placeholder "Đang thiết kế"
- **Route:** `/admin/nhiem-vu/dang-ky/[tab]`

## Tabs structure (5 tab tổng, chỉ 3 có design)

| Tab | ID | Label | Content | Figma |
|---|---|---|---|---|
| 1 | `don-dang-ky` | Đơn đăng ký | Form chính: mã NV, tên, chương trình, kinh phí, thời gian, tóm tắt | `4:110` |
| 2 | `thuyet-minh` | Thuyết minh | Placeholder | — |
| 3 | `thanh-vien` | Thành viên | Table thành viên + dialog thêm | `4:215` |
| 4 | `ho-so-dinh-kem` | Hồ sơ đính kèm | Placeholder | — |
| 5 | `nop-ho-so` | Nộp hồ sơ | FileUploadBox + signature | `6:2` |

## Routing

```tsx
// app/(admin)/nhiem-vu/dang-ky/[tab]/page.tsx
type Params = { tab: 'don-dang-ky' | 'thuyet-minh' | ... };
```

Dùng Server Component check slug, render component tương ứng. WizardTabs nav link tới `/admin/nhiem-vu/dang-ky/{tab-id}`.

## Tab content modules

```
components/nhiem-vu/wizard/
├── tab-don-dang-ky.tsx          # Tab 1: form chính
├── tab-thuyet-minh-placeholder.tsx  # Tab 2: "Đang thiết kế"
├── tab-thanh-vien.tsx           # Tab 3: table + add dialog
├── tab-ho-so-placeholder.tsx    # Tab 4: placeholder
├── tab-nop-ho-so.tsx            # Tab 5: upload + sign
└── wizard-footer.tsx            # "← Trở lại" / "Tiếp theo →" / "Lưu nháp" buttons
```

## Form state approach
- **Simple:** mỗi tab là một form RHF độc lập, state reset khi chuyển tab → OK cho demo
- **Better:** shared state qua Context provider cho cả wizard → giữ dữ liệu khi switch tab
- **Decision:** Demo → đi Simple. Nếu user test thấy khó chịu, upgrade sang Context.

## Implementation workflow
1. Fetch 3 Figma nodes: `4:110`, `4:215`, `6:2`
2. Implement Tab 1 (`tab-don-dang-ky.tsx`) — nhiều field nhất
3. Implement Tab 3 (`tab-thanh-vien.tsx`) — DataTable + Dialog thêm thành viên
4. Implement Tab 5 (`tab-nop-ho-so.tsx`) — FileUploadBox + signature area
5. Tab 2, 4 placeholder component
6. `[tab]/page.tsx` dispatch render theo param

## Tab 1 fields (từ Figma 4:110 sẽ fetch)
Dự đoán:
- Mã nhiệm vụ (auto-generated, read-only)
- Tên nhiệm vụ
- Chương trình (select)
- Chủ nhiệm (select/input)
- Đơn vị chủ trì
- Thời gian bắt đầu / kết thúc
- Kinh phí đề xuất
- Tóm tắt nội dung (textarea)
- Từ khóa

## Tab 3 table columns (Thành viên)
- STT
- Họ tên
- Vai trò (select: Chủ nhiệm/Thành viên chính/Thư ký)
- Chức danh/học vị
- Đơn vị
- Tỷ lệ thời gian tham gia
- Hành động (xóa)

## Tab 5 (Nộp hồ sơ)
- FileUploadBox: đơn đăng ký, thuyết minh, CV chủ nhiệm, dự toán
- Checkbox cam đoan
- Signature area (placeholder text "Đã ký số bởi: ...")
- Submit button

## Todo
- [ ] Fetch 3 Figma nodes
- [ ] `wizard-footer.tsx` — next/prev/draft buttons
- [ ] `tab-don-dang-ky.tsx` với RHF + zod schema
- [ ] `tab-thanh-vien.tsx` — table + add dialog
- [ ] `tab-nop-ho-so.tsx` — upload + submit
- [ ] 2 placeholder tabs
- [ ] `[tab]/page.tsx` routing dispatch
- [ ] Wizard nav highlight tab hiện tại (WizardTabs Phase 03)

## Success criteria
- 3 tabs có thiết kế render đúng Figma
- 2 placeholder tabs hiển thị "Đang thiết kế" + có nút "Tiếp theo" để vẫn chuyển được
- Chuyển tab không mất focus state
- Submit tab 5 → navigate về `/admin/nhiem-vu` với toast success

## Risks
- **R1:** Tab state không persist khi reload — chấp nhận cho demo. Có thể backup vào sessionStorage nếu cần.
- **R2:** Form quá nhiều field sẽ dài — tách section con trong tab 1.

## Next
→ Phase 08: Danh sách + Hợp đồng + Tài trợ
