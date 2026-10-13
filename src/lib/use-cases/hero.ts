import { keyframes, openTag, revealAttrs, revealCall } from "./code";
import { defineUseCase, staggerTweak } from "./model";

export const heroTitle = "Build pages that feel alive";

const staggers = {
  words: { tight: 40, relaxed: 80, slow: 150 },
  letters: { tight: 15, relaxed: 30, slow: 60 },
};

const visuallyHidden = [
  ".visually-hidden {",
  "  position: absolute;",
  "  width: 1px;",
  "  height: 1px;",
  "  overflow: hidden;",
  "  clip-path: inset(50%);",
  "  white-space: nowrap;",
  "}",
];

export const hero = defineUseCase({
  id: "hero",
  component: "Hero",
  tweaks: [
    {
      name: "split",
      label: "Split",
      options: [
        { value: "words", label: "Words" },
        { value: "letters", label: "Letters" },
      ],
      default: "words",
    },
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
    staggerTweak,
  ],
  hosts: 2,
  reveal: (v) => ({
    keyframes: keyframes(v.effect),
    stagger: staggers[v.split][v.stagger],
  }),
  snippets(reveal, v) {
    const words = v.split === "words";
    const [list, item] = words
      ? ['title.split(" ")', "word"]
      : ["[...`${title} `]", "letter"];
    const attrs = revealAttrs(reveal, [
      ["as", "span"],
      ["class", v.split],
    ]);
    const hidden = ["aria-hidden", "true"] as const;

    return {
      props: ["title"],
      ...(words && { reactImports: ["Fragment"] }),
      react: [
        "  return (",
        "    <h1>",
        '      <span className="visually-hidden">{title}</span>',
        openTag("react", "Reveal", [...attrs, hidden], "      "),
        `        {${list}.map((${item}, index) => (`,
        words
          ? [
              "          <Fragment key={index}>",
              '            {index > 0 && " "}',
              "            <span>{word}</span>",
              "          </Fragment>",
            ]
          : [
              '          <span key={index} className={letter === " " ? "space" : undefined}>',
              "            {letter}",
              "          </span>",
            ],
        "        ))}",
        "      </Reveal>",
        "    </h1>",
        "  );",
      ],
      vue: [
        "  <h1>",
        '    <span class="visually-hidden">{{ title }}</span>',
        openTag("vue", "Reveal", [...attrs, hidden], "    "),
        words
          ? [
              `      <template v-for="(word, index) in title.split(' ')" :key="index">`,
              '        {{ index > 0 ? " " : "" }}<span>{{ word }}</span>',
              "      </template>",
            ]
          : openTag(
              "vue",
              "span",
              [
                ["v-for", `(${item}, index) in ${list}`],
                ["key", "index", true],
                ["class", "{ space: letter === ' ' }", true],
              ],
              "      ",
              `{{ ${item} }}`,
            ),
        "    </Reveal>",
        "  </h1>",
      ],
      astro: [
        "<h1>",
        '  <span class="visually-hidden">{title}</span>',
        openTag("astro", "Reveal", [...attrs, hidden], "  "),
        words
          ? [
              `    {${list}.map((${item}, index) => (`,
              `      <>{index > 0 && " "}<span>{${item}}</span></>`,
              "    ))}",
            ]
          : [
              `    {${list}.map((${item}) => (`,
              '      <span class:list={{ space: letter === " " }}>{letter}</span>',
              "    ))}",
            ],
        "  </Reveal>",
        "</h1>",
      ],
      html: [
        "<h1>",
        `  <span class="visually-hidden">${heroTitle}</span>`,
        `  <span class="${v.split}" aria-hidden="true">${heroTitle}</span>`,
        "</h1>",
      ],
      javascript: [
        `const ${v.split} = document.querySelector("h1 .${v.split}");`,
        `${v.split}.replaceChildren(`,
        words
          ? `  ...${v.split}.textContent.split(" ").flatMap((${item}, index) => {`
          : `  ...[...\`\${${v.split}.textContent} \`].map((${item}) => {`,
        '    const span = document.createElement("span");',
        `    span.textContent = ${item};`,
        words ? [] : '    if (letter === " ") span.className = "space";',
        words
          ? '    return index > 0 ? [" ", span] : [span];'
          : "    return span;",
        "  }),",
        ");",
        "",
        revealCall(v.split, reveal),
      ],
      css: [
        visuallyHidden,
        "",
        words
          ? [
              "/* Transforms do not apply to inline elements. */",
              ".words > span {",
              "  display: inline-block;",
              "}",
            ]
          : [
              ".letters {",
              "  white-space: nowrap;",
              "}",
              "/* Transforms do not apply to inline elements. */",
              ".letters > span {",
              "  display: inline-block;",
              "}",
              "/* Wrap only at a space. Firefox needs one after the last word. */",
              ".letters > .space {",
              "  display: inline;",
              "  white-space: normal;",
              "}",
            ],
      ],
    };
  },
});
