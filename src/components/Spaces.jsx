import { Mimi, Oliver, Pip, Tilly } from '../characters/Characters.jsx'
import { spaces } from '../data/school.js'

const OUTLINE = 'var(--cocoa)'
const S = 2.4

/**
 * The four spaces, drawn in the same flat language as the hero scene. There are
 * no verified photographs, so nothing here pretends to be one: these are clearly
 * illustrations, and the section says photographs will replace them.
 */
const SCENES = {
  classroom: (
    <>
      <rect x={0} y={0} width={200} height={140} fill="var(--sky)" opacity={0.45} />
      {/* board */}
      <rect x={118} y={22} width={64} height={40} rx={5} fill="var(--sage)" stroke={OUTLINE} strokeWidth={S} />
      <path d="M128 36h24M128 45h40" stroke={OUTLINE} strokeWidth={2} strokeLinecap="round" />
      {/* shelf */}
      <rect x={16} y={40} width={44} height={54} rx={5} fill="var(--butter)" stroke={OUTLINE} strokeWidth={S} />
      <path d="M16 58h44M16 76h44" stroke={OUTLINE} strokeWidth={2} />
      {/* low table */}
      <rect x={56} y={94} width={104} height={10} rx={4} fill="var(--peach)" stroke={OUTLINE} strokeWidth={S} />
      <rect x={64} y={104} width={7} height={22} fill={OUTLINE} />
      <rect x={145} y={104} width={7} height={22} fill={OUTLINE} />
      <Mimi x={74} y={40} width={44} height={53} />
      <Pip x={124} y={48} width={38} height={46} />
      <rect x={0} y={126} width={200} height={14} fill="var(--cream)" opacity={0.7} />
    </>
  ),
  reading: (
    <>
      <rect x={0} y={0} width={200} height={140} fill="var(--lavender)" opacity={0.5} />
      {/* rug */}
      <ellipse cx={100} cy={122} rx={82} ry={16} fill="var(--coral)" opacity={0.5} />
      {/* shelf with books */}
      <rect x={26} y={30} width={40} height={78} rx={5} fill="var(--butter)" stroke={OUTLINE} strokeWidth={S} />
      <path d="M26 56h40M26 82h40" stroke={OUTLINE} strokeWidth={2} />
      <g stroke={OUTLINE} strokeWidth={1.6}>
        <rect x={32} y={38} width={7} height={16} fill="var(--coral)" />
        <rect x={42} y={36} width={7} height={18} fill="var(--sage)" />
        <rect x={52} y={40} width={7} height={14} fill="var(--sky)" />
        <rect x={32} y={64} width={7} height={16} fill="var(--sky)" />
        <rect x={42} y={62} width={7} height={18} fill="var(--butter)" />
      </g>
      {/* cushions + Tilly on the rug */}
      <ellipse cx={132} cy={116} rx={26} ry={10} fill="var(--sage)" stroke={OUTLINE} strokeWidth={S} />
      <Tilly x={112} y={52} width={46} height={55} />
      {/* open book */}
      <path d="M150 112c8-6 16-6 24 0v10c-8-5-16-5-24 0z" fill="var(--cream)" stroke={OUTLINE} strokeWidth={2} />
    </>
  ),
  art: (
    <>
      <rect x={0} y={0} width={200} height={140} fill="var(--butter)" opacity={0.5} />
      {/* easel */}
      <g stroke={OUTLINE} strokeWidth={S} fill="none" strokeLinecap="round">
        <path d="M62 132 L84 44 L106 132" />
        <path d="M70 100h32" />
      </g>
      <rect x={68} y={52} width={36} height={44} rx={3} fill="var(--cream)" stroke={OUTLINE} strokeWidth={S} />
      <circle cx={86} cy={72} r={10} fill="var(--coral)" />
      <path d="M74 88q12-16 24 0" fill="none" stroke="var(--sage)" strokeWidth={4} />
      {/* paint pots */}
      <g stroke={OUTLINE} strokeWidth={2}>
        <rect x={124} y={104} width={16} height={16} rx={3} fill="var(--sky)" />
        <rect x={146} y={108} width={14} height={12} rx={3} fill="var(--coral)" />
        <rect x={166} y={106} width={14} height={14} rx={3} fill="var(--sage)" />
      </g>
      <Oliver x={126} y={54} width={44} height={53} />
      <ellipse cx={100} cy={134} rx={90} ry={8} fill="var(--cream)" opacity={0.6} />
    </>
  ),
  outdoor: (
    <>
      <rect x={0} y={0} width={200} height={140} fill="var(--sky)" opacity={0.4} />
      <rect x={0} y={96} width={200} height={44} fill="var(--sage)" />
      {/* sandbox */}
      <rect x={18} y={104} width={70} height={28} rx={5} fill="var(--butter)" stroke={OUTLINE} strokeWidth={S} />
      <path d="M24 118h58" stroke={OUTLINE} strokeWidth={2} strokeLinecap="round" />
      {/* climbing frame */}
      <g stroke={OUTLINE} strokeWidth={S} fill="none" strokeLinecap="round">
        <path d="M118 132V62M170 132V62M118 62h52M118 84h52M118 106h52" />
      </g>
      <rect x={104} y={46} width={80} height={8} rx={4} fill="var(--coral)" stroke={OUTLINE} strokeWidth={S} />
      {/* sun + ball */}
      <circle cx={176} cy={24} r={13} fill="var(--butter)" />
      <circle cx={44} cy={86} r={9} fill="var(--coral)" stroke={OUTLINE} strokeWidth={2} />
      <Pip x={92} y={70} width={34} height={41} />
    </>
  ),
}

export default function Spaces() {
  return (
    <section className="section band--tint spaces" id="spaces" aria-labelledby="spaces-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {spaces.eyebrow}
          </p>
          <h2 id="spaces-title" className="section__title">
            {spaces.title}
          </h2>
          <p className="lede">{spaces.intro}</p>
        </header>

        <ul className="spaces__grid">
          {spaces.items.map((item) => (
            <li className="space reveal" key={item.key}>
              <div className={`space__art space__art--${item.tone}`} aria-hidden="true">
                <svg viewBox="0 0 200 140" focusable="false">
                  {SCENES[item.key]}
                </svg>
              </div>
              <div className="space__body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="spaces__note">
          Illustrated, not photographed — the rooms may differ. Ask to see them on a
          visit.
        </p>
      </div>
    </section>
  )
}
