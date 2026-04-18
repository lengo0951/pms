# AI Coding Metrics — PMS VNU-HCM

**Last Updated:** 2026-04-18
**Context:** Chi tiết số liệu thời gian + breakdown file sinh ra trong session AI coding. Đã trích từ `README.md` để README tập trung vào quy trình.

---

## 1. Bảng thời gian chi tiết

14 milestone từ research đến delivery. AI time = prompt + generation + user review. Code tay estimate = dev mid-senior thạo Next.js/Tailwind.

| Milestone | AI + review | Code tay ước lượng | Tiết kiệm |
|---|---|---|---|
| M1. Research Figma + báo cáo | 10 phút | 3h | 94% |
| M2. Plan 11 phase | 15 phút | 3-4h | 93% |
| M3. Scaffold Next.js + shadcn | 5 phút | 30 phút | 83% |
| M4. Tokens + layout shell (Phase 02) | 10 phút | 2-3h | 94% |
| M4. 11 reusable components (Phase 03) | 15 phút | 5-6h | 95% |
| M4. 15 pages (wizard, list, dashboards, stepper) | 25 phút | 10-12h | 96% |
| M5. Build fixes 4 bugs | 10 phút | 1-2h | 85% |
| M6. Logo + 2 SVG charts | 10 phút | 2h | 92% |
| M7-M8. Restructure NKH primary | 15 phút | 2-3h | 92% |
| M9. Code review #1 | 10 phút | 2h | 92% |
| M10. Fix 14 review findings | 20 phút | 3h | 89% |
| M11. tsconfig + dropdown fix | 10 phút | 1h | 83% |
| M12. Rebuild 4 admin screens theo Figma | 45 phút | 6-8h | 90% |
| M13. NKH emerald theme + 4 pages mới | 30 phút | 4-5h | 90% |
| M14. Code review #2 + rebuild 3 wizard tabs + modal | 45 phút | 5-6h | 87% |
| **TỔNG** | **~4.5h** | **~50-60h** | **~92%** |

### Chi phí token (ước lượng)

- Input: ~600K tokens
- Output: ~200K tokens
- Opus 4.7 rate: $15/M input + $75/M output
- **Tổng ước:** ~$24 USD

ROI: 50h × chi phí giờ công dev (≥ 1M VND/giờ) ≫ $24 → tích cực rõ ràng.

---

## 2. Bảng thống kê file theo category

~70 file custom (không tính shadcn UI primitives mặc định).

| Category | Files | Tổng LOC (≈) |
|---|---|---|
| Pages (`app/**/page.tsx` + layout + not-found) | 19 | ~1,350 |
| Layout components (`components/layout/`) | 5 (app-sidebar, app-topbar, page-shell, page-container, page-header) | ~300 |
| Shared components (`components/shared/`) | 11 (status-chip, data-table, filter-bar, wizard-tabs, wizard-stepper, timeline, file-upload-box, stat-card, form-field, bar-chart-mock, donut-chart-mock) | ~750 |
| Auth components | 1 (login-card) | ~140 |
| Wizard tab components (`components/nhiem-vu/`) | 5 (tab-don-dang-ky, tab-thuyet-minh, tab-thanh-vien, tab-nop-ho-so, wizard-footer) | ~700 |
| NKH-specific (`components/nkh/`) | 2 (register-program-modal, program-card-list) | ~150 |
| Brand | 1 (vnu-logo) | ~30 |
| Mock data (`lib/mock-data/`) | 7 (nhiem-vu, hop-dong, organization, nhat-ky, thanh-vien, dashboard, nkh-dashboard) | ~500 |
| Config lib (`lib/`) | 5 (tokens, nav-config, wizard-tabs-config, utils, link-button) | ~180 |
| Styles + root (globals.css, layout.tsx, page.tsx, not-found.tsx) | 4 | ~200 |
| **TỔNG (không tính shadcn UI primitives)** | **~70 file** | **~4,300 LOC** |

### Routes prerendered

```
/ (redirect → /dang-nhap)
/dang-nhap                                ← unified login
/admin/dashboard
/admin/ly-lich-to-chuc
/admin/nhiem-vu
/admin/hop-dong-tai-tro
/admin/ky-ket-hop-dong/{1,2,3}            ← 3 steps SSG
/admin/nhiem-vu-tai-tro
/admin/nhat-ky-trien-khai
/admin/theo-doi-nhiem-vu
/dashboard                                 ← NKH (emerald theme)
/chuong-trinh-mo
/ho-so-cua-toi
/thong-bao
/tai-khoan
/dang-ky                                   ← redirect → /thong-tin-chung
/dang-ky/{thong-tin-chung, thuyet-minh, thanh-vien, nop-ho-so}  ← 4 tabs SSG
/ky-so
```

**Tổng: 28 static + 1 dynamic** (`/dashboard?signed=1`).

### Build metrics

| Metric | Value |
|---|---|
| Build status | ✅ pass |
| Lint (ESLint) | ✅ 0 error |
| TypeScript strict | ✅ 0 error |
| Shared JS bundle | 139 KB gzipped |
| Max page First Load | 225 KB (`/dang-nhap` — RHF + zod) |
| File vượt 200 LOC (rule DRY) | 0 (ngoài shadcn UI primitives) |

---

## 3. 2 theme comparison

| Property | Admin (Navy) | NKH (Emerald) |
|---|---|---|
| Scope | 9 routes `/admin/*` | 7 routes root |
| Primary color | `#003087` brand-700 | `#059669` emerald-600 |
| Sidebar bg | `bg-brand-700` | `bg-emerald-900` |
| Active pill | brand-600 | emerald-700 |
| User block position | Bottom (sau nav) | Top (trước nav) |
| Footer | Đăng xuất + "Xem NKH" link | Role badge "🌿 Nhà Khoa Học" + Đăng xuất |
| Logo | PNG lockup `/public/logo-vnu-hcm.png` | Typographic "PMS · ĐHQG-HCM" |
| Topbar bell + avatar | Navy avatar "TC" | Emerald avatar "NA" |

Cả 2 theme chia sẻ chung: Inter font (vietnamese subset) · status chip 4 variant (review/signed/active/done) · spacing tokens · shadow system.

---

## 4. Mock data domains

| File | Records | Purpose |
|---|---|---|
| `nhiem-vu.ts` | 15 nhiệm vụ realistic (TN-2023→2026) | Main task list, filter demos |
| `hop-dong.ts` | 7 contracts | Contract management page |
| `organization.ts` | 1 profile + 4 departments + 3 leaders | Lý lịch tổ chức page |
| `nhat-ky.ts` | 8 events + 5 milestones + 4 months | Timeline + milestone tracking |
| `thanh-vien.ts` | 4 members + 1 featured chủ nhiệm | Wizard Tab 3 |
| `dashboard.ts` | Admin KPIs + activity + 3 charts | Admin dashboard widgets |
| `nkh-dashboard.ts` | 3 programs + 2 dossiers + 4 KPIs + 5 quick actions | NKH dashboard |

Tất cả derive từ source file (ví dụ dashboard KPI derive từ `nhiemVuList` qua `countByStatus()`) — **không hardcode số** để tránh drift.

---

**Mục đích file này:** Tham khảo chi tiết kỹ thuật khi review README. Đừng dump hết số liệu vào README để giữ báo cáo focus vào quy trình.
