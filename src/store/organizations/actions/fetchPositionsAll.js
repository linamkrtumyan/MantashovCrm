import request from "../../request";
import store from "../..";
import {
  FETCH_POSITIONS_ALL_REQUEST,
  FETCH_POSITIONS_ALL_SUCCESS,
  FETCH_POSITIONS_ALL_FAILURE,
} from "../types";

export const fetchPositionsAll = () => {
  return (dispatch) => {
    dispatch(fetchPositionsAllRequest());
    request("/admin/organizations/positionsForAdmin")
      .then((data) => {
        dispatch(fetchPositionsAllSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchPositionsAllFailure(e.message));
      });
  };
};

const fetchPositionsAllRequest = () => {
  return {
    type: FETCH_POSITIONS_ALL_REQUEST,
  };
};

const fetchPositionsAllSuccess = (data) => {
  const positionsAll = data ? data : [];
  return {
    type: FETCH_POSITIONS_ALL_SUCCESS,
    payload: {
      positionsAll,
    },
  };
};

const fetchPositionsAllFailure = (error) => {
  return {
    type: FETCH_POSITIONS_ALL_FAILURE,
    payload: { error },
  };
};
