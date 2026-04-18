# Phase 11 — Polish, README, production build

## Overview
- **Priority:** Medium
- **Status:** pending
- **Depends on:** Phase 04–10 (tất cả pages done)

## Mục tiêu
Đảm bảo demo chạy ổn, đi qua hết 20 routes, build production clean, có README hướng dẫn dev next session.

## Checklist

### Visual QA
- [ ] Đi qua từng route bằng tay, so với Figma screenshot (dùng `mcp__figma__get_screenshot` nếu cần)
- [ ] Fix các lệch lạc: spacing, font weight, color drift
- [ ] Kiểm tra sidebar active state đúng ở mọi route
- [ ] Breadcrumb hiển thị chính xác
- [ ] Hover states (buttons, rows) mượt
- [ ] Focus states accessible (keyboard nav)

### Code quality
- [ ] Chạy `npm run lint` — 0 errors, 0 warnings
- [ ] Chạy `npm run build` — pass, check bundle size (< 1 MB gzipped lý tưởng)
- [ ] Không có `console.log` sót lại (grep)
- [ ] Không có component nào >200 LOC (nếu có, tách)
- [ ] Không có file unused (`depcheck` optional)
- [ ] TypeScript strict pass, không `any` không cần thiết

### UX smoke test
- [ ] Login → dashboard hoạt động
- [ ] Admin: click "+ Đăng ký mới" → wizard tab 1 → đi qua đủ 5 tab → submit → về danh sách
- [ ] NKH: dashboard → modal → wizard 4 tab → ký số 6 bước → dashboard
- [ ] Click nav items đổi route chuẩn, active state đúng
- [ ] Filter + search trong danh sách nhiệm vụ hoạt động
- [ ] Pagination hoạt động
- [ ] Form validation hiển thị error đúng khi submit empty

### Asset cleanup
- [ ] Logo VNU/HCM SVG trong `public/` (không dùng URL Figma TTL)
- [ ] Không có image lớn không dùng
- [ ] Favicon placeholder OK

## Create `web/README.md`

```markdown
# PMS · ĐHQG-HCM — Frontend Demo

Hệ thống Quản lý Nhiệm vụ KH&CN (demo UI).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve production
```

## Routes

### Auth
- `/dang-nhap` — Admin login
- `/nkh/dang-nhap` — NKH login

### Admin
- `/admin/dashboard`
- `/admin/ly-lich-to-chuc`
- `/admin/nhiem-vu`
- `/admin/nhiem-vu/dang-ky/[tab]`  (tabs: don-dang-ky, thuyet-minh, thanh-vien, ho-so-dinh-kem, nop-ho-so)
- `/admin/hop-dong-tai-tro`
- `/admin/ky-ket-hop-dong/[step]`
- `/admin/nhiem-vu-tai-tro`
- `/admin/nhat-ky-trien-khai`
- `/admin/theo-doi-nhiem-vu`

### NKH
- `/nkh/dashboard`
- `/nkh/dang-ky/[tab]`
- `/nkh/ky-so`

## Stack
Next.js 15 · TypeScript · Tailwind v4 · shadcn/ui · react-hook-form · zod · lucide · date-fns · Inter font

## Mock data
`lib/mock-data/` — dữ liệu tĩnh, không có API backend.

## Design source
Figma: `3WCb18kpRsvsYoheKPPyGg` — PMS VNUHCM · Quản lý KH&CN
```

## Todo
- [ ] Visual QA 20 routes
- [ ] Lint + build pass
- [ ] UX smoke test 3 flows chính
- [ ] Logo SVG trong public/
- [ ] `web/README.md` theo template trên
- [ ] (Optional) Tạo `docs/project-roadmap.md` update status demo hoàn thành
- [ ] (Optional) Demo video/GIF walkthrough

## Success criteria
- `npm run build` exit 0
- `npm run lint` 0 errors
- 20 routes render không crash
- Visual fidelity ≥90% vs Figma
- 3 flow chính hoạt động end-to-end
- README đầy đủ cho dev mới onboard

## Risks
- **R1:** Build fail do Next 15 strict ESLint. Mitigation: fix từng error, không dùng `--no-lint` flag.
- **R2:** Visual drift lớn ở một số màn chưa fetch Figma kỹ → quay lại update khi thấy.

## Next (ngoài scope plan này)
- Kết nối API thật
- i18n
- Responsive mobile
- Test (unit/e2e)
- Deploy (Vercel)
