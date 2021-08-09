import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_EVENT_DETAILS_REQUEST,
  FETCH_EVENT_DETAILS_SUCCESS,
  FETCH_EVENT_DETAILS_FAILURE,
} from "../types";

export const fetchEventDetails = (id) => {
  // console.log(id, "editiid");
  return (dispatch) => {
    dispatch(fetchEventDetailsRequest());
    request(`/admin/events/event/details/${id}`)
      .then((data) => {
        // console.log("mtav");
        console.log(data, "data");
        dispatch(initForm(data));
        dispatch(fetchEventDetailsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchEventDetailsFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchEventDetailsRequest = () => {
  return {
    type: FETCH_EVENT_DETAILS_REQUEST,
  };
};

const fetchEventDetailsSuccess = (data) => {
  const eventDetails = data ? data : [];
  return {
    type: FETCH_EVENT_DETAILS_SUCCESS,
    payload: {
        eventDetails,
    },
  };
};

const fetchEventDetailsFailure = (error) => {
  return {
    type: FETCH_EVENT_DETAILS_FAILURE,
    payload: { error },
  };
};
