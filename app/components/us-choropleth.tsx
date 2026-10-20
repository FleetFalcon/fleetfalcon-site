import { US_STATE_PATHS, US_VIEWBOX } from "./us-states";

// Choropleth of US states shaded by a per-state value (e.g. roadside inspections by state).
// Pure SVG, no map dependency. Inherits the accent color via `currentColor`.
export function UsChoropleth({ data }: { data: { state: string; count: number }[] }) {
  const byState: Record<string, number> = {};
  for (const d of data) byState[d.state] = (byState[d.state] ?? 0) + d.count;
  const max = Math.max(1, ...Object.values(byState));

  return (
    <svg
      viewBox={US_VIEWBOX}
      role="img"
      aria-label="States where this carrier's trucks were inspected"
      className="h-auto w-full text-accent"
    >
      {US_STATE_PATHS.map((s) => {
        const v = byState[s.code] ?? 0;
        // sqrt scale so a single dominant state doesn't wash out the rest.
        const t = v > 0 ? Math.sqrt(v / max) : 0;
        return (
          <path
            key={s.code}
            d={s.d}
            fill={v > 0 ? "currentColor" : "var(--surface)"}
            fillOpacity={v > 0 ? 0.18 + 0.78 * t : 1}
            stroke="var(--border-strong)"
            strokeWidth={0.6}
            strokeLinejoin="round"
          >
            <title>
              {s.name}: {v.toLocaleString("en-US")} inspection{v === 1 ? "" : "s"}
            </title>
          </path>
        );
      })}
    </svg>
  );
}
