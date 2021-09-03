import request from "../../request";
import {
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from "../types";

export const deleteEvent = (id) => {
  // console.log(id, "uxarkvoxy");
  return (dispatch) => {
    dispatch(deleteEventRequest());
    request(`/admin/events/event/${id}`, "DELETE")
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          dispatch(deleteEventSuccess(data));
        }
      })
      .catch((e) => {
        dispatch(deleteEventFailure(e.message));
        // console.log(e);
      });
  };
};

const deleteEventRequest = () => {
  return {
    type: DELETE_EVENT_REQUEST,
  };
};

const deleteEventSuccess = (data) => {
  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deleteEventFailure = (error) => {
  return {
    type: DELETE_EVENT_FAILURE,
    payload: { error },
  };
};