import request from "../../request";
import { ON_LOGIN_REQUEST, ON_LOGIN_SUCCESS, ON_LOGIN_FAILURE } from "../types";

export const onLoginFunction = (login) => {
  // console.log(login, "uxarkvoxy");

  return (dispatch) => {
    dispatch(onLoginRequest());
    request("/admin/auth/login", "POST", login)
      .then((data) => {
        if (data.success) {
          // console.log(data, "login data");
          dispatch(onLoginSuccess(data));
        }
      })
      .catch((e) => {
        dispatch(onLoginFailure(e.message));
        // console.log(e);
      });
  };
};

const onLoginRequest = () => {
  return {
    type: ON_LOGIN_REQUEST,
  };
};

const onLoginSuccess = (data) => {
  const login = data ? data : [];
  return {
    type: ON_LOGIN_SUCCESS,
    payload: {
      login,
    },
  };
};

const onLoginFailure = (error) => {
  return {
    type: ON_LOGIN_FAILURE,
    payload: { error },
  };
};
