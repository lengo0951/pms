"use client";

import { useRouter } from "next/navigation";
import { Clock, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import type { ProgramOpen } from "@/lib/mock-data/nkh-dashboard";

type Props = {
  program: ProgramOpen | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

// Modal (Figma NKH 32:2): confirm entering wizard for a specific program.
export function RegisterProgramModal({ program, open, onOpenChange }: Props) {
  const router = useRouter();

  const onConfirm = () => {
    onOpenChange(false);
    router.push("/dang-ky/thong-tin-chung");
  };

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[520px]">
        <DialogHeader className="bg-emerald-600 px-6 py-4">
          <DialogTitle className="text-base font-semibold text-white">
            Đăng ký tham gia Chương trình {program.code.split(" - ")[0]}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-6">
          {/* Program summary card */}
          <div className="rounded-lg bg-emerald-500 p-4 text-white">
            <p className="text-sm font-bold">{program.code}</p>
            <p className="text-xs">{program.ten}</p>
            <p className="mt-2 flex items-center gap-1 text-[11px]">
              <Clock aria-hidden className="size-3" />
              Hạn nộp: {program.han} <span className="ml-auto font-semibold text-amber-200">Còn 23 ngày</span>
            </p>
          </div>

          <FormField label="Tên nhiệm vụ">
            <Input placeholder="Nhập tên nhiệm vụ nghiên cứu..." />
          </FormField>

          <FormField label="Lĩnh vực nghiên cứu">
            <Input placeholder="Chọn lĩnh vực..." />
          </FormField>

          <FormField label="Tổ chức chủ trì (TCCT)">
            <Input placeholder="Tìm kiếm tổ chức chủ trì..." />
          </FormField>

          <FormField label="Họ tên Chủ nhiệm">
            <Input placeholder="Nhập họ tên đầy đủ" />
          </FormField>

          <FormField label="Email liên hệ">
            <Input type="email" placeholder="your.email@institution.edu.vn" />
          </FormField>

          <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-[11px] text-amber-900">
            <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            <p>
              <strong>Lưu ý:</strong> Sau khi đăng ký, bạn sẽ được chuyển đến trang nhập thông tin chi tiết của hồ sơ.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Huỷ bỏ
            </Button>
            <Button onClick={onConfirm} className="bg-emerald-600 hover:bg-emerald-700">
              Xác nhận Đăng ký
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
