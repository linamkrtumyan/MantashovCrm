import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_EVENT_DETAILS_FOR_EDIT_REQUEST,
  FETCH_EVENT_DETAILS_FOR_EDIT_SUCCESS,
  FETCH_EVENT_DETAILS_FOR_EDIT_FAILURE,
} from "../types";


export const getEventForEdit = (id) => {
  return (dispatch) => {
    dispatch(fetchEventForEditRequest());
    request(`/admin/events/event/${id}`)
      .then((data) => {
        dispatch(initForm(data));
        dispatch(fetchEventForEditSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchEventForEditFailure(e.message));
      });
  };
};

const fetchEventForEditRequest = () => {
  return {
    type: FETCH_EVENT_DETAILS_FOR_EDIT_REQUEST,
  };
};

const fetchEventForEditSuccess = (data) => {
  const eventDetailsForEdit = data ? data : [];

  return {
    type: FETCH_EVENT_DETAILS_FOR_EDIT_SUCCESS,
    payload: {
      eventDetailsForEdit,
    },
  };
};

const fetchEventForEditFailure = (error) => {
  return {
    type: FETCH_EVENT_DETAILS_FOR_EDIT_FAILURE,
    payload: { error },
  };
};
