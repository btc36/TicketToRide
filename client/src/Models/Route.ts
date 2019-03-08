export class Route {
    color: string;
    length: number;
    cityOne: string;
    cityTwo: string;

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