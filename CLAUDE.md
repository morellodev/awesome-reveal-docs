@AGENTS.md

Use the `updating-dependencies` skill to update packages, Node or pnpm, and the `archiving-docs-versions` skill to archive the docs of a major version.

When you add or change agent docs, skills or rules (`AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.claude/skills/`):

1. Use the `/claude-api` skill, and write them by its prompt-audit guide.
2. Check each claim against the current docs of the tool, or against its installed source. Agent docs that state a wrong fact make the next session do the wrong thing.
