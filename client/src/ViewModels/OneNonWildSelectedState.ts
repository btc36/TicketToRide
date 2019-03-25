import { DrawTrainCardState } from "./DrawTrainCardState";
import { FaceUpCardsViewModel } from "./FaceUpCardsViewModel";
import { DoneDrawingState } from "./DoneDrawingState";

export class OneNonWildSelectedState implements DrawTrainCardState {
  drawTrainCard(viewModel: FaceUpCardsViewModel, index: number) {
    if (index != -1) {
      let desiredCard = viewModel.getFaceUpCard(index);
      if (desiredCard.color == "rainbow") {
        alert("SORRY, BUT THAT WILD IS NOT FOR YOU!");
        return;
      }
    } 
    viewModel.props.services.drawTrainCard(index);
    let newState = new DoneDrawingState();
    newState.enter(viewModel);
    viewModel.changeState(newState);
  }
  enter(viewModel: FaceUpCardsViewModel) {

  }
  exit(viewModel: FaceUpCardsViewModel) {
  }
}