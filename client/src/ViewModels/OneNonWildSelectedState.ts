import { DrawTrainCardState } from "./DrawTrainCardState";
import { FaceUpCardsViewModel } from "./FaceUpCardsViewModel";
import { DoneDrawingState } from "./DoneDrawingState";

export class OneNonWildSelectedState implements DrawTrainCardState {
  drawTrainCard(viewModel: FaceUpCardsViewModel, index: number) {
    if (index != -1) {
      let desiredCard = viewModel.getFaceUpCard(index);
      if (desiredCard.color == "rainbow") {
        alert("ONLY 1 WILD ALLOWED MY FRIEND!");
        return;
      }
    } 
    viewModel.props.services.drawTrainCard(index);
    viewModel.changeState(new DoneDrawingState());
  }
  enter(viewModel: FaceUpCardsViewModel) {

  }
  exit(viewModel: FaceUpCardsViewModel) {
  }
}