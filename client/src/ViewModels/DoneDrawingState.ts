import { DrawTrainCardState } from "./DrawTrainCardState";
import { FaceUpCardsViewModel } from "./FaceUpCardsViewModel";

export class DoneDrawingState implements DrawTrainCardState {
  drawTrainCard(viewModel: FaceUpCardsViewModel, index: number) {
    alert("WAIT FOR YOUR TURN BUDDY!");
  }
  enter(viewModel: FaceUpCardsViewModel) {
    viewModel.props.services.endTurn();
  }
  exit(viewModel: FaceUpCardsViewModel) {

  }
}