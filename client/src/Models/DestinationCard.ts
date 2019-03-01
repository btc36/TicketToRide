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

}