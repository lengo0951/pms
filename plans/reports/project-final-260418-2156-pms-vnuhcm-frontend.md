# 📊 BÁO CÁO DỰ ÁN: PMS VNU-HCM — Frontend Figma-to-Code

**Người thực hiện:** Khôi (khoi.le@nucuoimekong.vn)
**Thời gian:** 2026-04-18, 1 session ~1.5 giờ
**Ngày viết báo cáo:** 2026-04-18

---

## TÓM TẮT (TL;DR)

Xây frontend demo cho **Hệ thống Quản lý Nhiệm vụ KH&CN (PMS) — ĐHQG TP.HCM** từ Figma 22 frames. Dùng **Claude Code (Opus 4.7) + Figma MCP**, stack Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui. Triển khai 20 màn thực tế (12 admin + 6 NKH + 2 login) → sau restructure gộp còn **1 login unified + 9 admin + 3 NKH routes** (22 static routes). Hoàn thành trong **~1.5 giờ** (so với ước lượng code tay 24–32h) — **tiết kiệm ~95% thời gian cho demo-quality**. Build pass zero lỗi. Bugs chính phải sửa tay: base-nova shadcn không có `Button asChild` → phải viết `LinkButton` wrapper; server→client truyền lucide icon fail → refactor sidebar import config nội bộ; logo rounded-full crop landscape PNG → đổi rounded-md. **Bài học lớn nhất:** đầu tư viết plan kỹ trước khi code giúp batch-write ~40 file trong 1 lần, tiết kiệm rất nhiều round-trip với AI.

---

## 1. THÔNG TIN CHUNG

| Mục | Thông tin |
|---|---|
| Tên dự án | PMS · ĐHQG-HCM — Frontend Demo |
| Mô tả | Web quản lý nhiệm vụ KH&CN, 2 role (Nhà khoa học + Cán bộ quản lý) |
| Link Figma | `figma.com/design/3WCb18kpRsvsYoheKPPyGg/PMS-VNUHCM-...` |
| Link source | Local: `/Users/coolstar/inseclab/khoa-hoc-cong-nghe/web/` |
| Link demo | `npm run dev` → localhost:3000 (chưa deploy) |
| AI tool chính | Claude Code (model: `claude-opus-4-7`) |
| AI tool phụ | Figma MCP (`mcp__figma__get_design_context`, `get_metadata`) |
| Tech stack | Next.js 15.5.15 (App Router + Turbopack) · React 19 · TypeScript strict · Tailwind v4 · shadcn/ui (base-nova) · react-hook-form · zod · lucide-react · date-fns |
| Người đánh giá | (chưa xác định) |

---

## 2. KẾT QUẢ CHÍNH

### 2.1. Output cụ thể

| Chỉ số | Số liệu |
|---|---|
| Số route | **22** (1 root redirect + 1 login + 9 admin + 3 NKH + ký số + wizard 4 tabs + contract 3 steps) |
| Số màn hình thực | **15 unique** (sau restructure) |
| Components (không tính shadcn primitives) | ~25 file (layout, shared, auth, nhiem-vu, brand) |
| Mock data domain | 6 file (nhiem-vu, hop-dong, dashboard, organization, nhat-ky, thanh-vien) |
| Tổng LOC (không shadcn UI) | **~2,940 dòng** |
| Bundle | 130 KB shared JS, 220 KB max page first-load |
| Build | ✅ Pass — 22 static routes prerendered |
| Lint | ✅ Pass — 0 error |

### 2.2. Mức độ bám sát design

- **% khớp Figma:** ước lượng **85–90%** (bằng mắt thường, không dùng pixel-diff tool)
- **Phương pháp đánh giá:** so sánh trực quan với ảnh Figma trong quá trình dev. Tokens màu/font trích chính xác (navy `#003087`, `#f3f6fa` page bg, Inter font, status pastels 4 màu).
- **Chênh lệch chấp nhận:** spacing ±2–4px, một số chi tiết decorative (2 blob đăng nhập) đơn giản hoá bằng Tailwind blur thay vì SVG đúng hình.
- **Không bám sát:** Tab 2 & 4 của wizard admin không có Figma — đã bị remove trong restructure. Login gradient circles dùng CSS `blur` thay vì asset SVG.

### 2.3. Responsive & accessibility

- [x] Desktop 1440×900 — hoạt động tốt (scope chính theo Figma)
- [ ] Tablet 768px — chưa test (out of scope)
- [ ] Mobile 375px — chưa test (out of scope, Figma không có mobile)
- [x] Semantic HTML cơ bản (header, main, nav, ol/ul, dl)
- [x] Form labels + id-for linking (FormField component)
- [ ] Full ARIA / keyboard nav audit — chưa làm

---

## 3. PHÂN TÍCH HIỆU QUẢ SỬ DỤNG AI

### 3.1. Số liệu thời gian

| Hạng mục | AI + review | Ước lượng code tay | Tiết kiệm |
|---|---|---|---|
| Research Figma (metadata + 3 design context samples) | 10 phút | 2–3h (đọc Figma từng frame) | ~94% |
| Plan 11 phase + restructure plan | 15 phút | 3–4h (document đầy đủ) | ~93% |
| Scaffold Next 15 + shadcn + 19 primitives | 5 phút | 30 phút | ~85% |
| Design tokens + layout shell (sidebar/topbar/container) | 10 phút | 2–3h | ~94% |
| 10 reusable components (DataTable, StatusChip, WizardTabs…) | 15 phút | 5–6h | ~95% |
| 15 pages (dashboard + list + wizard + stepper + forms) | 25 phút | 10–12h | ~96% |
| Fix build errors (5 lỗi TypeScript/import) | 10 phút | 1h | ~83% |
| Logo + 2 charts (Bar + Donut SVG pure) | 10 phút | 2h | ~92% |
| Restructure flow NKH primary + admin superuser | 15 phút | 2–3h | ~92% |
| **TỔNG** | **~115 phút (1h55)** | **~28–35h** | **~94%** |

*Caveat: ước lượng "code tay" giả định một dev mid-senior thạo Next.js/Tailwind. Con số này là **demo-quality** — code production cần thêm test, responsive, accessibility, auth thật → tăng thời gian đáng kể ở cả 2 cột.*

### 3.2. Chi phí token

Chưa track cụ thể (Claude Code local CLI, không export token usage). Ước lượng:
- Input: ~500K tokens (metadata Figma lớn, pull 3 design context)
- Output: ~150K tokens (code sinh ra)
- Với giá Opus 4.7 thì chi phí khoảng vài USD, hoàn toàn đáng so với 30h công.

### 3.3. AI làm tốt ở đâu

- ⭐⭐⭐⭐⭐ **Batch-write nhiều file cùng lúc từ plan rõ ràng:** 10+ file/turn khi đã có plan chi tiết
- ⭐⭐⭐⭐⭐ **Boilerplate component shadcn + Tailwind:** gần như luôn đúng cú pháp ngay lần đầu
- ⭐⭐⭐⭐⭐ **Sinh mock data realistic:** 15 rows nhiệm vụ có tên tiếng Việt tự nhiên, mã nhiệm vụ đúng format, kinh phí hợp lý
- ⭐⭐⭐⭐ **Extract design tokens từ Figma output:** đọc XML metadata + React dump của Figma MCP, quote hex chuẩn
- ⭐⭐⭐⭐ **Refactor structure (route groups `(nkh)`, đổi basePath toàn cục):** hiểu ngữ cảnh liên file, grep đúng chỗ
- ⭐⭐⭐⭐ **Plan-first workflow:** giảm rất nhiều lần code-sửa-code vì đã lường trước kiến trúc

### 3.4. AI làm sai ở đâu (cần sửa tay)

1. **Base-nova preset không có `Button asChild`** — AI dùng `<Button asChild><Link>` theo pattern Radix cũ, base-nova lại dùng `@base-ui/react/button` không hỗ trợ. **Fix:** tạo `<LinkButton>` wrapper dùng `buttonVariants`.
2. **shadcn form primitive không có trong base-nova** — AI cài bằng `shadcn add form` im lặng fail. **Fix:** bỏ wrapper form, dùng RHF + Input/Label trực tiếp.
3. **Select onValueChange type `string | null`** — AI viết `(v: string) => void` mismatch. **Fix:** bọc `(v) => handler(v ?? "all")`.
4. **Server → Client passing lucide icon functions** — Next 15 strict: layout.tsx server render + AppSidebar client, truyền `icon={LayoutDashboard}` qua prop fail "Functions cannot be passed to Client Components". **Fix:** import nav config trực tiếp trong sidebar, dùng `variant` prop chọn admin/nkh.
5. **Bash persistent CWD sau `cd web`** — AI chạy `mkdir web && cd web && npx create-next-app .` xong các bash sau tiếp tục CWD=`web/`, hooks `.claude/hooks/...` relative path tìm không thấy. **Fix:** từ đó dùng absolute path mọi bash call, không `cd`.
6. **Logo `rounded-full` crop landscape PNG** — logo 3840×2421 (rectangle) nhét trong `rounded-full` 48×48 → bị crop thành hình tròn. **Fix:** đổi `rounded-md` + padding, object-contain.
7. **Cached URL `/nkh/*` trong code sau restructure** — AI move file vào `(nkh)` group nhưng vài `basePath`, `router.push`, `<LinkButton href>` vẫn là `/nkh/dang-ky`. **Fix:** grep `/nkh/` toàn repo + edit thủ công.

### 3.5. Phân loại hiệu quả AI theo task

| Loại task | Rating | Ghi chú |
|---|---|---|
| Boilerplate component từ shadcn | ⭐⭐⭐⭐⭐ | Sinh đúng 95% lần đầu |
| Figma MCP → extract design tokens | ⭐⭐⭐⭐ | Cần subagent để output không bloat context chính |
| Đổi URL/route tree lớn (refactor cross-file) | ⭐⭐⭐⭐ | Cần grep verify sau đó |
| TypeScript strict compliance | ⭐⭐⭐ | Một số API version mismatch (select, button asChild) |
| Mock data realistic VN | ⭐⭐⭐⭐⭐ | Tên, chức danh, mã nhiệm vụ rất tự nhiên |
| Custom SVG chart (bar/donut pure) | ⭐⭐⭐⭐ | Code ngắn, không cần recharts |
| Figma-to-code pixel perfect | ⭐⭐⭐ | Layout chính xác nhưng decor/hình ảnh phải mock lại |
| Fix hook/env config issues (CWD, Next 16 breaking) | ⭐⭐⭐ | Cần dev verify trước khi trust AI |

---

## 4. WORKFLOW ĐÃ DÙNG

1. **Chuẩn bị:** User đưa link Figma → AI dùng Figma MCP pull metadata (XML) + 3 design context samples (dashboard, login, list). Subagent xử lý file lớn để context chính gọn.
2. **Research report:** AI viết `plans/reports/researcher-260418-2044-figma-pms-vnuhcm-scope.md` — inventory 22 frames, extract colors/typography, đề xuất stack.
3. **Plan:** 11-phase plan (scaffold → tokens → components → pages → polish) trong `plans/260418-2051-pms-vnuhcm-figma-to-nextjs/`. Task hydration 11 tasks với `addBlockedBy` dependencies.
4. **Implement (auto mode):** batch-write Phase 0–11, mỗi phase 5–10 file cùng turn. Fix build errors tại chỗ.
5. **Refactor:** User nhận thấy luồng NKH/Admin không đúng nghiệp vụ → AI hỏi clarify (4 câu AskUserQuestion) → viết plan restructure → execute.
6. **Report:** skill `ai-agent-coding-report` để tổng kết.

**Điểm mấu chốt workflow:** plan-first rồi batch-implement → giảm số lần code-rework. Mỗi phase file chứa sẵn file paths, prompt AI biết đúng chỗ viết.

---

## 5. CÁC PROMPT MẪU HIỆU QUẢ NHẤT

### Prompt 1: Research Figma để hiểu scope

```
tôi cần bạn research [URL Figma] figma này để biết ta cần thiết kế trang web gì,
tôi được giao nhiệm vụ là code front end cho website Quản lý Khoa học Công nghệ để demo
```

→ AI auto: pull metadata + 2 design context samples (login + list) + viết report 400 dòng với inventory 22 frames, color palette chính xác, khuyến nghị stack.

### Prompt 2: Lên plan chi tiết để apply

```
tôi cần code hết các trang figma, sử dụng nextjs 15, hãy lên plan để apply cho tôi
```

→ AI tạo plan dir với `plan.md` + 11 phase files. Mỗi phase có: figma node ID, route target, file paths, todo checklist, success criteria.

### Prompt 3: Auto-execute toàn bộ plan

```
bắt đầu code với tư duy lập trình viên cho tôi để hoàn thiện project frontend --auto-mode
```

→ AI execute 11 phase không stop. Quan trọng: `--auto-mode` + "tư duy lập trình viên" làm AI tự quyết định, không hỏi vặt, đồng thời giữ chất lượng (modular, YAGNI, ≤200 LOC/file).

### Prompt 4: Fix cụ thể, có context

```
sửa bug logo vnu hcm, tôi có logo rồi mà, dashboard chưa có chart thật thì hãy tạo mock
```

→ Prompt ngắn nhưng đủ: chỉ ra 2 vấn đề cụ thể, context ("tôi có logo rồi"), và định hướng ("tạo mock" thay vì "cài thư viện chart"). AI dùng Quick mode, fix trong 10 phút.

### Prompt 5: Refactor nghiệp vụ sâu

```
tôi thấy luồng như vậy là không hợp lý, luồng chính là phải dành cho nhà khoa học,
luồng cơ quan chủ trì là khi login bằng tài khoản admin thì có thể xem được tất cả,
ý của tôi là vậy, hãy research và lên plan để thay đổi luồng cho đúng
```

→ Chỉ rõ **nghiệp vụ mong muốn** (NKH primary, Admin = superuser). AI AskUserQuestion 3 câu clarify kiến trúc (URL scheme, login model, admin scope) rồi viết plan 10 bước.

---

## 6. VẤN ĐỀ GẶP PHẢI & CÁCH XỬ LÝ

| Vấn đề | Tác động | Cách xử lý | Tái sử dụng? |
|---|---|---|---|
| Figma metadata file 250KB > token limit | Phải subagent xử | Agent với jq probe → trả về summary ≤500 words với toàn bộ frame IDs verbatim | ✅ — pattern cho mọi file tool-result lớn |
| Base-nova shadcn khác Radix preset cũ | 3 lỗi build (Button asChild, Form, Select signature) | Tạo `LinkButton`, skip Form wrapper, bọc onValueChange | ✅ — checklist cho base-nova projects |
| Server→Client truyền lucide icon | Build fail static gen | Import nav-config trong client sidebar, dùng prop `variant` | ✅ — luật: serializable props only cross server/client |
| Bash CWD drift (`cd web`) | Hook `.claude/hooks/...` fail | Dùng absolute path + `--prefix` flag thay vì cd | ✅ — ghi rule "no cd" vào CLAUDE.md |
| Logo PNG landscape nhét `rounded-full` | Hình bị crop | Đổi `rounded-md` + `object-contain` | ✅ — default cho logo không square |
| Stale URL sau move folder | 404 nếu user test demo | grep `/nkh/` → fix 4 places | ✅ — grep sau mọi refactor path |
| Form primitive missing | Không viết form được chuẩn shadcn | Dùng raw RHF + Input/Label — đơn giản hơn | ✅ — demo không cần shadcn Form wrapper |

---

## 7. BÀI HỌC RÚT RA

### Cho bản thân

- **Plan-first là đòn bẩy lớn nhất.** Ngồi 15 phút viết plan → 25 phút batch-write 15 pages. Ngược lại sẽ mất 2h loay hoay prompt-sửa-prompt.
- **AskUserQuestion sớm khi nghiệp vụ mơ hồ.** Restructure NKH/Admin là nhờ 3 câu hỏi clarify (URL scheme, login model, admin scope) — nếu code đại sẽ phải làm lại cả phần.
- **Grep verify sau refactor path:** AI có thể bỏ sót `router.push`, `href`, `basePath` khi đổi route tree.
- **Design tokens extract từ Figma lần đầu tiết kiệm cả tuần sau:** màu, spacing, radius chuẩn ngay đầu thì không phải sửa rải rác.

### Cho team / sinh viên khác

- **Dùng Figma MCP + Claude Code cho Figma-to-code là pattern thống trị:** nhanh hơn copy-paste Tailwind từng frame rất nhiều. Nhưng **phải** subagent hoá để metadata không nuốt context chính.
- **Đầu tư viết `CLAUDE.md` + `development-rules.md` kỹ đầu project:** AI tự nhớ quy ước (kebab-case, ≤200 LOC/file, YAGNI), giảm ép đi ép lại.
- **Base-nova shadcn ≠ Radix shadcn cổ:** nhiều tutorial/doc trên mạng lỗi thời. Luôn đọc `components/ui/*.tsx` thật để biết API có gì.

### Điều làm khác nếu làm lại

- Setup dev server chạy `npm run dev` từ sớm và mở tab browser verify mỗi phase — thay vì chỉ tin build pass.
- Commit git sau mỗi phase thay vì dồn cuối — dễ rollback khi AI làm hỏng.
- Hỏi user về deadline + audience demo (nội bộ hay stakeholder) ngay đầu để quyết định Tier scope (MVP 5 màn hay full 20 màn).
- Viết test smoke E2E Playwright cho 3 flow chính (login → dashboard, NKH đăng ký, admin ký HĐ) — tốn 20 phút nhưng bảo hiểm rất lớn.

---

## 8. TỒN ĐỌNG / BƯỚC TIẾP THEO

- [ ] Tab 2 & Tab 4 của wizard admin — Figma chưa có thiết kế (đã bỏ khỏi scope sau restructure; chỉ còn NKH wizard 4 tab)
- [ ] Chi tiết 1 nhiệm vụ (`/admin/nhiem-vu/[id]`) — link trong table nhưng chưa có page
- [ ] Responsive mobile (Figma không có mobile design)
- [ ] Auth thật — hiện mock navigation theo email prefix
- [ ] Integrate API backend (hiện mock TS trong `lib/mock-data/`)
- [ ] Test suite (unit + e2e)
- [ ] i18n (chỉ có VI hardcode)
- [ ] Dark mode (Figma chỉ light)
- [ ] Pixel-diff tool để đo chính xác độ khớp Figma
- [ ] Deploy lên Vercel + custom domain

---

## 9. ĐÍNH KÈM

- [x] Source code: `/Users/coolstar/inseclab/khoa-hoc-cong-nghe/web/`
- [x] `web/README.md` với route map + stack + folder layout
- [x] Research report: `plans/reports/researcher-260418-2044-figma-pms-vnuhcm-scope.md`
- [x] Plan 1: `plans/260418-2051-pms-vnuhcm-figma-to-nextjs/plan.md` + 11 phase files (status: completed)
- [x] Plan 2: `plans/260418-2149-restructure-nkh-primary-admin-superuser/plan.md` (status: completed)
- [x] Logo asset: `web/public/logo-vnu-hcm.png`
- [ ] Screenshot so sánh Figma vs implementation — chưa làm (có thể bổ sung bằng `mcp__figma__get_screenshot` + chrome-devtools skill)
- [ ] Demo video — chưa làm

---

## Unresolved questions

1. **Demo cho ai, deadline nào?** Chưa chốt — nếu cho stakeholder VNU-HCM thật, cần polish thêm (fix spacing, thêm responsive, deploy).
2. **Auth strategy cho production:** BetterAuth / NextAuth / SSO VNU-HCM? Ảnh hưởng kiến trúc.
3. **API backend:** Ai làm? Định dạng nào? JSON REST / GraphQL / tRPC?
4. **Logo chính thức:** Có brand guideline PDF không? Hiện dùng file PNG 3840×2421 user cung cấp.
5. **Tab 2 & 4 wizard admin:** Có nghiệp vụ thật không hay bỏ hoàn toàn khỏi sản phẩm?

---

**Người báo cáo:** Khôi (khoi.le@nucuoimekong.vn)
**Ngày hoàn thành báo cáo:** 2026-04-18
