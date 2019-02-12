import { Player } from "./Player"

export class LobbyGame {
    gameID: string;
    gamename: string;
    playerList: Array<Player>;
    maxPlayer: number;
    currentPlayerNum: number;
    host: Player;
    

    constructor(gameID: string, host: Player, name: string, maxPlayers: number = 5) {
        this.gameID = gameID;
        this.host = host;
        this.gamename = name;
        this.maxPlayer = maxPlayers;
        this.playerList = new Array<Player>();
        this.playerList.push(host);
    }

    getPlayerList(): Array<Player> {
        return this.playerList;
    }

    getGameID(): string {
        return this.gameID;
    }

    getGameName(): string {
        return this.gamename;
    }

    getMaxPlayers(): number {
        return this.maxPlayer;
    }

    getNumPlayers(): number {
        return this.playerList.length;
    }

    addPlayer(player: Player) {
        //If this would push it over the max, throw an error
        if (this.getNumPlayers() == this.maxPlayer) {
            throw Error("You already have the maximum number of Players");
        }
        this.playerList.push(player);
    }

    removePlayer(username: string) {
        for (var i = this.playerList.length - 1; i >= 0; --i) {
            if (this.playerList[i].getUsername() == username) {
                this.playerList.splice(i, 1);
            }
        }
    }
}
