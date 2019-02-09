import * as React from "react";
import InternalClientFacade from '../Services/InternalClientFacade';

export default interface ViewModelProps {
  main: React.Component;
  services: InternalClientFacade;
}
