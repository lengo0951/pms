# Phase 04 — Auth screens (2 màn)

## Overview
- **Priority:** Medium
- **Status:** pending
- **Depends on:** Phase 03 (`<LoginCard>`)
- **Figma nodes:** `2:2` (admin), `30:6` (NKH)

## Màn hình

### `/dang-nhap` — 01_Đăng nhập (Admin) · node 2:2

**Layout:**
- Background: linear-gradient navy `from-[#003087] to-[#0055b3]` full-screen
- 2 decorative circles (Deco1 380×380 top-left, Deco2 460×460 bottom-right) — có thể dùng SVG blob hoặc skip (nice-to-have)
- **Login Card** trung tâm 460×740, rounded-20, shadow-hero, bg white, absolute positioned (dùng flex center thay vì absolute)

**Card content:**
- Card head 460×120 bg navy `#003087`:
  - Logo VNU/HCM 72×72 left
  - Title "HỆ THỐNG QUẢN LÝ NHIỆM VỤ KH&CN" (white bold 11px)
  - Subtitle "Đại học Quốc gia Thành phố Hồ Chí Minh" (`#93c5fd` 10px)
  - URL "pms.vnuhcm.edu.vn" (`#60a5fa` 10px)
- Body:
  - H2 "Đăng nhập" (24px bold `#1a1f36`)
  - Subtitle "Nhập thông tin tài khoản để tiếp tục sử dụng hệ thống" (12px `#4b5563`)
  - FormField "Email / Tên đăng nhập" — Input placeholder "email@vnuhcm.edu.vn"
  - FormField "Mật khẩu" — Input type password
  - Link "Quên mật khẩu?" right-aligned blue
  - Button primary "ĐĂNG NHẬP" (h-48 rounded-10 navy, white bold 15)
  - Divider
  - Row: "Chưa có tài khoản?" + link "Đăng ký ngay →"
  - Info box (`#e8f4fd` bg + navy border): "ℹ️ Hỗ trợ kỹ thuật" + email + phone
  - Footer copyright 10px muted

**Submit behavior:** `router.push('/admin/dashboard')` — không validate thật. Form RHF + zod để show validation UI.

### `/nkh/dang-nhap` — NKH_01_Đăng nhập · node 30:6

Tương tự admin login nhưng:
- Gradient có thể đổi nhẹ (sẽ confirm khi fetch Figma)
- Title "TRANG NHÀ KHOA HỌC" hoặc tương đương (cần fetch)
- Submit → `/nkh/dashboard`

→ Reuse `<LoginCard>` qua prop `variant: 'admin' | 'nkh'`

## Routing structure

```
app/
├── (auth)/
│   ├── layout.tsx              # Full-screen gradient bg, no sidebar
│   ├── dang-nhap/page.tsx      # Admin login
│   └── nkh/
│       └── dang-nhap/page.tsx  # NKH login
```

## Implementation workflow

1. Fetch Figma context cho node `30:6` (NKH login) để xác nhận khác biệt
2. Build `/dang-nhap` page dùng `<LoginCard>`
3. Build `/nkh/dang-nhap` page reuse với variant prop
4. `app/(auth)/layout.tsx` setup gradient background wrapper

## Todo
- [ ] `mcp__figma__get_design_context` node 30:6 → đối chiếu với admin login
- [ ] `app/(auth)/layout.tsx` — gradient wrapper
- [ ] `app/(auth)/dang-nhap/page.tsx`
- [ ] `app/(auth)/nkh/dang-nhap/page.tsx`
- [ ] Zod schema: email valid, password ≥6 chars (cosmetic)
- [ ] Manual test: submit → redirect đúng

## Success criteria
- 2 routes render khớp Figma ≥90% visual
- Form validation hiện đúng message khi submit empty
- Submit → navigate đúng target
- Logo VNU/HCM render (SVG placeholder OK)

## Risks
- **R1:** Gradient + deco circles không match pixel-perfect. Chấp nhận fidelity ~90%.
- **R2:** NKH login có thể có khác biệt lớn chưa biết — fetch design trước khi code.

## Next
→ Phase 05: Dashboards
