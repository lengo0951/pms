import { redirect } from "next/navigation";

// Root redirect to admin login — default entry point for demo.
export default function Home() {
  redirect("/dang-nhap");
}
