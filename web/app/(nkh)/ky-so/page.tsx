"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Upload, FileDown, Check, AlertTriangle, Clock } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 5-step NKH signing (Figma 34:123).
const steps = [
  { label: "Xác nhận hồ sơ" },
  { label: "Ký số điện tử" },
  { label: "Nộp chính thức" },
  { label: "Hệ thống xác nhận" },
  { label: "Hoàn thành" },
];

const guideSteps = [
  "Cắm USB Token vào máy tính",
  "Mở phần mềm ký số (VNPT-CA / Viettel-CA)",
  "Tải và mở file PDF tổng hợp",
  "Chọn ký số - xác thực PIN",
  "Lưu file PDF đã ký",
  "Upload lên PMS và nộp",
];

export default function NkhKySoPage() {
  const router = useRouter();
  const [step, setStep] = useState(2);
  const [loading, setLoading] = useState(false);

  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/dashboard?signed=1");
  };

  return (
    <PageShell breadcrumb="PMS / Hồ sơ / Ký số điện tử" title="Nộp hồ sơ Ký số" userInitials="NA">
      {/* 5-step progress */}
      <ol className="mb-6 flex items-start gap-0 rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        {steps.map((s, idx) => {
          const n = idx + 1;
          const isDone = n < step;
          const isActive = n === step;
          return (
            <li key={s.label} className="flex flex-1 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-sm font-bold",
                    isDone && "bg-emerald-600 text-white",
                    isActive && "bg-emerald-600 text-white ring-4 ring-emerald-200",
                    !isDone && !isActive && "bg-white text-ink-500 ring-1 ring-ink-300",
                  )}
                >
                  {isDone ? <Check aria-hidden className="size-4" /> : n}
                </div>
                <p className={cn("mt-2 max-w-[96px] text-center text-[11px]", isActive ? "font-semibold text-emerald-700" : "text-ink-700")}>
                  {s.label}
                </p>
              </div>
              {idx < steps.length - 1 && <div className={cn("mx-2 mt-4 h-0.5 flex-1", isDone ? "bg-emerald-600" : "bg-ink-300")} />}
            </li>
          );
        })}
      </ol>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {/* Confirmation code banner */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Mã xác nhận hồ sơ: <span className="font-mono">PMS-2025-NCUD-00847</span></p>
                <p className="mt-1 text-xs text-emerald-50">
                  Hệ thống đã gửi mã xác nhận qua email đến: <strong>nva@uit.edu.vn</strong>
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-50">
                  <Clock aria-hidden className="size-3.5" /> Hết hạn: 24 giờ
                </p>
              </div>
              <Button variant="outline" size="sm" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                Gia hạn
              </Button>
            </div>
          </div>

          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <CardHeader className="bg-emerald-50 border-b border-emerald-200">
              <CardTitle className="text-base text-emerald-800">Bước 2: Ký số hồ sơ PDF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              <p className="text-xs text-ink-700">
                Tải về hồ sơ tổng hợp, ký số bằng chữ ký số, sau đó upload lên hệ thống:
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <FileDown aria-hidden className="mr-1 size-4" /> Tải Hồ sơ tổng hợp (PDF)
                </Button>
                <Button variant="outline" className="border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100">
                  <Upload aria-hidden className="mr-1 size-4" /> Mở ứng dụng Ký số USB Token
                </Button>
              </div>

              {/* Upload section */}
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3">
                <p className="mb-3 text-sm font-semibold text-emerald-800">Upload file PDF đã ký số</p>
                <div className="rounded-lg border-2 border-dashed border-ink-300 bg-white p-8 text-center">
                  <Upload aria-hidden className="mx-auto size-8 text-emerald-500" />
                  <p className="mt-2 text-sm font-medium text-ink-900">Kéo thả file PDF đã ký số vào đây</p>
                  <p className="text-xs text-ink-500">Chỉ chấp nhận PDF có chữ ký số hợp lệ</p>
                </div>
              </div>

              {/* Warning guidelines */}
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
                <p className="flex items-center gap-1 font-semibold"><AlertTriangle aria-hidden className="size-3.5" /> Quy trình xác thực chữ ký số:</p>
                <ol className="mt-1 list-decimal space-y-0.5 pl-5">
                  <li>Hệ thống kiểm tra chữ ký số hợp lệ (USB Token VNPT / Viettel / FPT)</li>
                  <li>Xác minh thông tin của bạn với cơ sở dữ liệu ĐHQG-HCM</li>
                  <li>Ký số thành công → Hồ sơ được xem xét bởi Hội đồng khoa học</li>
                </ol>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between gap-3 rounded-lg bg-emerald-50 p-4">
                <p className="text-xs text-emerald-900">
                  Sau khi ký số thành công, nhấn &ldquo;Nộp chính thức&rdquo; để hoàn tất quy trình.
                </p>
                <Button onClick={finish} disabled={loading || step < 5} className="bg-emerald-600 text-white hover:bg-emerald-700">
                  {loading && <Loader2 aria-hidden className="mr-1 size-4 animate-spin" />}
                  Nộp chính thức
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick advance for demo */}
          {step < 5 && (
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setStep((s) => s + 1)}>
                [Demo] Chuyển bước {step + 1}
              </Button>
            </div>
          )}
        </div>

        {/* Guide sidebar */}
        <aside className="rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <h3 className="mb-4 text-sm font-semibold text-ink-900">Hướng dẫn Ký số</h3>
          <ol className="space-y-3">
            {guideSteps.map((g, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[12px] text-ink-700">{g}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </PageShell>
  );
}
