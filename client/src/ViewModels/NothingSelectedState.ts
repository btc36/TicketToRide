import { DrawTrainCardState } from "./DrawTrainCardState";
import { FaceUpCardsViewModel } from "./FaceUpCardsViewModel";
import { OneNonWildSelectedState } from "./OneNonWildSelectedState";
import { DoneDrawingState } from "./DoneDrawingState";

export class NothingSelectedState implements DrawTrainCardState {
  drawTrainCard(viewModel: FaceUpCardsViewModel, index: number) {
    if (index != -1) {
      let desiredCard = viewModel.getFaceUpCard(index);
      if (desiredCard.color == "rainbow") {
        viewModel.props.services.drawTrainCard(index);
        let newState = new DoneDrawingState();
        newState.enter(viewModel);
        viewModel.changeState(newState);
        return;
      }
    }
    viewModel.props.services.drawTrainCard(index);
    viewModel.changeState(new OneNonWildSelectedState()); 
  }
  enter(viewModel: FaceUpCardsViewModel) {

  }
  exit(viewModel: FaceUpCardsViewModel) {

  }
}
