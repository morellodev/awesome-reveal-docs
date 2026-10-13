import {
  keyframes,
  openTag,
  revealAttrs,
  revealCall,
  springEasing,
  type Attr,
} from "./code";
import { defineUseCase, springTweak } from "./model";

export const stories = [
  { title: "Plan", text: "Pick an effect for each part of the page." },
  { title: "Build", text: "Wrap each part in a Reveal." },
  { title: "Ship", text: "Each part animates when it scrolls into view." },
];

const distances = { short: 24, medium: 64, long: 120 };

export const alternating = defineUseCase({
  id: "alternating",
  component: "Stories",
  tweaks: [
    {
      name: "distance",
      label: "Distance",
      options: [
        { value: "short", label: "Short" },
        { value: "medium", label: "Medium" },
        { value: "long", label: "Long" },
      ],
      default: "medium",
    },
    springTweak,
  ],
  timing: { duration: 800 },
  hosts: stories.length,
  reveal: (v, index) => ({
    keyframes: keyframes("slide", {
      direction: {
        value: index % 2 ? "left" : "right",
        source: 'index % 2 ? "left" : "right"',
        imports: [],
      },
      distance: distances[v.distance],
      easing: v.easing === "spring" ? springEasing() : undefined,
    }),
  }),
  snippets(reveal) {
    const attrs = (key: Attr[]) =>
      revealAttrs(reveal, [...key, ["as", "section"], ["class", "story"]]);
    const storyEnd = (
      tag: string,
      indent: string,
      title: string,
      text: string,
    ) => [
      `${indent}  <h2>${title}</h2>`,
      `${indent}  <p>${text}</p>`,
      `${indent}</${tag}>`,
    ];

    return {
      props: ["stories"],
      react: [
        "  return stories.map((story, index) => (",
        openTag(
          "react",
          "Reveal",
          attrs([["key", "story.title", true]]),
          "    ",
        ),
        storyEnd("Reveal", "    ", "{story.title}", "{story.text}"),
        "  ));",
      ],
      vue: [
        openTag(
          "vue",
          "Reveal",
          attrs([
            ["v-for", "(story, index) in stories"],
            ["key", "story.title", true],
          ]),
          "  ",
        ),
        storyEnd("Reveal", "  ", "{{ story.title }}", "{{ story.text }}"),
      ],
      astro: [
        "{stories.map((story, index) => (",
        openTag("astro", "Reveal", attrs([]), "  "),
        storyEnd("Reveal", "  ", "{story.title}", "{story.text}"),
        "))}",
      ],
      html: stories.flatMap(({ title, text }) => [
        '<section class="story">',
        ...storyEnd("section", "", title, text),
      ]),
      javascript: [
        'document.querySelectorAll(".story").forEach((story, index) => {',
        revealCall("story", reveal, "  "),
        "});",
      ],
    };
  },
});
