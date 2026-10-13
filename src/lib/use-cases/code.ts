import type { RevealOptions } from "@awesome-reveal/astro";
import {
  blur,
  fade,
  pop,
  scale,
  slide,
  spring,
  type RevealKeyframe,
} from "@awesome-reveal/astro/keyframes";
import type { Framework, Snippets, Timing } from "./model";

interface Expr<T = unknown> {
  value: T;
  source: string;
  imports: string[];
  /** Module-level code that `source` refers to. */
  declarations?: string[];
}

type Arg = string | number | Expr | undefined;

const exprOf = (arg: Exclude<Arg, undefined>): Expr =>
  typeof arg === "object"
    ? arg
    : { value: arg, source: JSON.stringify(arg), imports: [] };

export const springEasing = (bounce?: number): Expr<string> => ({
  value: spring(bounce === undefined ? {} : { bounce }),
  source: bounce === undefined ? "spring()" : `spring({ bounce: ${bounce} })`,
  imports: ["spring"],
});

const factories = { blur, fade, pop, scale, slide };
const factoryDefaults: Record<string, Record<string, unknown>> = {
  blur: { amount: 8 },
  pop: { from: 0.8 },
  scale: { from: 0.95 },
  slide: { direction: "up", distance: 24 },
};

/** Options that are `undefined` or the default stay out of the code. */
export function keyframes(
  name: keyof typeof factories,
  options: Record<string, Arg> = {},
): Expr<RevealKeyframe[]> {
  const entries = Object.entries(options).flatMap(([key, arg]) =>
    arg === undefined || arg === factoryDefaults[name]?.[key]
      ? []
      : [[key, exprOf(arg)] as const],
  );
  const factory = factories[name] as (options: object) => RevealKeyframe[];
  return {
    value: factory(
      Object.fromEntries(entries.map(([key, { value }]) => [key, value])),
    ),
    source: `${name}(${
      entries.length
        ? `{ ${entries.map(([key, { source }]) => `${key}: ${source}`).join(", ")} }`
        : ""
    })`,
    imports: [name, ...entries.flatMap(([, { imports }]) => imports)],
  };
}

const objectSource = (object: object) =>
  `{ ${Object.entries(object)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(", ")} }`;

/** A keyframes array in a module-level constant. */
export const keyframesArray = (
  name: string,
  frames: RevealKeyframe[],
): Expr<RevealKeyframe[]> => ({
  value: frames,
  source: name,
  imports: [],
  declarations: [
    `const ${name} = [`,
    ...frames.map((frame) => `  ${objectSource(frame)},`),
    "];",
  ],
});

export const libraryTiming: Timing = { duration: 600, delay: 0 };

export interface RevealSpec {
  keyframes: Expr<RevealKeyframe[]>;
  stagger?: number;
  /** Added to the delay of the fine-tune panel. */
  delay?: number;
}

export function revealOf(
  { keyframes, stagger, delay: offset = 0 }: RevealSpec,
  timing: Timing,
) {
  const { duration } = timing;
  const delay = timing.delay + offset;
  const props: [name: string, source: string][] = [
    ["keyframes", keyframes.source],
  ];
  if (stagger) props.push(["stagger", String(stagger)]);
  if (duration !== libraryTiming.duration)
    props.push(["duration", String(duration)]);
  if (delay !== libraryTiming.delay) props.push(["delay", String(delay)]);
  const options: RevealOptions = {
    keyframes: keyframes.value,
    duration,
    delay,
    ...(stagger && { stagger }),
  };
  return {
    options,
    props,
    imports: keyframes.imports,
    declarations: keyframes.declarations ?? [],
  };
}

export type Reveal = ReturnType<typeof revealOf>;

const packages = {
  react: "react",
  vue: "vue",
  astro: "astro",
  javascript: "core",
} as const;

function imports(framework: Framework, reveals: Reveal[]) {
  const pkg = packages[framework];
  const component = framework === "javascript" ? "reveal" : "Reveal";
  const names = [...new Set(reveals.flatMap((reveal) => reveal.imports))];
  return [
    `import { ${component} } from "@awesome-reveal/${pkg}";`,
    ...(names.length
      ? [
          `import { ${names.join(", ")} } from "@awesome-reveal/${pkg}/keyframes";`,
        ]
      : []),
  ];
}

const declarations = (reveals: Reveal[]) => {
  const blocks = [
    ...new Set(reveals.map((reveal) => reveal.declarations.join("\n"))),
  ].filter(Boolean);
  return blocks.flatMap((block) => ["", block]);
};

/** A Vue directive (`v-*`) is always an expression. */
export type Attr = readonly [name: string, value: string, expression?: true];

type MarkupFramework = Exclude<Framework, "javascript"> | "html";

function attribute(framework: MarkupFramework, [name, value, expr]: Attr) {
  const key = framework === "react" && name === "class" ? "className" : name;
  // A Vue expression sits in double quotes, so its strings use single quotes.
  const vueExpr = () => value.replaceAll('"', "'");
  if (framework === "vue" && name.startsWith("v-"))
    return `${key}="${vueExpr()}"`;
  if (!expr) return `${key}="${value}"`;
  if (framework === "vue") return `:${key}="${vueExpr()}"`;
  return `${key}={${value}}`;
}

const maxLine = 80;

export function openTag(
  framework: MarkupFramework,
  name: string,
  attrs: readonly Attr[],
  indent = "",
  children?: string,
): string[] {
  const parts = attrs.map((attr) => attribute(framework, attr));
  const close = children === undefined ? "" : `${children}</${name}>`;
  const line = `${indent}<${name}${parts.map((part) => ` ${part}`).join("")}>`;
  if (line.length <= maxLine) return [line + close];
  return [
    `${indent}<${name}`,
    ...parts.map((part) => `${indent}  ${part}`),
    `${indent}>${close}`,
  ];
}

export const revealAttrs = (reveal: Reveal, attrs: Attr[] = []): Attr[] => [
  ...attrs,
  ...reveal.props.map(([name, source]): Attr => [name, source, true]),
];

export function revealCall(target: string, reveal: Reveal, indent = "") {
  return [
    `${indent}reveal(${target}, {`,
    ...reveal.props.map(([name, source]) => `${indent}  ${name}: ${source},`),
    `${indent}});`,
  ];
}

const lines = (...parts: (string | string[])[]) => parts.flat().join("\n");

/** `filesOf` adds the imports, the props and the wrappers. */
export interface Files {
  reveals: Reveal[];
  props: string[];
  react: (string | string[])[];
  reactImports?: string[];
  vue: (string | string[])[];
  astro: (string | string[])[];
  html: (string | string[])[];
  javascript: (string | string[])[];
  css?: (string | string[])[];
}

export function filesOf(
  component: string,
  {
    reveals,
    props,
    react,
    reactImports,
    vue,
    astro,
    html,
    javascript,
    css,
  }: Files,
): Snippets {
  const list = props.join(", ");
  const constants = declarations(reveals);
  return {
    react: lines(
      imports("react", reveals),
      reactImports ? `import { ${reactImports.join(", ")} } from "react";` : [],
      constants,
      "",
      `export function ${component}(${props.length ? `{ ${list} }` : ""}) {`,
      ...react,
      "}",
    ),
    vue: lines(
      "<script setup>",
      imports("vue", reveals),
      constants,
      props.length
        ? ["", `defineProps([${props.map((prop) => `"${prop}"`).join(", ")}]);`]
        : [],
      "</script>",
      "",
      "<template>",
      ...vue,
      "</template>",
    ),
    astro: lines(
      "---",
      imports("astro", reveals),
      constants,
      props.length ? ["", `const { ${list} } = Astro.props;`] : [],
      "---",
      "",
      ...astro,
    ),
    html: lines(...html),
    javascript: lines(
      imports("javascript", reveals),
      constants,
      "",
      ...javascript,
    ),
    ...(css && { css: lines(...css) }),
  };
}
