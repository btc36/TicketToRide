import { FaceUpCards } from "../Models/FaceUpCards";
import { TrainCard } from "../Models/TrainCard";

export const initialState = {
  faceUpCards: null,
  numTrainCardsRemaining: 0,
  numDestinationCardsRemaining: 0
};

export type State = {
  readonly faceUpCards: FaceUpCards,
  readonly numTrainCardsRemaining: number,
  readonly numDestinationCardsRemaining: number
}

export interface IFaceUpCardsViewModel {
  state: State;
  drawCard(e: any): void;
}
