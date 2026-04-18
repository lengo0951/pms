# Phase 08 — Admin: Danh sách + Hợp đồng + Tài trợ (4 màn)

## Overview
- **Priority:** High (showcase DataTable + Stepper)
- **Status:** pending
- **Depends on:** Phase 03 (`<DataTable>`, `<FilterBar>`, `<StatusChip>`, `<WizardStepper>`)
- **Figma nodes:** `6:138` (07), `7:2` (08), `7:169` (09), `7:288` (10)

## Màn hình

### 1. `/admin/nhiem-vu` — 07_Danh sách nhiệm vụ · node 6:138 (✅ đã có design context)

**Layout:**
- FilterBar: search "Tìm kiếm theo tên, mã nhiệm vụ..." + 3 dropdown (Trạng thái/Năm/Chương trình) + btn "Tìm kiếm nâng cao ⊕" + btn primary "+ Đăng ký mới"
- Status filter chips row (pastel pills): Tất cả:15, Đang xét chọn:3, Đã ký HĐ:7, Đang thực hiện:5
- DataTable 10 cột: STT, Mã NV, Tên NV, Chủ nhiệm, Thời gian, Kinh phí, Trạng thái (chip), Thao tác (Chi tiết + Tải)
- Pagination footer: "Hiển thị 10/15" + page 1/2/3 + Tiếp →

**Mock data:** 15 rows đã có sẵn trong Figma (AI thời tiết, vaccine COVID, blockchain, pin thể rắn, NLP tiếng Việt…) — dùng nguyên vào `lib/mock-data/nhiem-vu.ts`

**Interaction:**
- Click "+ Đăng ký mới" → `/admin/nhiem-vu/dang-ky/don-dang-ky`
- Click "Chi tiết" row → `/admin/nhiem-vu/[id]` (Phase ngoài scope, có thể skip)
- Click "↓ Tải" → console.log (mock)
- Click status chip filter → filter table client-side

### 2. `/admin/hop-dong-tai-tro` — 08_Hợp đồng tài trợ · node 7:2

Tương tự 07 nhưng cột khác (số HĐ, ngày ký, giá trị, bên ký…). Fetch design để confirm.

### 3. `/admin/ky-ket-hop-dong/[step]` — 09_Ký kết hợp đồng Bước 3 · node 7:169

- WizardStepper 3 bước (hoặc 4): Kiểm tra thông tin → Xác nhận điều khoản → Ký số → Hoàn tất
- Bước 3 = nội dung ký số (Figma chỉ vẽ bước 3)
- Form nội dung + signature area + 2 buttons (Trở lại / Ký và gửi)

### 4. `/admin/nhiem-vu-tai-tro` — 10_Nhiệm vụ được tài trợ · node 7:288

Variant của danh sách — chỉ show nhiệm vụ đã ký HĐ hoặc đang thực hiện. Cột bổ sung: kinh phí đã giải ngân, tiến độ %.

## Implementation workflow

1. Fetch 3 Figma nodes còn thiếu (7:2, 7:169, 7:288)
2. Build `lib/mock-data/nhiem-vu.ts` với 15 rows từ Figma + mở rộng thêm 5–10 row
3. Build `lib/mock-data/hop-dong.ts`, `lib/mock-data/nhiem-vu-tai-tro.ts`
4. Build `/admin/nhiem-vu/page.tsx` dùng DataTable + FilterBar + status chips
5. Build `/admin/hop-dong-tai-tro/page.tsx` — reuse DataTable
6. Build `/admin/ky-ket-hop-dong/[step]/page.tsx` — WizardStepper + step content
7. Build `/admin/nhiem-vu-tai-tro/page.tsx` — reuse DataTable variant

## File layout

```
app/(admin)/
├── nhiem-vu/page.tsx
├── hop-dong-tai-tro/page.tsx
├── ky-ket-hop-dong/[step]/page.tsx
└── nhiem-vu-tai-tro/page.tsx

components/nhiem-vu/
├── nhiem-vu-columns.tsx       # Column config tái sử dụng
├── status-chips-row.tsx        # Filter chips
└── pagination-footer.tsx       # Custom pagination UI

components/hop-dong/
├── contract-columns.tsx
└── signing-step-form.tsx       # Step 3 form content

lib/mock-data/
├── nhiem-vu.ts
├── hop-dong.ts
└── nhiem-vu-tai-tro.ts
```

## Todo
- [ ] Fetch Figma nodes: 7:2, 7:169, 7:288
- [ ] Mock data 3 file TS với rows thực tế từ Figma
- [ ] `/admin/nhiem-vu/page.tsx` (hoàn chỉnh — priority 1)
- [ ] `/admin/hop-dong-tai-tro/page.tsx`
- [ ] `/admin/ky-ket-hop-dong/[step]/page.tsx`
- [ ] `/admin/nhiem-vu-tai-tro/page.tsx`
- [ ] Client-side filter (status chip filter table)
- [ ] Pagination client-side (slice array)

## Success criteria
- 4 routes render khớp Figma
- Search input filter rows theo tên/mã realtime
- Status chip filter đổi active state + filter rows
- Stepper màn 09 visual đúng, highlight bước 3
- Pagination hoạt động

## Risks
- **R1:** DataTable với filter + pagination dễ over-engineer. Giữ đơn giản: state local, không React Query/TanStack Table.
- **R2:** Ký kết hợp đồng route dynamic `[step]` — Figma chỉ có step 3, các step khác placeholder.

## Next
→ Phase 09: Nhật ký + Theo dõi
