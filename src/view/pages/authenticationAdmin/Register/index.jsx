import React from "react";
import { useHistory } from "react-router-dom";

import { RegisterForm } from "./components";

import Logo from "../../../../assets/images/logo/BEST_WISHES.png";

export default function Login() {
  const history = useHistory();
  if (localStorage.getItem("token")) history.push("/");

  return (
    <div className="custom-login-container">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-container">
        <div className="form-container">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
