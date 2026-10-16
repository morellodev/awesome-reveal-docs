import versionsConfig from "virtual:starlight-versions-config";

export const archivedVersion = (id: string) =>
  versionsConfig.versions.find(
    ({ slug }) => id === slug || id.startsWith(`${slug}/`),
  );

export const isArchived = (id: string) => archivedVersion(id) !== undefined;
