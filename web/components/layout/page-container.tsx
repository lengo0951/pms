import { cn } from "@/lib/utils";

// Main content wrapper with page background + standard padding.
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto bg-surface-page p-6 lg:p-8",
        className,
      )}
    >
      {children}
    </main>
  );
}
