import request from "../../request";
import {
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_EDIT_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editEvent = (event, changePath) => {
  return (dispatch) => {
    dispatch(editEventRequest());
    request("/admin/events/event", "PUT", event)
      .then((data) => {
        if (data.success) {
          dispatch(editEventSuccess(data));
          toast.dark("Event edited");
          changePath();
        }
      })
      .catch((e) => {
        dispatch(editEventFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const editEventRequest = () => {
  return {
    type: EVENT_EDIT_REQUEST,
  };
};

const editEventSuccess = (data) => {
  return {
    type: EVENT_EDIT_SUCCESS,
    payload: {},
  };
};

const editEventFailure = (error) => {
  return {
    type: EVENT_EDIT_FAILURE,
    payload: { error },
  };
};
