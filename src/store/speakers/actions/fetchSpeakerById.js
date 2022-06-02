import request from "../../request";
import store from "../../../store";
import {
  FETCH_SPEAKER_BY_ID_REQUEST,
  FETCH_SPEAKER_BY_ID_SUCCESS,
  FETCH_SPEAKER_BY_ID_FAILURE,
} from "../types";
import { initForm } from "../../form/actions/initForm";

export const fetchSpeakerById = (id) => {
  return (dispatch) => {
    dispatch(fetchSpeakerByIdRequest());
    request(`/admin/speakers/speaker/${id}`)
      .then((data) => {
        dispatch(initForm(data));
        dispatch(fetchSpeakerByIdSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchSpeakerByIdFailure(e.message));
      });
  };
};

const fetchSpeakerByIdRequest = () => {
  return {
    type: FETCH_SPEAKER_BY_ID_REQUEST,
  };
};

const fetchSpeakerByIdSuccess = (data) => {
  const speakerDetails = data ? data : {};
  return {
    type: FETCH_SPEAKER_BY_ID_SUCCESS,
    payload: {
      speakerDetails,
    },
  };
};

const fetchSpeakerByIdFailure = (error) => {
  return {
    type: FETCH_SPEAKER_BY_ID_FAILURE,
    payload: { error },
  };
};
