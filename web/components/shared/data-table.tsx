import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: "left" | "right" | "center";
  render: (row: T, index: number) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  className?: string;
};

// Styled table matching Figma tables across screens 07/08/10.
// Header bg #f9fafb, rows 56h, zebra #fafbff on odd rows.
export function DataTable<T>({
  columns,
  rows,
  emptyMessage = "Không có dữ liệu",
  className,
}: Props<T>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <table className="w-full border-collapse text-[12px]">
        <thead className="bg-surface-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  "h-11 px-3 text-[11px] font-semibold text-ink-700",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  (!col.align || col.align === "left") && "text-left",
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-sm text-ink-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "h-14 border-t border-ink-300 text-ink-900",
                  i % 2 === 1 && "bg-surface-stripe",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-3",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                    )}
                  >
                    {col.render(row, i)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
