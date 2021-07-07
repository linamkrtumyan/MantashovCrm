import request from "../../request";
import {
  AUTHORIZE_REQUEST,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_FAILURE,
} from "../types";

export const authorize = () => {
  return (dispatch) => {
    dispatch(authorizeRequest());
    request("/admin/authorize")
      .then(() => {
        dispatch(authorizeSuccess());
      })
      .catch((e) => {
        dispatch(authorizeFailure(e.message));
        console.log(e);
      });
  };
};

const authorizeRequest = () => {
  return {
    type: AUTHORIZE_REQUEST,
  };
};

const authorizeSuccess = () => {
  return {
    type: AUTHORIZE_SUCCESS,
  };
};

const authorizeFailure = (error) => {
  return {
    type: AUTHORIZE_FAILURE,
  };
};
