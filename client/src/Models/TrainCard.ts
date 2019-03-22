export class TrainCard {
  color: string;
  constructor(color: string) {
    this.color = color;
  }

  getColor(): string{
    return this.color;
  }

  toString(): string {
    return this.color + " train car";
  }
}
