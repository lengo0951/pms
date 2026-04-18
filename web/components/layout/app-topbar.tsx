import { Bell } from "lucide-react";

type Props = {
  breadcrumb: string;
  title: string;
  userInitials: string;
};

// Topbar 64h: breadcrumb + page title, bell icon, user avatar (right-aligned).
export function AppTopbar({ breadcrumb, title, userInitials }: Props) {
  return (
    <header className="flex h-16 items-center border-b border-ink-300 bg-white px-8">
      <div className="flex-1 leading-tight">
        <p className="text-[11px] text-ink-500">{breadcrumb}</p>
        <h1 className="text-[17px] font-semibold text-ink-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-surface-page"
          aria-label="Thông báo"
        >
          <Bell aria-hidden className="size-4" />
        </button>
        <div className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-[12px] font-bold text-white">
          {userInitials}
        </div>
      </div>
    </header>
  );
}
