import request from "../../request";
import {
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_EDIT_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editEvent = (event, changePath) => {
  console.log({ event });

  // console.log(event, "event for edit ........");

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
  // console.log("editEventRequest");
  return {
    type: EVENT_EDIT_REQUEST,
  };
};

const editEventSuccess = (data) => {
  // console.log(data, "news success data");
  //   const login = data ? data : [];
  // console.log("editEventSuccess, ", data);
  return {
    type: EVENT_EDIT_SUCCESS,
    payload: {},
  };
};

const editEventFailure = (error) => {
  // console.log("editEventFailure, ", error);
  return {
    type: EVENT_EDIT_FAILURE,
    payload: { error },
  };
};
