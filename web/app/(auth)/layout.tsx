// Gradient full-screen shell for login pages.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-700 to-brand-500">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 size-[380px] rounded-full bg-white/5 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 size-[460px] rounded-full bg-white/5 blur-3xl"
      />
      <div className="relative flex min-h-screen items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
