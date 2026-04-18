# Daily Summary Template

Dùng cho: Tổng kết cuối ngày, gộp nhiều step entry đã làm trong ngày. Viết 10-15 phút cuối giờ.

---

# 📅 NHẬT KÝ [YYYY-MM-DD]

**Người thực hiện:** [Tên]
**Dự án:** [Tên dự án]
**Thời gian làm việc:** [HH:mm – HH:mm] (tổng [X giờ])

---

## 1. Tổng quan trong ngày

**Mục tiêu đã đặt đầu ngày:**
- [Mục tiêu 1]
- [Mục tiêu 2]

**Đã hoàn thành:**
- [Việc 1] ✅
- [Việc 2] ✅
- [Việc 3] ⚠️ (chưa xong, còn X%)

**Không làm được (dời sang mai):**
- [Việc đáng lẽ làm nhưng chưa]

---

## 2. Chi tiết các bước đã làm

| # | Công việc | AI tool | Thời gian | Kết quả |
|---|---|---|---|---|
| 1 | [VD: Code Login page] | Claude Code (Sonnet 4.6) | 25 phút | ✅ Đạt 90% |
| 2 | [VD: Sửa responsive Login] | Claude Code (Haiku) | 10 phút | ✅ Đạt 100% |
| 3 | [VD: Code Dashboard skeleton] | Claude Code (Opus 4.7) | 45 phút | ⚠️ Phải sửa lại phần sidebar |
| 4 | [VD: Debug lỗi layout sidebar] | Cursor + Claude | 30 phút | ✅ Đã fix |

**Tổng cộng trong ngày:**
- Số task hoàn thành: [X]
- Số file code/sửa: [Y]
- Thời gian AI làm việc thực: [~N phút]
- Thời gian người sửa tay: [~M phút]

*(Chi tiết từng bước ở file step-entries/[date]/*)*

---

## 3. Prompt đáng nhớ trong ngày

Ghi lại 1-2 prompt hiệu quả nhất hoặc thất bại nhất để học hỏi:

**✅ Prompt hiệu quả:**
```
[Paste prompt tốt + ghi chú tại sao nó hiệu quả]
```
→ *Lý do hiệu quả:* [VD: Cung cấp rõ tech stack + constraint + expected output format → AI không phải đoán]

**❌ Prompt không hiệu quả:**
```
[Paste prompt fail + ghi chú tại sao]
```
→ *Lý do fail:* [VD: Quá chung chung "code cái login đẹp đẹp" → AI tạo layout không khớp design]

---

## 4. Đánh giá hiệu quả AI trong ngày

**AI làm tốt hôm nay:**
- [VD: Sinh boilerplate React component chuẩn, đỡ phải gõ tay]
- [VD: Gợi ý tên biến/function hợp lý]

**AI làm kém / cần cẩn thận:**
- [VD: Tạo icon SVG sai tỉ lệ — nên export từ Figma thay vì bắt AI vẽ]
- [VD: Nhầm lẫn giữa Material 3 và Material UI v5]

**Chi phí token (nếu track được):**
- Tổng token: [~X]
- Ước lượng chi phí: [~$Y] (nếu dùng API)

---

## 5. Vấn đề gặp phải & cách giải quyết

| Vấn đề | Cách đã xử lý | Có tái diễn ở task khác không? |
|---|---|---|
| [VD: AI tạo code dùng Material UI v5 thay vì v6] | Thêm version vào CLAUDE.md | Không gặp lại sau khi thêm |
| [VD: Responsive breakpoint không match] | Copy token từ Figma vào prompt | Cần làm vậy cho mọi section |

---

## 6. Lesson learned

3 điều học được hôm nay (áp dụng cho hôm sau):

1. [VD: Luôn copy design tokens từ Figma Dev Mode vào prompt, không để AI tự đoán]
2. [VD: Dùng Haiku cho task đơn giản (format, rename, docstring) — rẻ và đủ nhanh]
3. [VD: Với component phức tạp, nên chia làm 2-3 prompt thay vì 1 prompt dài]

---

## 7. Kế hoạch ngày mai

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

**Dependency / Block:**
- [VD: Đang chờ sếp confirm màu primary vì Figma có 2 version khác nhau]

---

*Cập nhật lần cuối: [HH:mm]*
