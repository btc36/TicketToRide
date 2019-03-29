import { FaceUpCards } from "../Models/FaceUpCards";
import { TrainCard } from "../Models/TrainCard";
import { DrawTrainCardState } from "./DrawTrainCardState";

export const initialState = {
  faceUpCards: null,
  numTrainCardsRemaining: 0,
  numDestinationCardsRemaining: 0,
  faceUpIndex: 0,
  drawState: null
};

export type State = {
  readonly faceUpCards: FaceUpCards,
  readonly numTrainCardsRemaining: number,
  readonly numDestinationCardsRemaining: number,
  readonly faceUpIndex: number,
  readonly drawState: DrawTrainCardState
}

export interface IFaceUpCardsViewModel {
  state: State;
  drawCard(e: any): void;
  drawFaceUp(e: any): void;
  onFaceUpIndexChanged(e: any): void;
  getCards(): any;
}
