import { InternalClientFacade } from "../Services/InternalClientFacade";

export class Poller {
    method: string;
    args: any[];
    frequency: number;
    facade: InternalClientFacade;
    polling: any;

    constructor(methodIn: string, argsIn: any[], frequencyIn: number, facadeIn: InternalClientFacade) {
        this.method = methodIn;
        this.args = argsIn;
        this.frequency = frequencyIn;
        this.facade = facadeIn;
        this.polling = null;
    }

    public start() {
        console.log("Polling")
        if (this.method == "getGameList"){
            let that = this;
            //this.polling = setInterval(that.facade.getGameList, that.frequency);
            this.polling = setInterval(() => { that.facade.getGameList() }, that.frequency);
        }
    }

    public stop() {
        clearInterval(this.polling);
    }
}