import {
  defineKeyframes,
  type KeyframesFactory,
} from "@awesome-reveal/core/keyframes";

// The same keyframes as the samples on the Keyframes page.
const spin = defineKeyframes(({ turns = 1 }: { turns?: number }) => ({
  keyframe: (t, u) => ({
    opacity: t,
    transform: `rotate(${u * turns * 360}deg)`,
  }),
  easing: (t) => 1 - (1 - t) ** 3,
  steps: 30,
}));

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
