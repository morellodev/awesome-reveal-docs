export const siteConfig = {
  name: "Awesome Reveal",
  description:
    "Scroll reveal animations for React, Vue, Astro and plain JavaScript. Zero dependencies, accessible, SSR-ready and built on native browser APIs.",
  repoUrl: "https://github.com/awesome-reveal/awesome-reveal",
  // The same @id as the Person node of morello.dev, so search engines join the two.
  author: {
    "@type": "Person",
    "@id": "https://morello.dev/#me",
    name: "Dennis Morello",
    url: "https://morello.dev/",
  },
  sponsorUrl: "https://github.com/sponsors/morellodev",
};

export const codeThemes = {
  dark: "night-owl",
  light: "night-owl-light",
} as const;

export const isArchived = (id: string) => id === "v4" || id.startsWith("v4/");
