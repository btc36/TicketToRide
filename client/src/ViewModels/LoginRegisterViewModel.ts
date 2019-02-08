import * as React from "react";
import LoginRegisterView from "../Views/LoginRegisterView";
import { initialState, State, ILoginRegisterViewModel } from "./ILoginRegisterViewModel";
import IObserver from "./IObserver";
import ViewModelProps from "./ViewModelProps";

export default class LoginRegisterViewModel extends React.Component<ViewModelProps, State> implements ILoginRegisterViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  onLoginButtonPressed = (e: any) => {
    e.preventDefault();
    alert(this.state.loginUserName + "\n" + this.state.loginPassword);
  }

  onRegisterButtonPressed = (e: any) => {
    e.preventDefault();
    alert(this.state.registerUserName + "\n" + this.state.registerPassword + "\n" + this.state.registerConfirmPassword);
  }

  onLoginUserNameChange = (e: any) => {
    this.setState({"loginUserName": e.target.value});
  }

  onLoginPasswordChange = (e: any) => {
    this.setState({"loginPassword": e.target.value});
  }

  onRegisterUserNameChange = (e: any) => {
    this.setState({"registerUserName": e.target.value});
  }

  onRegisterPasswordChange = (e: any) => {
    this.setState({"registerPassword": e.target.value});
  }

  onRegisterConfirmPasswordChange = (e: any) => {
    this.setState({"registerConfirmPassword": e.target.value});
  }

  render(): JSX.Element {
    return LoginRegisterView(this);
  }
}
