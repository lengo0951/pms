import { AppTopbar } from "./app-topbar";
import { PageContainer } from "./page-container";

type Props = {
  breadcrumb: string;
  title: string;
  userInitials?: string;
  children: React.ReactNode;
};

// Combined topbar + content container — used by every admin/NKH page.
export function PageShell({ breadcrumb, title, userInitials = "TC", children }: Props) {
  return (
    <>
      <AppTopbar breadcrumb={breadcrumb} title={title} userInitials={userInitials} />
      <PageContainer>{children}</PageContainer>
    </>
  );
}
