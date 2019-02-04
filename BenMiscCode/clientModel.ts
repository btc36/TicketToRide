class Observer { }

interface Subject {
    attach: (o: Observer) => void
    detach: (o: Observer) => void
    notify: (type: string, data: object) => void
}

class Session {
    authToken: string;
    currentPage: string;
    loggedInUser: Player;
    constructor(auth: string, page: string, currentUser: Player) {
        this.authToken = auth;
        this.currentPage = page;
        this.loggedInUser = currentUser;
    }

    get getAuth(): string {
        return this.authToken
    }

    set setAuth(auth: string) {
        this.authToken = auth
    }

    get getCurrentPage(): string {
        return this.currentPage;
    }

    set setCurrentPage(page: string) {
        this.currentPage = page;
    }

    get getLoggedInUser(): Player {
        return this.loggedInUser
    }

    set setLoggedInUser(player: Player) {
        this.loggedInUser = player;
    }

}

class Player {
    username: string;
    constructor(username: string) {
        this.username = username;
    }
    get getUsername(): string {
        return this.username;
    }
}

class GameList {
    games: Array<LobbyGame>

    addGame(game: LobbyGame) {
        this.games.push(game);
    }

    removeGame(gameId: string) {
        for (var i = this.games.length - 1; i >= 0; --i) {
            if (this.games[i].getGameID == gameId) {
                this.games.splice(i, 1);
            }
        }
    }

    replaceGameList(newGame: Array<LobbyGame>) {
        this.games = newGame;
    }

    get getGames(): Array<LobbyGame> {
        return this.games;
    }

}

class LobbyGame {
    gameID: string;
    players: Array<Player>;
    maxPlayers: number;
    host: Player;
    //Should the constructor create and return the gameID?
    constructor(gameID: string, host: Player, maxPlayers: number) {
        this.gameID = gameID;
        this.host = host;
        this.maxPlayers = maxPlayers;
        this.players = new Array<Player>();
        this.players.push(host);
    }

    get getGameID(): string {
        return this.gameID;
    }

    createGameId(): string {
        //this.gameID = UUID.randomUUID().toString();
        return this.gameID;
    }


    get getNumPlayers(): number {
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

class ClientRoot implements Subject {
    gameList: GameList;
    myPlayer: Player;
    lobby: LobbyGame;
    session: Session;
    //What is this constructor, and all the other classes. Does the client start out empty?
    constructor() {
    }

    attach(o: Observer) { }
    detach(o: Observer) { }
    notify(type: string, data: object) { }


}
let player1 = new Player('btc36');
let player2 = new Player('jbd34');
let player3 = new Player('asd12');
let player4 = new Player('ben12');
let curSession = new Session('auth', 'page1', player1)
let game1 = new LobbyGame('id1', player1, 3);
let game2 = new LobbyGame('id2', player2, 3);
let game3 = new LobbyGame('id3', player3, 3);
let gameList = new GameList();
gameList.addGame(game1);
gameList.addGame(game2);
gameList.addGame(game3);


let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function () {

}

document.body.appendChild(button);
