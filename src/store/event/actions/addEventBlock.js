import store from "../..";
import request from "../../request";
import {
  ADD_EVENT_BLOCK_REQUEST,
  ADD_EVENT_BLOCK_SUCCESS,
  ADD_EVENT_BLOCK_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addEventBlock = (block, changePath) => {

  return (dispatch) => {
    dispatch(addEventBlockRequest());
    request("/admin/events/eventDetails", "POST", block)
      .then((data) => {
        if (data.success) {
          dispatch(addEventBlockSuccess(data));
          //   toast.dark("Event added");
            // changePath();
        }
      })
      .catch((e) => {
        dispatch(addEventBlockFailure(e.errorMessage));
        toast.error("Something bad happened");
      });
  };
};

const addEventBlockRequest = () => {
  return {
    type: ADD_EVENT_BLOCK_REQUEST,
  };
};

const addEventBlockSuccess = (data) => {
  // console.log(data, "news success data");
  //   const login = data ? data : [];
  return {
    type: ADD_EVENT_BLOCK_SUCCESS,
    payload: { eventId: data.id },
  };
};

const addEventBlockFailure = (error) => {
  return {
    type: ADD_EVENT_BLOCK_FAILURE,
    payload: { error },
  };
};
