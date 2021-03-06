import { formOnChange } from "../..";
import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_EVENT_DETAILS_REQUEST,
  FETCH_EVENT_DETAILS_SUCCESS,
  FETCH_EVENT_DETAILS_FAILURE,
} from "../types";

export const fetchEventDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchEventDetailsRequest());
    request(`/admin/events/event/details/${id}`)
      .then((data) => {
        // dispatch(formOnChange("shortDescriptionEng", data.shortDescriptionEng));
        dispatch(fetchEventDetailsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchEventDetailsFailure(e.message));
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
