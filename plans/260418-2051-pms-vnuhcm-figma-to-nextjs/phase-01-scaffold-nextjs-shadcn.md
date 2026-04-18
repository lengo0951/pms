# Phase 01 — Scaffold Next.js 15 + shadcn/ui

## Overview
- **Priority:** High (blocker cho mọi phase sau)
- **Status:** ✅ completed 2026-04-18 20:59
- **Mục tiêu:** Tạo `web/` folder chạy được `npm run dev`, shadcn init xong, primitives sẵn sàng.

## Requirements

### Functional
- `web/` folder ở root repo, tách khỏi ClaudeKit template
- Next.js **15** (không dùng 16) + App Router + TypeScript + Tailwind v4 + ESLint
- shadcn/ui init với base-color neutral hoặc slate, CSS variables enabled
- Primitives cài sẵn: button, input, label, card, tabs, table, dialog, select, textarea, badge, avatar, separator, dropdown-menu, checkbox, radio-group, sheet, sonner, skeleton, scroll-area
- Deps phụ: `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `zod`, `date-fns`

### Non-functional
- `npm run dev` chạy không lỗi, mở `http://localhost:3000` thấy trang default
- `npm run build` pass
- TypeScript strict enabled (mặc định create-next-app)

## Implementation steps

```bash
# 1. Create folder + scaffold Next.js 15
mkdir -p /Users/coolstar/inseclab/khoa-hoc-cong-nghe/web
cd /Users/coolstar/inseclab/khoa-hoc-cong-nghe/web

# Pin Next 15 để tránh Next 16 breaking changes:
npx create-next-app@15 . \
  --ts --tailwind --eslint --app \
  --no-src-dir --import-alias "@/*" \
  --use-npm --skip-install

# 2. Install base deps
npm install

# 3. Init shadcn (base-nova preset OK, hoặc radix base)
npx shadcn@latest init -d   # default preset

# 4. Add primitives (một lệnh)
npx shadcn@latest add button input label card tabs table dialog \
  select textarea badge avatar separator dropdown-menu \
  checkbox radio-group sheet sonner skeleton scroll-area --yes

# 5. Extra deps
npm install lucide-react react-hook-form @hookform/resolvers zod date-fns

# 6. Verify
npm run dev    # mở localhost:3000 xem trang mặc định
npm run build  # production build phải pass
```

### Config adjustments

**`web/app/layout.tsx`:**
- Đổi `lang="en"` → `lang="vi"`
- Thay font Geist → Inter (đồng bộ Figma):
  ```ts
  import { Inter } from "next/font/google";
  const inter = Inter({ variable: "--font-sans", subsets: ["latin", "vietnamese"] });
  ```
- Cập nhật `<Metadata>`: `title: "PMS · ĐHQG-HCM"`, `description: "Hệ thống quản lý nhiệm vụ KH&CN"`

**`web/app/page.tsx`:** thay home default bằng redirect `/dang-nhap` (Phase 04 sẽ tạo route thật)

## Related files
- CREATE: `web/package.json`, `web/next.config.ts`, `web/tsconfig.json`, `web/app/layout.tsx`, `web/app/page.tsx`, `web/app/globals.css`, `web/components/ui/*`, `web/lib/utils.ts`, `web/components.json`

## Todo
- [ ] `create-next-app@15` với flags đã liệt kê
- [ ] `npm install`
- [ ] `shadcn init -d`
- [ ] `shadcn add` 19 primitives
- [ ] Install 5 deps phụ
- [ ] Đổi font → Inter, lang → vi, metadata → PMS
- [ ] `page.tsx` redirect `/dang-nhap` (placeholder)
- [ ] `npm run dev` verify hoạt động
- [ ] `npm run build` verify pass

## Success criteria
- `cd web && npm run dev` → trang mặc định hoặc redirect load không crash
- `npm run build` exit 0
- `components/ui/` chứa đủ primitives
- Font Inter load đúng (inspect DOM thấy `--font-sans` = Inter)

## Risks
- **R1:** Next 15 lock qua `@15` → nếu npm cache có 16 sẽ warn. Fix: dùng `create-next-app@15.x`.
- **R2:** shadcn form primitive không có trong base-nova preset. Mitigation: dùng raw react-hook-form + Input/Label (đã proven ở session trước).
- **R3:** Tailwind v4 config khác v3 (no `tailwind.config.ts` mặc định, config qua `@theme` trong CSS). Phase 02 sẽ xử.

## Security
- Không có `.env` secrets trong phase này
- `.gitignore` mặc định của create-next-app đã exclude `.env*`

## Next
→ Phase 02: Design tokens + layout shell
