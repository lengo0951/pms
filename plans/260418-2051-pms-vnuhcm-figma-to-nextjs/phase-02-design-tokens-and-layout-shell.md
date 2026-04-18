# Phase 02 — Design tokens + layout shell

## Overview
- **Priority:** High (blocker cho 03–10)
- **Status:** pending
- **Depends on:** Phase 01

## Key insights (từ Research report)

**Brand:** navy `#003087` (primary), `#002070` (logo strip), `#0055b3` (gradient), `#1e4d8c` (active bg)
**Neutrals:** page `#f3f6fa`, stripe `#fafbff`, card `#ffffff`, border `#e5e7eb`, text 900 `#1a1f36`, 600 `#4b5563`, 400 `#9ca3af`
**Status pastels:** review `#dbeafe/#3b82f6`, signed `#d1fae5/#10b981`, active `#fef3c7/#f59e0b`, done `#ede9fe/#8b5cf6`
**Font:** Inter (set ở Phase 01)
**Radius:** 8 (input/button), 10 (btn primary), 12 (card), 20 (hero card)
**Shadow:** card `0 2px 10px rgba(0,0,0,0.06)`, hero `0 24px 60px rgba(0,0,0,0.25)`

## Requirements

### Functional
1. **Tailwind v4 theme tokens** — map brand/semantic colors vào CSS variables + Tailwind utilities qua `@theme` block trong `globals.css`
2. **Sidebar** 240×full-height navy với: logo zone (72h), PMS title, divider, nav items (grouped), active pill, user avatar bottom
3. **Topbar** 240-offset, 64h, white với: breadcrumb 11px + page title 17px, bell icon, user avatar
4. **Page container** — wrapper `bg-[#f3f6fa]` với padding chuẩn cho content area
5. **Route group layouts:** `(admin)/layout.tsx` và `(nkh)/layout.tsx` dùng chung shell nhưng nav items khác

### Non-functional
- Sidebar sticky left, không scroll cùng content
- Topbar sticky top, z-index cao
- Responsive: ưu tiên ≥1440px, <1280px chấp nhận overflow ngang

## Architecture

```
app/
├── (admin)/
│   └── layout.tsx          # Shell admin: AppShell + AdminNav
├── (nkh)/
│   └── layout.tsx          # Shell NKH: AppShell + NkhNav
├── (auth)/                 # Không có shell (full-screen gradient)
│   └── layout.tsx
components/
├── layout/
│   ├── app-shell.tsx       # Compose sidebar + topbar + content
│   ├── app-sidebar.tsx     # Navy sidebar với prop `items`
│   ├── sidebar-nav-item.tsx # Single item (link + active state)
│   ├── app-topbar.tsx      # Topbar với breadcrumb + title + actions
│   └── page-container.tsx  # Content wrapper
└── brand/
    └── vnu-logo.tsx        # SVG logo VNU/HCM (reuse 3 nơi)
lib/
├── tokens.ts               # TS constants cho tokens (dùng trong code khi cần)
└── nav-config.ts           # Items config admin vs NKH
```

## Tailwind v4 setup (trong `app/globals.css`)

```css
@theme {
  --color-brand-50:  #e8f4fd;
  --color-brand-100: #dbeafe;
  --color-brand-200: #93c5fd;
  --color-brand-400: #60a5fa;
  --color-brand-500: #3b82f6;
  --color-brand-700: #1e4d8c;
  --color-brand-800: #003087;  /* primary */
  --color-brand-900: #002070;

  --color-status-review-bg: #dbeafe;
  --color-status-review-fg: #3b82f6;
  --color-status-signed-bg: #d1fae5;
  --color-status-signed-fg: #10b981;
  --color-status-active-bg: #fef3c7;
  --color-status-active-fg: #f59e0b;
  --color-status-done-bg:   #ede9fe;
  --color-status-done-fg:   #8b5cf6;

  --color-surface-page:   #f3f6fa;
  --color-surface-stripe: #fafbff;

  --shadow-card: 0 2px 10px rgba(0,0,0,0.06);
  --shadow-hero: 0 24px 60px rgba(0,0,0,0.25);
}
```

## Sidebar structure

```tsx
// AppSidebar props
type SidebarNavSection = {
  label?: string;
  items: { href: string; label: string; icon: LucideIcon; children?: SubItem[] }[];
};
<AppSidebar
  brand={{ title: "PMS · ĐHQG-HCM", subtitle: "pms.vnuhcm.edu.vn" }}
  sections={adminNavSections}
  user={{ avatar, name: "Tổ chức chủ trì", email: "tcct@vnuhcm.edu.vn" }}
/>
```

**Admin nav config:**
- Tổng quan → `/admin/dashboard`
- Nhiệm vụ → parent, children:
  - Danh sách nhiệm vụ → `/admin/nhiem-vu`
  - Hợp đồng tài trợ → `/admin/hop-dong-tai-tro`
  - Nhiệm vụ được tài trợ → `/admin/nhiem-vu-tai-tro`
  - Theo dõi nhiệm vụ → `/admin/theo-doi-nhiem-vu`
  - Nhật ký triển khai → `/admin/nhat-ky-trien-khai`
- Lý lịch tổ chức → `/admin/ly-lich-to-chuc`

**NKH nav config:** rút gọn hơn — Tổng quan, Nhiệm vụ của tôi, Đăng ký mới, Hồ sơ cá nhân

## Todo
- [ ] Update `app/globals.css` với `@theme` block
- [ ] Fetch Figma node `2:32` lần nữa nếu cần (đã có ở tool cache)
- [ ] Create `lib/tokens.ts` export colors/spacing
- [ ] Create `lib/nav-config.ts` với 2 nav sections
- [ ] Create `components/brand/vnu-logo.tsx` (SVG inline, 48/72px variants)
- [ ] Create `components/layout/app-sidebar.tsx`, `sidebar-nav-item.tsx`
- [ ] Create `components/layout/app-topbar.tsx`
- [ ] Create `components/layout/page-container.tsx`
- [ ] Create `components/layout/app-shell.tsx` compose layout
- [ ] Create `app/(admin)/layout.tsx`, `app/(nkh)/layout.tsx`
- [ ] Temporary test page `/admin/dashboard` placeholder để preview shell

## Success criteria
- Sidebar navy render đúng màu, logo đúng, 2 cấp menu hoạt động
- Active item có pill `bg-brand-700` đúng vị trí
- Topbar show breadcrumb + title đúng (prop-driven)
- Content area `bg-surface-page` đúng
- Layout không vỡ ở 1440×900

## Risks
- **R1:** Tailwind v4 `@theme` syntax khác v3. Ref: <https://tailwindcss.com/docs/theme> mới nhất.
- **R2:** Logo VNU/HCM Figma chỉ có asset URL (TTL 7 ngày). Mitigation: tạo SVG inline giả logo (circle navy + "VNU / HCM" text) — acceptable cho demo. Nếu user cung cấp file gốc, swap sau.
- **R3:** Active state highlight phải tính từ `usePathname()` — phải là client component.

## Next
→ Phase 03: Reusable UI components
