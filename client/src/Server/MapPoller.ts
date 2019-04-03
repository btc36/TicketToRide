import { IngameInternalClientFacade } from "../Services/IngameInternalClientFacade";

export class MapPoller {
  method: string;
  args: any[];
  frequency: number;
  ingameInternalClientFacade: IngameInternalClientFacade;
  polling: any;

  constructor(facadeInIn:IngameInternalClientFacade) {
    this.frequency = 1000;
    this.ingameInternalClientFacade = facadeInIn;
    this.polling = null;
  }

  public start() {
    let that = this;
    this.polling = setInterval(() => { that.ingameInternalClientFacade.getAllServerRoutes() }, that.frequency);
  }

  public stop() {
    clearInterval(this.polling);
  }
}
