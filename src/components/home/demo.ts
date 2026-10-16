import type { RevealElement } from "@awesome-reveal/astro";

export function replay(host: RevealElement) {
  host.when = false;
  host.when = true;
}

function readOptions(host: RevealElement) {
  return JSON.parse(host.getAttribute("options") || "{}");
}

// The host reads the attribute again when it changes, and the next entrance uses the new value.
export function setRevealOption(
  host: RevealElement,
  name: string,
  value: unknown,
) {
  host.setAttribute(
    "options",
    JSON.stringify({ ...readOptions(host), [name]: value }),
  );
}

// A tap on a control must answer at once, so only the Replay button keeps the stagger delay.
export function replayWithoutDelay(host: RevealElement) {
  const { delay = 0 } = readOptions(host);
  setRevealOption(host, "delay", 0);
  replay(host);
  setRevealOption(host, "delay", delay);
}
