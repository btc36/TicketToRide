

class ServerProxy {
    host: string;
    port: string;
    constructor(public hostIn: string, public portIn: string) {
        this.host = hostIn;
        this.port = portIn;
    }
    public register(username:string, password:string, confirm:string){
        let url = new URL("http://" + this.host + ":" + this.port + "/user/register");
    }
    public login(username: string, password: string){

    }
    public createGame(player: Player, numPlayers: number, gameName: string){

    }
    public joinGame(player: Player, gameId: number){

    }
    public startGame(player: Player, gameId: number){

    }
    public getGameList(){

    }
}