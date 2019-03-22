import { DrawTrainCardState } from "./DrawTrainCardState";

export interface IStateful {
    statePatternState: DrawTrainCardState
  changeState(state: DrawTrainCardState): void;
}
