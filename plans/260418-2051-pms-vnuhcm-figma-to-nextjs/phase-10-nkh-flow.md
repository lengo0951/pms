# Phase 10 — NKH: Modal + Wizard 4 tab + Ký số (6 màn)

## Overview
- **Priority:** High (luồng chính của nhà khoa học — trọng tâm demo)
- **Status:** pending
- **Depends on:** Phase 03 (`<WizardTabs>`, `<WizardStepper>`, `<FormField>`, `<FileUploadBox>`)
- **Figma nodes:** `32:2` (03), `32:69` (04), `33:2` (05), `33:129` (06), `34:2` (07), `34:123` (08)

## Màn hình

| Route | Node | Chức năng |
|---|---|---|
| `/nkh/dashboard` + Modal | `32:2` | Dialog xác nhận bắt đầu đăng ký |
| `/nkh/dang-ky/thong-tin-chung` | `32:69` | Tab 1: Thông tin chung |
| `/nkh/dang-ky/thuyet-minh` | `33:2` | Tab 2: Thuyết minh (rich text area) |
| `/nkh/dang-ky/thanh-vien` | `33:129` | Tab 3: Thành viên |
| `/nkh/dang-ky/nop-ho-so` | `34:2` | Tab 4: Nộp hồ sơ |
| `/nkh/ky-so` | `34:123` | Ký số workflow 6 bước |

## Wizard structure (4 tab, khác admin 5 tab)

```tsx
const nkhWizardTabs = [
  { id: 'thong-tin-chung', label: 'Thông tin chung' },
  { id: 'thuyet-minh',     label: 'Thuyết minh' },
  { id: 'thanh-vien',      label: 'Thành viên' },
  { id: 'nop-ho-so',       label: 'Nộp hồ sơ' },
];
```

→ Reuse `<WizardTabs>` component từ Phase 03, chỉ đổi `tabs` prop.

## Ký số 6-step workflow (node 34:123)

Workflow cấu hình chữ ký số (e.g., USB token, CA provider):
1. Chọn loại chữ ký số
2. Kết nối thiết bị / plugin
3. Xác thực certificate
4. Kiểm tra hồ sơ
5. Ký số
6. Hoàn tất & gửi

→ Reuse `<WizardStepper>` từ Phase 03 với 6 steps + step content theo index.

**Interactive behavior cho demo:**
- User click "Tiếp theo" → advance step counter
- Mock toast giả lập "Đã kết nối thiết bị..." / "Đã xác thực..."
- Bước 6 → redirect về `/nkh/dashboard` với toast success

## Implementation workflow
1. Fetch 6 Figma nodes (parallel nếu có thể)
2. Build modal "Xác nhận đăng ký" dùng shadcn `<Dialog>` → `/nkh/dashboard` có button trigger
3. Build 4 wizard tab content components (tái cấu trúc tương tự admin wizard)
4. Build ký số page `/nkh/ky-so` với state machine client-side
5. Add route guards: nút "Tiếp theo" ở tab cuối → navigate `/nkh/ky-so`

## File layout

```
app/(nkh)/
├── dashboard/page.tsx           # (đã làm Phase 05, thêm button "Đăng ký nhiệm vụ")
├── dang-ky/
│   ├── layout.tsx               # Wizard shell (WizardTabs nav)
│   └── [tab]/page.tsx           # Dispatch tab content
└── ky-so/page.tsx

components/nkh/
├── dang-ky-modal.tsx            # Confirmation dialog
└── wizard/
    ├── tab-thong-tin-chung.tsx
    ├── tab-thuyet-minh.tsx       # Textarea large + instruction box
    ├── tab-thanh-vien.tsx
    ├── tab-nop-ho-so.tsx
    └── ky-so-steps.tsx           # 6-step state machine
```

## Mock behavior cho ký số
```tsx
const [step, setStep] = useState(1);
const [simulating, setSimulating] = useState(false);

async function advance() {
  setSimulating(true);
  await new Promise(r => setTimeout(r, 1200));  // fake delay
  setSimulating(false);
  setStep(s => s + 1);
  if (step === 6) router.push('/nkh/dashboard?signed=1');
}
```

## Todo
- [ ] Fetch Figma 6 nodes
- [ ] `dang-ky-modal.tsx` dialog component
- [ ] Dashboard NKH — thêm button mở modal
- [ ] `app/(nkh)/dang-ky/layout.tsx` wizard shell
- [ ] 4 tab content components
- [ ] `ky-so-steps.tsx` state machine
- [ ] Toast notifications (shadcn sonner)
- [ ] Navigation flow E2E: dashboard → modal → wizard tabs → ký số → dashboard

## Success criteria
- Flow đầy đủ từ dashboard → ký số hoàn tất không crash
- Mỗi tab render khớp Figma
- Ký số 6 bước advance được, có visual feedback (spinner/toast)
- WizardTabs reused đúng từ Phase 03 (không duplicate code)

## Risks
- **R1:** Tab "Thuyết minh" thường có rich text editor (TipTap/Quill). Demo: chỉ dùng textarea + hint box, KHÔNG cài rich text editor.
- **R2:** Ký số step 2-3 có thể cần UI phức tạp (OTP input, device list). Demo: fake text "Đang kết nối..." + progress bar.
- **R3:** Wizard state cross-tab có thể mất khi reload. Chấp nhận cho demo hoặc dùng sessionStorage nếu cần.

## Next
→ Phase 11: Polish + verify
