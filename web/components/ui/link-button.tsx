import Link, { type LinkProps } from "next/link";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = LinkProps &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
  };

// Next Link styled as a Button — replaces <Button asChild><Link/></Button>
// (base-nova Button doesn't support asChild).
export function LinkButton({ className, variant, size, children, ...props }: Props) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
