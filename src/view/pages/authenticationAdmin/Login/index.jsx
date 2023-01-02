import React from "react";

import { LoginForm } from "./components";

import Logo from "../../../../assets/images/logo/BEST_WISHES.png";

export default function Login() {
  return (
    <div className="custom-login-container">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-container">
        <div className="form-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
