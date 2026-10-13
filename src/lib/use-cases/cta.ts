import {
  keyframes,
  openTag,
  revealAttrs,
  revealCall,
  springEasing,
} from "./code";
import { defineUseCase } from "./model";

export const cta = defineUseCase({
  id: "cta",
  component: "CallToAction",
  tweaks: [
    {
      name: "effect",
      label: "Effect",
      options: [
        { value: "scale", label: "scale" },
        { value: "pop", label: "pop" },
      ],
      default: "scale",
    },
    {
      name: "easing",
      label: "Easing",
      options: [
        { value: "preset", label: "Preset" },
        { value: "spring", label: "Spring" },
      ],
      default: "spring",
    },
  ],
  timing: { delay: 200 },
  reveal: (v) => ({
    keyframes: keyframes(v.effect, {
      from: v.effect === "scale" ? 0.9 : undefined,
      easing: v.easing === "spring" ? springEasing() : undefined,
    }),
  }),
  snippets(reveal) {
    const attrs = revealAttrs(reveal, [
      ["as", "section"],
      ["class", "cta"],
    ]);
    const body = (indent: string) => [
      `${indent}<h2>Ready to start?</h2>`,
      `${indent}<p>Install the package for your framework.</p>`,
      `${indent}<a href="/getting-started/">Get started</a>`,
    ];

    return {
      props: [],
      react: [
        "  return (",
        openTag("react", "Reveal", attrs, "    "),
        body("      "),
        "    </Reveal>",
        "  );",
      ],
      vue: [openTag("vue", "Reveal", attrs, "  "), body("    "), "  </Reveal>"],
      astro: [openTag("astro", "Reveal", attrs), body("  "), "</Reveal>"],
      html: ['<section class="cta">', body("  "), "</section>"],
      javascript: [revealCall('document.querySelector(".cta")', reveal)],
    };
  },
});
