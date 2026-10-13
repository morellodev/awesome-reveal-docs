import { alternating } from "./alternating";
import { cards } from "./cards";
import { cta } from "./cta";
import { hero } from "./hero";
import { media } from "./media";
import { stats } from "./stats";
import { timeline } from "./timeline";

const useCases = [hero, cards, timeline, media, stats, alternating, cta];

export const findUseCase = (id: string | undefined) =>
  useCases.find((useCase) => useCase.id === id);

export * from "./model";
