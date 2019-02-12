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
        if (this.method == "getGameList"){
            this.polling = setInterval(this.facade.getGameList, this.frequency);
        }
    }

    public stop() {
        clearInterval(this.polling);
    }
}