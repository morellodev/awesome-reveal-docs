import {
  keyframes,
  openTag,
  revealAttrs,
  revealCall,
  type Attr,
  type Reveal,
} from "./code";
import { heroTitle } from "./hero";
import { defineUseCase } from "./model";

export const heroLead =
  "Reveal animations for React, Vue, Astro and plain JavaScript.";

const gaps = { short: 100, medium: 200, long: 400 };
const parts = ["title", "lead", "actions"] as const;

export const sequence = defineUseCase({
  id: "sequence",
  component: "Hero",
  tweaks: [
    {
      name: "effect",
      label: "Effect",
      options: [
        { value: "slide", label: "slide" },
        { value: "blur", label: "blur" },
        { value: "fade", label: "fade" },
      ],
      default: "slide",
    },
    {
      name: "gap",
      label: "Gap",
      options: [
        { value: "short", label: "Short" },
        { value: "medium", label: "Medium" },
        { value: "long", label: "Long" },
      ],
      default: "medium",
    },
  ],
  hosts: parts.length,
  reveal: (v, index) => ({
    keyframes: keyframes(v.effect),
    delay: index * gaps[v.gap],
    ...(parts[index] === "actions" && { stagger: 80 }),
  }),
  snippets(_, _values, reveals) {
    const [title, lead, actions] = reveals as [Reveal, Reveal, Reveal];
    const tags: Attr[][] = [
      [["as", "h1"]],
      [["as", "p"]],
      [["class", "actions"]],
    ];
    const [titleAttrs, leadAttrs, actionsAttrs] = [title, lead, actions].map(
      (reveal, index) => revealAttrs(reveal, tags[index]),
    ) as [Attr[], Attr[], Attr[]];
    const links = (indent: string) => [
      `${indent}<a href="/start">Get started</a>`,
      `${indent}<a href="/docs">Read the docs</a>`,
    ];
    const markup = (
      framework: "react" | "vue" | "astro",
      indent: string,
      text: (prop: string) => string,
    ) =>
      [
        openTag(framework, "header", [["class", "hero"]], indent),
        openTag(framework, "Reveal", titleAttrs, `${indent}  `, text("title")),
        openTag(framework, "Reveal", leadAttrs, `${indent}  `, text("lead")),
        openTag(framework, "Reveal", actionsAttrs, `${indent}  `),
        links(`${indent}    `),
        `${indent}  </Reveal>`,
        `${indent}</header>`,
      ].flat();

    return {
      props: ["title", "lead"],
      react: [
        "  return (",
        markup("react", "    ", (prop) => `{${prop}}`),
        "  );",
      ],
      vue: markup("vue", "  ", (prop) => `{{ ${prop} }}`),
      astro: markup("astro", "", (prop) => `{${prop}}`),
      html: [
        '<header class="hero">',
        `  <h1>${heroTitle}</h1>`,
        `  <p>${heroLead}</p>`,
        '  <div class="actions">',
        links("    "),
        "  </div>",
        "</header>",
      ],
      javascript: [
        'const [title, lead, actions] = document.querySelectorAll(".hero > *");',
        "",
        revealCall("title", title),
        revealCall("lead", lead),
        revealCall("actions", actions),
      ],
      css: [
        "/* Transforms do not apply to inline elements. */",
        ".actions {",
        "  display: flex;",
        "  gap: 0.5rem;",
        "}",
      ],
    };
  },
});
