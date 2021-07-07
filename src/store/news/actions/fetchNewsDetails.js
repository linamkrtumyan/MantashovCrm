import request from "../../request";
import store from "../../../store";
import {
  FETCH_NEWS_DETAILS_REQUEST,
  FETCH_NEWS_DETAILS_SUCCESS,
  FETCH_NEWS_DETAILS_FAILURE,
} from "../types";

export const fetchNewsDetails = () => {
  //   const page = store.getState().paginationReducer.currentPage - 1;
  //   console.log(page, "uxarkvox page");
  //   ${id}
  return (dispatch) => {
    dispatch(fetchNewsDetailsRequest());
    request(`/admin/news/details/1`)
      .then((data) => {
        // console.log(data, "**************");
        dispatch(fetchNewsDetailsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchNewsDetailsFailure(e.message));
        console.log(e);
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
