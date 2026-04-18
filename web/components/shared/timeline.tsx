import { cn } from "@/lib/utils";

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description?: string;
  author?: string;
  type?: "create" | "approve" | "sign" | "milestone" | "report" | "handover";
};

const typeDotColor: Record<NonNullable<TimelineEvent["type"]>, string> = {
  create: "bg-brand-400",
  approve: "bg-[#8b5cf6]",
  sign: "bg-[#10b981]",
  milestone: "bg-[#f59e0b]",
  report: "bg-brand-700",
  handover: "bg-[#10b981]",
};

type Props = {
  events: TimelineEvent[];
  className?: string;
};

// Vertical timeline with colored dot markers.
export function Timeline({ events, className }: Props) {
  return (
    <ol className={cn("relative space-y-6 pl-8", className)}>
      <div
        aria-hidden
        className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-ink-300"
      />
      {events.map((ev) => (
        <li key={ev.id} className="relative">
          <span
            className={cn(
              "absolute -left-8 top-1 size-[22px] rounded-full ring-4 ring-white",
              ev.type ? typeDotColor[ev.type] : "bg-brand-700",
            )}
          />
          <p className="text-[11px] text-ink-500">{ev.date}</p>
          <p className="mt-0.5 text-sm font-semibold text-ink-900">{ev.title}</p>
          {ev.description && (
            <p className="mt-1 text-xs text-ink-700">{ev.description}</p>
          )}
          {ev.author && (
            <p className="mt-1 text-[11px] text-ink-500">— {ev.author}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
