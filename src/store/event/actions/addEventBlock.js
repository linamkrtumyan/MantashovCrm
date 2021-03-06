import store from "../..";
import request from "../../request";
import {
  ADD_EVENT_BLOCK_REQUEST,
  ADD_EVENT_BLOCK_SUCCESS,
  ADD_EVENT_BLOCK_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addEventBlock = (block, callback = () => {}) => {
  const { blockImages } = store.getState().imageReducer;
  const { blockVideos } = store.getState().videoReducer;

  block.block.blockImages = blockImages ?? [];
  block.block.blockVideos = blockVideos ?? [];
  return (dispatch) => {
    dispatch(addEventBlockRequest());
    request("/admin/events/eventDetails", "POST", block)
      .then((data) => {
        if (data.success) {
          dispatch(addEventBlockSuccess(data));
          toast.dark("Event details added");
          callback();
        }
      })
      .catch((e) => {
        dispatch(addEventBlockFailure(e.errorMessage));
        toast.error("Something bad happened");
      });
  };
};

const addEventBlockRequest = () => {
  return {
    type: ADD_EVENT_BLOCK_REQUEST,
  };
};

const addEventBlockSuccess = (data) => {
  return {
    type: ADD_EVENT_BLOCK_SUCCESS,
    payload: { eventId: data.id },
  };
};

const addEventBlockFailure = (error) => {
  return {
    type: ADD_EVENT_BLOCK_FAILURE,
    payload: { error },
  };
};
