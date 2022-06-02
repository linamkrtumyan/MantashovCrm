import request from "../../request";
import {
  DELETE_BLOCK_REQUEST,
  DELETE_BLOCK_SUCCESS,
  DELETE_BLOCK_FAILURE,
} from "../types";

export const deleteEventBlock = (id, changePath) => {
  return (dispatch) => {
    dispatch(deleteEventBlockRequest());
    request(`/admin/events/eventDetails/${id}`, "DELETE")
      .then((data) => {
        if (data.success) {
          dispatch(deleteEventBlockSuccess(data));
          // changePath();
        }
      })
      .catch((e) => {
        dispatch(deleteEventBlockFailure(e.message));
      });
  };
};

const deleteEventBlockRequest = () => {
  return {
    type: DELETE_BLOCK_REQUEST,
  };
};

const deleteEventBlockSuccess = (data) => {
  return {
    type: DELETE_BLOCK_SUCCESS,
    payload: {},
  };
};

const deleteEventBlockFailure = (error) => {
  return {
    type: DELETE_BLOCK_FAILURE,
    payload: { error },
  };
};
