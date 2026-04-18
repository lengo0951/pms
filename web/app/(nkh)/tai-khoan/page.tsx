import { User, Mail, Phone, Building, IdCard, KeyRound } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaiKhoanPage() {
  return (
    <PageShell breadcrumb="PMS / Tài khoản" title="Tài khoản của tôi" userInitials="NA">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User aria-hidden className="size-4 text-emerald-600" /> Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Họ và tên" required>
              <Input defaultValue="Nguyễn Văn A" />
            </FormField>
            <FormField label="Mã cán bộ (MSCB)">
              <Input defaultValue="CB12345" />
            </FormField>
            <FormField label="Email">
              <Input type="email" defaultValue="nva@uit.edu.vn" />
            </FormField>
            <FormField label="Điện thoại">
              <Input defaultValue="0901 234 567" />
            </FormField>
            <FormField label="Đơn vị công tác" className="md:col-span-2">
              <Input defaultValue="Khoa CNTT - Trường ĐH Công nghệ Thông tin" />
            </FormField>
            <div className="md:col-span-2 flex justify-end">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Cập nhật</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <KeyRound aria-hidden className="size-4 text-emerald-600" /> Bảo mật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">Đổi mật khẩu</Button>
            <Button variant="outline" className="w-full">Đăng ký chữ ký số</Button>
            <p className="text-[11px] text-ink-500">Chứng thư số hiện tại: VNPT-CA · Hết hạn 31/12/2026</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Thông tin liên hệ khác</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-5 md:grid-cols-4 text-xs">
              {[
                [Mail, "Email công vụ", "nguyenvana@vnuhcm.edu.vn"],
                [Phone, "ĐT cơ quan", "(028) 3724 4270"],
                [Building, "Phòng", "Phòng B2-204"],
                [IdCard, "CCCD", "079xxx123456"],
              ].map(([Icon, label, value]) => {
                const I = Icon as typeof Mail;
                return (
                  <div key={label as string} className="flex items-start gap-2">
                    <I aria-hidden className="mt-0.5 size-4 text-emerald-600" />
                    <div>
                      <dt className="text-[11px] text-ink-500">{label as string}</dt>
                      <dd className="font-medium text-ink-900">{value as string}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
