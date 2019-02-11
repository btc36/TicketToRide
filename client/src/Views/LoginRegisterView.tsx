import * as React from "react";
import * as I from "../ViewModels/ILoginRegisterViewModel";

export const LoginRegisterView = (component: I.ILoginRegisterViewModel) => {
    return (
      <div className="view">
        <div className="half-partition">
          <h1>Login</h1>
          <form onSubmit={component.onLoginButtonPressed}>
            <p>
              <label>User Name:<br />
                <input type="text" name="login-username" value={component.state.loginUserName} onChange={component.onLoginUserNameChange} />
              </label> 
            </p>
            <p>
              <label>Password:<br />
                <input type="text" name="login-password" value={component.state.loginPassword} onChange={component.onLoginPasswordChange}/>
              </label>
            </p>
            <p><input type="submit" value="Log in" /></p>
          </form>
        </div>
        <div className="half-partition">
          <h1>Register</h1>
          <form onSubmit={component.onRegisterButtonPressed}>
            <p>
              <label>User Name:<br />
                <input type="text" name="register-username" value={component.state.registerUserName} onChange={component.onRegisterUserNameChange}/>
              </label>
            </p>
            <p>
              <label>Password:<br />
                <input type="text" name="register-password" value={component.state.registerPassword} onChange={component.onRegisterPasswordChange}/>
              </label>
            </p>
            <p>
              <label>Confirm password:<br />
                <input type="text" name="register-confirm-password" value={component.state.registerConfirmPassword} onChange={component.onRegisterConfirmPasswordChange}/>
              </label>
            </p>
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    );
}
