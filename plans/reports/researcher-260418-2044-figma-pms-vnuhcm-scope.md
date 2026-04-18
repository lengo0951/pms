# Research Report: PMS VNU-HCM — Quản lý Khoa học & Công nghệ (Figma → Frontend Demo)

**Timestamp:** 2026-04-18 20:44 ICT
**Figma file:** `3WCb18kpRsvsYoheKPPyGg` — "PMS VNUHCM – Quản lý Khoa học Công nghệ (Copy)"
**Figma URL:** https://www.figma.com/design/3WCb18kpRsvsYoheKPPyGg/
**Purpose:** Research đầu vào trước khi code frontend demo.

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Nó là website gì](#nó-là-website-gì)
3. [Inventory 22 màn hình](#inventory-22-màn-hình)
4. [Design tokens trích từ Figma](#design-tokens-trích-từ-figma)
5. [Pattern lặp lại](#pattern-lặp-lại)
6. [User journeys](#user-journeys)
7. [Khuyến nghị tech stack cho demo](#khuyến-nghị-tech-stack-cho-demo)
8. [Scope demo đề xuất](#scope-demo-đề-xuất)
9. [Rủi ro / pitfalls](#rủi-ro-pitfalls)
10. [Next steps](#next-steps)
11. [Unresolved questions](#unresolved-questions)

---

## Executive Summary

Website là **hệ thống nội bộ quản lý nhiệm vụ KH&CN cho ĐHQG TP.HCM (VNU-HCM)**, tên product "PMS · ĐHQG-HCM" (Project Management System). Không phải landing/marketing — là một **dashboard admin desktop-first (1440×900)** kiểu CRUD nặng: form đăng ký, danh sách nhiệm vụ, quản lý hợp đồng tài trợ, ký số, nhật ký triển khai.

Figma có **22 top-level frames** = 12 màn Admin (tổ chức chủ trì) + 8 màn NKH (nhà khoa học) + 2 phụ (banner/stray). Cả 2 luồng đều dùng **cùng thiết kế hệ thống**: sidebar navy `#003087` 240px cố định, topbar trắng 64px breadcrumb, nội dung nền `#f3f6fa`, card trắng bo 12px, Inter font. Status chip dùng palette pastel 4 màu (xanh dương, xanh lá, vàng, tím) tương ứng "Đang xét chọn / Đã ký HĐ / Đang thực hiện / Hoàn thành".

**Khuyến nghị demo:** Next.js 15/16 + TS + Tailwind v4 + shadcn/ui. Build 4–6 màn cốt lõi trước (Login, Dashboard, Danh sách nhiệm vụ, Wizard đăng ký, Hợp đồng, Ký số) để demo đủ câu chuyện, còn lại có thể nhồi sau. Mock data TS thuần, không cần API thật.

---

## Nó là website gì

**Domain:** Quản lý nhiệm vụ nghiên cứu KH&CN trong trường đại học công lập (VN).

**Hai vai trò rõ ràng:**

| Vai trò | Ai dùng | Làm gì |
|---|---|---|
| **Tổ chức chủ trì (Admin)** | Phòng KH&CN, đơn vị chủ quản | Quản lý danh mục nhiệm vụ, duyệt hồ sơ, ký hợp đồng tài trợ, theo dõi tiến độ, nhật ký triển khai |
| **Nhà khoa học (NKH)** | Giảng viên/nghiên cứu viên | Đăng ký nhiệm vụ mới (wizard 4 tab), nộp hồ sơ, ký số |

**Dấu hiệu domain-specific:**
- Menu: "Tổng quan · Nhiệm vụ · Lý lịch tổ chức" — rõ ràng là research task workflow
- Footer login: `pms.vnuhcm.edu.vn · hotline@vnuhcm.edu.vn · (028) 3724 4270`
- Headline: "HỆ THỐNG QUẢN LÝ NHIỆM VỤ KH&CN — Đại học Quốc gia Thành phố Hồ Chí Minh"
- Data mẫu trong bảng: "TN-2026-001 · Ứng dụng AI trong dự báo thời tiết · PGS.TS. Trần Văn Minh · 500 tr." — format mã nhiệm vụ TN-YYYY-NNN, kinh phí theo triệu VND
- Flow nghiệp vụ: Đăng ký → Xét chọn → Ký hợp đồng → Thực hiện → Nhật ký → Hoàn thành

---

## Inventory 22 màn hình

### Luồng Admin (12 màn + 1 stray)

| Node ID | Tên | Loại UI |
|---|---|---|
| `2:2` | 01_Đăng nhập | Login card gradient navy |
| `26:2` | Frame 1 (stray 100×100) | Bỏ qua |
| `2:32` | 02_Dashboard | KPI cards + charts + recent activity |
| `4:2` | 03_Lý lịch tổ chức | Form read-only hồ sơ đơn vị |
| `4:110` | 04_Đăng ký nhiệm vụ – Tab 1 Đơn đăng ký | Wizard form tab 1/5 |
| `4:215` | 05_Đăng ký nhiệm vụ – Tab 3 Thành viên | Wizard table thành viên tab 3/5 |
| `6:2` | 06_Đăng ký nhiệm vụ – Tab 5 Nộp hồ sơ | Wizard file upload tab 5/5 |
| `6:138` | 07_Danh sách nhiệm vụ | Data table + filters + chips |
| `7:2` | 08_Hợp đồng tài trợ | Table hợp đồng |
| `7:169` | 09_Ký kết hợp đồng – Bước 3 | Stepper + form ký |
| `7:288` | 10_Nhiệm vụ được tài trợ | Table biến thể |
| `8:2` | 11_Nhật ký triển khai | Timeline view |
| `8:119` | 12_Theo dõi nhiệm vụ | Progress + milestones |

**Lưu ý:** Figma **chỉ cung cấp tab 1, 3, 5** của wizard admin — tab 2 & 4 chưa có thiết kế.

### Luồng Nhà khoa học (8 màn + 1 banner)

| Node ID | Tên | Loại UI |
|---|---|---|
| `30:2` | Banner [NKH FLOW] | Không phải màn |
| `30:6` | NKH_01_Đăng nhập | Login (variant) |
| `31:2` | NKH_02_Dashboard | Dashboard cá nhân NKH |
| `32:2` | NKH_03_Modal Đăng ký | Modal xác nhận start wizard |
| `32:69` | NKH_04_Tab1 Thông tin chung | Wizard NKH 1/4 |
| `33:2` | NKH_05_Tab2 Thuyết minh | Wizard NKH 2/4 (rich text) |
| `33:129` | NKH_06_Tab3 Thành viên | Wizard NKH 3/4 |
| `34:2` | NKH_07_Tab4 Nộp hồ sơ | Wizard NKH 4/4 (upload) |
| `34:123` | NKH_08_Nộp hồ sơ ký số | 6-step signature workflow |

---

## Design tokens trích từ Figma

### Colors — confirmed từ 3 màn (Login 2:2, Dashboard 2:32, List 6:138)

```
/* Brand / navy */
--vnu-navy-900: #002070  /* sidebar logo strip */
--vnu-navy-700: #003087  /* primary (buttons, sidebar, headings) */
--vnu-navy-500: #0055b3  /* login gradient end */
--vnu-navy-400: #1e4d8c  /* active nav item bg */
--vnu-navy-100: #e8f4fd  /* info box bg, ghost button bg */

/* Blue accent (links, info chips) */
--blue-400: #60a5fa
--blue-500: #3b82f6    /* link color, "Đang xét chọn" text */
--blue-200: #93c5fd    /* sidebar muted text */
--blue-100: #dbeafe    /* "Đang xét chọn" chip bg */

/* Neutrals */
--bg-page: #f3f6fa     /* page background */
--bg-stripe: #fafbff   /* zebra table row */
--bg-card: #ffffff
--border: #e5e7eb
--text-900: #1a1f36    /* primary text */
--text-600: #4b5563    /* secondary text */
--text-400: #9ca3af    /* placeholder / muted */

/* Status (pastel pairs) */
--status-review:   bg #dbeafe / text #3b82f6  /* Đang xét chọn */
--status-signed:   bg #d1fae5 / text #10b981  /* Đã ký HĐ */
--status-active:   bg #fef3c7 / text #f59e0b  /* Đang thực hiện */
--status-done:     bg #ede9fe / text #8b5cf6  /* Hoàn thành */
```

### Typography
- Font family: **Inter** (Bold 700 / Semibold 600 / Medium 500 / Regular 400)
- Scale used: 9, 10, 11, 12, 13, 14, 15, 17, 18, 24 px
- Không có text > 24px (trừ title login 24px) — UI dày đặc, tối ưu mật độ thông tin

### Radius & Shadow
- Input / button compact: `rounded-[8px]`
- Button primary login: `rounded-[10px]`
- Card: `rounded-[12px]`
- Login card hero: `rounded-[20px]`, shadow `0 24px 60px rgba(0,0,0,0.25)`
- Content card: shadow `0 2px 10px rgba(0,0,0,0.06)`

### Spacing
- Sidebar: 240w, logo zone 76h, active pill 8/16 inset
- Topbar: 64h
- Content inset: 16–32px horizontal, 14–16px vertical
- Input height: 40px
- Button height: 36 (compact) / 48 (login)
- Table header: 44h, row: 56h
- Status chip: 24–28h, bo full

---

## Pattern lặp lại

**Shell layout (dùng cho 18/20 màn nội bộ):**
```
┌────────┬──────────────────────────────────────────────┐
│        │ Topbar 64h: breadcrumb + page title + 🔔 + av│
│Sidebar ├──────────────────────────────────────────────┤
│ 240w   │ Content (bg #f3f6fa)                         │
│ navy   │   Cards / tables / forms                     │
│        │                                              │
└────────┴──────────────────────────────────────────────┘
```

**Components cần build tái sử dụng:**

| Component | Dùng ở | Ghi chú |
|---|---|---|
| `<AppSidebar>` | Admin + NKH | Navy 240w, item chia section, active pill `#1e4d8c`, user avatar ở dưới |
| `<AppTopbar>` | Admin + NKH | Breadcrumb 11px `#9ca3af` + page title 17px semibold, bell, avatar |
| `<DataTable>` | 07, 08, 10 và wizard tab 3 | Header `#f9fafb` 44h, zebra `#fafbff`, cột config |
| `<StatusChip>` | Tables + dashboard | 4 variant (review/signed/active/done) |
| `<FilterBar>` | Table pages | Search + 3 dropdown + nâng cao + primary button |
| `<StatsCards>` | Dashboard | KPI tiles |
| `<WizardTabs>` | Admin 5-tab + NKH 4-tab | Tab nav reuse với prop `tabs` |
| `<LoginCard>` | 01, NKH_01 | Variant qua prop |
| `<Timeline>` | 11 Nhật ký | Timeline dots + text |
| `<Stepper>` | 09 Ký hợp đồng, NKH_08 Ký số | Numbered steps ngang |
| `<FileUploadBox>` | 06, NKH_07 | Drag drop, danh sách file |
| `<FormField>` | Tất cả form | Label 12px medium + Input 40h |

---

## User journeys

### Flow 1 — NKH đăng ký nhiệm vụ mới
```
NKH_01 Login → NKH_02 Dashboard → nhấn "Đăng ký nhiệm vụ"
  → NKH_03 Modal xác nhận
  → NKH_04 Tab 1: Thông tin chung
  → NKH_05 Tab 2: Thuyết minh
  → NKH_06 Tab 3: Thành viên
  → NKH_07 Tab 4: Nộp hồ sơ
  → NKH_08 Ký số nộp hồ sơ (6-step)
  → Done, gửi về admin xét duyệt
```

### Flow 2 — Admin quản lý vòng đời nhiệm vụ
```
01 Login → 02 Dashboard
  → 07 Danh sách nhiệm vụ (filter, search)
    → Click chi tiết 1 nhiệm vụ
      → 08 Hợp đồng tài trợ
        → 09 Ký kết hợp đồng 3 bước
          → 10 Nhiệm vụ được tài trợ
  → 11 Nhật ký triển khai (theo dõi update)
  → 12 Theo dõi nhiệm vụ (progress milestones)
```

### Flow 3 — Admin tự đăng ký hộ (ít dùng)
Tab 1, 3, 5 wizard admin — có vẻ chỉ để admin thay mặt (backup flow).

---

## Khuyến nghị tech stack cho demo

### Stack chính (khuyến nghị)

| Lớp | Lựa chọn | Lý do |
|---|---|---|
| Framework | **Next.js 15 hoặc 16 + App Router** | Routing file-based khớp 20 màn, layout groups phù hợp 2 shell (admin/nkh), build prod một phát ra file tĩnh |
| Ngôn ngữ | **TypeScript** | Table cột/form field cần type |
| CSS | **Tailwind v4** | Tokens Figma dùng utility trực tiếp, nhanh |
| UI primitives | **shadcn/ui (base-nova)** | Button, Input, Table, Tabs, Dialog, Select, DropdownMenu có sẵn, copy code vào repo (không lock-in) |
| Form | **react-hook-form + zod** | Wizard nhiều tab, validation từng tab |
| Icons | **lucide-react** | Match lookfeel hiện đại; thay unicode `⊞ ◈ ◎` placeholder ở Figma |
| Date | **date-fns** | Định dạng `01/2026 – 12/2027` |
| Mock data | **TS file thuần** trong `lib/mock-data/` | Demo thôi, chưa cần MSW |

**Không cần cho demo:**
- Auth thật (BetterAuth/NextAuth) — chỉ navigate sau submit
- State management (Zustand/Redux) — useState + useContext đủ
- i18n — tiếng Việt hardcode
- Dark mode — Figma chỉ light
- Chart library (nếu dashboard chỉ placeholder được)
- Backend/API — mock TS

### Ghi chú Next.js 16
Nếu dùng Next 16 (create-next-app mới nhất), đọc `node_modules/next/dist/docs/` trước khi viết RSC/caching code — có breaking changes so với docs huấn luyện LLM. Dev server vẫn `npm run dev` bình thường.

---

## Scope demo đề xuất

Không nên build cả 20 màn cho demo — phí thời gian, demo lê thê. Chia **3 tier**:

### Tier 1 — Must have (6 màn, ~1–1.5 ngày)
Đủ kể trọn câu chuyện "NKH đăng ký → Admin duyệt → Ký hợp đồng":

1. **01_Đăng nhập** — sell thương hiệu, màu navy, gradient đẹp
2. **02_Dashboard admin** — ấn tượng ban đầu, KPI cards
3. **07_Danh sách nhiệm vụ** — showcase data table + status chip + filters
4. **NKH_04+07 Wizard** (1 tab đại diện + nộp hồ sơ) — showcase form dài + upload
5. **09_Ký hợp đồng Bước 3** — showcase stepper
6. **NKH_08_Ký số** — showcase signature workflow (điểm nhấn kỹ thuật)

### Tier 2 — Should have (+6 màn nếu có thời gian)
- 03 Lý lịch tổ chức
- 08 Hợp đồng tài trợ · 10 Nhiệm vụ được tài trợ (dùng lại DataTable)
- 11 Nhật ký · 12 Theo dõi
- NKH_02 Dashboard NKH

### Tier 3 — Nice to have (8 màn còn lại)
- NKH_01 Login NKH (đổi màu/logo nhẹ)
- NKH_03 Modal
- NKH_05, 06 (tab 2 & 3 wizard NKH)
- Admin wizard tab 1, 3, 5 (ít dùng)

**Chiến thuật build:**
1. Setup + tokens + shell layout (sidebar/topbar) — dùng cho tất cả
2. Build components tái sử dụng: DataTable, StatusChip, WizardTabs, FilterBar, FormField
3. Ráp từng màn — phần lớn chỉ là compose components với mock data

---

## Rủi ro / pitfalls

1. **Tab 2 & 4 wizard admin chưa có thiết kế** — nếu demo hỏi tới, sẽ hụt. Giải: placeholder "Đang thiết kế" có copy ngắn, hoặc skip tab 2/4 trong demo flow.
2. **Mật độ UI rất cao** (font 10–12px, row 56px) — dễ vỡ trên màn hình <1440px. Demo: dùng đúng Full HD 1440+.
3. **Signature workflow ký số** (NKH_08) phức tạp nhất — có 6 bước, nếu demo thực thời gian hẹp thì fake state machine trước, không cài crypto thật.
4. **Icons Figma dùng unicode placeholder** (`⊞ ◈ ◎ 🔍 🔔`) — demo nên thay lucide-react tương đương (`LayoutDashboard`, `ListChecks`, `Building2`, `Search`, `Bell`) để chuyên nghiệp hơn.
5. **Asset URL Figma** có TTL 7 ngày — logo VNU/HCM sẽ chết. Giải: export SVG một lần, lưu vào `public/`.
6. **Next.js 16 mới** — nếu kit template cố định Next 15, dùng 15 cho ổn định. Cả hai đều App Router tương thích.
7. **Mock data realistic** — nếu demo cho cán bộ KH&CN thật, họ nhìn mã nhiệm vụ/tên đề tài quen thuộc sẽ tin hơn. Figma đã có sẵn 10 dòng mẫu thực tế (AI thời tiết, nano vật liệu, vaccine COVID, blockchain, pin thể rắn…) — dùng nguyên.

---

## Next steps

1. **Confirm scope demo** — chốt Tier 1 (6 màn) hay đi xa hơn?
2. **Confirm tech stack** — Next.js 15 hay 16? (Đề xuất 15 để ổn)
3. **Xin logo VNU/HCM SVG** hoặc cho phép screenshot từ Figma → vectorize
4. **Scaffold `web/` folder** — `create-next-app`, init shadcn, add primitives
5. **Phase 1:** tokens + shell layout (sidebar/topbar)
6. **Phase 2+:** build Tier 1 theo thứ tự bảng trên

---

## Unresolved questions

1. **Demo cho ai?** Nội bộ team dev, hay demo cho stakeholder bên VNU-HCM? Ảnh hưởng tới mức polish & realistic data.
2. **Deadline demo?** Vài giờ / 1 ngày / 1 tuần — quyết định Tier nào.
3. **Tab 2 & 4 wizard admin** có cần cho demo không, hay skip được?
4. **Ký số NKH_08** — cần simulate flow tương tác bao nhiêu (chỉ hiển thị 6 bước tĩnh, hay có thể click next/prev)?
5. **Logo VNU/HCM** — user có file gốc, hay export từ Figma là OK?
6. **Dashboard charts** (2:32) — design có vẽ biểu đồ thật hay chỉ khung? (Chưa xác nhận vì design context đã dùng cho sidebar/header, cần fetch lại phần content nếu quan trọng cho demo.)
7. **Dữ liệu mock** — dùng data mẫu sẵn trong Figma đủ chưa, hay cần thêm rows tự sinh để showcase pagination (Figma chỉ hiển thị 10/15)?
