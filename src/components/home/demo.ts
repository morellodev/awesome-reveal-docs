import type { RevealElement } from "@awesome-reveal/astro";

export function replay(host: RevealElement) {
  host.when = false;
  host.when = true;
}

// The host reads the attribute again when it changes, and the next entrance uses the new value.
export function setRevealOption(
  host: RevealElement,
  name: string,
  value: unknown,
) {
  const options = JSON.parse(host.getAttribute("options") || "{}");
  host.setAttribute("options", JSON.stringify({ ...options, [name]: value }));
}

// A tap on a control must answer at once, so only the Replay button keeps the stagger delay.
export function replayWithoutDelay(host: RevealElement) {
  const { delay = 0 } = JSON.parse(host.getAttribute("options") || "{}");
  setRevealOption(host, "delay", 0);
  replay(host);
  setRevealOption(host, "delay", delay);
}

export function onControlChange(
  chapter: Element | null,
  listener: (value: string) => void,
) {
  chapter?.querySelector(".options")?.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) listener(event.target.value);
  });
}
