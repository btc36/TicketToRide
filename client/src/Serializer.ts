import { ClientCommandObjects } from "./ClientCommandObjects";

export class Serializer {
    constructor() {
    }
    public toJSON(command: ClientCommandObjects){
        var myCommand = JSON.stringify(command);
        return myCommand;
    }
    public parseJSON(command: string){
        var myCommand: ClientCommandObjects = JSON.parse(command);
        return myCommand;
    }
}