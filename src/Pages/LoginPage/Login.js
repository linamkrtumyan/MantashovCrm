import React from "react";
import "./login.css";
import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Forms/Button/Button";
import { connect } from "react-redux";
import store from "../../store";
import { onLoginFunction } from "../../store";

function Login({ onLoginFunction }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = store.getState().formReducer;
    let login = {
      email,
      password,
    };
    onLoginFunction(login);
  };
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
          <form onSubmit={handleSubmit} className="login_form_conntainer">
            <div className="login_title">
              <p>Login</p>
            </div>
            <Input id="email" placeholder="Username" />
            <Input id="password" placeholder="Password" type="password" />
            <div className="login_button">
              <Button className="login_btn" title="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "login state ");
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginFunction: (login) => dispatch(onLoginFunction(login)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
