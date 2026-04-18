"use client";

import { useRef, useState } from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  hint?: string;
  className?: string;
};

// Drag-drop file upload — demo only, keeps file list in local state.
export function FileUploadBox({
  label = "Tải lên hồ sơ",
  hint = "Kéo thả file vào đây hoặc bấm để chọn (PDF, DOC, DOCX · tối đa 20MB)",
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onPick = (picked: FileList | null) => {
    if (!picked) return;
    setFiles((prev) => [...prev, ...Array.from(picked)]);
  };

  const remove = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className={cn("space-y-3", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onPick(e.dataTransfer.files);
        }}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-300 bg-white p-8 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
      >
        <UploadCloud aria-hidden className="size-10 text-brand-400" />
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        <p className="text-xs text-ink-700">{hint}</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => onPick(e.target.files)}
      />

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-lg bg-surface-page px-3 py-2"
            >
              <FileIcon aria-hidden className="size-4 text-brand-700" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-ink-900">{f.name}</p>
                <p className="text-[10px] text-ink-500">{(f.size / 1024).toFixed(1)} KB</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => remove(i)}
              >
                <X className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
