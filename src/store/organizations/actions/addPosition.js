import store from "../..";
import request from "../../request";
import {
  ADD_POSITION_REQUEST,
  ADD_POSITION_SUCCESS,
  ADD_POSITION_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addPosition = (position, changePath) => {
  // console.log(member, "stacav");
  return (dispatch) => {
    dispatch(addPositionRequest());
    request("/admin/organizations/position", "POST", position)
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          // console.log(data, "news data");
          dispatch(addPositionSuccess(data));
          toast.dark("Position added");
          changePath();
        }
      })
      .catch((e) => {
        dispatch(addPositionFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
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
