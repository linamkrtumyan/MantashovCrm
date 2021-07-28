import request from "../../request";
import store from "../../../store";
import {
  FETCH_EDUCATIONS_REQUEST,
  FETCH_EDUCATIONS_SUCCESS,
  FETCH_EDUCATIONS_FAILURE,
} from "../types";

export const fetchEducations = () => {
  // console.log(page, "uxarkvox page");

  return (dispatch) => {
    dispatch(fetchEducationsRequest());
    request("/admin/members/educations/all")
      .then((data) => {
        console.log(data, "data");
        dispatch(fetchEducationsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchEducationsFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchEducationsRequest = () => {
  return {
    type: FETCH_EDUCATIONS_REQUEST,
  };
};

const fetchEducationsSuccess = (data) => {
  const educations = data ? data : [];
  return {
    type: FETCH_EDUCATIONS_SUCCESS,
    payload: {
      educations,
    },
  };
};

const fetchEducationsFailure = (error) => {
  return {
    type: FETCH_EDUCATIONS_FAILURE,
    payload: { error },
  };
};
