// Minimal damped-spring integrator. Used for the owl's continuous, input-driven
// motion (pupils, head tilt, wings), where a fixed CSS curve is wrong: the
// target changes every pointer move and overshoot should feel mass-driven.
//
// Writes are transform-only in the caller, so a frame here never triggers
// layout. Sub-stepping keeps the integration stable when a frame runs long
// (backgrounded tab, slow device) instead of exploding.

export const SPRINGS = {
  // stiffness, damping, mass — tuned by feel, documented in colour_pallete.md
  soft: { stiffness: 170, damping: 26, mass: 1 },
  snappy: { stiffness: 420, damping: 30, mass: 0.7 },
  dock: { stiffness: 210, damping: 28, mass: 1 },
};

export function createSpring(value = 0, preset = SPRINGS.soft) {
  return { value, velocity: 0, target: value, ...preset };
}

const MAX_FRAME = 1 / 30; // clamp dt so a stalled tab can't inject a huge step
const REST_EPSILON = 0.0005;

/** Advance one spring by `dt` seconds. Returns true while it is still moving. */
export function stepSpring(spring, dt) {
  const remaining = spring.target - spring.value;
  if (
    Math.abs(spring.velocity) < REST_EPSILON &&
    Math.abs(remaining) < REST_EPSILON
  ) {
    spring.value = spring.target;
    spring.velocity = 0;
    return false;
  }

  const subSteps = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / subSteps;

  for (let i = 0; i < subSteps; i += 1) {
    const accel =
      (-spring.stiffness * (spring.value - spring.target) -
        spring.damping * spring.velocity) /
      spring.mass;
    spring.velocity += accel * h;
    spring.value += spring.velocity * h;
  }

  return true;
}

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
export { MAX_FRAME };
