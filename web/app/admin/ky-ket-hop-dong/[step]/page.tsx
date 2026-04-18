import { notFound } from "next/navigation";
import { AlertTriangle, FileCheck2, Download, Eye } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 4-step process per Figma (node 7:169). Step labels + descriptions.
const steps = [
  { code: "B1", label: "Soạn thảo HĐ" },
  { code: "B2", label: "Thảo luận HĐ" },
  { code: "B3", label: "Ký kết HĐ" },
  { code: "B4", label: "Hoàn thành" },
];

// Step 3 Figma detail: 2 cột, trái "Bước 3: Ký kết hợp đồng số" với 2 block sequential (Lãnh đạo → Văn thư).
function Step3Content() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* LEFT — Signing blocks */}
      <div className="space-y-4 lg:col-span-2">
        <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Bước 3: Ký kết hợp đồng số</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
              <p>
                <strong>Yêu cầu ký theo thứ tự:</strong> Lãnh đạo tổ chức → Văn thư tổ chức (đóng dấu)
              </p>
            </div>

            {/* Block 1 — Lãnh đạo đã ký */}
            <div className="rounded-xl border border-[#10b981] bg-[#d1fae5]/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">1. Lãnh đạo tổ chức ký số</p>
                  <p className="mt-0.5 text-xs text-ink-700">Hiệu trưởng – PGS.TS. Nguyễn Văn A</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#d1fae5] px-2.5 py-1 text-[10px] font-semibold text-[#10b981]">
                  <FileCheck2 aria-hidden className="size-3" /> Đã ký
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-white/70 px-3 py-2">
                <div className="flex items-center gap-2 text-xs text-ink-900">
                  📄 <span className="font-mono font-medium">don_dang_ky_ky_so.pdf</span>
                  <span className="text-ink-500">· Đã ký: 10/04</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Eye aria-hidden className="mr-1 size-3.5" /> Xem PDF</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">Xoá tệp</Button>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-ink-500">
                Chưa có phần mềm ký số?{" "}
                <a className="font-medium text-brand-400 hover:underline" href="#">
                  ↓ Tải hướng dẫn cài đặt
                </a>
              </p>
            </div>

            {/* Block 2 — Văn thư chờ ký */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/40 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">2. Văn thư tổ chức đóng dấu</p>
                  <p className="mt-0.5 text-xs text-ink-700">Văn thư – Trần Thị B</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-2.5 py-1 text-[10px] font-semibold text-[#f59e0b]">
                  Chờ ký
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button className="bg-brand-700 text-white hover:bg-brand-800">
                  ↑ Ký số trực tiếp hoặc Upload file ký số
                </Button>
                <span className="text-xs text-ink-500">Hoặc</span>
                <Button variant="outline" className="border-red-400 text-red-600 hover:bg-red-50">
                  Yêu cầu Quỹ điều chỉnh
                </Button>
              </div>
              <p className="mt-3 text-[11px] text-ink-500">
                Chưa có phần mềm ký số?{" "}
                <a className="font-medium text-brand-400 hover:underline" href="#">
                  ↓ Tải hướng dẫn cài đặt
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit bar */}
        <Button
          disabled
          className="h-12 w-full bg-[#10b981] text-base font-semibold text-white hover:bg-[#059669] disabled:opacity-60"
        >
          Xác nhận đã ký số hoàn tất → Gửi cho Quỹ ký
        </Button>
      </div>

      {/* RIGHT — Confirmed contract bundle */}
      <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <CardHeader>
          <CardTitle className="text-base">Bộ hợp đồng đã xác nhận</CardTitle>
          <p className="text-xs text-ink-500">Quỹ đã xác nhận bộ hợp đồng ngày 12/03/2026</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            ["Hợp đồng nghiên cứu khoa học", "12 trang"],
            ["Phụ lục A – Kinh phí chi tiết", "4 trang"],
            ["Phụ lục B – Tiến độ & mốc thực hiện", "3 trang"],
            ["Phụ lục C – Yêu cầu báo cáo", "2 trang"],
          ].map(([name, pages]) => (
            <div
              key={name}
              className="flex items-center justify-between gap-3 rounded-lg border border-ink-300 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-900">{name}</p>
                <p className="text-[11px] text-ink-500">{pages}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-brand-400">
                <Download aria-hidden className="mr-1 size-3.5" /> Xem
              </Button>
            </div>
          ))}
          <p className="mt-4 text-[11px] leading-relaxed text-ink-500">
            <strong className="text-ink-900">Ghi chú:</strong> Sau khi tất cả các bên ký số, trạng thái hợp đồng sẽ chuyển sang
            &ldquo;B4: Đã hoàn thành&rdquo; và hợp đồng được phát hành chính thức.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function GenericStepContent({ step }: { step: number }) {
  const s = steps[step - 1];
  return (
    <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <CardHeader>
        <CardTitle className="text-base">{s.code}: {s.label}</CardTitle>
      </CardHeader>
      <CardContent className="py-12 text-center text-sm text-ink-500">
        Nội dung chi tiết bước {s.code} sẽ hiển thị tại đây.
      </CardContent>
    </Card>
  );
}

export default async function KyHopDongPage({ params }: { params: Promise<{ step: string }> }) {
  const { step: raw } = await params;
  const step = Number(raw);
  if (!Number.isInteger(step) || step < 1 || step > steps.length) notFound();

  return (
    <PageShell breadcrumb="Nhiệm vụ / Hợp đồng tài trợ / HD-2026-001" title="Ký kết hợp đồng">
      {/* Task info banner */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <div>
          <p className="text-base font-bold text-ink-900">
            HD-2026-001 &nbsp;-&nbsp; Ứng dụng trí tuệ nhân tạo trong dự báo thời tiết cực đoan
          </p>
          <p className="mt-1 text-xs text-ink-700">
            Chủ nhiệm: PGS.TS. Trần Văn Minh &nbsp;|&nbsp; Kinh phí: 500.000.000 VND &nbsp;|&nbsp; Thời gian: 24 tháng
          </p>
          <p className="text-xs text-ink-700">
            Đơn vị tài trợ: Quỹ Phát triển KH&CN Quốc gia (NAFOSTED)
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-[11px] font-semibold text-[#f59e0b]">
          B3: Chờ TCCT ký
        </span>
      </div>

      {/* 4-step progress bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        {steps.map((s, idx) => {
          const n = idx + 1;
          const isDone = n < step;
          const isActive = n === step;
          return (
            <div key={s.code} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold",
                  isDone && "bg-[#d1fae5] text-[#10b981]",
                  isActive && "bg-brand-700 text-white",
                  !isDone && !isActive && "bg-surface-page text-ink-500 ring-1 ring-ink-300",
                )}
              >
                {isDone && <FileCheck2 aria-hidden className="size-3.5" />}
                <span>{s.code}: {s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <span className={cn("text-ink-300", isDone && "text-[#10b981]")}>→</span>
              )}
            </div>
          );
        })}
      </div>

      {step === 3 ? <Step3Content /> : <GenericStepContent step={step} />}
    </PageShell>
  );
}

export function generateStaticParams() {
  return steps.map((_, i) => ({ step: String(i + 1) }));
}
