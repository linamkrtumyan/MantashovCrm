import store from "../..";
import request from "../../request";
import {
  ADD_EVENT_SHORT_DESC_REQUEST,
  ADD_EVENT_SHORT_DESC_SUCCESS,
  ADD_EVENT_SHORT_DESC_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addEventShortDescription = (data) => {
  return (dispatch) => {
    dispatch(addEventShortDescriptionRequest());
    request("/admin/events/eventShortDetails", "PUT", data)
      .then((data) => {
        if (data.success) {
          dispatch(addEventShortDescriptionSuccess());
        }
      })
      .catch((e) => {
        dispatch(addEventShortDescriptionFailure(e.errorMessage));
        toast.error("Something bad happened");
      });
  };
};

const addEventShortDescriptionRequest = () => {
  return {
    type: ADD_EVENT_SHORT_DESC_REQUEST,
  };
};

const addEventShortDescriptionSuccess = () => {
  return {
    type: ADD_EVENT_SHORT_DESC_SUCCESS,
    payload: {},
  };
};

const addEventShortDescriptionFailure = (error) => {
  return {
    type: ADD_EVENT_SHORT_DESC_FAILURE,
    payload: { error },
  };
};
