export const siteConfig = {
  name: "Awesome Reveal",
  description:
    "Scroll reveal animations for React, Vue, Astro and plain JavaScript. They use the Intersection Observer and Web Animations APIs and support reduced motion.",
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

export const isArchived = (id: string) => id === "v4" || id.startsWith("v4/");
