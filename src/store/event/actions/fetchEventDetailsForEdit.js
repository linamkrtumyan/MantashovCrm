import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_EVENT_FOR_EDIT_REQUEST,
  FETCH_EVENT_FOR_EDIT_SUCCESS,
  FETCH_EVENT_FOR_EDIT_FAILURE,
} from "../types";

export const fetchEventDetailsForEdit = (id) => {
  // console.log(id, "editiid");
  return (dispatch) => {
    dispatch(fetchEventDetailsForEditRequest());
    request(`/admin/events/event/detailsForEdit/${id}`)
      .then((data) => {
        // console.log("mtav");
        console.log(data, "data");
        dispatch(initForm(data));
        dispatch(fetchEventDetailsForEditSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchEventDetailsForEditFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchEventDetailsForEditRequest = () => {
  return {
    type: FETCH_EVENT_FOR_EDIT_REQUEST,
  };
};

const fetchEventDetailsForEditSuccess = (data) => {
  const eventForEdit = data ? data : [];
  return {
    type: FETCH_EVENT_FOR_EDIT_SUCCESS,
    payload: {
      eventForEdit,
    },
  };
};

const fetchEventDetailsForEditFailure = (error) => {
  return {
    type: FETCH_EVENT_FOR_EDIT_FAILURE,
    payload: { error },
  };
};
