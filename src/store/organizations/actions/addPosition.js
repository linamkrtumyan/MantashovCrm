import store from "../..";
import request from "../../request";
import {
  ADD_POSITION_REQUEST,
  ADD_POSITION_SUCCESS,
  ADD_POSITION_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addPosition = (position, changePath) => {
  return (dispatch) => {
    dispatch(addPositionRequest());
    request("/admin/organizations/position", "POST", position)
      .then((data) => {
        if (data.success) {
          dispatch(addPositionSuccess(data));
          toast.dark("Position added");
          changePath();
        }
      })
      .catch((e) => {
        dispatch(addPositionFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const addPositionRequest = () => {
  return {
    type: ADD_POSITION_REQUEST,
  };
};

const addPositionSuccess = (data) => {
  return {
    type: ADD_POSITION_SUCCESS,
    payload: {},
  };
};

const addPositionFailure = (error) => {
  return {
    type: ADD_POSITION_FAILURE,
    payload: { error },
  };
};
