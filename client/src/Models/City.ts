import {Route} from "./Route";

export class City {
  name:string
  routes:Array<Route>


  constructor(name:string) {
    this.name = name;
  }
}