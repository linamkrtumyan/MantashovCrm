import store from "../..";
import request from "../../request";
import {
  ADD_SPEAKER_REQUEST,
  ADD_SPEAKER_SUCCESS,
  ADD_SPEAKER_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addSpeaker = (speaker, changePath) => {
  return (dispatch) => {
    dispatch(addSpeakerRequest());
    request("/admin/speakers/speaker", "POST", speaker)
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          dispatch(addSpeakerSuccess(data));
          toast.dark("Speaker added");

          changePath();
        } else {
          dispatch(addSpeakerFailure(data.errorMessage));

          toast.error(data.errorMessage);
        }
      })
      .catch((e) => {
        dispatch(addSpeakerFailure(e.message));
        toast.error("Something bad happened");
        console.log({ error: e });
      });
  };
};

const addSpeakerRequest = () => {
  return {
    type: ADD_SPEAKER_REQUEST,
  };
};

const addSpeakerSuccess = (data) => {
  return {
    type: ADD_SPEAKER_SUCCESS,
    payload: {},
  };
};

const addSpeakerFailure = (error) => {
  return {
    type: ADD_SPEAKER_FAILURE,
    payload: { error },
  };
};
