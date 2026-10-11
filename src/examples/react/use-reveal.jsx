import { useReveal } from "@awesome-reveal/react";
import { fade } from "@awesome-reveal/react/keyframes";

function Card() {
  const { ref, style, revealed } = useReveal({
    keyframes: fade(),
    threshold: 0.3,
  });
  return (
    <article
      ref={ref}
      style={{ padding: 16, ...style }}
      data-reveal={revealed ? undefined : "hidden"}
    >
      …
    </article>
  );
}
