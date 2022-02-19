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
        console.log(data, "speakers");
        dispatch(fetchSpeakersSuccess(data));
        if (data.count > 0 && data.length === 0) {
          // dispatch(changeCurrentPage(page));
          console.log(data);
        }
      })
      .catch((e) => {
        dispatch(fetchSpeakersFailure(e.message));
        // console.log(e);
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
