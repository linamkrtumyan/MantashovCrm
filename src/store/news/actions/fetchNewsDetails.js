import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_NEWS_DETAILS_REQUEST,
  FETCH_NEWS_DETAILS_SUCCESS,
  FETCH_NEWS_DETAILS_FAILURE,
} from "../types";

export const fetchNewsDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchNewsDetailsRequest());
    request(`/admin/news/details/${id}`)
      .then((data) => {
        dispatch(initForm(data));
        dispatch(fetchNewsDetailsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchNewsDetailsFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchNewsDetailsRequest = () => {
  return {
    type: FETCH_NEWS_DETAILS_REQUEST,
  };
};

const fetchNewsDetailsSuccess = (data) => {
  const newsDetails = data ? data : [];
  return {
    type: FETCH_NEWS_DETAILS_SUCCESS,
    payload: {
      newsDetails,
    },
  };
};

const fetchNewsDetailsFailure = (error) => {
  return {
    type: FETCH_NEWS_DETAILS_FAILURE,
    payload: { error },
  };
};
