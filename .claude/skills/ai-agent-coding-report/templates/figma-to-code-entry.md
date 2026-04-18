# Figma-to-Code Entry Template

Dùng cho: Log việc code 1 màn hình/component từ thiết kế Figma. Biến thể của Step Entry, tập trung vào workflow Figma-to-code.

---

## 🎨 FIGMA-TO-CODE: [TÊN MÀN HÌNH/COMPONENT]

**Ngày giờ:** [YYYY-MM-DD HH:mm]
**Dự án:** [Tên dự án]

---

### 📐 Thông tin Figma

| Mục | Thông tin |
|---|---|
| File Figma | [Tên file + link] |
| Frame/Component | [Tên frame, VD: "Login - Desktop"] |
| Figma node ID | [VD: 123:456] |
| Link trực tiếp frame | [https://figma.com/design/.../node-id=123-456] |
| Kích thước frame | [VD: 1440 × 900 desktop, 375 × 812 mobile] |
| Có design tokens không? | [Có/Không — nếu có, list variable names] |
| Dựa trên design system nào? | [VD: Material 3, Tailwind, shadcn] |

### 🎯 Mục tiêu

[1-2 câu cụ thể. VD: "Code màn hình Login responsive theo đúng design frame 'Login - Desktop' và 'Login - Mobile', dùng React + Material UI v6"]

### 🛠️ Tech stack mục tiêu

- Framework: [React / Vue / Next.js / ...]
- UI library: [MUI / shadcn / Tailwind thuần / ...]
- Form: [React Hook Form / Formik / ...]
- Validation: [Zod / Yup / ...]
- Khác: [...]

---

### 💬 Prompt đã dùng

**Phương pháp nhập input:**
- [ ] Paste link Figma có node-id (dùng MCP)
- [ ] Screenshot frame gắn vào prompt
- [ ] Mô tả bằng chữ
- [ ] Kết hợp screenshot + spec từ Dev Mode

**Prompt nguyên văn:**
```
[Paste gần nguyên văn]
```

---

### 🤖 AI Output

**Model:** [Opus 4.7 / Sonnet 4.6 / ...]

**File được tạo:**
- `[path/to/file1.tsx]` — [mô tả]
- `[path/to/file2.tsx]` — [mô tả]

**Tóm tắt output:** [2-3 câu]

---

### 🔍 Đánh giá chi tiết

#### Về Layout
| Element | Figma spec | Code AI sinh | Đạt? |
|---|---|---|---|
| Width container | [VD: max-w-md, 448px] | [VD: max-w-md] | ✅ |
| Padding top/bottom | [VD: 80px desktop, 40px mobile] | [VD: py-20 md:py-10] | ✅ |
| Logo size | [VD: 120px] | [VD: w-32] | ⚠️ (128px, lệch 8px) |
| ... | | | |

#### Về Typography
| Text | Figma spec | Code AI sinh | Đạt? |
|---|---|---|---|
| Heading | [VD: Inter 32px Bold #1A1A1A] | [VD: text-3xl font-bold] | ⚠️ (30px, lệch 2px) |
| Body | [VD: Inter 16px Regular #4A4A4A] | [VD: text-base text-gray-600] | ✅ |
| ... | | | |

#### Về Color
| Element | Figma hex | Code AI sinh | Đạt? |
|---|---|---|---|
| Primary button bg | [VD: #1A73E8] | [VD: bg-blue-600] | ❌ (#2563EB, lệch) |
| ... | | | |

#### Về Interaction/State
- [ ] Hover states: [Đạt/Thiếu]
- [ ] Focus states: [Đạt/Thiếu]
- [ ] Disabled states: [Đạt/Thiếu]
- [ ] Loading states: [Đạt/Thiếu]
- [ ] Error states: [Đạt/Thiếu]

#### Về Accessibility
- [ ] Semantic HTML: [Đạt/Thiếu]
- [ ] ARIA labels: [Đạt/Thiếu]
- [ ] Keyboard navigation: [Đạt/Thiếu]
- [ ] Color contrast: [Đạt/Thiếu]

#### Về Responsive
- [ ] Mobile (375px): [Đạt/Lỗi gì]
- [ ] Tablet (768px): [Đạt/Lỗi gì]
- [ ] Desktop (1440px): [Đạt/Lỗi gì]

---

### 🔧 Điều chỉnh thủ công

**Các thay đổi đã làm:**
1. [VD: Sửa màu primary từ bg-blue-600 → bg-[#1A73E8] dùng arbitrary value]
2. [VD: Thêm useState cho password visibility toggle]
3. [VD: Thêm validation schema với Zod]
4. [VD: Refactor form submit logic thành separate hook]

**Diff số dòng code:**
- AI sinh: [~X dòng]
- Sửa tay thêm/sửa: [~Y dòng]
- Final: [~Z dòng]

---

### ⏱️ Thời gian

| Hạng mục | Thời gian |
|---|---|
| Chuẩn bị input (lấy link/screenshot/spec) | [X phút] |
| Viết + gửi prompt | [Y phút] |
| AI xử lý | [Z phút] |
| Review output | [A phút] |
| Sửa tay | [B phút] |
| Test responsive | [C phút] |
| **Tổng** | **[T phút]** |

**Ước lượng nếu code tay từ Figma:** [~N phút]
**Tiết kiệm:** [~%]

---

### 📸 Ảnh so sánh

**Figma gốc:**
![figma-original](./screenshots/figma-[screen-name].png)

**Code kết quả:**
![code-result](./screenshots/code-[screen-name].png)

**Chênh lệch/lưu ý:** [Ghi lại các điểm còn khác biệt nếu có]

---

### 💡 Lesson learned

[1-3 điều rút ra:]
- [VD: Đính kèm màu hex chính xác trong prompt là bắt buộc — AI không đọc được màu chính xác từ screenshot]
- [VD: Nên hỏi AI "hãy dùng arbitrary value cho màu không có trong Tailwind default" để khỏi phải sửa]
- [VD: Với form, AI sinh UI tốt nhưng validation logic phải bổ sung tay 100%]

---

### 🔗 Liên kết

- Commit/PR: [link]
- Figma frame: [link có node-id]
- Component documentation: [link nếu có]
- Related step entries: [STEP #X, #Y]

---

*(Nếu màn hình này có nhiều sub-component, mỗi sub-component có thể có entry riêng hoặc ghi chung ở đây tùy độ phức tạp.)*
