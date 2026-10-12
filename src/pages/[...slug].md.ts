import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import { entryToMarkdown } from "../lib/markdown";
import { markdownSlug } from "../lib/markdown-slug";
import { interactivePages } from "../site.config";

export const getStaticPaths = async () =>
  (await getCollection("docs"))
    .filter((entry) => !interactivePages.includes(entry.id))
    .map((entry) => ({
      params: { slug: markdownSlug(entry.id) },
      props: { entry },
    }));

export const GET: APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>
> = async (context) =>
  new Response(await entryToMarkdown(context.props.entry, context), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
