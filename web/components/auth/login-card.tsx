"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VnuLogo } from "@/components/brand/vnu-logo";

const schema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});
type LoginValues = z.infer<typeof schema>;

// Role detect heuristic — demo only. Real system would use backend response.
function resolveRole(email: string): "admin" | "nkh" {
  const lower = email.toLowerCase();
  if (lower.startsWith("admin@") || lower.includes(".admin@") || lower.startsWith("tcct@")) {
    return "admin";
  }
  return "nkh";
}

// Unified login card. One entry, role-based redirect. Used by /dang-nhap.
export function LoginCard() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginValues) => {
    // Mock delay + role-based redirect
    await new Promise((r) => setTimeout(r, 400));
    const role = resolveRole(data.email);
    router.push(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  return (
    <div className="w-[460px] overflow-hidden rounded-[20px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
      {/* Card head — branded banner with VNU logo + product name */}
      <div className="flex h-[140px] items-start gap-4 bg-brand-700 px-6 pt-6">
        <VnuLogo size={80} priority />
        <div className="pt-1 leading-tight">
          <p className="text-[18px] font-bold text-white tracking-wide">PMS · ĐHQG-HCM</p>
          <p className="mt-1 text-[11px] font-semibold text-brand-200">
            HỆ THỐNG QUẢN LÝ NHIỆM VỤ KHOA HỌC & CÔNG NGHỆ
          </p>
          <p className="mt-1 text-[10px] text-brand-300">
            Đại học Quốc gia TP. Hồ Chí Minh
          </p>
          <p className="mt-0.5 text-[10px] text-brand-300">pms.vnuhcm.edu.vn</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <h1 className="text-2xl font-bold text-ink-900">Đăng nhập</h1>
        <p className="mt-1 text-xs text-ink-700">
          Nhập thông tin tài khoản để tiếp tục sử dụng hệ thống
        </p>

        <div className="mt-6 space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium text-ink-900">
            Email / Tên đăng nhập
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@vnuhcm.edu.vn"
            className="h-10 bg-surface-page"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-medium text-ink-900">
              Mật khẩu
            </Label>
            <button
              type="button"
              disabled
              className="text-xs font-medium text-brand-400 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              title="Tính năng sắp ra mắt"
            >
              Quên mật khẩu?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            className="h-10 bg-surface-page"
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 h-12 w-full rounded-[10px] bg-brand-700 text-[15px] font-bold text-white hover:bg-brand-800"
        >
          {isSubmitting ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
        </Button>

        {/* Demo credentials hint */}
        <div className="mt-6 rounded-[10px] border border-brand-500 bg-brand-50 p-3">
          <p className="text-xs font-semibold text-brand-700">🔑 Tài khoản demo</p>
          <ul className="mt-1 space-y-0.5 text-[11px] text-ink-700">
            <li>· <code className="font-mono">admin@vnuhcm.edu.vn</code> → Cán bộ quản lý</li>
            <li>· <code className="font-mono">nkh@vnuhcm.edu.vn</code> → Nhà khoa học</li>
            <li className="text-ink-500">(mật khẩu bất kỳ ≥ 6 ký tự)</li>
          </ul>
        </div>

        <p className="mt-6 text-center text-[10px] text-ink-500">
          © 2026 Đại học Quốc gia TP. Hồ Chí Minh · Phiên bản 2.0
        </p>
      </form>
    </div>
  );
}
