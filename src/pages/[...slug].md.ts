import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import { entryToMarkdown } from "../lib/markdown";
import { markdownSlug } from "../lib/markdown-slug";

export const getStaticPaths = async () =>
  (await getCollection("docs")).map((entry) => ({
    params: { slug: markdownSlug(entry.id) },
    props: { entry },
  }));

export const GET: APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>
> = async (context) =>
  new Response(await entryToMarkdown(context.props.entry, context), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
