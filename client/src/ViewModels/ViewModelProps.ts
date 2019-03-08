import * as React from "react";
import { InternalClientFacade } from '../Services/InternalClientFacade';
import { IngameInternalClientFacade } from '../Services/IngameInternalClientFacade';

export interface ViewModelProps {
  main: React.Component;
  services: InternalClientFacade;
}

export interface IngameViewModelProps {
  main: React.Component;
  services: IngameInternalClientFacade;
}
