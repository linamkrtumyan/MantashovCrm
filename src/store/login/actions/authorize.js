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
      .then((data) => {
        if (data) {
          dispatch(authorizeSuccess(data));
        } else {
          dispatch(authorizeFailure());
        }
      })
      .catch((e) => {
        dispatch(authorizeFailure(e.message));
      });
  };
};

const authorizeRequest = () => {
  return {
    type: AUTHORIZE_REQUEST,
  };
};

const authorizeSuccess = (data) => {
  let auth = data ? data : [];
  return {
    type: AUTHORIZE_SUCCESS,
    payload: { auth },
  };
};

const authorizeFailure = (error) => {
  return {
    type: AUTHORIZE_FAILURE,
  };
};
