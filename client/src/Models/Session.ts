import {Player} from "./Player"

export class Session {
   // authToken: string;
    currentPage: string;
    loggedInUser: Player;
    
    constructor() {
        //this.authToken = auth;
       this.currentPage = "Login";
       this.loggedInUser = null;
    }

   /* get getAuth(): string {
        return this.authToken;
    }

    set setAuth(auth: string) {
        this.authToken = auth;
    }
    */
    get getCurrentPage(): string {
        return this.currentPage;
    }

    setCurrentPage(page: string) {
        this.currentPage = page;
    }

    get getLoggedInUser(): Player {
        return this.loggedInUser;
    }

    setLoggedInUser(player: Player) {
        this.loggedInUser = player;
    }

}
