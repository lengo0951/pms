# Phase 09 — Admin: Nhật ký triển khai + Theo dõi nhiệm vụ (2 màn)

## Overview
- **Priority:** Low-Medium
- **Status:** pending
- **Depends on:** Phase 03 (`<Timeline>`, `<DataTable>`)
- **Figma nodes:** `8:2` (11), `8:119` (12)

## Màn hình

### `/admin/nhat-ky-trien-khai` — 11_Nhật ký triển khai · node 8:2

Timeline view các event trong vòng đời nhiệm vụ: tạo đơn, duyệt, ký HĐ, milestone, báo cáo kỳ, bàn giao, v.v.

**Expected UI:**
- Filter bar: chọn nhiệm vụ (dropdown) + khoảng thời gian + loại event
- `<Timeline>` component vertical với dot markers
- Mỗi event: date + title + description + author + actions (xem chi tiết)

### `/admin/theo-doi-nhiem-vu` — 12_Theo dõi nhiệm vụ · node 8:119

Dashboard progress tracking: milestone chart, progress bar, deadlines.

**Expected UI:**
- Card summary nhiệm vụ đang track
- Milestones list với status (completed/current/upcoming)
- Progress bar tổng thể
- Deadline alerts nếu quá hạn

## Implementation workflow
1. Fetch Figma nodes 8:2 và 8:119
2. Build mock data: `lib/mock-data/nhat-ky.ts`, `lib/mock-data/theo-doi.ts`
3. Build Timeline component enhance (có thể cần variants nếu event type khác nhau)
4. Build Progress/Milestone component mới nếu cần (chưa có trong Phase 03)
5. 2 page.tsx

## Mock data shape
```ts
// lib/mock-data/nhat-ky.ts
export type LogEvent = {
  id: string;
  date: string;
  nhiemVuId: string;
  type: 'create' | 'approve' | 'sign' | 'milestone' | 'report' | 'handover';
  title: string;
  description: string;
  author: string;
};

// lib/mock-data/theo-doi.ts
export type Milestone = {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'current' | 'upcoming';
  progress: number;  // 0-100
};
```

## Todo
- [ ] Fetch Figma 8:2, 8:119
- [ ] `lib/mock-data/nhat-ky.ts`, `theo-doi.ts`
- [ ] `/admin/nhat-ky-trien-khai/page.tsx`
- [ ] `/admin/theo-doi-nhiem-vu/page.tsx`
- [ ] Component `milestone-list.tsx` nếu cần (tách khỏi Timeline)

## Success criteria
- Timeline render theo thứ tự thời gian giảm dần
- Filter theo nhiệm vụ hoạt động
- Progress milestones hiển thị đúng trạng thái (3 màu completed/current/upcoming)

## Risks
- **R1:** Page 12 có thể phức tạp (Gantt chart?) — fetch Figma trước khi estimate. Nếu có Gantt → scope lại vì `recharts` không làm Gantt tốt; có thể chỉ hiển thị progress bar đơn giản.

## Next
→ Phase 10: NKH flow
