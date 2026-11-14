import { Benny, Mimi, Oliver, Pip } from '../characters/Characters.jsx';

const OUTLINE = 'var(--cocoa)';
const S = 2.5;

/**
 * The hero illustration: the friends walking to school.
 *
 * Hand-built SVG so the characters come from the same system as every other
 * illustration on the site, and so parts can animate (clouds drift, trees sway,
 * wings flutter, the bus rolls in). All motion is transform-only and gated on
 * reduced motion in page.css.
 *
 * Decorative: the headline and copy carry the meaning, so the whole scene is
 * aria-hidden.
 */
export default function HeroScene(props) {
  return (
    <div className="scene">
      <svg className="scene__svg" viewBox="0 0 560 400" aria-hidden="true" focusable="false" {...props}>
        {/* sun */}
        <circle cx={486} cy={62} r={34} fill="var(--butter)" />
        <circle cx={486} cy={62} r={22} fill="var(--cream)" opacity={0.85} />

        {/* clouds */}
        <g className="scene__cloud" fill="var(--cream)" opacity={0.95}>
          <ellipse cx={96} cy={70} rx={34} ry={15} />
          <ellipse cx={122} cy={62} rx={24} ry={13} />
          <ellipse cx={72} cy={62} rx={20} ry={11} />
        </g>
        <g className="scene__cloud scene__cloud--slow" fill="var(--cream)" opacity={0.8}>
          <ellipse cx={300} cy={52} rx={28} ry={12} />
          <ellipse cx={322} cy={46} rx={18} ry={10} />
        </g>

        {/* birds */}
        <g fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round">
          <path d="M150 108 q9 -9 18 0" />
          <path d="M196 92 q8 -8 16 0" />
        </g>

        {/* ground */}
        <rect x={0} y={298} width={560} height={102} fill="var(--sage)" />
        <ellipse cx={280} cy={300} rx={300} ry={12} fill="var(--sage)" />

        {/* winding path from the door */}
        <path
          d="M256 300 C240 330 230 356 226 400 L356 400 C348 352 340 324 330 300 Z"
          fill="var(--peach)"
          stroke={OUTLINE}
          strokeWidth={S}
        />

        {/* trees */}
        <g className="scene__tree">
          <rect x={88} y={266} width={15} height={46} rx={6} fill="var(--brown)" />
          <g fill="var(--sage)">
            <circle cx={95} cy={240} r={33} />
            <circle cx={68} cy={262} r={21} />
            <circle cx={122} cy={262} r={21} />
          </g>
          <circle cx={82} cy={248} r={9} fill="var(--coral)" />
          <circle cx={112} cy={252} r={8} fill="var(--butter)" />
          <circle cx={97} cy={228} r={8} fill="var(--coral)" />
        </g>

        <g className="scene__tree scene__tree--b">
          <rect x={486} y={276} width={13} height={36} rx={6} fill="var(--brown)" />
          <g fill="var(--sage)">
            <circle cx={492} cy={254} r={26} />
            <circle cx={472} cy={270} r={16} />
            <circle cx={512} cy={270} r={16} />
          </g>
        </g>

        {/* bushes */}
        <g fill="var(--sage)">
          <ellipse cx={30} cy={302} rx={26} ry={14} />
          <ellipse cx={540} cy={304} rx={30} ry={15} />
        </g>

        {/* flowers along the path */}
        <g stroke={OUTLINE} strokeWidth={2} strokeLinecap="round">
          <line x1={160} y1={340} x2={160} y2={326} />
          <line x1={420} y1={348} x2={420} y2={334} />
          <line x1={470} y1={372} x2={470} y2={358} />
          <line x1={110} y1={376} x2={110} y2={362} />
        </g>
        <g>
          <circle cx={160} cy={322} r={6} fill="var(--coral)" />
          <circle cx={420} cy={330} r={6} fill="var(--butter)" />
          <circle cx={470} cy={354} r={6} fill="var(--lavender)" />
          <circle cx={110} cy={358} r={6} fill="var(--coral)" />
        </g>

        {/* background layer: smaller, lighter trees behind the school */}
        <g opacity="0.85">
          <rect x={146} y={252} width={9} height={48} rx={4} fill="var(--brown)" />
          <circle cx={150} cy={232} r={22} fill="var(--sage)" />
          <circle cx={130} cy={248} r={13} fill="var(--sage)" />
          <rect x={424} y={248} width={9} height={52} rx={4} fill="var(--brown)" />
          <circle cx={428} cy={228} r={20} fill="var(--sage)" />
        </g>

        {/* school building */}
        <g>
          <rect x={172} y={182} width={216} height={118} rx={10} fill="var(--peach)" stroke={OUTLINE} strokeWidth={S} />
          {/* roof */}
          <path d="M152 190 L280 118 L408 190 Z" fill="var(--coral)" stroke={OUTLINE} strokeWidth={S} />
          {/* chimney + smoke puff */}
          <rect x={352} y={128} width={16} height={34} rx={5} fill="var(--cream)" stroke={OUTLINE} strokeWidth={S} />
          {/* door */}
          <rect x={258} y={228} width={44} height={72} rx={9} fill="var(--cocoa)" />
          <circle cx={292} cy={266} r={3.5} fill="var(--butter)" />
          {/* sign */}
          <rect x={236} y={196} width={88} height={22} rx={7} fill="var(--cream)" stroke={OUTLINE} strokeWidth={S} />
          <text
            x={280}
            y={211}
            textAnchor="middle"
            fontFamily="var(--font-ui)"
            fontWeight="700"
            fontSize="11"
            letterSpacing="1"
            fill={OUTLINE}
          >
            GYANHOUZ
          </text>
          {/* windows */}
          <g fill="var(--sky)" stroke={OUTLINE} strokeWidth={S}>
            <rect x={186} y={212} width={34} height={34} rx={7} />
            <rect x={340} y={212} width={34} height={34} rx={7} />
            <rect x={186} y={258} width={34} height={34} rx={7} />
            <rect x={340} y={258} width={34} height={34} rx={7} />
          </g>
          {/* teacher waving at the door */}
          <g>
            <circle cx={228} cy={222} r={11} fill="var(--cream)" stroke={OUTLINE} strokeWidth={S} />
            <path d="M222 234 L210 244 L214 252 L228 240 Z" fill="var(--cream)" stroke={OUTLINE} strokeWidth={S} />
            <path d="M232 232 L246 222 L250 230 L236 240 Z" fill="var(--cream)" stroke={OUTLINE} strokeWidth={S} />
            <path d="M222 236 C214 258 216 276 224 288 L250 288 C256 272 254 250 240 234 Z" fill="var(--coral)" stroke={OUTLINE} strokeWidth={S} />
          </g>
        </g>

        {/* school bus */}
        <g className="scene__bus">
          <rect x={16} y={252} width={116} height={54} rx={13} fill="var(--butter)" stroke={OUTLINE} strokeWidth={S} />
          <g fill="var(--sky)" stroke={OUTLINE} strokeWidth={S}>
            <rect x={28} y={262} width={22} height={20} rx={5} />
            <rect x={56} y={262} width={22} height={20} rx={5} />
            <rect x={84} y={262} width={22} height={20} rx={5} />
          </g>
          <g fill={OUTLINE}>
            <circle cx={44} cy={306} r={11} />
            <circle cx={104} cy={306} r={11} />
          </g>
          <g fill="var(--cream)">
            <circle cx={44} cy={306} r={4.5} />
            <circle cx={104} cy={306} r={4.5} />
          </g>
        </g>

        {/* the friends, walking to school */}
        <Benny className="scene__walker" x={188} y={312} width={62} height={74} />
        <Mimi className="scene__walker" x={252} y={306} width={58} height={70} />
        <Oliver className="scene__walker" x={318} y={300} width={60} height={72} />
        <Pip className="scene__walker" x={382} y={304} width={54} height={65} />

        {/* butterflies */}
        <g className="scene__butterfly">
          <g transform="translate(64 336)">
            <g className="scene__butterfly-wing" fill="var(--coral)">
              <ellipse cx={-6} cy={-2} rx={7} ry={5} />
              <ellipse cx={6} cy={-2} rx={7} ry={5} />
            </g>
            <ellipse cx={0} cy={0} rx={2} ry={5} fill={OUTLINE} />
          </g>
        </g>
        <g className="scene__butterfly" style={{ animationDelay: '-6s' }}>
          <g transform="translate(452 250)">
            <g className="scene__butterfly-wing" fill="var(--lavender)">
              <ellipse cx={-6} cy={-2} rx={6} ry={4.5} />
              <ellipse cx={6} cy={-2} rx={6} ry={4.5} />
            </g>
            <ellipse cx={0} cy={0} rx={1.8} ry={4.5} fill={OUTLINE} />
          </g>
        </g>
        {/* foreground plane: a darker strip drawn after the friends, so they
            stand *behind* something. That occlusion is what reads as depth. */}
        <g>
          <rect x={0} y={372} width={560} height={28} fill="var(--sage)" />
          <rect x={0} y={372} width={560} height={28} fill="var(--cocoa)" opacity={0.12} />
          <g stroke="var(--cocoa)" strokeWidth={2.4} strokeLinecap="round">
            <line x1={40} y1={392} x2={40} y2={370} />
            <line x1={96} y1={392} x2={96} y2={374} />
            <line x1={506} y1={392} x2={506} y2={372} />
          </g>
          <circle cx={40} cy={366} r={8} fill="var(--coral)" />
          <circle cx={96} cy={370} r={6.5} fill="var(--butter)" />
          <circle cx={506} cy={368} r={7.5} fill="var(--lavender)" />
          {/* a ball left on the grass */}
          <circle cx={452} cy={384} r={11} fill="var(--coral)" stroke={OUTLINE} strokeWidth={2.4} />
          <path d="M442 379 q10 6 20 0" fill="none" stroke={OUTLINE} strokeWidth={2.4} />
        </g>
      </svg>
    </div>
  );
}
