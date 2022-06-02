import request from "../../request";
import store from "../../../store";
import {
  FETCH_UPCOMING_EVENTS_REQUEST,
  FETCH_UPCOMING_EVENTS_SUCCESS,
  FETCH_UPCOMING_EVENTS_FAILURE,
} from "../types";

export const fetchUpcomingEvents = (page) => {
  return (dispatch) => {
    dispatch(fetchUpcomingEventsRequest());
    request(`/admin/events/upcoming/${page}`)
      .then((data) => {
        dispatch(fetchUpcomingEventsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchUpcomingEventsFailure(e.message));
      });
  };
};

const fetchUpcomingEventsRequest = () => {
  return {
    type: FETCH_UPCOMING_EVENTS_REQUEST,
  };
};

const fetchUpcomingEventsSuccess = (data) => {
  const upcomingEvents = data ? data : [];
  return {
    type: FETCH_UPCOMING_EVENTS_SUCCESS,
    payload: {
      upcomingEvents,
    },
  };
};

const fetchUpcomingEventsFailure = (error) => {
  return {
    type: FETCH_UPCOMING_EVENTS_FAILURE,
    payload: { error },
  };
};
