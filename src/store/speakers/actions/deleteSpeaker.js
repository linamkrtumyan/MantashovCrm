import request from "../../request";
import {
  DELETE_SPEAKER_REQUEST,
  DELETE_SPEAKER_SUCCESS,
  DELETE_SPEAKER_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteSpeaker = (id) => {
  console.log("666666666666666");
  return (dispatch) => {
    dispatch(deleteSpeakerRequest());
    request(`/admin/speakers/${id}`, "DELETE")
      .then((data) => {
        dispatch(deleteSpeakerSuccess(data));
        toast.dark("Member removed");
      })
      .catch((e) => {
        dispatch(deleteSpeakerFailure(e.errorMessage));
        toast.error("Something bad happened");
      });
  };
};

const deleteSpeakerRequest = () => {
  return {
    type: DELETE_SPEAKER_REQUEST,
  };
};

const deleteSpeakerSuccess = (data) => {
  return {
    type: DELETE_SPEAKER_SUCCESS,
    payload: {},
  };
};

const deleteSpeakerFailure = (error) => {
  return {
    type: DELETE_SPEAKER_FAILURE,
    payload: { error },
  };
};
