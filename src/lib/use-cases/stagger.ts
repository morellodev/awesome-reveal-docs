import {
  keyframes,
  openTag,
  revealAttrs,
  revealCall,
  springEasing,
} from "./code";
import { defineUseCase, springTweak, staggerTweak } from "./model";

export const features = [
  { title: "Fast", text: "Runs on the Web Animations API." },
  { title: "Accessible", text: "Follows reduced motion." },
  { title: "Small", text: "No dependencies to install." },
];

const staggers = { tight: 60, relaxed: 100, slow: 160 };

export const stagger = defineUseCase({
  id: "stagger",
  component: "Features",
  tweaks: [
    {
      name: "effect",
      label: "Effect",
      options: [
        { value: "slide", label: "slide" },
        { value: "pop", label: "pop" },
        { value: "fade", label: "fade" },
      ],
      default: "slide",
    },
    staggerTweak,
    springTweak,
  ],
  reveal: (v) => ({
    keyframes: keyframes(v.effect, {
      easing: v.easing === "spring" ? springEasing() : undefined,
    }),
    stagger: staggers[v.stagger],
  }),
  snippets(reveal) {
    const attrs = revealAttrs(reveal, [["class", "features"]]);
    const cardEnd = (indent: string, title: string, text: string) => [
      `${indent}  <h3>${title}</h3>`,
      `${indent}  <p>${text}</p>`,
      `${indent}</article>`,
    ];

    return {
      props: ["features"],
      react: [
        "  return (",
        openTag("react", "Reveal", attrs, "    "),
        "      {features.map((feature) => (",
        '        <article key={feature.title} className="card">',
        cardEnd("        ", "{feature.title}", "{feature.text}"),
        "      ))}",
        "    </Reveal>",
        "  );",
      ],
      vue: [
        openTag("vue", "Reveal", attrs, "  "),
        openTag(
          "vue",
          "article",
          [
            ["v-for", "feature in features"],
            ["key", "feature.title", true],
            ["class", "card"],
          ],
          "    ",
        ),
        cardEnd("    ", "{{ feature.title }}", "{{ feature.text }}"),
        "  </Reveal>",
      ],
      astro: [
        openTag("astro", "Reveal", attrs),
        "  {features.map((feature) => (",
        '    <article class="card">',
        cardEnd("    ", "{feature.title}", "{feature.text}"),
        "  ))}",
        "</Reveal>",
      ],
      html: [
        '<div class="features">',
        features.flatMap(({ title, text }) => [
          '  <article class="card">',
          ...cardEnd("  ", title, text),
        ]),
        "</div>",
      ],
      javascript: [revealCall('document.querySelector(".features")', reveal)],
    };
  },
});
