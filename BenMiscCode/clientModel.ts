class Session {
    authToken: string;
    currentPage: string;
    loggedInUser: Player;
    constructor(auth: string, page: string, currentUser: Player) {
        this.authToken = auth;
        this.currentPage = page;
        this.loggedInUser = currentUser;
    }

    getAuth() {
        return this.authToken
    }

    setAuth(auth:string) {
        this.authToken = auth
    }

    getCurrentPage() {
        return this.currentPage;
    }

    setCurrentPage(page: string) {
        this.currentPage = page;
    }

    getLoggedInUser() {
        return this.loggedInUser
    }

    setLoggedInUser(player: Player) {
        this.loggedInUser = player;
    }

}

class Player {
    username: string;
    constructor(username: string) {
        this.username = username;
    }
    getUsername() {
        return this.username;
    }
}

class GameList{
    games: Array<lobbyGame>
    
}

class lobbyGame{
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

    getNumPlayers() {
        return this.players.length;
    }

    addPlayer(player:Player) {
        this.players.push(player);
    }

    removePlayer(username: string) {
        
    }
}
let greeter = new Greeter("world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
}

document.body.appendChild(button);
