# PMS · ĐHQG-HCM — Frontend Demo

Hệ thống Quản lý Nhiệm vụ Khoa học & Công nghệ của Đại học Quốc gia TP. Hồ Chí Minh.
Frontend demo tĩnh, không có backend — mock data TS thuần.

**Kiến trúc role:** 1 login duy nhất, role detect qua email → NKH (luồng chính, URL gốc) hoặc Admin (superuser, `/admin/*`).

## Chạy dev

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint check
```

**Tài khoản demo:**
- `nkh@vnuhcm.edu.vn` + password ≥6 ký tự → Nhà khoa học (theme emerald)
- `admin@vnuhcm.edu.vn` / `tcct@vnuhcm.edu.vn` → Tổ chức chủ trì (theme navy)

## Stack

Next.js 15 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4 · shadcn/ui (base-nova) · react-hook-form · zod · lucide-react · date-fns · Inter font (subset vietnamese).

## Route map (28 static + 1 dynamic · 15 unique screens)

### Entry (3)
- `/` → redirect `/dang-nhap`
- `/dang-nhap` — **login unified** (role detect qua email)
- `/not-found` — branded 404

### Nhà khoa học (9 routes · theme emerald)
URL gốc không prefix — NKH là luồng chính.

- `/dashboard` — Tổng quan (stat cards + Chương trình đang mở + Thao tác nhanh + Hồ sơ của tôi)
- `/chuong-trinh-mo` — Chương trình đang kêu gọi
- `/ho-so-cua-toi` — Danh sách hồ sơ cá nhân
- `/thong-bao` — Thông báo hệ thống (success / warning / info)
- `/tai-khoan` — Thông tin cá nhân + bảo mật
- `/dang-ky` → redirect `/dang-ky/thong-tin-chung`
- `/dang-ky/[tab]` — **Wizard 4 tab đăng ký nhiệm vụ:**
  - `thong-tin-chung` — Thông tin chung
  - `thuyet-minh` — Thuyết minh & Tài liệu (file templates + upload)
  - `thanh-vien` — Danh sách thành viên
  - `nop-ho-so` — Nộp hồ sơ (6 checklist + progress 5/6)
- `/ky-so` — Nộp hồ sơ Ký số (5-step wizard)

### Admin / Tổ chức chủ trì (9 routes · theme navy)

- `/admin/dashboard` — Tổng quan (2 stat cards + Chương trình kêu gọi table + Thao tác nhanh + Thông tin tổ chức sidebar)
- `/admin/ly-lich-to-chuc` — Lý lịch tổ chức (profile + phòng ban + lãnh đạo)
- `/admin/nhiem-vu` — Danh sách nhiệm vụ (15 rows · filter / search / pagination / chip status)
- `/admin/nhiem-vu-tai-tro` — Nhiệm vụ được tài trợ
- `/admin/hop-dong-tai-tro` — Hợp đồng tài trợ (7 rows)
- `/admin/ky-ket-hop-dong/[step]` — **Ký hợp đồng 4-step** (`1` Soạn thảo · `2` Thảo luận · `3` Ký kết · `4` Hoàn thành)
- `/admin/theo-doi-nhiem-vu` — Theo dõi nhiệm vụ (milestones)
- `/admin/nhat-ky-trien-khai` — Nhật ký triển khai (event cards + month tabs)

## Demo user flows

### Flow chính — NKH đăng ký nhiệm vụ
```
/dang-nhap (nkh@...) → /dashboard
  → Click "Đăng ký" program card → Modal "Đăng ký tham gia Chương trình"
  → "Xác nhận Đăng ký" → /dang-ky/thong-tin-chung
  → 4 tab wizard (Thông tin chung → Thuyết minh & TL → Danh sách TV → Nộp hồ sơ)
  → "Chuyển sang ký số →" → /ky-so (5-step emerald)
  → "Nộp chính thức" → /dashboard?signed=1 (banner emerald success)
```

### Flow admin — quản lý hợp đồng
```
/dang-nhap (admin@...) → /admin/dashboard
  → /admin/hop-dong-tai-tro → Click "Quản lý" row
  → /admin/ky-ket-hop-dong/3 (stepper 4-step · sequential signing Lãnh đạo → Văn thư)
  → "Xác nhận đã ký số hoàn tất → Gửi cho Quỹ ký" → back to list
```

### Flow admin — theo dõi nhiệm vụ
```
/admin/dashboard → sidebar "Danh sách nhiệm vụ"
  → /admin/nhiem-vu (filter theo trạng thái/năm/chương trình)
  → Click chi tiết row → ... (detail page chưa implement, click "Tải" log)
  → sidebar "Nhật ký triển khai" → /admin/nhat-ky-trien-khai
  → Month tab 3/2026 · event cards → "Đánh dấu hoàn thành"
```

### Role switch (demo only)
Admin sidebar footer có nút **"Xem giao diện NKH"** → `/dashboard` instant → xem UI emerald mà không cần logout.

## Folder layout

```
web/
├── app/
│   ├── (auth)/                      # URL gốc — gradient login shell
│   │   ├── dang-nhap/page.tsx
│   │   └── layout.tsx
│   ├── (nkh)/                       # URL gốc — emerald NKH shell (route group)
│   │   ├── dashboard/page.tsx
│   │   ├── chuong-trinh-mo/page.tsx
│   │   ├── ho-so-cua-toi/page.tsx
│   │   ├── thong-bao/page.tsx
│   │   ├── tai-khoan/page.tsx
│   │   ├── dang-ky/[tab]/page.tsx   # 4-tab wizard
│   │   ├── dang-ky/page.tsx         # redirect → /dang-ky/thong-tin-chung
│   │   ├── ky-so/page.tsx
│   │   └── layout.tsx
│   ├── admin/                       # /admin/* — navy admin shell
│   │   ├── dashboard/page.tsx
│   │   ├── ly-lich-to-chuc/page.tsx
│   │   ├── nhiem-vu/page.tsx
│   │   ├── nhiem-vu-tai-tro/page.tsx
│   │   ├── hop-dong-tai-tro/page.tsx
│   │   ├── ky-ket-hop-dong/[step]/page.tsx
│   │   ├── theo-doi-nhiem-vu/page.tsx
│   │   ├── nhat-ky-trien-khai/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx                   # Root (Inter font, lang=vi)
│   ├── globals.css                  # Tailwind v4 @theme tokens
│   ├── not-found.tsx                # 404 branded
│   └── page.tsx                     # Redirect → /dang-nhap
├── components/
│   ├── ui/                          # shadcn primitives + link-button
│   ├── layout/                      # AppSidebar (variant-aware), AppTopbar, PageShell, PageContainer, PageHeader
│   ├── auth/login-card.tsx          # role detect + redirect
│   ├── shared/                      # StatusChip, DataTable, FilterBar, WizardTabs, WizardStepper,
│   │                                #   Timeline, FileUploadBox, StatCard, FormField, BarChartMock, DonutChartMock
│   ├── nhiem-vu/                    # Wizard 4-tab content + footer (shared NKH + admin tokens)
│   ├── nkh/                         # RegisterProgramModal, ProgramCardList
│   └── brand/vnu-logo.tsx
├── lib/
│   ├── mock-data/                   # 7 domain files (static, derive patterns)
│   ├── tokens.ts                    # Brand color TS exports
│   ├── nav-config.ts                # Admin + NKH sidebar items
│   ├── wizard-tabs-config.ts        # NKH wizard tab defs
│   ├── utils.ts                     # shadcn cn()
│   └── link-button (in components/ui/)
└── public/logo-vnu-hcm.png
```

## Design tokens

**2 theme:**
- **Admin navy** — `#003087` brand-700 (sidebar bg), `#002070` brand-800 (logo zone), `#1e4d8c` brand-600 (active), `#0055b3` brand-500 (gradient)
- **NKH emerald** — `emerald-900` (sidebar), `emerald-700` (active), `emerald-600` (primary button/accent)

**Shared:**
- Status pastels: review `#dbeafe/#3b82f6` · signed `#d1fae5/#10b981` · active `#fef3c7/#f59e0b` · done `#ede9fe/#8b5cf6`
- Page bg `#f3f6fa` · card shadow `0 2px 10px rgba(0,0,0,0.06)` · hero shadow `0 24px 60px rgba(0,0,0,0.25)`

Tailwind utilities: `bg-brand-700`, `bg-emerald-600`, `text-status-review-fg`, `bg-surface-page`, `text-ink-900`. Xem `app/globals.css`.

## Mock data (`lib/mock-data/`)

| File | Purpose |
|---|---|
| `nhiem-vu.ts` | 15 nhiệm vụ realistic (2023-2026) với status/chương trình/đơn vị |
| `hop-dong.ts` | 7 hợp đồng tài trợ |
| `organization.ts` | Profile Trường ĐH Bách Khoa + phòng ban + lãnh đạo + bank + verification |
| `admin-programs.ts` | 5 chương trình đang kêu gọi (admin dashboard) |
| `nhat-ky.ts` | 8 timeline events + 5 milestones + 4 months |
| `thanh-vien.ts` | 4 members + 1 featured chủ nhiệm |
| `dashboard.ts` | Admin KPIs (derive từ `countByStatus(nhiemVuList)`) + activity + 3 charts |
| `nkh-dashboard.ts` | 3 programs + 2 dossiers + 4 KPIs + 5 quick actions |

**Quy tắc:** Data derive từ source (vd dashboard count từ list) — **không hardcode số** để tránh drift giữa dashboard và list thật.

## Not implemented (intentional — demo only)

- Auth thật (login chỉ navigate mock theo email prefix — không session/cookie/JWT)
- API backend
- i18n (chỉ tiếng Việt hardcode)
- Dark mode (Figma chỉ có light)
- Responsive mobile (desktop-first 1440×900 theo Figma)
- Chi tiết nhiệm vụ `/admin/nhiem-vu/[id]` + hồ sơ chi tiết NKH
- Test suite (Vitest/Playwright)
- Tab 2 & 4 wizard admin — đã xoá hoàn toàn (admin không đăng ký sau restructure NKH primary)
