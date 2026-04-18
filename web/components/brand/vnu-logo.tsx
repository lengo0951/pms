import Image from "next/image";
import { cn } from "@/lib/utils";

// Logo VNU-HCM from /public/logo-vnu-hcm.png (3840×2421, landscape).
// Square container + rounded-md + padding so the landscape logo displays fully without circle crop.
type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
  /** When true, skip the white background (useful on dark sidebars where logo needs to breathe). */
  transparent?: boolean;
};

export function VnuLogo({ size = 48, className, priority, transparent = false }: Props) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-md p-1",
        !transparent && "bg-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo-vnu-hcm.png"
        alt="Logo Đại học Quốc gia TP. HCM"
        fill
        sizes={`${size}px`}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
