export const initialState = {
  loginUserName: "",
  loginPassword: "",
  registerUserName: "",
  registerPassword: "",
  registerConfirmPassword: "",
  errorMessage: ""
};

export type State = Readonly<typeof initialState>;

export interface ILoginRegisterViewModel {
  state: State;
  onLoginButtonPressed(e: any): void;
  onRegisterButtonPressed(e: any): void;
  onLoginUserNameChange(e: any): void;
  onLoginPasswordChange(e: any): void;
  onRegisterUserNameChange(e: any): void;
  onRegisterPasswordChange(e: any): void;
  onRegisterConfirmPasswordChange(e: any): void;
}
