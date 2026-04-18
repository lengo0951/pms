---
name: Restructure — NKH primary, Admin superuser
slug: restructure-nkh-primary-admin-superuser
date: 2026-04-18
status: completed
blockedBy: []
blocks: []
---

# Plan: Tái cấu trúc luồng — NKH là luồng chính, Admin là superuser

## Context

Luồng hiện tại tách thành 2 "sub-app" song song (`/admin/*` vs `/nkh/*`) với 2 trang login riêng. Không đúng nghiệp vụ thật: **nhà khoa học mới là user chính** (đông đảo, sử dụng hằng ngày), còn **cán bộ quản lý là superuser** (ít người, đăng nhập để xem & quản trị tất cả). Cần refactor để:
- 1 trang login duy nhất, phân role theo credential (demo: `admin@...` → admin, còn lại → NKH)
- NKH dùng URL gốc (`/dashboard`, `/dang-ky/[tab]`, `/ky-so`) — cảm giác app chính
- Admin đi qua `/admin/*` — panel quản trị
- **Admin chỉ xem, không đăng ký nhiệm vụ & không ký số cá nhân** (remove wizard admin + ký số khỏi luồng admin)

## Quyết định đã chốt (từ user)

| Câu hỏi | Trả lời |
|---|---|
| Login model | 1 trang duy nhất, role detect qua email prefix |
| Admin scope | Chỉ xem — không có quyền đăng ký hộ, không có feature NKH |
| URL scheme | NKH dùng root, admin dùng `/admin/*` |

## Kiến trúc mới

### URL tree

| URL | Role | Màn |
|---|---|---|
| `/dang-nhap` | public | Login (unified) |
| `/` | public | Redirect → `/dang-nhap` |
| `/dashboard` | nkh | Tổng quan cá nhân NKH |
| `/dang-ky/[tab]` | nkh | Wizard đăng ký 4 tab |
| `/ky-so` | nkh | Ký số 6 bước |
| `/admin/dashboard` | admin | Tổng quan hệ thống |
| `/admin/ly-lich-to-chuc` | admin | Hồ sơ tổ chức |
| `/admin/nhiem-vu` | admin | Danh sách tất cả nhiệm vụ |
| `/admin/hop-dong-tai-tro` | admin | Danh sách hợp đồng |
| `/admin/ky-ket-hop-dong/[step]` | admin | Stepper ký HĐ 3 bước |
| `/admin/nhiem-vu-tai-tro` | admin | Nhiệm vụ đã ký HĐ |
| `/admin/nhat-ky-trien-khai` | admin | Timeline sự kiện hệ thống |
| `/admin/theo-doi-nhiem-vu` | admin | Milestone tracking |

**Removed:**
- `/nkh/dang-nhap` (gộp vào `/dang-nhap`)
- `/admin/nhiem-vu/dang-ky/[tab]` (admin không đăng ký)

### Folder structure mới

```
web/app/
├── layout.tsx                      # Root (unchanged)
├── page.tsx                        # Redirect → /dang-nhap
├── (auth)/
│   ├── layout.tsx                  # Gradient shell (unchanged)
│   └── dang-nhap/page.tsx          # Unified login
├── (nkh)/                          # Route group, không thêm segment URL
│   ├── layout.tsx                  # Sidebar NKH + Topbar
│   ├── dashboard/page.tsx
│   ├── dang-ky/[tab]/page.tsx
│   └── ky-so/page.tsx
└── admin/                          # Segment /admin/
    ├── layout.tsx                  # Sidebar Admin + Topbar
    ├── dashboard/page.tsx
    ├── ly-lich-to-chuc/page.tsx
    ├── nhiem-vu/page.tsx           # (KHÔNG còn dang-ky/ subdir)
    ├── hop-dong-tai-tro/page.tsx
    ├── ky-ket-hop-dong/[step]/page.tsx
    ├── nhiem-vu-tai-tro/page.tsx
    ├── nhat-ky-trien-khai/page.tsx
    └── theo-doi-nhiem-vu/page.tsx
```

### Mock auth logic

Trong `login-card.tsx`, sau submit:
```ts
const isAdmin =
  data.email.toLowerCase().startsWith("admin@") ||
  data.email.toLowerCase().includes(".admin@");
router.push(isAdmin ? "/admin/dashboard" : "/dashboard");
```

Login form thêm **helper box** (thay box "Hỗ trợ kỹ thuật") với gợi ý demo:
```
Demo credentials:
· admin@vnuhcm.edu.vn → Cán bộ quản lý
· nkh@vnuhcm.edu.vn → Nhà khoa học
(mật khẩu bất kỳ ≥ 6 ký tự)
```

### Sidebar nav mới

**NKH (`nkhNavSections`):**
- Tổng quan → `/dashboard`
- Đăng ký nhiệm vụ → `/dang-ky/thong-tin-chung`
- Ký số hồ sơ → `/ky-so`

**Admin (`adminNavSections`):**
- Tổng quan → `/admin/dashboard`
- Nhiệm vụ (parent, children):
  - Danh sách nhiệm vụ → `/admin/nhiem-vu`
  - Hợp đồng tài trợ → `/admin/hop-dong-tai-tro`
  - Nhiệm vụ được tài trợ → `/admin/nhiem-vu-tai-tro`
  - Theo dõi nhiệm vụ → `/admin/theo-doi-nhiem-vu`
  - Nhật ký triển khai → `/admin/nhat-ky-trien-khai`
- Lý lịch tổ chức → `/admin/ly-lich-to-chuc`

## Implementation steps

### Bước 1 — Move NKH routes vào route group `(nkh)`
```bash
mkdir -p web/app/\(nkh\)
git mv web/app/nkh/layout.tsx web/app/\(nkh\)/layout.tsx        # hoặc mv nếu ko dùng git
mv web/app/nkh/dashboard web/app/\(nkh\)/dashboard
mv web/app/nkh/dang-ky web/app/\(nkh\)/dang-ky
mv web/app/nkh/ky-so web/app/\(nkh\)/ky-so
rmdir web/app/nkh
```

### Bước 2 — Xoá NKH login page
```bash
rm -rf web/app/\(auth\)/nkh
```

### Bước 3 — Xoá admin wizard
```bash
rm -rf web/app/admin/nhiem-vu/dang-ky
```

### Bước 4 — Update nav config (`web/lib/nav-config.ts`)

- NKH: 3 items (Tổng quan, Đăng ký, Ký số) với URL mới (`/dashboard`, `/dang-ky/...`, `/ky-so`)
- Admin: giữ nguyên structure, chỉ cần đảm bảo không còn link tới wizard

### Bước 5 — Update `login-card.tsx`

- Bỏ prop `redirectTo` (không còn cần truyền từ page)
- Bỏ prop `signUpHref` (không còn luồng NKH riêng để "Đăng ký")
- Thêm logic role detect qua email trong `onSubmit`
- Thay box "Hỗ trợ kỹ thuật" → "Demo credentials" hint
- Simplified props: chỉ còn `headline`, `sublabel`, `siteUrl`

### Bước 6 — Update `app/(auth)/dang-nhap/page.tsx`

- Unified headline: "HỆ THỐNG QUẢN LÝ NHIỆM VỤ KH&CN"
- Unified subtitle: "ĐHQG TP. Hồ Chí Minh · pms.vnuhcm.edu.vn"
- Bỏ `signUpHref` & `redirectTo` props

### Bước 7 — Update NKH pages với URL mới

- `app/(nkh)/dang-ky/[tab]/page.tsx`: `BASE = "/dang-ky"` (was `/nkh/dang-ky`)
- `app/(nkh)/ky-so/page.tsx`: `router.push("/dashboard?signed=1")` (was `/nkh/dashboard`)
- `app/(nkh)/dashboard/page.tsx`: CTA link `/dang-ky/thong-tin-chung` (was `/nkh/dang-ky/...`)
- `components/nhiem-vu/wizard-footer.tsx`: chỉ passes `submitHref`, giờ truyền `/ky-so` (was `/nkh/ky-so`)

### Bước 8 — Remove admin wizard CTA

- `app/admin/nhiem-vu/page.tsx`: xoá button "+ Đăng ký mới" (FilterBar primaryAction) và import không dùng (`Plus`, `LinkButton` nếu chỉ dùng cho button đó)
- Admin không có entry point tạo nhiệm vụ mới

### Bước 9 — Delete stale docs

- `lib/wizard-tabs-config.ts`: xoá `adminWizardTabs` export (chỉ còn `nkhWizardTabs`)
- Import site: update places importing `adminWizardTabs` (chỉ wizard admin, đã xoá)

### Bước 10 — Verify

- `npm run build` pass
- `npm run lint` pass
- Manual smoke:
  1. `/dang-nhap` với email `nkh@vnuhcm.edu.vn` → `/dashboard` (NKH shell)
  2. `/dang-nhap` với email `admin@vnuhcm.edu.vn` → `/admin/dashboard` (admin shell)
  3. NKH sidebar không thấy admin link, admin sidebar không thấy "Đăng ký"
  4. NKH: wizard → ký số → dashboard hoạt động
  5. Admin: danh sách nhiệm vụ không còn button "+ Đăng ký mới"
  6. URL cũ `/nkh/dashboard`, `/nkh/dang-nhap`, `/admin/nhiem-vu/dang-ky/...` → 404 (OK, intended)

## Critical files changed

| File | Action |
|---|---|
| `web/app/(auth)/dang-nhap/page.tsx` | simplify (unified) |
| `web/app/(auth)/nkh/` | **delete** |
| `web/app/nkh/` | **move to `(nkh)/`** |
| `web/app/admin/nhiem-vu/dang-ky/` | **delete** |
| `web/app/admin/nhiem-vu/page.tsx` | remove "+ Đăng ký mới" CTA |
| `web/components/auth/login-card.tsx` | role-based redirect, demo hint box |
| `web/lib/nav-config.ts` | update NKH URLs, keep admin |
| `web/lib/wizard-tabs-config.ts` | remove `adminWizardTabs` |
| `web/components/nhiem-vu/wizard-footer.tsx` | update submitHref `/ky-so` |

## Components NOT changed

- DataTable, StatusChip, WizardTabs, WizardStepper, Timeline, FileUploadBox, StatCard, FormField, BarChartMock, DonutChartMock
- PageShell, PageHeader, PageContainer, AppSidebar (variant prop vẫn đúng), AppTopbar, VnuLogo
- Mock data: không đổi schema

## Authorization (YAGNI)

Demo không implement guard thật. Role chỉ decide ở login redirect. Nếu người dùng biết URL `/admin/dashboard` và gõ tay, sẽ vào thẳng admin panel. Không enforce. Đủ cho demo. Nếu cần guard thật thì thêm middleware check cookie/header (ngoài scope).

## Success criteria

1. 1 URL login duy nhất: `/dang-nhap`
2. Admin email → admin panel; NKH email → NKH panel
3. URL `/dashboard`, `/dang-ky/[tab]`, `/ky-so` (không có `/nkh/` prefix)
4. Admin không thấy bất kỳ link/button nào dẫn tới đăng ký/ký số
5. Build + lint pass, 0 regression
6. 2 flow E2E vẫn thông suốt: NKH đăng ký → ký số; Admin xem danh sách → ký hợp đồng

## Risks & mitigation

- **R1 — Hard-coded paths cũ:** Có thể còn `/nkh/...` hoặc `/admin/nhiem-vu/dang-ky/...` rải rác. Mitigation: grep toàn bộ `web/` sau refactor.
- **R2 — Route group trong bash có dấu `()`:** Shell interpret, cần escape. Dùng `"app/(nkh)"` quoted.
- **R3 — Mất state khi chuyển role:** Không có, vì mock không persist session.

## Out of scope

- Auth thật (cookie, JWT, middleware)
- Phân quyền chi tiết (RBAC)
- "Đổi vai trò" trong session (admin chuyển sang view NKH để debug)
- Profile page cá nhân cho NKH
- Trang danh sách "Nhiệm vụ của tôi" riêng (NKH dashboard đã có inline)

## Unresolved questions

1. Logo VNU/HCM ở login card hiện đặt trên navy 120h — có cần thêm text brand "PMS · ĐHQG-HCM" rõ hơn không, hay giữ nguyên minimal?
2. NKH dashboard hiện có "Nhiệm vụ của tôi" inline — có nên tách thành page riêng `/nhiem-vu-cua-toi` hay giữ inline?
3. Admin có cần button "Xem như NKH" để debug/demo UI NKH không? (Hiện NO per câu trả lời của user.)
