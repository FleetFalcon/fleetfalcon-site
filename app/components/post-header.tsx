import Image from "next/image";

/**
 * The image at the top of a blog post.
 *
 * Two kinds, and the choice is deliberate rather than decorative. Where a real product screenshot
 * genuinely illustrates the subject, we use it — a post about what a green CSA score hides should
 * show the screen that surfaces what it hides. Everywhere else we draw an on-brand motif rather
 * than reaching for stock photography, because a stock photo of a truck at golden hour says nothing
 * about DataQs and every compliance vendor's blog already has one.
 *
 * The motifs are flat SVG in the site's own palette — a single red held for the thing that matters
 * in each drawing, neutrals for everything else — so they read as part of the product rather than
 * as clip art, and they cost no network request.
 */
export type Motif =
  | "documents"
  | "shield"
  | "chart"
  | "network"
  | "stamp"
  | "waveform"
  | "map"
  | "checklist"
  | "columns"
  | "checkpoint"
  | "overlap";

const A = "var(--accent)";
const F = "var(--border-strong)";
const M = "var(--foreground-faint)";

function Art({ motif }: { motif: Motif }) {
  const common = { fill: "none", strokeWidth: 2.75, strokeLinecap: "round" as const };

  return (
    <svg viewBox="52 14 216 112" className="h-full w-full" role="presentation" aria-hidden>
      {motif === "documents" && (
        <g {...common}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={70 + i * 36} y={26 + i * 6} width={64} height={88} rx={4} stroke={i === 2 ? A : F} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={154} y1={58 + i * 14} x2={190} y2={58 + i * 14} stroke={i === 0 ? A : M} />
          ))}
        </g>
      )}

      {motif === "shield" && (
        <g {...common}>
          <path d="M160 24l44 16v34c0 26-18 44-44 52-26-8-44-26-44-52V40z" stroke={F} />
          <path d="M140 72l14 14 28-30" stroke={A} />
        </g>
      )}

      {motif === "chart" && (
        <g {...common}>
          <line x1={60} y1={116} x2={262} y2={116} stroke={F} />
          {[0, 1, 2, 3, 4].map((i) => {
            const h = [34, 52, 28, 74, 44][i];
            return (
              <rect key={i} x={76 + i * 38} y={116 - h} width={22} height={h} rx={2}
                    stroke={i === 3 ? A : F} fill={i === 3 ? "var(--accent-faint)" : "none"} />
            );
          })}
          <line x1={60} y1={58} x2={262} y2={58} stroke={A} strokeDasharray="5 6" />
        </g>
      )}

      {motif === "network" && (
        <g {...common}>
          <circle cx={160} cy={70} r={13} stroke={A} />
          {[[70, 36], [70, 104], [250, 36], [250, 104]].map(([x, y], i) => (
            <g key={i}>
              <line x1={160} y1={70} x2={x} y2={y} stroke={M} />
              <circle cx={x} cy={y} r={9} stroke={F} />
            </g>
          ))}
        </g>
      )}

      {motif === "stamp" && (
        <g {...common}>
          <rect x={96} y={30} width={128} height={80} rx={5} stroke={F} />
          <circle cx={160} cy={70} r={28} stroke={A} />
          <path d="M146 70l10 10 20-22" stroke={A} />
          <line x1={110} y1={122} x2={210} y2={122} stroke={M} />
        </g>
      )}

      {motif === "waveform" && (
        <g {...common}>
          {Array.from({ length: 17 }, (_, i) => {
            const h = [10, 22, 38, 26, 48, 30, 56, 34, 62, 34, 56, 30, 48, 26, 38, 22, 10][i];
            return (
              <line key={i} x1={76 + i * 10.5} y1={70 - h / 2} x2={76 + i * 10.5} y2={70 + h / 2}
                    stroke={i === 8 ? A : M} />
            );
          })}
        </g>
      )}

      {motif === "map" && (
        <g {...common}>
          <rect x={76} y={24} width={168} height={92} rx={5} stroke={F} />
          <line x1={76} y1={54} x2={244} y2={54} stroke={M} strokeDasharray="4 7" />
          <line x1={76} y1={86} x2={244} y2={86} stroke={M} strokeDasharray="4 7" />
          <line x1={132} y1={24} x2={132} y2={116} stroke={M} strokeDasharray="4 7" />
          <line x1={188} y1={24} x2={188} y2={116} stroke={M} strokeDasharray="4 7" />
          <circle cx={188} cy={54} r={10} stroke={A} />
        </g>
      )}

      {motif === "checklist" && (
        <g {...common}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={96} y={28 + i * 24} width={16} height={16} rx={3} stroke={i === 2 ? A : F} />
              {i !== 2 && <path d={`M99 ${36 + i * 24}l4 4 7-8`} stroke={M} />}
              <line x1={126} y1={36 + i * 24} x2={224 - i * 18} y2={36 + i * 24} stroke={i === 2 ? A : M} />
            </g>
          ))}
        </g>
      )}

      {motif === "columns" && (
        <g {...common}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={74 + i * 64} y={28} width={52} height={88} rx={4} stroke={i === 0 ? A : F}
                  fill={i === 0 ? "var(--accent-faint)" : "none"} />
          ))}
          {[0, 1, 2].map((i) =>
            [0, 1, 2].map((j) => (
              <line key={`${i}-${j}`} x1={84 + i * 64} y1={50 + j * 20} x2={116 + i * 64} y2={50 + j * 20}
                    stroke={i === 0 && j === 0 ? A : M} />
            )),
          )}
        </g>
      )}

      {motif === "checkpoint" && (
        <g {...common}>
          <line x1={56} y1={70} x2={132} y2={70} stroke={M} strokeDasharray="6 7" />
          <line x1={188} y1={70} x2={264} y2={70} stroke={M} strokeDasharray="6 7" />
          <rect x={132} y={38} width={56} height={64} rx={5} stroke={A} fill="var(--accent-faint)" />
          <path d="M146 70l10 10 20-24" stroke={A} />
        </g>
      )}

      {motif === "overlap" && (
        <g {...common}>
          <circle cx={132} cy={70} r={42} stroke={F} />
          <circle cx={188} cy={70} r={42} stroke={F} />
          <path d="M160 32a42 42 0 000 76 42 42 0 000-76z" stroke={A} fill="var(--accent-faint)" />
        </g>
      )}
    </svg>
  );
}

export function PostHeader({
  motif,
  image,
  alt,
}: {
  motif: Motif;
  /** A real product screenshot, where one genuinely illustrates the subject. */
  image?: string;
  alt?: string;
}) {
  if (image) {
    return (
      <div className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl border border-border bg-surface-2">
        <Image src={image} alt={alt ?? ""} fill sizes="(max-width: 768px) 100vw, 720px"
               className="object-cover object-top" priority />
      </div>
    );
  }

  return (
    <div className="mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent-faint via-surface-2 to-surface-2 p-5">
      <Art motif={motif} />
    </div>
  );
}
