import {
  defineKeyframes,
  type KeyframesFactory,
} from "@awesome-reveal/astro/keyframes";

const spinSteps = 30;

export const spin = defineKeyframes(({ turns = 1 }: { turns?: number }) => ({
  keyframe: (t) => ({
    opacity: t,
    transform: `rotate(${(1 - t) * turns * 360}deg)`,
  }),
  steps: spinSteps,
}));

/** The code of `spin` that the playground shows. Keep it equal to `spin`. */
export const spinSource = (typeParameter = "") => [
  `const spin = defineKeyframes${typeParameter}(({ turns = 1 }) => ({`,
  "  keyframe: (t) => ({",
  "    opacity: t,",
  "    transform: `rotate(${(1 - t) * turns * 360}deg)`,",
  "  }),",
  `  steps: ${spinSteps},`,
  "}));",
];

export const spinTwice = spin({ turns: 2 });

export const flyIn = [
  { opacity: 0, transform: "translate(-200px, -100px)", easing: "ease-out" },
  { opacity: 1, transform: "none" },
];

const drop: KeyframesFactory<{ height?: number }> = ({ height = 40 } = {}) => [
  { opacity: 0, transform: `translateY(${-height}px)`, easing: "ease-out" },
  {},
];

export const dropDefault = drop();

export const wipe = [
  { clipPath: "inset(0 100% 0 0)", easing: "ease-out" },
  { clipPath: "inset(0)" },
];
