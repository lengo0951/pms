import { AppSidebar } from "@/components/layout/app-sidebar";

// Admin shell — sidebar + content. Topbar is rendered per page (needs dynamic breadcrumb).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-page">
      <AppSidebar
        title="PMS · ĐHQG-HCM"
        subtitle="pms.vnuhcm.edu.vn"
        variant="admin"
        user={{ initials: "TC", name: "Tổ chức chủ trì", email: "tcct@vnuhcm.edu.vn" }}
      />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
