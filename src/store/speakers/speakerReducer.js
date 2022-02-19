import {
  FETCH_SPEAKERS_REQUEST,
  FETCH_SPEAKERS_SUCCESS,
  FETCH_SPEAKERS_FAILURE,
  DELETE_SPEAKER_REQUEST,
  DELETE_SPEAKER_SUCCESS,
  DELETE_SPEAKER_FAILURE,
  ADD_SPEAKER_REQUEST,
  ADD_SPEAKER_SUCCESS,
  ADD_SPEAKER_FAILURE,
} from "./types";

const initialState = {
  speakers: [],
  loading: false,
  error: null,
  fetch: false,
};

const speakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPEAKERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_SPEAKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        speakers: action.payload.speakers,
      };
    case FETCH_SPEAKERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        speakers: [],
      };
    case DELETE_SPEAKER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SPEAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        fetch: !state.fetch,
      };
    case DELETE_SPEAKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_SPEAKER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SPEAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_SPEAKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};

export default speakerReducer;
