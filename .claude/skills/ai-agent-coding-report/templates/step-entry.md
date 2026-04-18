# Step Entry Template

Dùng cho: Log 1 task/bước lẻ vừa làm xong với AI agent. Mỗi entry nên viết ngay sau khi xong task để không quên chi tiết.

---

## STEP [SỐ] — [TÊN CÔNG VIỆC NGẮN GỌN]

**Ngày giờ:** [YYYY-MM-DD HH:mm]
**Người thực hiện:** [Tên]
**Dự án:** [Tên dự án]

### Mục tiêu
[1-2 câu mô tả cụ thể muốn đạt được gì. VD: "Code component Header cho trang chủ theo thiết kế frame Figma 'Home - Desktop'"]

### AI tool sử dụng
- **Tool:** [Claude Code / Cursor / v0 / Lovable / ...]
- **Model:** [Opus 4.7 / Sonnet 4.6 / Haiku / GPT-5 / ...]
- **MCP/Plugin:** [Nếu có, VD: Figma MCP, GitHub MCP, ...]

### Input cung cấp
- **Tài liệu/File:** [VD: Screenshot Figma frame "Header - Desktop"]
- **Link/Reference:** [VD: https://figma.com/design/.../node-id=1-234]
- **Context kèm theo:** [File CLAUDE.md? DESIGN_SPEC.md? Style guide?]

### Prompt đã dùng
```
[Paste gần nguyên văn prompt đã gửi cho AI.
Nếu prompt quá dài, giữ lại phần cốt lõi + ghi chú "(rút gọn)".
Đây là phần quan trọng nhất của entry — đừng skip!]
```

### Output AI trả về
- **File/Component được tạo:** [VD: src/components/Header.jsx, src/components/Nav.jsx]
- **Dòng code:** [Ước lượng tổng số dòng]
- **Tóm tắt:** [1-2 câu mô tả kết quả. VD: "AI tạo component Header với logo, nav 4 items, và button CTA. Dùng Tailwind cho styling."]

### Đánh giá

**Mức độ đạt so với yêu cầu:** [ ⭐⭐⭐⭐⭐ / hoặc % ước lượng, VD: 80% khớp design]

**AI làm tốt:**
- [Điểm cụ thể, VD: Layout grid 2 cột đúng ngay từ đầu]
- [VD: Responsive breakpoint md: đã có sẵn]

**AI làm chưa đạt / cần sửa:**
- [Điểm cụ thể, VD: Spacing giữa heading và subtitle là 16px thay vì 24px theo Figma]
- [VD: Button outline thiếu hover state]
- [VD: Thiếu aria-label cho icon menu]

### Điều chỉnh thủ công

[Liệt kê những gì đã tự sửa tay, không dùng AI:]
- [VD: Sửa `mt-4` → `mt-6` ở dòng 23]
- [VD: Thêm `hover:bg-blue-50` cho button outline]
- [VD: Refactor lại component Nav thành subcomponent riêng]

### Thời gian

| Hạng mục | Thời gian |
|---|---|
| Viết prompt + chuẩn bị input | [X phút] |
| AI sinh code | [Y phút] |
| Review + sửa tay | [Z phút] |
| **Tổng** | **[T phút]** |

**Ước lượng nếu code tay hoàn toàn:** [~N phút/giờ]
**Tiết kiệm:** [~X%]

### Ghi chú / Lesson learned

[1-3 câu ngắn gọn:]
- [VD: Lần sau nên đính kèm spacing tokens (8/16/24) vào prompt để AI bám sát hơn]
- [VD: Prompt có phần "trả về: chỉ code, không giải thích" làm AI tập trung hơn, prompt tiếp tục dùng pattern này]

### File/Screenshot đính kèm
- [ ] Screenshot Figma gốc
- [ ] Screenshot kết quả code (localhost render)
- [ ] Log chat với AI (nếu có)
- [ ] File code đã commit (link commit/PR)

---

*(Hết entry. Nếu log nhiều step trong 1 ngày, cứ copy template này và tăng số STEP.)*
