import request from "../../request";
import store from "../..";
import {
  FETCH_POSITIONS_REQUEST,
  FETCH_POSITIONS_SUCCESS,
  FETCH_POSITIONS_FAILURE,
} from "../types";

export const fetchPositions = () => {
  return (dispatch) => {
    dispatch(fetchPositionsRequest());
    request("/admin/organizations/positions")
      .then((data) => {
        dispatch(fetchPositionsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchPositionsFailure(e.message));
      });
  };
};

const fetchPositionsRequest = () => {
  return {
    type: FETCH_POSITIONS_REQUEST,
  };
};

const fetchPositionsSuccess = (data) => {
  const positions = data ? data : [];
  return {
    type: FETCH_POSITIONS_SUCCESS,
    payload: {
      positions,
    },
  };
};

const fetchPositionsFailure = (error) => {
  return {
    type: FETCH_POSITIONS_FAILURE,
    payload: { error },
  };
};
