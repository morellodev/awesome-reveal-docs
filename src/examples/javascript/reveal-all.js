import { reveal } from "@awesome-reveal/core";
import { fade } from "@awesome-reveal/core/keyframes";

for (const card of document.querySelectorAll(".card")) {
  reveal(card, { keyframes: fade(), threshold: 0.3 });
}
