import { PageShell } from "@/components/layout/page-shell";
import { ProgramCardList } from "@/components/nkh/program-card-list";
import { programsOpen } from "@/lib/mock-data/nkh-dashboard";

export default function ChuongTrinhMoPage() {
  return (
    <PageShell breadcrumb="PMS / Chương trình mở" title="Chương trình mở" userInitials="NA">
      <div className="rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <p className="mb-4 text-sm text-ink-700">
          Danh sách các chương trình KH&CN đang mở đăng ký nhận hồ sơ tham gia.
        </p>
        <ProgramCardList programs={programsOpen} variant="detailed" />
      </div>
    </PageShell>
  );
}
