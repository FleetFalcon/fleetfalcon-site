type Make = { make: string; count: number; pct: number };
type Category = { total: number; makes: Make[] };

const C = 100; // circle calibrated so circumference = 100 → percentages map 1:1 to dash length.
const R = C / (2 * Math.PI);

// Monochrome ramp off the accent; the "Other" bucket renders neutral.
function sliceColor(make: string): string {
  if (make === "Other") return "var(--foreground-faint)";
  return "currentColor";
}
function sliceOpacity(i: number, make: string): number {
  if (make === "Other") return 1;
  return Math.max(0.3, 1 - i * 0.2);
}

function Donut({ title, unit, cat }: { title: string; unit: string; cat: Category }) {
  // Cumulative start angle (as a percent) for each slice — computed without mutation during render.
  const offsets = cat.makes.map((_, i) => cat.makes.slice(0, i).reduce((s, x) => s + x.pct, 0));
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0 text-accent" style={{ width: 92, height: 92 }}>
        <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
          <circle cx="21" cy="21" r={R} fill="none" stroke="var(--border)" strokeWidth="5" />
          {cat.makes.map((m, i) => (
            <circle
              key={m.make}
              cx="21"
              cy="21"
              r={R}
              fill="none"
              stroke={sliceColor(m.make)}
              strokeOpacity={sliceOpacity(i, m.make)}
              strokeWidth="5"
              strokeDasharray={`${m.pct} ${C - m.pct}`}
              strokeDashoffset={-offsets[i]}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-data text-lg font-bold leading-none">{cat.total}</span>
          <span className="text-eyebrow text-foreground-faint">{unit}</span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-eyebrow text-foreground-faint">{title}</p>
        <ul className="mt-1.5 flex flex-col gap-1">
          {cat.makes.map((m, i) => (
            <li key={m.make} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm text-accent"
                style={{ backgroundColor: sliceColor(m.make), opacity: sliceOpacity(i, m.make) }}
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-foreground-muted">{m.make}</span>
              <span className="text-data shrink-0 font-semibold">{m.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function EquipmentCharts({ trucks, trailers }: { trucks: Category; trailers: Category }) {
  const hasTrucks = trucks?.total > 0 && trucks.makes.length > 0;
  const hasTrailers = trailers?.total > 0 && trailers.makes.length > 0;
  if (!hasTrucks && !hasTrailers) return null;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {hasTrucks && <Donut title="Tractors · by make" unit="tractors" cat={trucks} />}
      {hasTrailers && <Donut title="Trailers · by make" unit="trailers" cat={trailers} />}
    </div>
  );
}
