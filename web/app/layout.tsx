import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PMS · ĐHQG-HCM",
  description:
    "Hệ thống Quản lý Nhiệm vụ Khoa học & Công nghệ — Đại học Quốc gia TP. Hồ Chí Minh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
