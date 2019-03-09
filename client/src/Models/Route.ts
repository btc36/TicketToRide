export class Route {
  color: string;
  length: number;
  cityOne: string;
  cityTwo: string;

  constructor(cityOne: string, cityTwo: string, length: number, color: string) {
    this.color = color;
    this.length = length;
    this.cityOne = cityOne;
    this.cityTwo = cityTwo;
  }

  getColor(): string {
    return this.color;
  }

  getLength(): number {
    return this.length;
  }

  getCities(): Array<string> {
    return [this.cityOne, this.cityTwo];
  }
}
