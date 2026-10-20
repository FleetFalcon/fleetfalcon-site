import { Check, Minus } from "lucide-react";
import { comparisonVendors, comparisonRows, type Cell } from "../content";

function CellValue({ value, isFF }: { value: Cell; isFF: boolean }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center">
        <Check className={`h-4 w-4 ${isFF ? "text-accent" : "text-foreground-muted"}`} aria-label="Yes" />
      </span>
    );
  }
  if (value === "no") {
    return <Minus className="h-4 w-4 text-foreground-faint" aria-label="No" />;
  }
  if (value === "partial") {
    return <span className="font-mono text-xs text-foreground-faint">Partial</span>;
  }
  // free-text cell (e.g. "Integrates (Samsara / Motive / Geotab)")
  return <span className="text-xs leading-snug text-foreground-muted">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div>
      {/* PLACEHOLDER: marketing/legal to verify every cell before publishing (Lanham Act — comparative claims must be accurate) */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-surface px-4 py-3 align-bottom">
                <span className="text-eyebrow text-foreground-faint">Capability</span>
              </th>
              {comparisonVendors.map((v, i) => (
                <th
                  key={v}
                  className={`px-4 py-3 align-bottom ${i === 0 ? "bg-accent-faint" : "bg-surface"}`}
                >
                  <span
                    className={`text-eyebrow ${i === 0 ? "text-accent" : "text-foreground-muted"}`}
                  >
                    {v}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="border-b border-border last:border-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface px-4 py-3 text-left align-top text-[13px] font-medium leading-snug text-foreground"
                >
                  {row.feature}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 align-middle ${i === 0 ? "bg-accent-faint" : ""}`}
                  >
                    <CellValue value={cell} isFF={i === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
        Comparison reflects FleetFalcon&apos;s understanding of publicly available information as of
        October 2026; competitor capabilities change — verify before relying. Product names are
        trademarks of their respective owners.
      </p>
    </div>
  );
}
