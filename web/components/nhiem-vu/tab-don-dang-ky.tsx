import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tab 1 — Đơn đăng ký (Figma 4:110 / NKH 32:69). Static form, no RHF for demo simplicity.
export function TabDonDangKy() {
  return (
    <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <CardHeader>
        <CardTitle className="text-base">Thông tin đơn đăng ký</CardTitle>
        <p className="text-xs text-ink-500">Điền đầy đủ thông tin cơ bản về nhiệm vụ.</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField label="Mã nhiệm vụ" required>
          <Input defaultValue="TN-2026-AUTO" readOnly className="bg-surface-page" />
        </FormField>
        <FormField label="Tên nhiệm vụ" required>
          <Input placeholder="VD: Ứng dụng AI trong dự báo thời tiết" />
        </FormField>
        <FormField label="Chương trình" required>
          <Select>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Chọn chương trình" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="khcn-dhqg">KHCN cấp ĐHQG</SelectItem>
              <SelectItem value="trong-diem">Trọng điểm nhà nước</SelectItem>
              <SelectItem value="nafosted">NAFOSTED</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Đơn vị chủ trì" required>
          <Select>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Chọn đơn vị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="khtn">Trường ĐH Khoa học Tự nhiên</SelectItem>
              <SelectItem value="bk">Trường ĐH Bách khoa</SelectItem>
              <SelectItem value="cntt">Trường ĐH Công nghệ Thông tin</SelectItem>
              <SelectItem value="yd">Trường ĐH Y Dược</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Chủ nhiệm đề tài" required>
          <Input placeholder="VD: PGS.TS. Trần Văn Minh" />
        </FormField>
        <FormField label="Kinh phí đề xuất (VND)" required hint="Đơn vị: triệu đồng">
          <Input type="number" placeholder="500" />
        </FormField>
        <FormField label="Thời gian bắt đầu" required>
          <Input type="month" />
        </FormField>
        <FormField label="Thời gian kết thúc" required>
          <Input type="month" />
        </FormField>
        <FormField label="Từ khóa" className="md:col-span-2" hint="Phân cách bằng dấu phẩy">
          <Input placeholder="AI, machine learning, dự báo thời tiết" />
        </FormField>
        <FormField label="Tóm tắt nội dung" className="md:col-span-2" required>
          <Textarea rows={5} placeholder="Mô tả ngắn gọn mục tiêu, phương pháp, kết quả dự kiến của nhiệm vụ..." />
        </FormField>
      </CardContent>
    </Card>
  );
}
