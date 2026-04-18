---
name: ai-agent-coding-report
description: Ghi lại và viết báo cáo quá trình sử dụng AI agent để code (Claude Code, Cursor, Copilot, v.v.), đặc biệt là các dự án code giao diện từ Figma. Sử dụng skill này bất cứ khi nào người dùng cần tài liệu hóa công việc AI coding, log prompt đã dùng, đánh giá output AI, hoặc viết báo cáo cho sếp/giáo viên/khách hàng về quá trình sử dụng AI agent. Trigger cả khi người dùng nói "viết báo cáo AI coding", "log lại bước này", "tạo nhật ký làm việc với Claude Code", "báo cáo dự án Figma-to-code", "tài liệu hóa prompt đã dùng", "ghi lại hôm nay đã làm gì với AI", hoặc bất kỳ yêu cầu nào liên quan đến việc ghi lại/báo cáo quá trình làm việc với AI coding tools — kể cả khi người dùng không dùng đúng từ "báo cáo" mà chỉ paste đoạn chat với AI và nói "ghi lại giúp mình".
---

# AI Agent Coding Report

Skill này giúp viết báo cáo quá trình sử dụng AI agent (Claude Code, Cursor, Copilot, v.v.) để code — tập trung vào việc tài liệu hóa đủ để sếp/giáo viên/khách hàng hiểu được giá trị công việc và để bản thân người dùng học hỏi cho lần sau.

## Nguyên tắc cốt lõi

Báo cáo AI coding tốt phải trả lời được **4 câu hỏi** mà người review thường có:
1. **Bạn đã làm gì?** (mục tiêu và output)
2. **AI làm gì, bạn làm gì?** (phân định rõ vai trò người và máy)
3. **Chất lượng thế nào?** (AI làm đúng tới đâu, phải sửa gì)
4. **Tiết kiệm/mất bao nhiêu thời gian?** (số liệu cụ thể)

Nếu một báo cáo không trả lời được 4 câu này, nó thiếu giá trị. Hãy luôn đảm bảo output có đầy đủ.

## Quy trình sử dụng skill

### Bước 1: Xác định loại báo cáo người dùng cần

Hỏi người dùng (hoặc suy ra từ context) xem họ đang cần loại nào:

- **Step entry** — Log 1 bước/task lẻ vừa làm xong. Dùng khi người dùng vừa xong 1 prompt AI và muốn ghi lại.
  → Load `templates/step-entry.md`

- **Daily summary** — Tổng kết cuối ngày, gộp nhiều step entry lại.
  → Load `templates/daily-summary.md`

- **Project final report** — Báo cáo tổng kết dự án khi hoàn thành.
  → Load `templates/project-final-report.md`

- **Figma-to-code specific** — Dự án code web từ Figma (trường hợp phổ biến). Có thêm các trường đặc thù như link frame, độ khớp design, v.v.
  → Load `templates/figma-to-code-entry.md`

### Bước 2: Thu thập thông tin

Nếu thông tin thiếu, hỏi người dùng **một cách có hệ thống**. Đừng hỏi lan man. Các trường bắt buộc tối thiểu:

- Mục tiêu của bước/task
- Prompt đã dùng (hoặc tóm tắt nếu quá dài)
- AI tool nào (Claude Code? Cursor? Claude Opus? model gì?)
- Output AI trả về (đạt/không đạt, đã sửa gì)
- Thời gian (AI + sửa tay ước lượng)

Các trường tùy chọn (hỏi nếu có thể áp dụng):
- Screenshot/link reference
- Lỗi gặp phải
- Lesson learned

Nếu người dùng paste nguyên đoạn chat với AI, tự rút thông tin ra thay vì hỏi lại.

### Bước 3: Viết báo cáo theo template

Load template phù hợp (ở bước 1) và điền thông tin. **Luôn giữ format nhất quán** giữa các entry trong cùng dự án để dễ tổng hợp về sau.

### Bước 4: Kiểm tra chất lượng báo cáo

Trước khi đưa cho người dùng, tự đánh giá bằng checklist:

- [ ] Có trả lời đủ 4 câu hỏi cốt lõi?
- [ ] Có số liệu cụ thể (thời gian, số file, % khớp) không chỉ lời nói chung chung?
- [ ] Có **ghi lại prompt nguyên văn** (hoặc ít nhất là prompt cốt lõi)?
- [ ] Có **chỉ ra cả chỗ AI làm sai**, không chỉ chỗ AI làm đúng?
- [ ] Câu chữ tự nhiên như người làm việc thực, không sáo rỗng kiểu AI sinh?

Nếu thiếu cái nào, bổ sung trước khi đưa output.

## Những điều tuyệt đối tránh

Đây là những điểm yếu **phải tránh** trong báo cáo AI coding — vì chúng làm người review mất tin tưởng:

1. **Không giấu phần AI làm sai.** Người review tinh ý sẽ nhận ra, và niềm tin vào toàn bộ báo cáo sụp đổ. Ngược lại, thẳng thắn chỉ ra lỗi AI + cách bạn xử lý sẽ **làm tăng** uy tín.

2. **Không viết prompt dạng mô tả chung chung** ("tôi đã yêu cầu AI code header"). Prompt phải là **câu chữ gần nguyên văn** — vì đó chính là skill của người dùng, là "tài sản" cho team.

3. **Không lạm dụng thuật ngữ AI** ("leverage", "synergize", "optimize cutting-edge workflow"). Viết như con người đang báo cáo công việc thực, không như AI khoe khoang.

4. **Không đánh đồng "code chạy được" = "thành công"**. Code có thể chạy mà vẫn sai design, sai convention, thiếu accessibility, v.v. Luôn nêu rõ tiêu chí chất lượng cụ thể.

5. **Không bỏ trường thời gian.** Số liệu thời gian là cách duy nhất chứng minh AI tiết kiệm bao nhiêu so với code tay. Thiếu nó, báo cáo mất nửa giá trị.

## Tips nâng cao

Khi có thời gian và người dùng muốn báo cáo chất lượng cao hơn, áp dụng thêm:

- **Đính kèm ảnh so sánh** — Screenshot Figma/design gốc vs kết quả AI code. Mạnh hơn 1000 chữ.
- **Tag prompt theo loại** — `[exploratory]`, `[implementation]`, `[debugging]`, `[refactoring]` để cuối dự án biết loại nào AI mạnh/yếu.
- **Cuối tuần viết "Prompt Library"** — Tổng hợp các prompt hiệu quả nhất tuần đó thành tài sản tái sử dụng.
- **Ghi nhận cost token** — Nếu dùng Claude Code/API có track được, ghi lại token consumption giúp tối ưu chi phí sau này.

Đọc `references/report-quality-guide.md` để có thêm chi tiết về các tip này.

## Output format

Tùy vào context người dùng muốn, xuất báo cáo dưới dạng:

- **Markdown file** (`.md`) — Mặc định, dễ đưa vào Git repo, Notion, GitHub wiki.
- **Bảng (table)** — Dùng khi gộp nhiều step entry trong một daily/weekly summary.
- **Word document** (`.docx`) — Khi sếp/giáo viên yêu cầu format này. Dùng skill `docx` kèm theo.

Mặc định luôn là Markdown trừ khi người dùng yêu cầu khác.

## Ngôn ngữ

Skill này hỗ trợ cả tiếng Việt và tiếng Anh. Mặc định dùng ngôn ngữ của người dùng trong cuộc hội thoại. Template hiện có bản tiếng Việt — nếu cần tiếng Anh, dịch sang tự nhiên, giữ nguyên cấu trúc.
