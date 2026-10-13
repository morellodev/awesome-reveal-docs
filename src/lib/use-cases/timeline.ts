import { keyframes, openTag, revealAttrs, revealCall } from "./code";
import { defineUseCase, staggerTweak } from "./model";

export const releases = [
  { date: "2026-03", month: "March", title: "Public beta" },
  { date: "2026-06", month: "June", title: "Vue and Astro packages" },
  { date: "2026-09", month: "September", title: "Version 1.0" },
  { date: "2026-12", month: "December", title: "Spring easings" },
];

const staggers = { tight: 50, relaxed: 90, slow: 150 };

export const timeline = defineUseCase({
  id: "timeline",
  component: "Timeline",
  tweaks: [
    {
      name: "direction",
      label: "Direction",
      options: [
        { value: "right", label: "right" },
        { value: "left", label: "left" },
        { value: "up", label: "up" },
      ],
      default: "right",
    },
    staggerTweak,
  ],
  reveal: (v) => ({
    keyframes: keyframes("slide", { direction: v.direction }),
    stagger: staggers[v.stagger],
  }),
  snippets(reveal) {
    const attrs = revealAttrs(reveal, [
      ["as", "ol"],
      ["class", "timeline"],
    ]);
    const itemEnd = (
      indent: string,
      datetime: string,
      month: string,
      title: string,
    ) => [
      `${indent}  <time ${datetime}>${month}</time>`,
      `${indent}  <p>${title}</p>`,
      `${indent}</li>`,
    ];

    return {
      props: ["releases"],
      react: [
        "  return (",
        openTag("react", "Reveal", attrs, "    "),
        "      {releases.map((release) => (",
        "        <li key={release.title}>",
        itemEnd(
          "        ",
          "dateTime={release.date}",
          "{release.month}",
          "{release.title}",
        ),
        "      ))}",
        "    </Reveal>",
        "  );",
      ],
      vue: [
        openTag("vue", "Reveal", attrs, "  "),
        '    <li v-for="release in releases" :key="release.title">',
        itemEnd(
          "    ",
          ':datetime="release.date"',
          "{{ release.month }}",
          "{{ release.title }}",
        ),
        "  </Reveal>",
      ],
      astro: [
        openTag("astro", "Reveal", attrs),
        "  {releases.map((release) => (",
        "    <li>",
        itemEnd(
          "    ",
          "datetime={release.date}",
          "{release.month}",
          "{release.title}",
        ),
        "  ))}",
        "</Reveal>",
      ],
      html: [
        '<ol class="timeline">',
        releases.flatMap(({ date, month, title }) => [
          "  <li>",
          ...itemEnd("  ", `datetime="${date}"`, month, title),
        ]),
        "</ol>",
      ],
      javascript: [revealCall('document.querySelector(".timeline")', reveal)],
    };
  },
});
