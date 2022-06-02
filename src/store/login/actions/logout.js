import request from "../../request";
import {
  ON_LOGOUT_REQUEST,
  ON_LOGOUT_SUCCESS,
  ON_LOGOUT_FAILURE,
} from "../types";

export const logout = () => {
  return (dispatch) => {
    dispatch(onLogoutRequest());
    request("/admin/auth/logout")
      .then((data) => {
        if (data.success) {
          dispatch(onLogoutSuccess());
        }
      })
      .catch((e) => {
        dispatch(onLogoutFailure(e.message));
      });
  };
};

const onLogoutRequest = () => {
  return {
    type: ON_LOGOUT_REQUEST,
  };
};

const onLogoutSuccess = () => {
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};

const onLogoutFailure = (error) => {
  return {
    type: ON_LOGOUT_FAILURE,
    payload: { error },
  };
};
