export class Player {
    username: string;
    currentGame: string;
    constructor(username: string) {
        this.username = username;
    }
    getUsername(): string {
        return this.username;
    }

    setCurrentGame(gameId: string) {
        this.currentGame = gameId;
    }

    getCurrentGame(): string {
        return this.currentGame;
    }
}
