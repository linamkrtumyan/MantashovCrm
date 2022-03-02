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
  SPEAKER_EDIT_REQUEST,
  SPEAKER_EDIT_SUCCESS,
  SPEAKER_EDIT_FAILURE,
  FETCH_SPEAKERS_BY_PAGE_REQUEST,
  FETCH_SPEAKERS_BY_PAGE_SUCCESS,
  FETCH_SPEAKERS_BY_PAGE_FAILURE,
  FETCH_SPEAKER_BY_ID_REQUEST,
  FETCH_SPEAKER_BY_ID_SUCCESS,
  FETCH_SPEAKER_BY_ID_FAILURE,
} from "./types";

const initialState = {
  speakers: [],
  loading: false,
  error: null,
  fetch: false,
  speakersByPage: [],
  count: 0,
  speakerDetails: {},
};

const speakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPEAKER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case FETCH_SPEAKER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        speakerDetails: action.payload.speakerDetails,
      };
    case FETCH_SPEAKER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        speakerDetails: {},
      };

    case FETCH_SPEAKERS_BY_PAGE_REQUEST:
      return { ...state, loading: true };
    case FETCH_SPEAKERS_BY_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        speakersByPage: action.payload.speakersByPage.speakers,
        count: action.payload.speakersByPage.count,
      };
    case FETCH_SPEAKERS_BY_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        speakersByPage: [],
      };
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
    case SPEAKER_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SPEAKER_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SPEAKER_EDIT_FAILURE:
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
