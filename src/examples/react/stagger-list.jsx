import { Reveal } from "@awesome-reveal/react";
import { slide } from "@awesome-reveal/react/keyframes";

export function Features({ items }) {
  return (
    <Reveal as="ul" keyframes={slide()} stagger={80}>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </Reveal>
  );
}
