import { alternating } from "./alternating";
import { cta } from "./cta";
import { hero } from "./hero";
import { media } from "./media";
import { sequence } from "./sequence";
import { stagger } from "./stagger";

const useCases = [hero, sequence, stagger, media, alternating, cta];

export const findUseCase = (id: string | undefined) =>
  useCases.find((useCase) => useCase.id === id);

export * from "./model";
