import store from "../..";
import request from "../../request";
import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addEvent = (event, changePath) => {
  const data = new FormData();

  return (dispatch) => {
    dispatch(addEventRequest());
    request("/admin/events/event", "POST", event)
      .then((data) => {
        if (data.success) {
          dispatch(addEventSuccess(data));
          toast.dark("Event added");
          // changePath();
        }
      })
      .catch((e) => {
        dispatch(addEventFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const addEventRequest = () => {
  return {
    type: ADD_EVENT_REQUEST,
  };
};

const addEventSuccess = (data) => {
  // console.log(data, "news success data");
  //   const login = data ? data : [];
  return {
    type: ADD_EVENT_SUCCESS,
    payload: { eventId: data.id, event: data },
  };
};

const addEventFailure = (error) => {
  return {
    type: ADD_EVENT_FAILURE,
    payload: { error },
  };
};
