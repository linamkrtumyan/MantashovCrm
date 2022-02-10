import request from "../../request";
import store from "../..";
import {
  FETCH_APPLICANTS_REQUEST,
  FETCH_APPLICANTS_SUCCESS,
  FETCH_APPLICANTS_FAILURE,
} from "../types";
import { changeCurrentPage } from "../../pagination/actions";

export const fetchApplicants = () => {
  const page = store.getState().paginationReducer.currentPage;

  return (dispatch) => {
    dispatch(fetchApplicantsRequest());
    request(`/admin/applicants/${page}`)
      .then((data) => {
        dispatch(fetchApplicantsSuccess(data));
        if (data.count > 0 && data.applicants.length === 0) {
          dispatch(changeCurrentPage(page));
        }
      })
      .catch((e) => {
        dispatch(fetchApplicantsFailure(e.message));
      });
  };
};

const fetchApplicantsRequest = () => {
  return {
    type: FETCH_APPLICANTS_REQUEST,
  };
};

const fetchApplicantsSuccess = (data) => {
  const applicants = data ? data.applicants : [];
  return {
    type: FETCH_APPLICANTS_SUCCESS,
    payload: {
      applicants,
    },
  };
};

const fetchApplicantsFailure = (error) => {
  return {
    type: FETCH_APPLICANTS_FAILURE,
    payload: { error },
  };
};
