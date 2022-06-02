import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  CLEAN_VIDEOS,
  DELETED_VIDEOS,
  DELETE_VIDEO_FROM_STORE,
  CLEAN_VIDEOS_WITH_KEY,
} from "./types";

const initialState = {
  loading: false,
  video: [],
  error: null,
  deletedVideos: [],
  videoUpload: false,
  videoUrls: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
        videoUpload: true,
      };
    case UPLOAD_VIDEO_SUCCESS:
      if (!state[action.payload.key]) {
        state[action.payload.key] = [];
      }
      return {
        ...state,
        loading: false,
        video: state.video.concat(action.payload.video),
        error: null,
        videoUpload: action.payload.videoUpload,
        videoUrls: action.payload.videoUrls,
        [action.payload.key]: action.payload.videos.concat(
          state[action.payload.key]
        ),
      };
    case UPLOAD_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        video: "",
        error: action.payload.error,
        videoUpload: false,
      };
    case CLEAN_VIDEOS:
      return {
        ...state,
        video: [],
        deletedVideos: [],
        videoUrls: [],
      };
    case CLEAN_VIDEOS_WITH_KEY:
      if (!state[action.payload.key]) {
        state[action.payload.key] = [];
      }
      return {
        ...state,
        [action.payload.key]: [],
      };
    case DELETED_VIDEOS:
      return {
        ...state,
        deletedVideos: state.deletedVideos.concat(action.payload.deletedVideo),
      };
    case DELETE_VIDEO_FROM_STORE:
      return {
        ...state,
        video: [
          ...state.video.slice(0, action.payload.deleteId),
          ...state.video.slice(action.payload.deleteId + 1),
        ],
        [action.payload.key]: [
          ...state[action.payload.key].slice(0, action.payload.deleteId),
          ...state[action.payload.key].slice(action.payload.deleteId + 1),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
