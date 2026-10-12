import { reveal } from "@awesome-reveal/core";
import { slide } from "@awesome-reveal/core/keyframes";

reveal(document.querySelector("ul.features"), {
  keyframes: slide(),
  stagger: 80,
});
