# PMS · ĐHQG-HCM — Frontend Demo

Hệ thống Quản lý Nhiệm vụ Khoa học & Công nghệ của Đại học Quốc gia TP. Hồ Chí Minh.
Frontend demo tĩnh, 20 màn hình implement từ Figma.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint check
```

## Stack

Next.js 15 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 · shadcn/ui (base-nova) · react-hook-form · zod · lucide-react · date-fns · Inter font.

## Route map (20 màn)

### Auth (2)
- `/dang-nhap` — Đăng nhập admin
- `/nkh/dang-nhap` — Đăng nhập Nhà khoa học

### Admin (12)
- `/admin/dashboard` — Tổng quan
- `/admin/ly-lich-to-chuc` — Lý lịch tổ chức
- `/admin/nhiem-vu` — Danh sách nhiệm vụ
- `/admin/nhiem-vu/dang-ky/[tab]` — Wizard 5 tab (`don-dang-ky`, `thuyet-minh`, `thanh-vien`, `ho-so-dinh-kem`, `nop-ho-so`)
- `/admin/hop-dong-tai-tro` — Hợp đồng tài trợ
- `/admin/ky-ket-hop-dong/[step]` — Ký hợp đồng 3 bước
- `/admin/nhiem-vu-tai-tro` — Nhiệm vụ được tài trợ
- `/admin/nhat-ky-trien-khai` — Nhật ký triển khai (timeline)
- `/admin/theo-doi-nhiem-vu` — Theo dõi nhiệm vụ (milestones)

### NKH — Nhà Khoa Học (6)
- `/nkh/dashboard` — Tổng quan cá nhân
- `/nkh/dang-ky/[tab]` — Wizard 4 tab (`thong-tin-chung`, `thuyet-minh`, `thanh-vien`, `nop-ho-so`)
- `/nkh/ky-so` — Ký số hồ sơ 6 bước

## Folder layout

```
web/
├── app/
│   ├── (auth)/                 # Login pages (full-screen gradient)
│   ├── admin/                  # Admin shell + pages
│   ├── nkh/                    # NKH shell + pages
│   ├── layout.tsx              # Root: Inter font, lang=vi
│   ├── globals.css             # Tailwind v4 + brand tokens
│   └── page.tsx                # Redirect → /dang-nhap
├── components/
│   ├── ui/                     # shadcn primitives + link-button
│   ├── layout/                 # AppSidebar, AppTopbar, PageShell
│   ├── auth/login-card.tsx     # Reused by 2 login pages
│   ├── shared/                 # DataTable, StatusChip, WizardTabs, …
│   ├── nhiem-vu/               # Wizard tab content + footer
│   └── brand/vnu-logo.tsx
├── lib/
│   ├── mock-data/              # Static data per domain
│   ├── tokens.ts               # Brand exports
│   ├── nav-config.ts           # Sidebar items
│   ├── wizard-tabs-config.ts   # Admin & NKH wizard tab defs
│   └── utils.ts                # shadcn cn()
└── public/logo-vnu-hcm.png
```

## Design tokens

Brand navy `#003087` / `#002070` / `#0055b3` / `#1e4d8c`. Status pastels: review (blue) · signed (green) · active (amber) · done (violet). Page bg `#f3f6fa`, card shadow `0 2px 10px rgba(0,0,0,0.06)`.

Exposed as Tailwind utilities: `bg-brand-700`, `text-status-review-fg`, `bg-surface-page`, `text-ink-900`, etc. See `app/globals.css`.

## Mock data (`lib/mock-data/`)

- `nhiem-vu.ts` — 15 tasks with realistic metadata
- `hop-dong.ts` — 7 contracts
- `organization.ts` — profile + departments + leadership
- `nhat-ky.ts` — timeline events + milestones
- `thanh-vien.ts` — team members sample
- `dashboard.ts` — KPI + recent activity

## Demo user flows

**Admin:** `/dang-nhap` → dashboard → `/admin/nhiem-vu` → click "+ Đăng ký mới" → wizard 5 tab → submit → back to danh sách.

**NKH:** `/nkh/dang-nhap` → dashboard → "Đăng ký nhiệm vụ mới" → 4 tab wizard → "Chuyển sang ký số" → `/nkh/ky-so` 6 bước → về dashboard.

**Hợp đồng:** `/admin/hop-dong-tai-tro` → click "Ký hợp đồng mới" → stepper 3 bước → ký số → back.

## Not implemented (intentional)

- Auth thật (mock navigation)
- API backend
- i18n (VI only)
- Dark mode
- Responsive mobile (desktop-first 1440×900)
- Tab 2 & 4 wizard admin — placeholder cho đến khi Figma có thiết kế
