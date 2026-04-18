"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";

type Props = {
  basePath: string;
  prevId: string | null;
  nextId: string | null;
  onSubmit?: () => void;
  submitLabel?: string;
  submitHref?: string;
};

// Shared wizard footer — Trở lại / Lưu nháp / Tiếp theo (hoặc Submit).
export function WizardFooter({
  basePath,
  prevId,
  nextId,
  onSubmit,
  submitLabel,
  submitHref,
}: Props) {
  const router = useRouter();
  const handleSubmit = () => {
    if (onSubmit) onSubmit();
    if (submitHref) router.push(submitHref);
  };

  return (
    <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <div>
        {prevId && (
          <LinkButton variant="outline" href={`${basePath}/${prevId}`}>
            <ArrowLeft className="mr-1 size-4" /> Trở lại
          </LinkButton>
        )}
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Save className="mr-1 size-4" /> Lưu nháp
        </Button>
        {nextId ? (
          <LinkButton
            href={`${basePath}/${nextId}`}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Tiếp theo <ArrowRight className="ml-1 size-4" />
          </LinkButton>
        ) : (
          <Button onClick={handleSubmit} className="bg-brand-700 hover:bg-brand-800">
            {submitLabel ?? "Hoàn tất"}
          </Button>
        )}
      </div>
    </div>
  );
}
