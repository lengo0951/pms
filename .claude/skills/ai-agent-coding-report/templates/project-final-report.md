# Project Final Report Template

Dùng cho: Báo cáo tổng kết dự án khi hoàn thành, để đưa sếp/giáo viên/khách hàng. Đây là tài liệu quan trọng nhất của cả dự án.

---

# 📊 BÁO CÁO DỰ ÁN: [TÊN DỰ ÁN]

**Người thực hiện:** [Tên]
**Thời gian:** [Từ ngày A đến ngày B] (tổng [X ngày/tuần])
**Ngày viết báo cáo:** [YYYY-MM-DD]

---

## TÓM TẮT (TL;DR)

*(Viết sau khi hoàn thành các phần dưới. Đây là 5-7 câu mà sếp đọc đầu tiên.)*

[Dự án gì, dùng AI tool gì, kết quả chính, số liệu quan trọng nhất. VD:]

> Dự án xây dựng giao diện hệ thống PMS VNUHCM từ thiết kế Figma, sử dụng Claude Code (model Sonnet 4.6) kết hợp Figma MCP. Hoàn thành 18/20 màn hình trong 3 tuần (thay vì dự kiến 5 tuần nếu code tay), tiết kiệm ~40% thời gian. Mức độ khớp với Figma ~92%. Còn 2 màn hình phức tạp cần code tay thêm. Kinh nghiệm lớn nhất: prompt có đính kèm design tokens tiết kiệm nhiều thời gian sửa chữa sau này.

---

## 1. THÔNG TIN CHUNG

| Mục | Thông tin |
|---|---|
| Tên dự án | [...] |
| Mô tả ngắn | [1 dòng] |
| Link Figma | [...] |
| Link source code | [GitHub repo / GitLab] |
| Link demo/deploy | [Vercel, Netlify, v.v.] |
| AI tool chính | [VD: Claude Code (Opus 4.7 + Sonnet 4.6)] |
| AI tool phụ | [VD: Cursor để debug] |
| Tech stack | [React 18 + TypeScript + Vite + MUI v6 + TanStack Query] |
| Người đánh giá | [Sếp / Giáo viên / Khách hàng] |

---

## 2. KẾT QUẢ CHÍNH

### 2.1. Output cụ thể

| Chỉ số | Số liệu |
|---|---|
| Số màn hình đã code | [X/Y] |
| Số component đã code | [Z] |
| Tổng dòng code | [~N dòng] |
| Test coverage | [X% — nếu có] |
| Performance Lighthouse | [Score — nếu có test] |

### 2.2. Mức độ bám sát design

- **% khớp với Figma:** [Ước lượng, kèm ảnh so sánh]
- **Phương pháp đánh giá:** [VD: So sánh visual bằng mắt, hoặc dùng tool pixel-diff]
- **Sai số chấp nhận được:** [Chênh lệch spacing 1-2px được coi là đạt]

### 2.3. Responsive & accessibility

- [ ] Mobile (375px) — hoạt động tốt
- [ ] Tablet (768px) — hoạt động tốt
- [ ] Desktop (1440px) — hoạt động tốt
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard navigation
- [ ] Browser: Chrome, Safari, Firefox, Edge

---

## 3. PHÂN TÍCH HIỆU QUẢ SỬ DỤNG AI

*(Đây là phần sếp quan tâm nhất — đừng làm sơ sài.)*

### 3.1. Số liệu thời gian

| Hạng mục | Thời gian thực tế | Ước lượng nếu code tay | Tiết kiệm |
|---|---|---|---|
| Setup dự án + design tokens | [...] | [...] | [...] |
| Code các màn hình | [...] | [...] | [...] |
| Code logic/API integration | [...] | [...] | [...] |
| Debug + refactor | [...] | [...] | [...] |
| **TỔNG** | **[X giờ]** | **[Y giờ]** | **[Z%]** |

### 3.2. Chi phí token (nếu dùng API)

- Tổng token đã dùng: [X]
- Chi phí ước lượng: [$Y]
- So với giá trị giờ công tiết kiệm: [ROI tích cực / tiêu cực]

### 3.3. AI làm tốt ở đâu

- [VD: Boilerplate component React — nhanh và chuẩn 95% lần đầu]
- [VD: Refactor prop drilling sang context — gợi ý thiết kế hay]
- [VD: Sinh TypeScript types từ API response mẫu]

### 3.4. AI làm kém ở đâu

- [VD: Tính toán layout với CSS Grid phức tạp — thường sai, phải code tay]
- [VD: Animation timing — AI khó hiểu ý đồ nếu chỉ có mô tả chữ]
- [VD: Xử lý edge case (empty state, loading state) thường bị bỏ sót]

### 3.5. Các loại task phân loại theo hiệu quả AI

| Loại task | AI hiệu quả? | Ghi chú |
|---|---|---|
| Boilerplate component | ⭐⭐⭐⭐⭐ | Gần như luôn đúng |
| Responsive layout | ⭐⭐⭐⭐ | Đúng 80-90%, phải tinh chỉnh |
| State management | ⭐⭐⭐ | Phải review kỹ |
| Animation/transition | ⭐⭐ | Hay phải code tay |
| Business logic phức tạp | ⭐ | Không nên dùng AI, dễ sai |

---

## 4. WORKFLOW ĐÃ DÙNG

*(Mô tả quy trình thực tế, để team/người khác có thể tái sử dụng.)*

1. **Chuẩn bị:** Setup repo → viết CLAUDE.md + DESIGN_SPEC.md → export design tokens từ Figma
2. **Với mỗi màn hình:**
   - Copy link Figma (có node-id) từng frame
   - Paste vào prompt theo template đã chuẩn hóa
   - Review code AI sinh → sửa tay những chỗ sai design
   - Chạy test responsive → chụp ảnh so sánh với Figma
3. **Ghép các màn hình:** Setup routing → integrate API → state management
4. **Kiểm thử:** Manual test → browser compat → accessibility check

---

## 5. CÁC PROMPT MẪU HIỆU QUẢ NHẤT

*(Phần này có giá trị lâu dài — đóng gói lại cho team/dự án sau dùng.)*

### Prompt 1: Code một component từ Figma frame
```
[Paste prompt template cuối cùng đã tinh chỉnh qua nhiều lần]
```

### Prompt 2: Refactor/tối ưu component có sẵn
```
[...]
```

### Prompt 3: Debug lỗi layout
```
[...]
```

---

## 6. VẤN ĐỀ GẶP PHẢI & CÁCH XỬ LÝ

| Vấn đề | Tác động | Cách xử lý | Có tái sử dụng giải pháp? |
|---|---|---|---|
| [VD: Figma MCP timeout với file lớn] | Mất 1 buổi | Chuyển sang screenshot + Dev Mode | Có, áp dụng cho toàn dự án |
| [VD: AI sinh code dùng API cũ của thư viện] | Phải sửa nhiều | Thêm version cụ thể vào CLAUDE.md | Có, áp dụng cho lần sau |

---

## 7. BÀI HỌC RÚT RA

### Cho bản thân
- [VD: Prompt ngắn và cụ thể hiệu quả hơn prompt dài và mơ hồ]
- [VD: Nên đo thời gian ngay từ đầu, không đợi tới cuối mới ước lượng — sẽ sai]

### Cho team/công ty
- [VD: Đầu tư time viết CLAUDE.md chuẩn đầu dự án tiết kiệm cả tuần về sau]
- [VD: Dùng Haiku cho task đơn giản, Opus chỉ cho task phức tạp — giảm 40% chi phí token]

### Điều làm khác nếu làm lại
- [VD: Setup Figma MCP ngay từ đầu, không làm nửa chừng mới chuyển]
- [VD: Commit Git sau mỗi component, không commit nguyên ngày — dễ rollback]

---

## 8. TỒN ĐỌNG / BƯỚC TIẾP THEO

- [ ] [VD: Code 2 màn hình phức tạp còn lại (Report Builder, Admin Config)]
- [ ] [VD: Integrate API thực (hiện đang mock)]
- [ ] [VD: Viết unit test cho các component quan trọng]
- [ ] [VD: Optimize bundle size, đang 2.3MB]

---

## 9. ĐÍNH KÈM

- [ ] Link repo source code
- [ ] Link demo
- [ ] Screenshot từng màn hình (so sánh Figma vs code)
- [ ] File CLAUDE.md / DESIGN_SPEC.md đã dùng
- [ ] Log chat với AI (đã dọn, không lộ API key)
- [ ] Video demo flow chính (optional)

---

**Người báo cáo:** [Tên] — [Email]
**Ngày hoàn thành báo cáo:** [YYYY-MM-DD]
