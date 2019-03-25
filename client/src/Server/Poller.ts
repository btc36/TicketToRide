import { InternalClientFacade } from "../Services/InternalClientFacade";

export class Poller {
  method: string;
  args: any[];
  frequency: number;
  internalClientFacade: InternalClientFacade;
  polling: any;

  constructor(methodIn: string, argsIn: any[], frequencyIn: number, facadeIn: InternalClientFacade) {
    this.method = methodIn;
    this.args = argsIn;
    this.frequency = frequencyIn;
    this.internalClientFacade = facadeIn;
    this.polling = null;
  }

  public start() {
    //
    if (this.method == "getGameList"){
      let that = this;
      //this.polling = setInterval(that.facade.getGameList, that.frequency);
      this.polling = setInterval(() => { that.internalClientFacade.getGameList() }, that.frequency);
    }
  }

  public stop() {
    clearInterval(this.polling);
  }
}
