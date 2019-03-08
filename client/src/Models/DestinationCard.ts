import { Route } from "./Route";

export class DestinationCard {
    route: Route;
    pointValue: number;

    constructor(route: Route, pointValue: number) {
        this.route = route;
        this.pointValue = pointValue;
    }

    getRoute(): Route {
        return this.route;
    }

    getPointValue(): number {
        return this.pointValue;
    }

    getCities(): Array<String> {
        return this.route.getCities();
    }

}