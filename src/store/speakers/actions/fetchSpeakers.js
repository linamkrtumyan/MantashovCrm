import request from "../../request";
import store from "../../../store";
import {
  FETCH_SPEAKERS_REQUEST,
  FETCH_SPEAKERS_SUCCESS,
  FETCH_SPEAKERS_FAILURE,
} from "../types";
// import { changeCurrentPage } from "../../pagination/actions";

export const fetchSpeakers = () => {
  // const page = store.getState().paginationReducer.currentPage;

  return (dispatch) => {
    dispatch(fetchSpeakersRequest());
    request(`/admin/speakers/all`)
      .then((data) => {
        dispatch(fetchSpeakersSuccess(data));
        if (data.count > 0 && data.length === 0) {
          // dispatch(changeCurrentPage(page));
        }
      })
      .catch((e) => {
        dispatch(fetchSpeakersFailure(e.message));
      });
  };
};

const fetchSpeakersRequest = () => {
  return {
    type: FETCH_SPEAKERS_REQUEST,
  };
};

const fetchSpeakersSuccess = (data) => {
  const speakers = data ? data : [];
  return {
    type: FETCH_SPEAKERS_SUCCESS,
    payload: {
      speakers,
    },
  };
};

const fetchSpeakersFailure = (error) => {
  return {
    type: FETCH_SPEAKERS_FAILURE,
    payload: { error },
  };
};
