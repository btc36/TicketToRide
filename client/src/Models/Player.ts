export class Player {
  username: string;
  constructor(username: string) {
    this.username = username;
  }
  getUsername(): string {
    return this.username;
  }

}
