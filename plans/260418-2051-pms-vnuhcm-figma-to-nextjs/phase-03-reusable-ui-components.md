# Phase 03 — Reusable UI components

## Overview
- **Priority:** High (blocker cho 04–10)
- **Status:** pending
- **Depends on:** Phase 02
- **Mục tiêu:** Build trước các components dùng lại ≥2 màn → giảm duplicate code khi ráp page.

## Components to build

| Component | Path | Dùng ở | Props quan trọng |
|---|---|---|---|
| `<StatusChip>` | `components/shared/status-chip.tsx` | Tables, dashboards | `variant: 'review'\|'signed'\|'active'\|'done'\|'draft'` |
| `<DataTable>` | `components/shared/data-table.tsx` | 07, 08, 10, wizard tab 3 | `columns`, `rows`, optional `striped`, `onRowClick` |
| `<FilterBar>` | `components/shared/filter-bar.tsx` | 07, 08, 10 | `searchPlaceholder`, `filters: {label,options}[]`, `primaryAction` |
| `<LoginCard>` | `components/auth/login-card.tsx` | 01, NKH_01 | `title`, `onSubmit`, role-based copy |
| `<WizardTabs>` | `components/shared/wizard-tabs.tsx` | Admin wizard (5 tab), NKH wizard (4 tab) | `tabs: {id,label}[]`, `currentTab`, `onChange` |
| `<WizardStepper>` | `components/shared/wizard-stepper.tsx` | 09 Ký HĐ, NKH_08 Ký số | `steps: {label}[]`, `currentStep` |
| `<Timeline>` | `components/shared/timeline.tsx` | 11 Nhật ký | `events: {date,title,desc,author}[]` |
| `<FileUploadBox>` | `components/shared/file-upload-box.tsx` | 06, NKH_07 | `files: File[]`, `onAdd/onRemove`, `accept` |
| `<StatCard>` | `components/shared/stat-card.tsx` | Dashboards | `label, value, delta?, icon?` |
| `<FormField>` | `components/shared/form-field.tsx` | Mọi form | `label, error, children` (wrap Input/Select) |
| `<PageHeader>` | `components/layout/page-header.tsx` | Mọi page | `title, breadcrumb, primaryAction?` |

## Chi tiết một số component quan trọng

### StatusChip
```tsx
const variantStyles = {
  review: "bg-brand-100 text-brand-500",   // Đang xét chọn
  signed: "bg-[#d1fae5] text-[#10b981]",   // Đã ký HĐ
  active: "bg-[#fef3c7] text-[#f59e0b]",   // Đang thực hiện
  done:   "bg-[#ede9fe] text-[#8b5cf6]",   // Hoàn thành
  draft:  "bg-zinc-100 text-zinc-600",     // Bản nháp (nếu cần)
};
```
→ `<StatusChip variant="signed" label="Đã ký HĐ" />` render rounded-full 24-28h, font-semibold 10-11px

### DataTable
- Wrapper trên shadcn `<Table>` chuẩn
- Header bg `#f9fafb`, 44h, font semibold 11px `#4b5563`
- Body rows 56h, zebra `#fafbff` dòng lẻ
- Cột config support: `key`, `header`, `width`, `render?(row)`
- Footer pagination optional (slot children)

### FilterBar
- Layout horizontal flex: search (w-340) + 3 dropdown (w-168) + advanced btn + primary btn right
- Input/Select dùng shadcn primitives, style override để khớp Figma (bg `#f3f6fa`, border `#e5e7eb`, h-40, rounded-8)

### WizardTabs
- Horizontal tabs bar, indicator dưới tab active
- Support completed state (check icon) cho tab đã validated
- Prop `tabs` flexible: admin dùng 5 tab, NKH dùng 4 tab, có thể placeholder "Đang thiết kế" ở tab chưa có Figma

### WizardStepper
- Horizontal numbered steps, line connector, state: completed/current/upcoming
- Dùng cho Ký hợp đồng 3 bước và Ký số 6 bước

## Todo
- [ ] `status-chip.tsx` — 5 variant, default variant prop
- [ ] `data-table.tsx` — columns config, optional pagination slot
- [ ] `filter-bar.tsx` — search + N dropdowns + primary action
- [ ] `login-card.tsx` — form react-hook-form + zod schema
- [ ] `wizard-tabs.tsx` — tab nav + content slot, state qua URL param
- [ ] `wizard-stepper.tsx` — numbered steps with connector
- [ ] `timeline.tsx` — vertical timeline với dot markers
- [ ] `file-upload-box.tsx` — drag-drop zone + file list
- [ ] `stat-card.tsx` — number + label + optional delta
- [ ] `form-field.tsx` — label + input wrapper + error message
- [ ] `page-header.tsx` — breadcrumb + title + optional action

## Success criteria
- Mỗi component có Storybook-style test page (tạm tại `/demo/components`) để preview trong browser
- Props hoàn toàn type-safe
- Không component nào vượt 200 LOC (chia file nhỏ nếu cần)
- Zero duplicate styling giữa các components (dùng token Tailwind đã setup Phase 02)

## Risks
- **R1:** DataTable quá generic sẽ over-engineer. Mitigation: support 3 cột type đủ cho Figma (text, chip, actions), YAGNI phần còn lại.
- **R2:** FileUploadBox demo không cần upload thật, chỉ push tên file vào state. Tránh lạc hướng sang implement upload API.
- **R3:** WizardTabs state management — URL param đơn giản hơn context, ưu tiên URL.

## Next
→ Phase 04 (song song): Auth screens
