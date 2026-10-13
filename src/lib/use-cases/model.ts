import type { RevealOptions } from "@awesome-reveal/astro";
import {
  filesOf,
  revealOf,
  type Files,
  type Reveal,
  type RevealSpec,
} from "./code";

export const frameworks = [
  { key: "react", label: "React", icon: "seti:react" },
  { key: "vue", label: "Vue", icon: "seti:vue" },
  { key: "astro", label: "Astro", icon: "astro" },
  { key: "javascript", label: "JavaScript", icon: "seti:javascript" },
] as const;
export type Framework = (typeof frameworks)[number]["key"];

interface ChoiceTweak<Value extends string = string> {
  name: string;
  label: string;
  options: readonly { value: Value; label: string }[];
  default: Value;
}

type ValuesOf<T extends readonly ChoiceTweak[]> = {
  [K in T[number] as K["name"]]: K extends ChoiceTweak<infer Value>
    ? Value
    : never;
};
type Values = Record<string, string | number>;

export interface Timing {
  duration: number;
  delay: number;
}

export interface Snippets {
  react: string;
  vue: string;
  astro: string;
  html: string;
  javascript: string;
  css?: string;
}

export interface PreviewProps {
  /** One entry for each `Reveal` in the preview, in document order. */
  options: RevealOptions[];
}

interface Definition<
  T extends readonly ChoiceTweak[],
  V = ValuesOf<T> & Timing,
> {
  id: string;
  component: string;
  tweaks: T;
  /** Overrides of the library timing for the defaults of the fine-tune panel. */
  timing?: Partial<Timing>;
  /** The number of `Reveal` elements in the preview. */
  hosts?: number;
  /** The code shows the reveal of the first host. */
  reveal(values: V, index: number): RevealSpec;
  snippets(reveal: Reveal, values: V): Omit<Files, "reveal">;
}

interface UseCase {
  id: string;
  component: string;
  tweaks: readonly ChoiceTweak[];
  timing?: Partial<Timing>;
  preview(values: Values): RevealOptions[];
  snippets(values: Values): Snippets;
}

/** Infers the value types of the tweaks, then erases them for the lists that hold all use cases. */
export function defineUseCase<const T extends readonly ChoiceTweak[]>(
  definition: Definition<T>,
): UseCase {
  const {
    hosts = 1,
    reveal,
    snippets,
    ...rest
  } = definition as unknown as Definition<
    readonly ChoiceTweak[],
    Values & Timing
  >;
  const revealAt = (values: Values, index: number) => {
    const v = values as Values & Timing;
    return revealOf(reveal(v, index), v);
  };
  return {
    ...rest,
    preview: (values) =>
      Array.from(
        { length: hosts },
        (_, index) => revealAt(values, index).options,
      ),
    snippets(values) {
      const first = revealAt(values, 0);
      return filesOf(rest.component, {
        ...snippets(first, values as Values & Timing),
        reveal: first,
      });
    },
  };
}

export const staggerTweak = {
  name: "stagger",
  label: "Stagger",
  options: [
    { value: "tight", label: "Tight" },
    { value: "relaxed", label: "Relaxed" },
    { value: "slow", label: "Slow" },
  ],
  default: "relaxed",
} as const;

export const springTweak = {
  name: "easing",
  label: "Easing",
  options: [
    { value: "smooth", label: "Smooth" },
    { value: "spring", label: "Spring" },
  ],
  default: "smooth",
} as const;
