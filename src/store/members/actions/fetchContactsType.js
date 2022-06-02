import request from "../../request";
import store from "../../../store";
import {
  FETCH_CONTACT_TYPES_REQUEST,
  FETCH_CONTACT_TYPES_SUCCESS,
  FETCH_CONTACT_TYPES_FAILURE,
} from "../types";

export const fetchContactTypes = () => {

  return (dispatch) => {
    dispatch(fetchContactTypesRequest());
    request("/admin/members/contact/types")
      .then((data) => {
        dispatch(fetchContactTypesSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchContactTypesFailure(e.message));
      });
  };
};

const fetchContactTypesRequest = () => {
  return {
    type: FETCH_CONTACT_TYPES_REQUEST,
  };
};

const fetchContactTypesSuccess = (data) => {
  const contactTypes = data ? data : [];
  return {
    type: FETCH_CONTACT_TYPES_SUCCESS,
    payload: {
      contactTypes,
    },
  };
};

const fetchContactTypesFailure = (error) => {
  return {
    type: FETCH_CONTACT_TYPES_FAILURE,
    payload: { error },
  };
};
