import request from "../../request";
import store from "../../../store";
import {
  FETCH_PAST_EVENTS_REQUEST,
  FETCH_PAST_EVENTS_SUCCESS,
  FETCH_PAST_EVENTS_FAILURE,
} from "../types";

export const fetchPastEvents = (page) => {
  return (dispatch) => {
    dispatch(fetchPastEventsRequest());
    request(`/admin/events/past/${page}`)
      .then((data) => {
        dispatch(fetchPastEventsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchPastEventsFailure(e.message));
      });
  };
};

const fetchPastEventsRequest = () => {
  return {
    type: FETCH_PAST_EVENTS_REQUEST,
  };
};

const fetchPastEventsSuccess = (data) => {
  const pastEvents = data ? data : [];
  return {
    type: FETCH_PAST_EVENTS_SUCCESS,
    payload: {
      pastEvents,
    },
  };
};

const fetchPastEventsFailure = (error) => {
  return {
    type: FETCH_PAST_EVENTS_FAILURE,
    payload: { error },
  };
};
