import {Player} from "./PlayerModel"
export class LobbyGame {
    gameID: number;
    players: Array<Player>;
    maxPlayers: number;
    host: Player;
    name: string;

    constructor(gameID: number, host: Player, maxPlayers: number = 5) {
        this.gameID = gameID;
        this.host = host;
        this.maxPlayers = maxPlayers;
        this.players = new Array<Player>();
        this.players.push(host);
    }

    getGameID(): number {
        return this.gameID;
    }

    getGameName(): string {
        return this.gameName;
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getNumPlayers(): number {
        return this.players.length;
    }

    addPlayer(player: Player) {
        //If this would push it over the max, throw an error
        if (this.getNumPlayers == this.maxPlayers) {
            throw Error("You already have the maximum number of Players");
        }
        this.players.push(player);
    }

    removePlayer(username: string) {
        for (var i = this.players.length - 1; i >= 0; --i) {
            if (this.players[i].getUsername == username) {
                this.players.splice(i, 1);
            }
        }
    }
}
