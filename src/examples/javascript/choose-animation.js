import { reveal } from "@awesome-reveal/core";
import { slide } from "@awesome-reveal/core/keyframes";

reveal(document.querySelector("section"), {
  keyframes: slide({ direction: "left" }),
  duration: 800,
});
