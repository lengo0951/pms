import { redirect } from "next/navigation";

// /dang-ky (no tab) → redirect to first tab.
export default function DangKyIndex() {
  redirect("/dang-ky/thong-tin-chung");
}
