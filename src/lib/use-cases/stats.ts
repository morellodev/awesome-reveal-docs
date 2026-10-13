import {
  keyframes,
  openTag,
  revealAttrs,
  revealCall,
  springEasing,
} from "./code";
import { defineUseCase, staggerTweak } from "./model";

export const figures = [
  { label: "Frameworks", value: "4" },
  { label: "Dependencies", value: "0" },
  { label: "Gzipped", value: "2 kB" },
];

const staggers = { tight: 80, relaxed: 150, slow: 250 };
const bounces = {
  pop: undefined,
  spring: springEasing(),
  bouncy: springEasing(0.6),
};

export const stats = defineUseCase({
  id: "stats",
  component: "Stats",
  tweaks: [
    {
      name: "easing",
      label: "Easing",
      options: [
        { value: "pop", label: "Default" },
        { value: "spring", label: "Spring" },
        { value: "bouncy", label: "Bouncy" },
      ],
      default: "spring",
    },
    staggerTweak,
  ],
  reveal: (v) => ({
    keyframes: keyframes("pop", { easing: bounces[v.easing] }),
    stagger: staggers[v.stagger],
  }),
  snippets(reveal) {
    const attrs = revealAttrs(reveal, [
      ["as", "dl"],
      ["class", "stats"],
    ]);
    const statEnd = (indent: string, label: string, value: string) => [
      `${indent}  <dt>${label}</dt>`,
      `${indent}  <dd>${value}</dd>`,
      `${indent}</div>`,
    ];

    return {
      props: ["stats"],
      react: [
        "  return (",
        openTag("react", "Reveal", attrs, "    "),
        "      {stats.map((stat) => (",
        "        <div key={stat.label}>",
        statEnd("        ", "{stat.label}", "{stat.value}"),
        "      ))}",
        "    </Reveal>",
        "  );",
      ],
      vue: [
        openTag("vue", "Reveal", attrs, "  "),
        '    <div v-for="stat in stats" :key="stat.label">',
        statEnd("    ", "{{ stat.label }}", "{{ stat.value }}"),
        "  </Reveal>",
      ],
      astro: [
        openTag("astro", "Reveal", attrs),
        "  {stats.map((stat) => (",
        "    <div>",
        statEnd("    ", "{stat.label}", "{stat.value}"),
        "  ))}",
        "</Reveal>",
      ],
      html: [
        '<dl class="stats">',
        figures.flatMap(({ label, value }) => [
          "  <div>",
          ...statEnd("  ", label, value),
        ]),
        "</dl>",
      ],
      javascript: [revealCall('document.querySelector(".stats")', reveal)],
    };
  },
});
