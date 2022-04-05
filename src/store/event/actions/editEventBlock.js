import request from "../../request";
import {
  EVENT_EDIT_BLOCK_REQUEST,
  EVENT_EDIT_BLOCK_SUCCESS,
  EVENT_EDIT_BLOCK_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editEventBlock = (block, callback = () => {}) => {
  // set api for block edit
  return (dispatch) => {
    dispatch(editEventBlockRequest());
    request("/admin/events/eventDetails", "PUT", block)
      .then((data) => {
        if (data.success) {
          dispatch(editEventBlockSuccess(data));
          // toast.dark("Edited");
          callback();
        }
      })
      .catch((e) => {
        dispatch(editEventBlockFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const editEventBlockRequest = () => {
  return {
    type: EVENT_EDIT_BLOCK_REQUEST,
  };
};

const editEventBlockSuccess = (data) => {
  return {
    type: EVENT_EDIT_BLOCK_SUCCESS,
    payload: {},
  };
};

const editEventBlockFailure = (error) => {
  return {
    type: EVENT_EDIT_BLOCK_FAILURE,
    payload: { error },
  };
};
