import partytown from "@astrojs/partytown";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

const site = "https://react-awesome-reveal.morello.dev";
const ogUrl = new URL("og.png?v=1", site).href;
const ogImageAlt = "Add stunning, performant scroll reveal animations to your React applications with zero dependencies.";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      title: "React Awesome Reveal",
      social: {
        email: "mailto:dennismorello@gmail.com",
        github: "https://github.com/awesome-reveal/react-awesome-reveal",
        linkedin: "https://www.linkedin.com/in/dennismorello",
        "x.com": "https://x.com/morellodev",
      },
      sidebar: [
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
            src: "https://www.googletagmanager.com/gtag/js?id=GTM-PNLQX9W4",
          },
        },
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
          },
          content:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','GTM-PNLQX9W4');",
        },
        {
					tag: 'meta',
					attrs: { property: 'og:image', content: ogUrl },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:alt', content: ogImageAlt },
				},
      ],
    }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
});
