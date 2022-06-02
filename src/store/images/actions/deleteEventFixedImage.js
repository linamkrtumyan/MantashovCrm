import request from "../../request";
import {
  DELETE_EVENT_FIXED_IMAGE_REQUEST,
  DELETE_EVENT_FIXED_IMAGE_SUCCESS,
  DELETE_EVENT_FIXED_IMAGE_FAILURE,
} from "../types";

export const deleteEventFixedImage = (eventId, key) => {
  return (dispatch) => {
    dispatch(deleteEventFixedImageRequest());
    request(`/admin/events/fixedImage/${eventId}/${key}`, "DELETE")
      .then((data) => {
        if (data) {
          dispatch(deleteEventFixedImageSuccess(data));
        }
      })
      .catch((e) => {
        dispatch(deleteEventFixedImageFailure(e.message));
      });
  };
};

const deleteEventFixedImageRequest = () => {
  return {
    type: DELETE_EVENT_FIXED_IMAGE_REQUEST,
  };
};

const deleteEventFixedImageSuccess = (data) => {
  return {
    type: DELETE_EVENT_FIXED_IMAGE_SUCCESS,
    payload: {},
  };
};

const deleteEventFixedImageFailure = (error) => {
  return {
    type: DELETE_EVENT_FIXED_IMAGE_FAILURE,
    payload: { error },
  };
};
