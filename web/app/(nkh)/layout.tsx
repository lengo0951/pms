import { AppSidebar } from "@/components/layout/app-sidebar";

// NKH shell — same structure as admin, different nav config + user context.
export default function NkhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-page">
      <AppSidebar
        title="PMS · Nhà Khoa Học"
        subtitle="pms.vnuhcm.edu.vn"
        variant="nkh"
        user={{ initials: "NK", name: "PGS.TS. Nguyễn Văn A", email: "nguyenvana@vnuhcm.edu.vn" }}
      />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
