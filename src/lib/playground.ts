import {
  enter,
  fade,
  pop,
  scale,
  slide,
  spring,
  type RevealKeyframe,
  type SlideOptions,
} from "@awesome-reveal/astro/keyframes";
import { spin, spinSource } from "../components/demos/keyframes";

export const animations = [
  "fade",
  "slide",
  "scale",
  "blur",
  "pop",
  "enter",
  "spin",
] as const;
export type Animation = (typeof animations)[number];

export const scenes = ["shapes", "list", "text"] as const;
type Scene = (typeof scenes)[number];

export const frameworks = [
  {
    key: "react",
    pkg: "react",
    lang: "jsx",
    label: "React",
    icon: "seti:react",
  },
  { key: "vue", pkg: "vue", lang: "vue", label: "Vue", icon: "seti:vue" },
  { key: "astro", pkg: "astro", lang: "astro", label: "Astro", icon: "astro" },
  {
    key: "javascript",
    pkg: "core",
    lang: "js",
    label: "JavaScript",
    icon: "seti:javascript",
  },
] as const;
export type Framework = (typeof frameworks)[number]["key"];

export const headline = "Reveal anything as it scrolls into view.";

export interface PlaygroundValues {
  scene: Scene;
  animation: Animation;
  direction: NonNullable<SlideOptions["direction"]>;
  distance: number;
  scaleFrom: number;
  blurFrom: number;
  popFrom: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  turns: number;
  blur: number;
  opacity: number;
  easing: "default" | "spring";
  bounce: number;
  duration: number;
  delay: number;
  stagger: number;
}

const libraryDefaults = {
  direction: "up",
  distance: 24,
  scaleFrom: 0.95,
  blurFrom: 8,
  popFrom: 0.8,
  bounce: 0.3,
  duration: 600,
  delay: 0,
  opacity: 0,
} as const satisfies Partial<PlaygroundValues>;

export const defaults: PlaygroundValues = {
  ...libraryDefaults,
  scene: "shapes",
  animation: "slide",
  x: 0,
  y: 40,
  scale: 0.9,
  rotate: 0,
  turns: 1,
  blur: 0,
  easing: "default",
  stagger: 0,
};

/** One-click starting points. A preset resets every control that it does not name. */
export const presets: { name: string; values: Partial<PlaygroundValues> }[] = [
  { name: "Fade up", values: {} },
  {
    name: "Slide in",
    values: { direction: "left", distance: 64, duration: 800 },
  },
  {
    name: "Soft blur",
    values: { animation: "blur", blurFrom: 12, duration: 900 },
  },
  {
    name: "Springy pop",
    values: {
      animation: "pop",
      popFrom: 0.6,
      easing: "spring",
      bounce: 0.5,
      duration: 800,
    },
  },
  { name: "Cascade", values: { scene: "list", stagger: 90 } },
  {
    name: "Roll in",
    values: {
      animation: "enter",
      x: -80,
      y: 0,
      scale: 0.9,
      rotate: -15,
      easing: "spring",
      duration: 900,
    },
  },
  {
    name: "Word by word",
    values: { scene: "text", distance: 16, duration: 700, stagger: 70 },
  },
  {
    name: "Custom spin",
    values: { animation: "spin", turns: 2, duration: 1200 },
  },
];

export interface Field {
  name: keyof PlaygroundValues;
  label: string;
  /** The animations that the field applies to. Without it, the field always shows. */
  animations?: readonly Animation[];
  /** The field shows only for this easing. */
  easing?: PlaygroundValues["easing"];
  /** A field with options is a group of radio buttons. Without them, it is a range. */
  options?: readonly string[];
  optionLabels?: Record<string, string>;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const shapeFields: Field[] = [
  {
    name: "animation",
    label: "Animation",
    options: animations,
    optionLabels: { spin: "custom" },
  },
  {
    name: "turns",
    label: "Turns",
    animations: ["spin"],
    min: 0.25,
    max: 3,
    step: 0.25,
  },
  {
    name: "direction",
    label: "Direction",
    animations: ["slide"],
    options: ["up", "down", "left", "right"],
  },
  {
    name: "distance",
    label: "Distance",
    animations: ["slide"],
    min: 0,
    max: 200,
    step: 4,
    unit: "px",
  },
  {
    name: "scaleFrom",
    label: "Start scale",
    animations: ["scale"],
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    name: "blurFrom",
    label: "Start blur",
    animations: ["blur"],
    min: 0,
    max: 30,
    step: 1,
    unit: "px",
  },
  {
    name: "popFrom",
    label: "Start scale",
    animations: ["pop"],
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    name: "x",
    label: "Horizontal offset",
    animations: ["enter"],
    min: -100,
    max: 100,
    step: 5,
    unit: "px",
  },
  {
    name: "y",
    label: "Vertical offset",
    animations: ["enter"],
    min: -100,
    max: 100,
    step: 5,
    unit: "px",
  },
  {
    name: "scale",
    label: "Start scale",
    animations: ["enter"],
    min: 0,
    max: 2,
    step: 0.05,
  },
  {
    name: "rotate",
    label: "Rotation",
    animations: ["enter"],
    min: -180,
    max: 180,
    step: 15,
    unit: "deg",
  },
  {
    name: "blur",
    label: "Start blur",
    animations: ["enter"],
    min: 0,
    max: 30,
    step: 1,
    unit: "px",
  },
  {
    name: "opacity",
    label: "Start opacity",
    animations: ["slide", "scale", "blur", "pop", "enter"],
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    name: "easing",
    label: "Easing",
    animations: ["fade", "slide", "scale", "blur", "pop", "enter"],
    options: ["default", "spring"],
  },
  {
    name: "bounce",
    label: "Bounce",
    animations: ["fade", "slide", "scale", "blur", "pop", "enter"],
    easing: "spring",
    min: 0,
    max: 0.8,
    step: 0.1,
  },
];

export const timingFields: Field[] = [
  {
    name: "duration",
    label: "Duration",
    min: 100,
    max: 3000,
    step: 50,
    unit: "ms",
  },
  { name: "delay", label: "Delay", min: 0, max: 2000, step: 50, unit: "ms" },
  {
    name: "stagger",
    label: "Stagger",
    min: 0,
    max: 400,
    step: 10,
    unit: "ms",
  },
];

export const sceneField: Field = {
  name: "scene",
  label: "Content",
  options: scenes,
};

export const fields: Field[] = [sceneField, ...shapeFields, ...timingFields];

/** The values of a preset: every control that it does not name has its default. */
export const presetValues = (preset: (typeof presets)[number]) => ({
  ...defaults,
  ...preset.values,
});

/** Whether the controls that apply to the preset show its values. The content scene is always compared. */
export function presetMatches(
  preset: (typeof presets)[number],
  values: PlaygroundValues,
) {
  const target = presetValues(preset);
  return fields.every(
    (field) =>
      !fieldApplies(field, target) || target[field.name] === values[field.name],
  );
}

/** Whether a field applies to the chosen animation and easing. */
export const fieldApplies = (
  field: Pick<Field, "animations" | "easing">,
  values: Pick<PlaygroundValues, "animation" | "easing">,
) =>
  (!field.animations || field.animations.includes(values.animation)) &&
  (!field.easing || field.easing === values.easing);

/** An option of a keyframes factory: its name, its value and its source code. */
type Entry = [key: string, value: unknown, source: string];

const changed = (
  key: string,
  value: number | string,
  neutral: number | string,
) =>
  value === neutral
    ? []
    : [[key, value, JSON.stringify(value)] satisfies Entry];

function factoryEntries(v: PlaygroundValues): Entry[] {
  switch (v.animation) {
    case "fade":
      return [];
    case "spin":
      return changed("turns", v.turns, 1);
    case "slide":
      return [
        ...changed("direction", v.direction, libraryDefaults.direction),
        ...changed("distance", v.distance, libraryDefaults.distance),
      ];
    case "scale":
      return changed("from", v.scaleFrom, libraryDefaults.scaleFrom);
    case "blur":
      return changed("from", v.blurFrom, libraryDefaults.blurFrom);
    case "pop":
      return changed("from", v.popFrom, libraryDefaults.popFrom);
    case "enter":
      return [
        ...changed("x", v.x, 0),
        ...changed("y", v.y, 0),
        ...changed("scale", v.scale, 1),
        ...changed("rotate", v.rotate, 0),
        ...changed("blur", v.blur, 0),
      ];
  }
}

function easingEntry(v: PlaygroundValues): Entry[] {
  if (v.easing !== "spring") return [];
  const isDefault = v.bounce === libraryDefaults.bounce;
  return [
    [
      "easing",
      spring({ bounce: v.bounce }),
      isDefault ? "spring()" : `spring({ bounce: ${v.bounce} })`,
    ],
  ];
}

const factories = { fade, slide, scale, pop, enter, spin } as const;

function entriesOf(v: PlaygroundValues) {
  if (v.animation === "spin") return factoryEntries(v);
  return [
    ...factoryEntries(v),
    ...(v.animation !== "fade"
      ? changed("opacity", v.opacity, libraryDefaults.opacity)
      : []),
    ...easingEntry(v),
  ];
}

function keyframesOf(v: PlaygroundValues): RevealKeyframe[] {
  const options = Object.fromEntries(
    entriesOf(v).map(([key, value]) => [key, value]),
  );
  // The installed blur() reads `amount`, not `from`. enter() takes the same blur on all versions.
  if (v.animation === "blur") {
    return enter({
      blur: v.blurFrom,
      opacity: v.opacity,
      easing: options.easing as string,
    });
  }
  return (factories[v.animation] as (options: object) => RevealKeyframe[])(
    options,
  );
}

/** The options that the preview gives to the reveal. */
export function revealOptionsOf(v: PlaygroundValues) {
  return {
    keyframes: keyframesOf(v),
    duration: v.duration,
    delay: v.delay,
    ...(v.stagger > 0 && { stagger: v.stagger }),
  };
}

function keyframesCall(v: PlaygroundValues) {
  const entries = entriesOf(v);
  const options = entries.map(([key, , source]) => `${key}: ${source}`);
  return `${v.animation}(${options.length ? `{ ${options.join(", ")} }` : ""})`;
}

const maxLine = 80;

/** One option of the reveal, as a framework writes it. */
type Prop = { name: string; value: string };

function reveal(v: PlaygroundValues): Prop[] {
  const entries: Entry[] = [
    ["keyframes", undefined, keyframesCall(v)],
    ...changed("duration", v.duration, libraryDefaults.duration),
    ...changed("delay", v.delay, libraryDefaults.delay),
    ...changed("stagger", v.stagger, 0),
  ];
  return entries.map(([name, , value]) => ({ name, value }));
}

function imports(v: PlaygroundValues, framework: Framework, component: string) {
  const { pkg } = frameworks.find(({ key }) => key === framework)!;
  const names =
    v.animation === "spin"
      ? ["defineKeyframes"]
      : [v.animation, ...(v.easing === "spring" ? ["spring"] : [])];
  return [
    `import { ${component} } from "@awesome-reveal/${pkg}";`,
    `import { ${names.join(", ")} } from "@awesome-reveal/${pkg}/keyframes";`,
    ...(v.animation === "spin"
      ? ["", ...spinSource(framework === "astro" ? "<{ turns?: number }>" : "")]
      : []),
  ];
}

/** A small scene-specific scaffold. The reader adds the content and the styles. */
function element(v: PlaygroundValues, props: string[], indent: string) {
  const attributes = [
    ...(v.scene !== "shapes"
      ? [`as="${v.scene === "list" ? "ul" : "span"}"`]
      : []),
    ...props,
  ];
  const open = `${indent}<Reveal${attributes.map((a) => ` ${a}`).join("")}>`;
  const children =
    v.scene === "list"
      ? ["<li>…</li>", "<li>…</li>", "<li>…</li>"]
      : v.scene === "text"
        ? ["<span>Reveal</span>", "<span>anything</span>", "<span>…</span>"]
        : v.stagger > 0
          ? ["<div>…</div>", "<div>…</div>", "<div>…</div>"]
          : ["…"];
  return [
    ...(open.length <= maxLine
      ? [open]
      : [
          `${indent}<Reveal`,
          ...attributes.map((a) => `${indent}  ${a}`),
          `${indent}>`,
        ]),
    ...children.map((line) => `${indent}  ${line}`),
    `${indent}</Reveal>`,
  ];
}

export function snippets(v: PlaygroundValues): Record<Framework, string> {
  const props = reveal(v);
  const jsx = props.map(({ name, value }) => `${name}={${value}}`);
  const vue = props.map(
    ({ name, value }) => `:${name}="${value.replaceAll('"', "'")}"`,
  );
  return {
    react: [...imports(v, "react", "Reveal"), "", ...element(v, jsx, "")]
      .join("\n")
      .concat(";"),
    vue: [
      "<script setup>",
      ...imports(v, "vue", "Reveal"),
      "</script>",
      "",
      "<template>",
      ...element(v, vue, "  "),
      "</template>",
    ].join("\n"),
    astro: [
      "---",
      ...imports(v, "astro", "Reveal"),
      "---",
      "",
      ...element(v, jsx, ""),
    ].join("\n"),
    javascript: [
      ...imports(v, "javascript", "reveal"),
      "",
      'reveal(document.querySelector("#reveal-demo"), {',
      ...props.map(({ name, value }) => `  ${name}: ${value},`),
      "});",
    ].join("\n"),
  };
}

/** Accept only known controls and values supported by the form. */
export function valuesFromSearch(search: URLSearchParams): PlaygroundValues {
  const values = { ...defaults };
  for (const field of fields) {
    const raw = search.get(field.name);
    if (raw === null || raw.trim() === "") continue;
    if (field.options) {
      if (field.options.includes(raw))
        Object.assign(values, { [field.name]: raw });
    } else {
      const value = Number(raw);
      const steps = (value - field.min!) / field.step!;
      if (
        Number.isFinite(value) &&
        value >= field.min! &&
        value <= field.max! &&
        Math.abs(steps - Math.round(steps)) < 1e-8
      )
        Object.assign(values, { [field.name]: value });
    }
  }
  return values;
}

export function searchFor(
  values: PlaygroundValues,
  framework: Framework,
  existing = new URLSearchParams(),
) {
  const search = new URLSearchParams(existing);
  for (const field of fields) {
    search.delete(field.name);
    if (
      fieldApplies(field, values) &&
      values[field.name] !== defaults[field.name]
    )
      search.set(field.name, String(values[field.name]));
  }
  search.set("framework", framework);
  return search;
}
