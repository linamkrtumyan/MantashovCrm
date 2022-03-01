import request from "../../request";
import {
  SPEAKER_EDIT_REQUEST,
  SPEAKER_EDIT_SUCCESS,
  SPEAKER_EDIT_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editSpeaker = (speaker, changePath) => {
  return (dispatch) => {
    dispatch(editSpeakerRequest());
    request("/admin/speakers/speaker", "PUT", speaker)
      .then((data) => {
        if (data.success) {
          dispatch(editSpeakerSuccess(data));
          toast.dark("Speaker's data edited");
          changePath();
        }
      })
      .catch((e) => {
        dispatch(editSpeakerFailure(e.errorMessage));
        toast.error("Something bad happened");
      });
  };
};

const editSpeakerRequest = () => {
  return {
    type: SPEAKER_EDIT_REQUEST,
  };
};

const editSpeakerSuccess = (data) => {
  return {
    type: SPEAKER_EDIT_SUCCESS,
    payload: {},
  };
};

const editSpeakerFailure = (error) => {
  return {
    type: SPEAKER_EDIT_FAILURE,
    payload: { error },
  };
};
