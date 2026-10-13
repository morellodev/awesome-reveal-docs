import {
  keyframes,
  keyframesArray,
  openTag,
  revealAttrs,
  revealCall,
} from "./code";
import { defineUseCase } from "./model";

export const photoCaption = "Sunrise over the hills";

// clip-path interpolates only between basic shapes, so the last keyframe is `inset(0)`, not `none`.
const masks = {
  wipe: keyframesArray("wipe", [
    { clipPath: "inset(0 100% 0 0)", easing: "ease-in-out" },
    { clipPath: "inset(0)" },
  ]),
  circle: keyframesArray("circle", [
    { clipPath: "circle(0%)", easing: "ease-out" },
    { clipPath: "circle(75%)" },
  ]),
};

export const media = defineUseCase({
  id: "media",
  component: "Photo",
  tweaks: [
    {
      name: "effect",
      label: "Effect",
      options: [
        { value: "blur", label: "blur" },
        { value: "scale", label: "scale" },
        { value: "fade", label: "fade" },
        { value: "wipe", label: "wipe" },
        { value: "circle", label: "circle" },
      ],
      default: "blur",
    },
  ],
  timing: { duration: 1000 },
  reveal: (v) => ({
    keyframes:
      v.effect === "wipe" || v.effect === "circle"
        ? masks[v.effect]
        : keyframes(v.effect),
  }),
  snippets(reveal) {
    const attrs = revealAttrs(reveal, [
      ["as", "figure"],
      ["class", "photo"],
    ]);

    return {
      props: ["src", "alt", "width", "height", "caption"],
      react: [
        "  return (",
        openTag("react", "Reveal", attrs, "    "),
        '      <img src={src} alt={alt} width={width} height={height} loading="lazy" />',
        "      <figcaption>{caption}</figcaption>",
        "    </Reveal>",
        "  );",
      ],
      vue: [
        openTag("vue", "Reveal", attrs, "  "),
        "    <img",
        '      :src="src"',
        '      :alt="alt"',
        '      :width="width"',
        '      :height="height"',
        '      loading="lazy"',
        "    />",
        "    <figcaption>{{ caption }}</figcaption>",
        "  </Reveal>",
      ],
      astro: [
        openTag("astro", "Reveal", attrs),
        '  <img src={src} alt={alt} width={width} height={height} loading="lazy" />',
        "  <figcaption>{caption}</figcaption>",
        "</Reveal>",
      ],
      html: [
        '<figure class="photo">',
        "  <img",
        '    src="sunrise.jpg"',
        '    alt="The sun rises behind green hills"',
        '    width="1600"',
        '    height="900"',
        '    loading="lazy"',
        "  />",
        `  <figcaption>${photoCaption}</figcaption>`,
        "</figure>",
      ],
      javascript: [revealCall('document.querySelector(".photo")', reveal)],
    };
  },
});
