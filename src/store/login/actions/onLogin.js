import { toast } from "react-toastify";
import { authorize } from ".";
import request from "../../request";
import { ON_LOGIN_REQUEST, ON_LOGIN_SUCCESS, ON_LOGIN_FAILURE } from "../types";

export const onLoginFunction = (login) => {

  return (dispatch) => {
    dispatch(onLoginRequest());
    request("/admin/auth/login", "POST", login)
      .then((data) => {
        if (data.success) {

          dispatch(authorize());
          dispatch(onLoginSuccess(data));
        }
      })
      .catch((e) => {
        dispatch(onLoginFailure(e.message));
        toast.error("wrong email or password");
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
