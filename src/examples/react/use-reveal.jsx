import { useReveal } from "@awesome-reveal/react";
import { fade } from "@awesome-reveal/react/keyframes";

function Card() {
  const { getProps } = useReveal({
    keyframes: fade(),
    threshold: 0.3,
  });

  return (
    <article {...getProps({ className: "card", style: { padding: 16 } })}>
      …
    </article>
  );
}
