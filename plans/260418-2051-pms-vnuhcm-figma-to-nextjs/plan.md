---
name: PMS VNU-HCM — Figma to Next.js 15 Frontend
slug: pms-vnuhcm-figma-to-nextjs
date: 2026-04-18
status: completed
blockedBy: []
blocks: []
---

# Plan: PMS VNU-HCM — Figma → Next.js 15 Frontend (All 20 Screens)

## Context

User được giao code frontend demo cho "Hệ thống Quản lý Nhiệm vụ KH&CN — ĐHQG-HCM" (PMS VNU-HCM). Design ở Figma `3WCb18kpRsvsYoheKPPyGg` gồm **20 màn hình thực tế** (12 Admin + 8 NKH) + 2 frame phụ. Yêu cầu: code hết, dùng **Next.js 15**. Research đầy đủ tại `plans/reports/researcher-260418-2044-figma-pms-vnuhcm-scope.md`.

**Stack chốt:** Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + react-hook-form + zod + lucide-react + date-fns + mock data TS · VI only · desktop 1440×900.

**Thư mục app:** `web/` (sub-folder ở repo root, tách khỏi ClaudeKit template).

## Phases

| # | Phase | Status | Output |
|---|---|---|---|
| 01 | [Scaffold Next.js 15 + shadcn](./phase-01-scaffold-nextjs-shadcn.md) | ✅ completed | Next 15.5.15 + React 19 + Tailwind v4, 19 shadcn primitives, build pass |
| 02 | [Design tokens + layout shell](./phase-02-design-tokens-and-layout-shell.md) | ✅ completed | Tailwind theme, sidebar, topbar, page container |
| 03 | [Reusable UI components](./phase-03-reusable-ui-components.md) | ✅ completed | DataTable, StatusChip, WizardTabs, FormField, LoginCard, Stepper, Timeline, FileUploadBox, FilterBar |
| 04 | [Auth screens (2)](./phase-04-auth-screens.md) | ✅ completed | `/dang-nhap`, `/nkh/dang-nhap` |
| 05 | [Dashboards (2)](./phase-05-dashboards.md) | ✅ completed | `/admin/dashboard`, `/nkh/dashboard` |
| 06 | [Admin: Lý lịch tổ chức](./phase-06-admin-ly-lich-to-chuc.md) | ✅ completed | `/admin/ly-lich-to-chuc` |
| 07 | [Admin: Wizard đăng ký nhiệm vụ (3 tab)](./phase-07-admin-wizard-dang-ky-nhiem-vu.md) | ✅ completed | `/admin/nhiem-vu/dang-ky/[tab]` |
| 08 | [Admin: Danh sách + Hợp đồng + Tài trợ (4)](./phase-08-admin-danh-sach-va-hop-dong.md) | ✅ completed | `/admin/nhiem-vu`, `/admin/hop-dong-tai-tro`, `/admin/ky-ket-hop-dong/[step]`, `/admin/nhiem-vu-tai-tro` |
| 09 | [Admin: Nhật ký + Theo dõi (2)](./phase-09-admin-nhat-ky-va-theo-doi.md) | ✅ completed | `/admin/nhat-ky-trien-khai`, `/admin/theo-doi-nhiem-vu` |
| 10 | [NKH: Modal + Wizard + Ký số (6)](./phase-10-nkh-flow.md) | ✅ completed | `/nkh/dang-ky/*` + `/nkh/ky-so` |
| 11 | [Polish, README, production build](./phase-11-polish-and-verify.md) | ✅ completed | `npm run build` pass, route map, visual QA |

## Dependencies
- Phase 02 blocked by 01
- Phase 03 blocked by 02
- Phase 04–10 blocked by 03
- Phase 11 blocked by 04–10

## Key references
- **Research:** `plans/reports/researcher-260418-2044-figma-pms-vnuhcm-scope.md`
- **Figma:** file `3WCb18kpRsvsYoheKPPyGg`, 22 frames, map node IDs có trong từng phase
- **Design tokens:** trích trong Phase 02 từ node `2:32`, `2:2`, `6:138`

## Scope chốt
- 20 màn hình thực tế (12 Admin + 8 NKH)
- Mock data tĩnh TS (không API)
- Tab 2 & 4 wizard admin **chưa có thiết kế** → placeholder "Đang thiết kế"
- Chỉ light mode, chỉ tiếng Việt, desktop-first 1440×900
- Auth mock navigation, không validate thật

## Success criteria
1. `cd web && npm run build` pass, zero TypeScript/lint error
2. 20 routes render không crash, visual khớp Figma ≥90%
3. Component tái sử dụng đúng (không duplicate code giữa admin/NKH)
4. Code file ≤200 LOC mỗi file (theo development-rules)

## Out of scope
API thật · auth thật · mobile responsive · i18n · dark mode · unit tests · Tab 2 & 4 wizard admin
