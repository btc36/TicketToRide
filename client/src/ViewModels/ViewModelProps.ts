import * as React from "react";
import { InternalClientFacade } from '../Services/InternalClientFacade';

export interface ViewModelProps {
  main: React.Component;
  services: InternalClientFacade;
}
