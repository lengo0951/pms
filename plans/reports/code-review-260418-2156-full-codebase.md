# Code Review: `web/` Full Codebase

**Reviewer:** Claude (self-review, adversarial mode)
**Scope:** Toàn bộ `web/` — 22 routes, ~2,940 LOC (not counting shadcn UI), Next.js 15.5.15 + Tailwind v4 + shadcn/ui base-nova
**Build status:** ✅ passes · **Lint:** ✅ passes · **Tests:** không có
**Severity:** Critical (blocks demo) · Important (should fix) · Minor (nice to have)

---

## Executive summary

Build pass không đồng nghĩa với chất lượng. Review phát hiện **3 bugs Critical** (2 là data inconsistency giữa dashboard và list thật, 1 là a11y form-label không link), **6 Important**, **8 Minor**. Không có security hole nghiêm trọng (demo không có auth thật — đã document trong plan). Dead code nhẹ sau restructure. Code tổng thể modular tốt (tất cả file <200 LOC, naming nhất quán).

---

## 🔴 Critical (fix trước khi demo)

### C1. Dashboard KPI & donut chart số liệu **sai so với list thật**

**Evidence:**
- `nhiemVuList` đếm thật: review=3 · **signed=4** · **active=4** · **done=4** (tổng 15)
- `adminKpis` hardcode: review=3 · active=**5** ❌ · done=4. **Thiếu** "Đã ký HĐ" row
- `nhiemVuStatusBreakdown` (donut) hardcode: review=3 · signed=4 · active=**5** ❌ · done=**3** ❌
- Chip filter ở `/admin/nhiem-vu` dùng `countByStatus(nhiemVuList)` → hiển thị đúng 3/4/4/4

**Impact:** Viewer vào `/admin/dashboard` thấy "Đang thực hiện: 5", click sang `/admin/nhiem-vu`, filter cùng trạng thái → thấy 4 nhiệm vụ. **Mất tin tưởng ngay tức khắc.**

**Root cause:** `lib/mock-data/dashboard.ts` viết số tay, không derive từ `nhiemVuList`. Khi mình tinh chỉnh mock list sau đó, dashboard không sync.

**Fix (5 phút):** Derive tất cả dashboard KPI từ `nhiemVuList`:
```ts
import { countByStatus, nhiemVuList } from "./nhiem-vu";
const counts = countByStatus(nhiemVuList);
export const adminKpis = [
  { label: "Tổng nhiệm vụ", value: counts.all, accent: "brand" },
  { label: "Đang xét chọn", value: counts.review, accent: "brand" },
  { label: "Đã ký HĐ", value: counts.signed, accent: "signed" },
  { label: "Đang thực hiện", value: counts.active, accent: "active" },
  { label: "Hoàn thành", value: counts.done, accent: "done" },
];
export const nhiemVuStatusBreakdown = [
  { label: "Đang xét chọn", value: counts.review, color: "#3b82f6" },
  { label: "Đã ký HĐ", value: counts.signed, color: "#10b981" },
  { label: "Đang thực hiện", value: counts.active, color: "#f59e0b" },
  { label: "Hoàn thành", value: counts.done, color: "#8b5cf6" },
];
```

---

### C2. Form fields **không link label với input** (a11y fail)

**Evidence:** `components/nhiem-vu/tab-don-dang-ky.tsx` có 11 FormField, **không có một htmlFor nào** linking với Input:
```tsx
<FormField label="Tên nhiệm vụ" required>
  <Input placeholder="VD: ..." />          ← no id
</FormField>
```
`FormField` có prop `htmlFor` nhưng component caller không truyền. Label tag render bình thường → screen reader không báo "tên nhiệm vụ" khi focus vào input.

**Impact:** Vi phạm WCAG 2.1 Level A. Với demo cho VNU-HCM (cơ quan nhà nước), có thể bị trả về.

**Fix (15 phút):** Thêm `id` cho mỗi Input và `htmlFor` cho FormField:
```tsx
<FormField label="Tên nhiệm vụ" htmlFor="ten-nhiem-vu" required>
  <Input id="ten-nhiem-vu" placeholder="..." />
</FormField>
```
Hoặc tự động: thay FormField dùng `<label>` wrapping children (không cần id). Đơn giản hơn.

---

### C3. `/dashboard?signed=1` redirect nhưng dashboard không đọc param → flow ký số không có feedback thành công

**Evidence:** `app/(nkh)/ky-so/page.tsx:42` → `router.push("/dashboard?signed=1")`. Nhưng `app/(nkh)/dashboard/page.tsx` không check `searchParams` → user hoàn tất ký số, quay về dashboard, không thấy toast / banner nào xác nhận.

**Impact:** Flow demo chính của NKH kết thúc một cách hụt hẫng.

**Fix (10 phút):** Thêm banner toast trong dashboard khi query `signed=1`:
```tsx
export default async function NkhDashboardPage({
  searchParams,
}: { searchParams: Promise<{ signed?: string }> }) {
  const params = await searchParams;
  return (
    <PageShell ...>
      {params.signed === "1" && (
        <div className="mb-4 rounded-xl border border-[#10b981] bg-[#d1fae5] p-4 text-sm">
          ✓ Hồ sơ đã được ký và gửi thành công!
        </div>
      )}
      ...
    </PageShell>
  );
}
```

---

## 🟡 Important (nên fix trước ship)

### I1. `console.log` leftover trong production code

**File:** `app/admin/nhiem-vu/page.tsx:39`
```tsx
onClick={() => console.log("download", r.id)}
```
Dev-debug quên xoá. Demo viewer mở devtools thấy ngay.

**Fix:** Thay bằng toast hoặc comment `// TODO: wire real download`.

---

### I2. `dangerouslySetInnerHTML` với static content — code smell

**File:** `app/(nkh)/ky-so/page.tsx:58`
```tsx
<p dangerouslySetInnerHTML={{ __html: detail.description }} />
```
Content đến từ `stepDetails` array static, có entity `&quot;Ký&quot;` — entity escape không cần trong React (React đã tự handle text). Dùng `dangerouslySetInnerHTML` tiềm ẩn rủi ro nếu dữ liệu thành dynamic trong tương lai.

**Fix:** Đổi `&quot;Ký&quot;` thành `'Ký'` trong data, render `{detail.description}` bình thường.

---

### I3. Sidebar nav duplicate href

**File:** `lib/nav-config.ts` — admin section "Nhiệm vụ":
- Parent item: `href: "/admin/nhiem-vu"` label "Nhiệm vụ"
- Children đầu tiên: `href: "/admin/nhiem-vu"` label "Danh sách nhiệm vụ"

Click parent hay con đều về cùng URL. Parent chỉ nên là non-link (toggle expand) hoặc go đến overview riêng.

**Fix (2 phút):** Đổi parent item thành không có href (dùng prop `expandable: true`), hoặc bỏ child "Danh sách nhiệm vụ" và label parent là "Danh sách nhiệm vụ".

---

### I4. 6 shadcn primitives cài nhưng **chưa dùng**

**Unused:** `sheet.tsx`, `avatar.tsx`, `separator.tsx`, `scroll-area.tsx`, `skeleton.tsx`, `radio-group.tsx`.

Không gây bug runtime (code không bundle vì chưa import), nhưng clutter source tree. Nếu demo đoạn đánh giá "clean codebase" thì đây là sạn nhỏ.

**Fix:** Xoá 6 file trong `components/ui/`. YAGNI.

---

### I5. Lucide icons thiếu `aria-hidden="true"` ở vị trí decorative

Toàn repo chỉ có 3 lần `aria-hidden` (trong auth layout blobs + timeline connector line). Các icon trong sidebar nav items, topbar bell, status chips... đều đọc được bởi screen reader → noise.

**Fix (10 phút):** Add `aria-hidden` vào mọi Lucide icon đi kèm text:
```tsx
<ListChecks aria-hidden className="size-4" />
<span>Nhiệm vụ</span>
```

---

### I6. "Quên mật khẩu?" link `href="#"`

**File:** `components/auth/login-card.tsx:78`
```tsx
<Link href="#" className="...">Quên mật khẩu?</Link>
```
Click → scroll to top. Tối thiểu nên `href="#"` bỏ, đổi `<button type="button">` hoặc link tới placeholder page.

---

## 🔵 Minor (polish)

| # | Issue | File | Fix |
|---|---|---|---|
| M1 | Admin wizard state lost khi switch tab (mỗi tab là fresh Server Component) | `app/admin/nhiem-vu/dang-ky/*` (đã xoá sau restructure) — vẫn áp dụng cho `app/(nkh)/dang-ky/[tab]` | Context provider state cross-tab hoặc sessionStorage — ngoài scope demo |
| M2 | `delta: "+3 tháng này"` hardcode trong KPI | `lib/mock-data/dashboard.ts` | Xoá hoặc đồng bộ với dữ liệu |
| M3 | "Xem giao diện NKH" button không persist role; refresh /dashboard vẫn thấy NKH sidebar | `components/layout/app-sidebar.tsx` | Auth thật với cookie — ngoài scope |
| M4 | Bundle `/dang-nhap` 220KB (RHF + zod) — lớn cho 1 trang login | — | Dynamic import zod hoặc remove RHF cho form đơn giản |
| M5 | No custom `not-found.tsx` → URL sai show Next default 404 xấu | `app/not-found.tsx` | Tạo custom 404 branded |
| M6 | Admin dashboard `upcoming` filter cắt 5, nếu <5 item status review/active thì card trống awkward | `app/admin/dashboard/page.tsx:26` | Add empty state |
| M7 | `generateStaticParams` + client state mismatch: pre-rendered tab khi navigate SPA không kích hoạt RSC lại | Wizard pages | Document, không fix |
| M8 | `crypto.randomUUID()` trong `tab-thanh-vien.tsx` gọi client-side — OK trên modern browser, nhưng IE/old safari fail | `components/nhiem-vu/tab-thanh-vien.tsx:23` | Polyfill hoặc `Math.random().toString(36)` |

---

## ✅ Điểm tốt

- **File sizes:** 100% file < 200 LOC (rule tuân thủ tuyệt đối)
- **Zero `any` casts:** type safety strict
- **No TODO/FIXME:** code không có placeholder chưa làm
- **Naming convention:** kebab-case nhất quán trong tất cả file TS/TSX
- **Modular:** `components/shared/*` đúng tái sử dụng, không trùng lặp
- **Tokens:** Tailwind v4 `@theme` brand tokens đúng Figma, centralized
- **Mock data TS-typed:** có `type NhiemVu`, `ThanhVien` v.v. chứ không `any`
- **Route group `(nkh)`** đúng Next 15 pattern, URL clean
- **Server/Client boundary:** phần lớn dashboard/static page để RSC, chỉ client khi cần state
- **Logo fix (rounded-md + padding):** đúng pattern cho landscape logo
- **Auth bypass documented:** plan nói rõ không có middleware — intentional cho demo

---

## 🛡️ Adversarial review (red-team findings)

| Attack | Kết quả | Risk |
|---|---|---|
| Direct URL `/admin/dashboard` không login | ✅ Vào được admin panel | 🟢 Acceptable (demo, không có auth thật — documented) |
| XSS via mock data | ❌ React tự escape `{data}`; `dangerouslySetInnerHTML` chỉ nhận static literal — không có user input đi qua | 🟢 Safe |
| Form submit với empty data | ⚠ Zod validate client-side OK, nhưng không có server action guard (ko cần cho demo) | 🟢 Acceptable |
| Wizard skip tab (click Tab 4 không qua 1–3) | ❌ Cho phép (URL navigable) | 🟡 UX issue — để demo OK, production cần guard |
| DoS: 15 rows table + chart SVG render | ✅ OK, rows bé | 🟢 Safe |
| Logo fail load (file xoá) | ⚠ Fallback chỉ có alt text, layout bị vỡ 48x48 ô trống | 🟢 Low priority |
| NKH logged in và vào `/admin/*` | ❌ Hiển thị admin panel bình thường (không check role) | 🟡 Demo OK, production cần guard |
| Filter query với SQL-injection style string | ✅ Client-side filter `includes()` — no injection surface | 🟢 Safe |

---

## 📋 Đề xuất fix

### Ngay (15–30 phút, Critical only):
1. **C1** — Derive dashboard KPI/donut từ `nhiemVuList`
2. **C2** — FormField link `htmlFor` → Input `id` (all 11 fields)
3. **C3** — Dashboard NKH đọc `searchParams.signed` → show success banner

### Trước khi ship demo cho stakeholder (2-3 giờ):
- Critical 1-3
- Important 1-6
- Clean dead primitives (I4)
- 404 page (M5)
- Role guard đơn giản (localStorage role + middleware check) nếu audience khắt khe

### Backlog (production-grade):
- Full a11y audit (axe-core)
- Responsive mobile
- Auth thật (BetterAuth / NextAuth)
- Unit test Vitest + E2E Playwright
- I18n setup
- Dark mode

---

## Verdict

**Demo-ready với 3 fix Critical (~30 phút work).** Code quality tổng thể: **7.5/10** cho demo-scope. Sạch, modular, nhưng data inconsistency giữa dashboard và list là vết hẹo có thể mất điểm với reviewer tinh ý. Adversarial không tìm thấy security hole blocking (auth bypass là intentional, đã document).

## Unresolved questions

1. Có cần fix C1–C3 ngay không, hay chấp nhận cho demo nội bộ?
2. Demo cho audience nào? (Ảnh hưởng mức polish cần thiết)
3. Có muốn tôi fix ngay bây giờ 3 critical trong 1 turn không?
