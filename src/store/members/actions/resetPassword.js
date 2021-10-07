import store from "../..";
import request from "../../request";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const resetPassword = (member, closeModal) => {
  console.log(member, "stacav");
  return (dispatch) => {
    dispatch(resetPasswordRequest());
    request("/admin/members/member/recover-password", "POST", member)
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          dispatch(resetPasswordSuccess(data));
          closeModal();
          toast.dark("Password reset");
        }
      })
      .catch((e) => {
        dispatch(resetPasswordFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
      });
  };
};

const resetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};

const resetPasswordSuccess = (data) => {
  // console.log(data, "news success data");
  //   const login = data ? data : [];
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: {
      //   login,
    },
  };
};

const resetPasswordFailure = (error) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: { error },
  };
};
