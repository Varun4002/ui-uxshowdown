/* Ink, Pine and Mauve of the five-hue palette: blush pieces would disappear
   against the blush page, so blush is the one hue deliberately left out. */
const PALETTE = ['var(--coral)', 'var(--butter)', 'var(--sage)']
const PIECE_COUNT = 26

/**
 * Deterministic jitter in [0, 1). Confetti needs to look scattered, but
 * Math.random() during render is impure — React may render this component more
 * than once and get different values. A seeded hash keeps render pure and makes
 * the pattern stable across re-renders.
 */
function jitter(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const PIECES = Array.from({ length: PIECE_COUNT }, (_, i) => ({
  id: i,
  left: `${(i / PIECE_COUNT) * 100 + jitter(i + 1) * 4}%`,
  delay: `${jitter(i + 11) * 240}ms`,
  duration: `${900 + jitter(i + 21) * 700}ms`,
  drift: `${(jitter(i + 31) - 0.5) * 120}px`,
  spin: `${(jitter(i + 41) - 0.5) * 720}deg`,
  color: PALETTE[i % PALETTE.length],
  tall: i % 3 === 0,
}))

/**
 * Confetti in the four brand colours, played once on a successful submit.
 * Decorative and pointer-transparent; the success message carries the actual
 * meaning, because a screen reader cannot see a falling rectangle.
 */
export default function Confetti({ show }) {
  if (!show) return null

  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((piece) => (
        <span
          key={piece.id}
          className="confetti__piece"
          style={{
            left: piece.left,
            background: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            '--drift': piece.drift,
            '--spin': piece.spin,
            height: piece.tall ? '0.9rem' : '0.5rem',
          }}
        />
      ))}
    </div>
  )
}
