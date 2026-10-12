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

/** The archived versions have a slug prefix, such as `v4`. */
export const isArchived = (id: string) => id === "v4" || id.startsWith("v4/");
