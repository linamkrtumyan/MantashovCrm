import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  CLEAN_VIDEOS,
  DELETED_VIDEOS,
  DELETE_VIDEO_FROM_STORE,
} from "./types";

const initialState = {
  loading: false,
  video: [],
  error: null,
  deletedVideos: [],
  videoUpload: false,
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
      return {
        ...state,
        loading: false,
        video: state.video.concat(action.payload.video),
        error: null,
        videoUpload: action.payload.videoUpload,
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
      };
    default:
      return state;
  }
};

export default reducer;
