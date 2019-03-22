import { FaceUpCardsViewModel } from "./FaceUpCardsViewModel";

export abstract class DrawTrainCardState
{
  abstract enter(viewModel: FaceUpCardsViewModel): void;
  abstract exit(viewModel: FaceUpCardsViewModel): void;
    abstract drawTrainCard(viewModel:FaceUpCardsViewModel, index: number): void;
}