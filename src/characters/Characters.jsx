// The Little Wonder character system.
//
// All five friends are built from one skeleton: same viewBox, same head/body
// ratio, same face placement, same soft shadow. Species differences live only in
// ears, muzzle, and accessory — so proportions stay identical everywhere and the
// set reads as one school, not five clipart files.
//
// Palette is fixed by colour_pallete.md. Illustration shading uses alpha tints
// of palette hues only — no new colours, no emoji.

const OUTLINE = 'var(--cocoa)';
const STROKE = 2.5;

/** Shared skeleton constants. Head/body ratio is fixed across every character. */
const HEAD = { cx: 100, cy: 84, r: 44 };
const BODY = { cx: 100, cy: 172, rx: 46, ry: 50 };

const Shadow = () => (
  <ellipse cx={BODY.cx} cy={228} rx={58} ry={9} fill="var(--cocoa)" opacity="0.14" />
);

/** The school bag peeks out either side of the body; straps cross the chest. */
const Bag = ({ fill }) => (
  <>
    <rect x={50} y={130} width={100} height={72} rx={22} fill={fill} stroke={OUTLINE} strokeWidth={STROKE} />
  </>
);

const Straps = ({ fill }) => (
  <g fill={fill} stroke={OUTLINE} strokeWidth={STROKE}>
    <rect x={72} y={124} width={12} height={70} rx={6} />
    <rect x={116} y={124} width={12} height={70} rx={6} />
  </g>
);

const Body = ({ fill }) => (
  <ellipse cx={BODY.cx} cy={BODY.cy} rx={BODY.rx} ry={BODY.ry} fill={fill} stroke={OUTLINE} strokeWidth={STROKE} />
);

const Belly = ({ fill, cx = BODY.cx, cy = 184, rx = 30, ry = 32 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
);

const Arms = ({ fill }) => (
  <g fill={fill} stroke={OUTLINE} strokeWidth={STROKE}>
    <ellipse cx={BODY.cx - BODY.rx - 2} cy={162} rx={10} ry={21} />
    <ellipse cx={BODY.cx + BODY.rx + 2} cy={162} rx={10} ry={21} />
  </g>
);

const Feet = ({ fill }) => (
  <g fill={fill} stroke={OUTLINE} strokeWidth={STROKE}>
    <ellipse cx={80} cy={218} rx={15} ry={9} />
    <ellipse cx={120} cy={218} rx={15} ry={9} />
  </g>
);

const Head = ({ fill }) => (
  <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={fill} stroke={OUTLINE} strokeWidth={STROKE} />
);

/**
 * The eyes, shared by all five friends so the blink is authored once. The CSS
 * squashes this group around the skeleton's face line (y = 78) — the same
 * origin for every character, so species differences never leak into the rig.
 * Tilly passes her own size because spectacles shrink the eye to fit.
 */
const Eyes = ({ r = 5.5, glint = 1.9, glintOffset = 1.5 }) => (
  <g className="char-eyes">
    <circle cx={84} cy={78} r={r} fill={OUTLINE} />
    <circle cx={116} cy={78} r={r} fill={OUTLINE} />
    <circle cx={84 - glintOffset} cy={78 - glintOffset} r={glint} fill="var(--cream)" />
    <circle cx={116 - glintOffset} cy={78 - glintOffset} r={glint} fill="var(--cream)" />
  </g>
);

const Face = ({ cheekOpacity = 0.5 }) => (
  <>
    <Eyes />
    <g fill="var(--coral)" opacity={cheekOpacity}>
      <circle cx={70} cy={94} r={7} />
      <circle cx={130} cy={94} r={7} />
    </g>
    <path
      d="M92 94 Q100 102 108 94"
      fill="none"
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </>
);

/* ---------- Benny the Bear — the school's main mascot ---------- */

export function Benny(props) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="Benny the Bear" data-friend="benny" {...props}>
      <Shadow />
      <Bag fill="var(--butter)" />
      <Body fill="var(--brown)" />
      <Straps fill="var(--butter)" />
      <Arms fill="var(--brown)" />
      <Belly fill="var(--cream)" />
      <Feet fill="var(--brown)" />
      {/* ears sit behind the head */}
      <g fill="var(--brown)" stroke={OUTLINE} strokeWidth={STROKE}>
        <circle cx={64} cy={48} r={17} />
        <circle cx={136} cy={48} r={17} />
      </g>
      <g fill="var(--cream)">
        <circle cx={64} cy={48} r={8} />
        <circle cx={136} cy={48} r={8} />
      </g>
      <Head fill="var(--brown)" />
      {/* muzzle */}
      <ellipse cx={100} cy={100} rx={22} ry={16} fill="var(--cream)" />
      <Face cheekOpacity={0.35} />
      <ellipse cx={100} cy={97} rx={4} ry={3} fill={OUTLINE} />
    </svg>
  );
}

/* ---------- Mimi the Bunny — paints, crafts, colours ---------- */

export function Mimi(props) {
  const ear = (x, tilt) => (
    <g transform={`rotate(${tilt} ${x} 40)`}>
      <ellipse cx={x} cy={40} rx={13} ry={34} fill="var(--cream)" stroke={OUTLINE} strokeWidth={STROKE} />
      <ellipse cx={x} cy={44} rx={6} ry={22} fill="var(--coral)" opacity={0.6} />
    </g>
  );
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="Mimi the Bunny" data-friend="mimi" {...props}>
      <Shadow />
      <Bag fill="var(--coral)" />
      <Body fill="var(--cream)" />
      <Straps fill="var(--coral)" />
      <Arms fill="var(--cream)" />
      <Belly fill="var(--cream)" cy={186} />
      <Feet fill="var(--cream)" />
      {ear(76, -10)}
      {ear(124, 10)}
      <Head fill="var(--cream)" />
      {/* bow */}
      <g fill="var(--coral)" stroke={OUTLINE} strokeWidth={STROKE}>
        <path d="M118 46 L134 36 L134 56 Z" />
        <path d="M118 46 L102 36 L102 56 Z" />
        <circle cx={118} cy={46} r={4} />
      </g>
      <Face />
    </svg>
  );
}

/* ---------- Oliver the Fox — playful, clever, discovering ---------- */

export function Oliver(props) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="Oliver the Fox" data-friend="oliver" {...props}>
      <Shadow />
      <Bag fill="var(--sage)" />
      <Body fill="var(--coral)" />
      <Straps fill="var(--sage)" />
      <Arms fill="var(--coral)" />
      <Belly fill="var(--cream)" cy={186} />
      <Feet fill="var(--coral)" />
      {/* pointed ears */}
      <g fill="var(--coral)" stroke={OUTLINE} strokeWidth={STROKE}>
        <path d="M62 56 L52 20 L86 40 Z" />
        <path d="M138 56 L148 20 L114 40 Z" />
      </g>
      <g fill="var(--cocoa)">
        <path d="M62 50 L58 30 L76 40 Z" />
        <path d="M138 50 L142 30 L124 40 Z" />
      </g>
      <Head fill="var(--coral)" />
      {/* muzzle mask */}
      <path d="M100 66 C124 66 134 92 126 106 C118 118 82 118 74 106 C66 92 76 66 100 66 Z" fill="var(--cream)" />
      <Face />
      <path d="M96 96 L104 96 L100 102 Z" fill={OUTLINE} />
    </svg>
  );
}

/* ---------- Pip the Penguin — music, dancing, friends ---------- */

export function Pip(props) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="Pip the Penguin" data-friend="pip" {...props}>
      <Shadow />
      <Bag fill="var(--sky)" />
      <Body fill="var(--cocoa)" />
      <Straps fill="var(--sky)" />
      {/* flippers instead of arms */}
      <g fill="var(--cocoa)" stroke={OUTLINE} strokeWidth={STROKE}>
        <ellipse cx={BODY.cx - BODY.rx - 4} cy={164} rx={9} ry={22} transform="rotate(-22 44 164)" />
        <ellipse cx={BODY.cx + BODY.rx + 4} cy={164} rx={9} ry={22} transform="rotate(22 156 164)" />
      </g>
      <Belly fill="var(--cream)" cx={BODY.cx} cy={180} rx={34} ry={38} />
      <Feet fill="var(--coral)" />
      <Head fill="var(--cocoa)" />
      {/* face patch */}
      <ellipse cx={100} cy={96} rx={27} ry={21} fill="var(--cream)" />
      <Face cheekOpacity={0.7} />
      {/* beak */}
      <path d="M92 90 L108 90 L100 100 Z" fill="var(--coral)" stroke={OUTLINE} strokeWidth={STROKE} />
    </svg>
  );
}

/* ---------- Tilly the Turtle — books, nature, storytelling ---------- */

export function Tilly(props) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="Tilly the Turtle" data-friend="tilly" {...props}>
      <Shadow />
      {/* shell sits behind everything and reads as her silhouette */}
      <ellipse cx={BODY.cx} cy={168} rx={62} ry={58} fill="var(--sage)" stroke={OUTLINE} strokeWidth={STROKE} />
      <g fill="var(--butter)" opacity={0.9}>
        <circle cx={74} cy={158} r={9} />
        <circle cx={100} cy={146} r={9} />
        <circle cx={126} cy={158} r={9} />
        <circle cx={87} cy={186} r={9} />
        <circle cx={113} cy={186} r={9} />
      </g>
      <Bag fill="var(--lavender)" />
      {/* stubby legs */}
      <g fill="var(--sage)" stroke={OUTLINE} strokeWidth={STROKE}>
        <ellipse cx={70} cy={214} rx={13} ry={9} />
        <ellipse cx={130} cy={214} rx={13} ry={9} />
      </g>
      <Head fill="var(--sage)" />
      {/* yellow spectacles */}
      <g fill="none" stroke="var(--butter)" strokeWidth={5}>
        <circle cx={84} cy={78} r={12} />
        <circle cx={116} cy={78} r={12} />
        <path d="M96 78 L104 78" />
      </g>
      <Eyes r={4.5} glint={1.6} glintOffset={1.3} />
      <g fill="var(--coral)" opacity={0.55}>
        <circle cx={66} cy={98} r={6.5} />
        <circle cx={134} cy={98} r={6.5} />
      </g>
      <path d="M92 98 Q100 106 108 98" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}
