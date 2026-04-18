# Report Quality Guide

Tips nâng cao để báo cáo AI coding có giá trị thực sự (không phải chỉ là formality để nộp cho xong).

## Tại sao báo cáo AI coding quan trọng?

Khác với code tay, code với AI có 3 vấn đề mà báo cáo tốt giúp giải quyết:

1. **Người review không thấy được "công sức"** — Vì AI sinh code nhanh, đôi khi sếp nghĩ bạn "chỉ ngồi bấm enter". Báo cáo là cách duy nhất để show: bạn đã prompt thế nào, review thế nào, sửa thế nào.

2. **Nếu code hỏng, không ai biết tại sao** — 6 tháng sau, một bug lạ xuất hiện ở component AI sinh, bạn không nhớ đã prompt gì. Log prompt giúp debug và trace nguồn gốc.

3. **Team không học được gì nếu không ghi lại** — Kinh nghiệm prompt hay của 1 người không lan truyền được nếu không có tài liệu. Báo cáo biến kinh nghiệm cá nhân thành tài sản team.

## 10 điểm làm báo cáo AI coding "impressive"

### 1. Đính kèm prompt nguyên văn, không paraphrase

**Xấu:** "Tôi đã yêu cầu AI tạo component Header với logo và nav"

**Tốt:**
```
"Tạo React component Header dùng Tailwind. Bố cục: logo bên trái (h-8),
nav 4 items bên phải (gap-6), CTA button primary cuối cùng. Sticky top,
background blur. Responsive: dưới 768px thì nav chuyển thành hamburger menu."
```

Lý do: prompt là **artifact có giá trị**, paraphrase mất hết thông tin.

### 2. So sánh thời gian thực với ước lượng code tay

Nếu chỉ ghi "mất 30 phút", không ai biết đó nhanh hay chậm. Ghi "30 phút, nếu code tay ước lượng ~2 giờ" → sếp thấy ngay 4x speedup.

### 3. Tỷ lệ AI code vs người sửa (có số liệu)

Cách track đơn giản: sau mỗi phiên, dùng `git diff --stat` để xem AI commit bao nhiêu dòng, sau đó bạn sửa bao nhiêu dòng. Ghi vào báo cáo.

### 4. Chấm điểm theo rubric, không đánh giá cảm tính

Thay vì "AI làm ok", dùng bảng có trục rõ ràng:
- Layout: ✅ / ⚠️ / ❌
- Typography: ...
- Color: ...
- Responsive: ...
- A11y: ...

### 5. Luôn có ảnh so sánh (Figma vs code)

1 ảnh side-by-side hơn 1000 chữ mô tả. Tool đơn giản: screenshot + ghép bằng preview app.

### 6. Mạnh dạn chỉ ra cái AI làm sai

Tâm lý người mới: sợ ghi AI sai thì bị đánh giá. Thực tế ngược lại: **chỉ ra AI sai + cách bạn phát hiện và sửa → chứng minh bạn có kỹ năng review, không phải copy-paste mù quáng**. Đây là điểm cộng lớn.

### 7. Phân biệt "AI làm" vs "mình làm"

Trong 1 component có cả phần AI sinh và phần bạn sửa. Ghi chú rõ trong code hoặc commit message: `feat: add Header (AI-generated, minor tweaks)` vs `refactor: rewrite Header layout (manual)`. Báo cáo tổng hợp tỷ lệ này.

### 8. Tag loại task để thống kê

Gán nhãn cho từng task: `[boilerplate]`, `[layout]`, `[logic]`, `[debug]`, `[refactor]`, `[test]`. Cuối dự án tổng hợp: AI tốt nhất ở loại nào? → insight để tối ưu cho dự án sau.

### 9. Cost tracking

Nếu dùng Claude Code hoặc API, track cost. `/cost` trong Claude Code cho số chính xác. Đừng sợ cost cao — nếu nó mang lại 5x speedup thì ROI dương. Nhưng phải có số.

### 10. Viết "Prompt Library" cuối dự án

Chắt lọc 5-10 prompt hay nhất từ dự án thành 1 file `prompt-library.md`. Đây là tài sản dùng được cho 10 dự án sau. Sếp đọc file này sẽ thấy: không chỉ làm xong dự án, mà còn tạo ra **re-usable asset** cho công ty.

## Anti-patterns (tuyệt đối tránh)

### ❌ Báo cáo "fluff" không có substance
```
"Tôi đã ứng dụng công nghệ AI tiên tiến để tối ưu hóa quy trình phát triển
giao diện, tận dụng các mô hình ngôn ngữ lớn để synergize với workflow..."
```
→ Không có số, không có prompt, không có ảnh → vô giá trị.

### ❌ Chỉ liệt kê file đã tạo
```
"Đã tạo: Header.jsx, Nav.jsx, Button.jsx, Login.jsx..."
```
→ Không nói gì về AI, prompt, đánh giá → giống code tay bình thường, không show giá trị AI.

### ❌ Giấu phần AI làm sai
Ghi kiểu "AI làm mọi thứ hoàn hảo, code chạy mượt" → sếp có kinh nghiệm sẽ nghi ngờ ngay vì biết AI không bao giờ hoàn hảo. Mất uy tín.

### ❌ Prompt paraphrase mất ý gốc
Viết "Tôi đã hỏi AI về header" thay vì paste prompt thật → mất đi phần giá trị nhất.

### ❌ Không có timeline
Báo cáo không ghi thời gian thực tế → không đo được ROI của AI → sếp không có lý do tiếp tục đầu tư vào AI tool.

## Tần suất viết báo cáo đề xuất

- **Step entry:** Ngay sau mỗi task quan trọng (không phải mỗi prompt lẻ, mà là mỗi feature/component hoàn chỉnh)
- **Daily summary:** Cuối mỗi ngày làm việc (10-15 phút)
- **Weekly roundup** (optional): Cuối tuần, gộp 5 daily summary lại
- **Project final report:** Khi hoàn thành dự án, dành 1 ngày viết kỹ

## Tool hỗ trợ viết báo cáo

- **Obsidian/Notion:** Lưu trữ step entries theo thư mục dự án, dễ tìm kiếm sau này
- **Screen recording** (Loom/OBS): Quay video ngắn 1-2 phút cho mỗi phiên lớn — bổ sung cho báo cáo văn bản
- **Git + commit messages chuẩn:** Gán tag `[AI-generated]` vào commit để sau grep thống kê được
- **Time tracker** (Toggl/RescueTime): Track thời gian tự động, khỏi phải nhớ
