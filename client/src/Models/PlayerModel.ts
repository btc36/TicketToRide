export class Player {
    username: string;
    currentGame: number;
    constructor(username: string) {
        this.username = username;
    }
   get getUsername(): string {
        return this.username;
    }

    setCurrentGame(gameId: number) {
        this.currentGame = gameId;
    }

    getCurrentGame(): number {
        return this.currentGame;
    }
}
