import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsVersionsLoader } from "starlight-versions/loader";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        scrollCueTarget: z
          .string()
          .optional()
          .describe(
            'The id of the section that the "Scroll down" link of the hero opens.',
          ),
      }),
    }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  versions: defineCollection({ loader: docsVersionsLoader() }),
};
