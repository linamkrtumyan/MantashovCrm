import request from "../../request";
import {
  FETCH_ALL_SPEAKERS_REQUEST,
  FETCH_ALL_SPEAKERS_SUCCESS,
  FETCH_ALL_SPEAKERS_FAILURE,
} from "../types";

export const getSpeakers = () => {
  return (dispatch) => {
    dispatch(fetchAllSpeakersRequest());
    request(`/admin/speakers/all`)
      .then((data) => {
        dispatch(fetchAllSpeakersSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchAllSpeakersFailure(e.message));
      });
  };
};

const fetchAllSpeakersRequest = () => {
  return {
    type: FETCH_ALL_SPEAKERS_REQUEST,
  };
};

const fetchAllSpeakersSuccess = (data) => {
  const speakers = data ? data : [];
  return {
    type: FETCH_ALL_SPEAKERS_SUCCESS,
    payload: {
      speakers,
    },
  };
};

const fetchAllSpeakersFailure = (error) => {
  return {
    type: FETCH_ALL_SPEAKERS_FAILURE,
    payload: { error },
  };
};
