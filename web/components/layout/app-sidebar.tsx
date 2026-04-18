"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, LogOut, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { VnuLogo } from "@/components/brand/vnu-logo";
import { adminNavSections, nkhNavSections } from "@/lib/nav-config";

type Props = {
  title: string;
  subtitle: string;
  variant: "admin" | "nkh";
  user: { initials: string; name: string; email: string };
};

// Theme classes per variant — navy (admin) vs emerald (NKH).
const themes = {
  admin: {
    bg: "bg-brand-700",
    logoBg: "bg-brand-800",
    activeBg: "bg-brand-600",
    hoverBg: "hover:bg-brand-600/50",
    activeChildBg: "bg-brand-600",
    mutedText: "text-brand-200",
    dividerBorder: "border-brand-600",
    footerPill: null as { label: string; className: string } | null,
    userInAvatar: "bg-brand-600",
  },
  nkh: {
    bg: "bg-emerald-900",
    logoBg: "bg-emerald-900",
    activeBg: "bg-emerald-700",
    hoverBg: "hover:bg-emerald-800",
    activeChildBg: "bg-emerald-700",
    mutedText: "text-emerald-200",
    dividerBorder: "border-emerald-800",
    footerPill: {
      label: "Nhà Khoa Học",
      className: "bg-emerald-600/30 text-emerald-100 ring-1 ring-emerald-500/50",
    },
    userInAvatar: "bg-emerald-500",
  },
} as const;

export function AppSidebar({ title, subtitle, variant, user }: Props) {
  const pathname = usePathname();
  const sections = variant === "admin" ? adminNavSections : nkhNavSections;
  const t = themes[variant];

  const userBlock = (
    <div className="flex items-center gap-3">
      <div className={cn("flex size-10 items-center justify-center rounded-full text-[13px] font-bold", t.userInAvatar)}>
        {user.initials}
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[12px] font-semibold">{user.name}</p>
        <p className={cn("truncate text-[10px]", t.mutedText)}>
          {variant === "nkh" ? "Nhà khoa học" : user.email}
        </p>
      </div>
    </div>
  );

  return (
    <aside className={cn("flex h-screen w-60 shrink-0 flex-col text-white", t.bg)}>
      {/* Logo zone */}
      <div className={cn("flex h-[76px] items-center gap-3 px-4", t.logoBg)}>
        {variant === "admin" ? (
          <VnuLogo size={48} priority />
        ) : (
          <div className="leading-tight">
            <p className="text-[18px] font-bold tracking-wide">PMS</p>
          </div>
        )}
        <div className="leading-tight">
          {variant === "admin" && <p className="text-[11px] font-bold">{title}</p>}
          {variant === "nkh" && (
            <>
              <p className={cn("text-[11px] font-semibold", t.mutedText)}>Quản lý KHCN</p>
              <p className="text-[10px] font-bold">ĐHQG-HCM</p>
            </>
          )}
          {variant === "admin" && <p className={cn("text-[9px]", t.mutedText)}>{subtitle}</p>}
        </div>
      </div>

      {/* NKH: user block TOP */}
      {variant === "nkh" && (
        <div className={cn("border-b px-4 py-4", t.dividerBorder)}>{userBlock}</div>
      )}

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-4">
        {sections.map((section, idx) => (
          <div key={idx} className={cn("px-2", idx > 0 && "mt-4")}>
            {section.items.map((item, i) => {
              const Icon = item.icon;

              // Non-clickable header for items without href.
              if (!item.href) {
                return (
                  <div
                    key={`header-${i}`}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold uppercase tracking-wide",
                      t.mutedText,
                    )}
                  >
                    {Icon && <Icon aria-hidden className="size-4" />}
                    <span>{item.label}</span>
                  </div>
                );
              }

              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors",
                    isActive ? `${t.activeBg} font-semibold` : t.hoverBg,
                  )}
                >
                  {Icon && <Icon aria-hidden className="size-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {section.children && (
              <div className="mt-1 space-y-0.5 pl-9">
                {section.children.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-[11px] transition-colors",
                        isChildActive
                          ? `${t.activeChildBg} font-semibold text-white`
                          : `${t.mutedText} ${t.hoverBg} hover:text-white`,
                      )}
                    >
                      · {child.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={cn("border-t p-4 space-y-2", t.dividerBorder)}>
        {/* Admin: user info at bottom */}
        {variant === "admin" && userBlock}

        {/* NKH: role pill */}
        {variant === "nkh" && t.footerPill && (
          <div className={cn("flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-semibold", t.footerPill.className)}>
            <Leaf aria-hidden className="size-3.5" />
            {t.footerPill.label}
          </div>
        )}

        {/* Admin debug: switch to NKH */}
        {variant === "admin" && (
          <Link
            href="/dashboard"
            className={cn("flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors", t.activeBg, t.hoverBg)}
          >
            <Eye aria-hidden className="size-3.5" /> Xem giao diện NKH
          </Link>
        )}

        <Link
          href="/dang-nhap"
          className={cn("flex items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors hover:text-white", t.dividerBorder, t.mutedText, t.hoverBg)}
        >
          <LogOut aria-hidden className="size-3.5" /> Đăng xuất
        </Link>
      </div>
    </aside>
  );
}
