import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { WizardTabs } from "@/components/shared/wizard-tabs";
import { WizardFooter } from "@/components/nhiem-vu/wizard-footer";
import { TabDonDangKy } from "@/components/nhiem-vu/tab-don-dang-ky";
import { TabThuyetMinh } from "@/components/nhiem-vu/tab-thuyet-minh";
import { TabThanhVien } from "@/components/nhiem-vu/tab-thanh-vien";
import { TabNopHoSo } from "@/components/nhiem-vu/tab-nop-ho-so";
import {
  nkhWizardTabs,
  nextTabId,
  prevTabId,
} from "@/lib/wizard-tabs-config";

const BASE = "/dang-ky";

function renderContent(tabId: string) {
  switch (tabId) {
    case "thong-tin-chung": return <TabDonDangKy />;
    case "thuyet-minh":     return <TabThuyetMinh />;
    case "thanh-vien":      return <TabThanhVien />;
    case "nop-ho-so":       return <TabNopHoSo />;
    default: return null;
  }
}

export default async function NkhWizardPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  const current = nkhWizardTabs.find((t) => t.id === tab);
  if (!current) notFound();

  const content = renderContent(tab);
  if (!content) notFound();

  const nextId = nextTabId(nkhWizardTabs, tab);

  return (
    <PageShell breadcrumb="Đăng ký nhiệm vụ" title={`Đăng ký nhiệm vụ — ${current.label}`} userInitials="NK">
      <WizardTabs tabs={nkhWizardTabs} currentId={tab} basePath={BASE} />
      <div className="mt-6">{content}</div>
      {/* Tab cuối chuyển sang ký số. */}
      <WizardFooter
        basePath={BASE}
        prevId={prevTabId(nkhWizardTabs, tab)}
        nextId={nextId}
        submitLabel="Chuyển sang ký số →"
        submitHref="/ky-so"
      />
      {!nextId && (
        <p className="mt-3 text-right text-xs text-ink-500">
          Bấm &quot;Chuyển sang ký số&quot; để xác thực và nộp hồ sơ.
        </p>
      )}
    </PageShell>
  );
}

export function generateStaticParams() {
  return nkhWizardTabs.map((t) => ({ tab: t.id }));
}
