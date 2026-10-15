---
paths:
  - "src/components/**/*"
  - "src/styles/**/*"
---

# Scoped styles and Starlight overrides

- Starlight sets `scopedStyleStrategy: "where"`, so a scoped selector gets no extra specificity. The scope already limits a rule to the markup of its component. Do not add a parent class only to narrow the match.
- A child component gets the scope class through its `class` prop. Starlight's `Icon`, `Badge` and `LinkButton` render that prop, so a scoped rule also matches their root element. For example, a bare `span` rule in `Hero.astro` also matches the `Badge`. `SocialIcons` does not render the prop, so style its links with `:global()`.
- Starlight puts its component styles in `@layer starlight.*`. Unlayered CSS in `theme.css` and in our components wins over them at any specificity. To override Starlight, do not add selector weight. A rule for the base state also wins over the Starlight `:hover` and `:focus` rules for the same property.
- The `starlight-versions` components, `Page.astro` of Starlight and the Pagefind UI CSS of the search modal are not in a layer. Their rules compete by specificity, so an override in `theme.css` needs more weight, such as a `:root` prefix. For the same reason, do not put `theme.css` in a cascade layer: a layered rule always loses to these files.
