import request from "../../request";
import { ON_LOGOUT_REQUEST, ON_LOGOUT_SUCCESS, ON_LOGOUT_FAILURE } from "../types";

export const logout = () => {

  return (dispatch) => {
    // dispatch(onLogoutRequest);
    request("/admin/auth/logout")
      .then((data) => {
        if (data.success) {
          dispatch(onLogoutSuccess());
        } else {
            console.log("logout success=false");
        }
      })
      .catch((e) => {
        dispatch(onLogoutFailure(e));
        // console.log(e);
      });
  };
};

const onLogoutRequest = () => {
    return {
      type: ON_LOGOUT_REQUEST,
    };
  };
  
  const onLogoutSuccess = (data) => {
    const logout= data ? data : {};
    return {
      type: ON_LOGOUT_SUCCESS,
      payload: {
        logout,
      },
    };
  };
  
  const onLogoutFailure = (error) => {
    return {
      type: ON_LOGOUT_FAILURE,
      payload: { error },
    };
  };
  