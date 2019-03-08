import { Route } from "./Route";

export class DestinationCard {
    route: Route;
    pointValue: number;

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