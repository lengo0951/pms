import {
  LayoutDashboard,
  ListChecks,
  Building2,
  Home,
  Megaphone,
  FolderArchive,
  Bell,
  UserCog,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  /** Optional — parent items without href render as non-clickable section header. */
  href?: string;
  label: string;
  icon?: LucideIcon;
};

export type NavChild = {
  href: string;
  label: string;
};

export type NavSection = {
  label?: string;
  items: NavItem[];
  children?: NavChild[];
};

// Admin nav — navy theme, superuser.
export const adminNavSections: NavSection[] = [
  {
    items: [{ href: "/admin/dashboard", label: "Tổng quan", icon: LayoutDashboard }],
  },
  {
    items: [{ label: "Nhiệm vụ", icon: ListChecks }],
    children: [
      { href: "/admin/nhiem-vu", label: "Danh sách nhiệm vụ" },
      { href: "/admin/hop-dong-tai-tro", label: "Hợp đồng tài trợ" },
      { href: "/admin/nhiem-vu-tai-tro", label: "Nhiệm vụ được tài trợ" },
      { href: "/admin/theo-doi-nhiem-vu", label: "Theo dõi nhiệm vụ" },
      { href: "/admin/nhat-ky-trien-khai", label: "Nhật ký triển khai" },
    ],
  },
  {
    items: [
      { href: "/admin/ly-lich-to-chuc", label: "Lý lịch tổ chức", icon: Building2 },
    ],
  },
];

// NKH nav — emerald theme, 5 items theo Figma.
export const nkhNavSections: NavSection[] = [
  {
    items: [
      { href: "/dashboard",         label: "Trang chủ",      icon: Home },
      { href: "/chuong-trinh-mo",   label: "Chương trình mở", icon: Megaphone },
      { href: "/ho-so-cua-toi",     label: "Hồ sơ của tôi",   icon: FolderArchive },
      { href: "/thong-bao",         label: "Thông báo",       icon: Bell },
      { href: "/tai-khoan",         label: "Tài khoản",       icon: UserCog },
    ],
  },
];
