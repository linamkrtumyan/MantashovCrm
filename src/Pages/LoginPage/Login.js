import React, { useEffect } from "react";
import "./login.css";
import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Forms/Button/Button";
import { connect } from "react-redux";
import store, { cleanForm, onLoginFunction } from "../../store";
import { ToastContainer } from "react-toastify";

function Login({ onLoginFunction, cleanForm, authentiacting }) {
  useEffect(()=>{
    cleanForm();
  },[])
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
    <>
      <ToastContainer style={{ zIndex: 10000000000 }} autoClose={4000} />
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
              <Input id="email" readOnly={authentiacting} placeholder="Username" />
              <Input id="password" readOnly={authentiacting} placeholder="Password" type="password" />
              <div className="login_button">
                <Button disabled={authentiacting} className="login_btn is-primary" title="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "login state ");
  return {
    authentiacting: state.loginReducer.authentiacting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
    onLoginFunction: (login) => dispatch(onLoginFunction(login)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
