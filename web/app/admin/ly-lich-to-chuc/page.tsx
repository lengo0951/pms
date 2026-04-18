import { Mail, Phone, Globe, MapPin, Calendar, IdCard } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/shared/data-table";
import { orgProfile, orgDepartments, orgKeyMembers } from "@/lib/mock-data/organization";

const infoRows = [
  { icon: IdCard,    label: "Mã đơn vị",     value: orgProfile.code },
  { icon: MapPin,    label: "Địa chỉ",        value: orgProfile.address },
  { icon: Mail,      label: "Email",         value: orgProfile.email },
  { icon: Phone,     label: "Điện thoại",     value: orgProfile.phone },
  { icon: Globe,     label: "Website",       value: orgProfile.website },
  { icon: Calendar,  label: "Năm thành lập",  value: String(orgProfile.foundedYear) },
  { icon: IdCard,    label: "Mã số thuế",     value: orgProfile.taxCode },
];

const deptColumns: Column<typeof orgDepartments[number]>[] = [
  { key: "name",       header: "Phòng ban",           render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "head",       header: "Trưởng phòng",        render: (r) => r.head },
  { key: "staffCount", header: "Nhân sự", align: "right", render: (r) => `${r.staffCount} người` },
];

const memberColumns: Column<typeof orgKeyMembers[number]>[] = [
  { key: "name",  header: "Họ tên",     render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "role",  header: "Chức vụ",    render: (r) => r.role },
  { key: "since", header: "Từ năm",     align: "right", render: (r) => r.since },
];

export default function LyLichToChucPage() {
  return (
    <PageShell breadcrumb="Trang chủ / Lý lịch tổ chức" title="Lý lịch tổ chức">
      <PageHeader
        title={orgProfile.name}
        subtitle={`Đại diện: ${orgProfile.representative} — ${orgProfile.position}`}
        action={<Button variant="outline">Chỉnh sửa thông tin</Button>}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Thông tin chung</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {infoRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-4 text-brand-700" />
                    <div>
                      <dt className="text-xs text-ink-500">{row.label}</dt>
                      <dd className="text-sm font-medium text-ink-900">{row.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </CardContent>
        </Card>

        <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Lãnh đạo đơn vị</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={memberColumns} rows={orgKeyMembers} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CardHeader>
            <CardTitle className="text-base">Phòng ban trực thuộc</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={deptColumns} rows={orgDepartments} />
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
