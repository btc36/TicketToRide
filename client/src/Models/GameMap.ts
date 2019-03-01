import { Route } from "./Route";

export class GameMap {
    routes: Array<Route>;

    getRouteByIndex(index: number) :Route{
        return routes[index];
    }
}