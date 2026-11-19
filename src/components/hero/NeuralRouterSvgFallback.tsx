const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
  [3, 7],
  [7, 5],
  [0, 7],
  [2, 5],
]

const PTS: [number, number][] = [
  [60, 80],
  [155, 115],
  [255, 65],
  [260, 165],
  [360, 95],
  [370, 195],
  [460, 130],
  [175, 210],
]

/**
 * Pure 1px SVG schematic fallback (0 Three.js bytes). Kept in its own module
 * so importing it from Hero.tsx never pulls `three` into the initial bundle.
 */
export function NeuralRouterSvgFallback({
  accentHex,
  className = "",
}: {
  accentHex: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 520 260"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
      fill="none"
    >
      {EDGES.map(([a, b], idx) => (
        <line
          key={idx}
          x1={PTS[a][0]}
          y1={PTS[a][1]}
          x2={PTS[b][0]}
          y2={PTS[b][1]}
          stroke="#262A34"
          strokeWidth="1"
        />
      ))}
      {PTS.map(([x, y], idx) => (
        <g key={idx}>
          <rect
            x={x - 5}
            y={y - 5}
            width="10"
            height="10"
            fill="#121418"
            stroke={idx === 2 || idx === 4 || idx === 6 ? accentHex : "#4A5162"}
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  )
}
