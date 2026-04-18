import { LinkButton } from "@/components/ui/link-button";

// Branded 404 — route không tồn tại.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-page p-8 text-center">
      <p className="text-[80px] font-bold leading-none text-brand-700">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Trang không tồn tại</h1>
      <p className="mt-2 max-w-md text-sm text-ink-700">
        Đường dẫn bạn truy cập không có trong hệ thống PMS · ĐHQG-HCM, hoặc có thể đã bị di chuyển.
      </p>
      <LinkButton
        href="/dang-nhap"
        className="mt-6 bg-brand-700 text-white hover:bg-brand-800"
      >
        Về trang đăng nhập
      </LinkButton>
    </main>
  );
}
