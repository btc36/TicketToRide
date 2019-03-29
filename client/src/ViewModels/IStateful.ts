import { DrawTrainCardState } from "./DrawTrainCardState";

export interface IStateful {
  changeState(state: DrawTrainCardState): void;
}
