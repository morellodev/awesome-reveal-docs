import { keyframes, openTag, revealAttrs, revealCall } from "./code";
import { defineUseCase } from "./model";

export const photoCaption = "Sunrise over the hills";

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
      ],
      default: "blur",
    },
  ],
  timing: { duration: 1000 },
  reveal: (v) => ({ keyframes: keyframes(v.effect) }),
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
