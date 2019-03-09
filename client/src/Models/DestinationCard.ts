
export class DestinationCard {
  city1: String;
  city2: String;
  pointValue: number;

    constructor(city1:String, city2:String, pointValue: number) {
      this.city1 = city1;
      this.city2 = city2;
      this.pointValue = pointValue;
    }

    getPointValue(): number {
        return this.pointValue;
    }

    getCities(): Array<String> {
        return [this.city1,this.city2]
    }

}