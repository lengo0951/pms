# Phase 05 — Dashboards (2 màn)

## Overview
- **Priority:** Medium (first impression của demo)
- **Status:** pending
- **Depends on:** Phase 03 (`<StatCard>`, `<DataTable>`), Phase 02 (shell)
- **Figma nodes:** `2:32` (Admin), `31:2` (NKH)

## Màn hình

### `/admin/dashboard` — 02_Dashboard (Admin) · node 2:32

Từ design context đã pull: shell = sidebar + topbar chuẩn. Content area gồm:
- Row KPI stat cards (thường 4 cards: tổng nhiệm vụ, đang thực hiện, đã ký HĐ, hoàn thành)
- Recent activity list / chart area
- Asset URLs đã có: logo, avatar, bell, user avatar, dots (có thể là chart dots)

**Cần fetch lại design context cho phần content cụ thể** (session trước chỉ dùng phần sidebar).

### `/nkh/dashboard` — NKH_02 · node 31:2

Dashboard cá nhân NKH: nhiệm vụ của tôi, deadline sắp tới, status tổng quan.
**Cần fetch Figma design context.**

## Route structure

```
app/(admin)/dashboard/page.tsx
app/(nkh)/dashboard/page.tsx
```

## Implementation workflow

1. Fetch `mcp__figma__get_design_context` cho node `2:32` — chú ý extract phần content (loại trừ sidebar đã handle)
2. Fetch design context node `31:2`
3. Xác định charts: Figma có vẽ chart thật hay placeholder? Nếu có, cài `recharts`; nếu placeholder thì SVG tĩnh
4. Build Admin dashboard với mock data từ `lib/mock-data/`
5. Build NKH dashboard variant

## Mock data cần

```ts
// lib/mock-data/dashboard.ts
export const adminKpis = [
  { label: "Tổng nhiệm vụ", value: 15, delta: "+3 tháng này" },
  { label: "Đang xét chọn", value: 3 },
  { label: "Đang thực hiện", value: 5 },
  { label: "Hoàn thành", value: 4 },
];

export const recentActivity = [...]; // lấy tên/mã từ Figma table data
```

## Todo
- [ ] Fetch design context node 2:32 (full content, not just sidebar)
- [ ] Fetch design context node 31:2
- [ ] Decide chart approach (recharts vs SVG static)
- [ ] `lib/mock-data/dashboard.ts`
- [ ] `app/(admin)/dashboard/page.tsx`
- [ ] `app/(nkh)/dashboard/page.tsx`
- [ ] Visual compare với screenshots Figma

## Success criteria
- 2 dashboards render khớp Figma
- KPI cards dùng `<StatCard>` component
- Recent activity dùng `<DataTable>` hoặc list đơn giản
- Chart (nếu có) hiển thị đúng mock data

## Risks
- **R1:** Chart library (`recharts`) thêm 100KB bundle. Mitigation: chỉ cài nếu Figma có chart thật; nếu chỉ decorative thì SVG static.
- **R2:** NKH dashboard có thể có widget khác admin (calendar, submissions pending) — cần fetch để biết.

## Next
→ Phase 06: Lý lịch tổ chức
