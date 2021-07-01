import React from "react";
import "./login.css";
import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Forms/Button/Button";
function Login() {
  return (
    <div className="login_container">
      <div className="login_container_fragment">
        <div className="login_centered">
          <img
            alt=""
            className="login_img"
            src={require("../../img/white_mantashov.png").default}
          />
        </div>
      </div>
      <div className="login_container_fragment">
        <div className="login_centered">
          <div className="login_form_conntainer">
            <div className="login_title">
              <p>Login</p>
            </div>
            <Input placeholder="Username" />
            <Input placeholder="Password" type="password" />
            <div className="login_button">
              <Button title="login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
