import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  CLEAN_IMAGES,
  DELETED_IMAGES,
  UPLOAD_ONE_IMAGE_REQUEST,
  UPLOAD_ONE_IMAGE_SUCCESS,
  UPLOAD_ONE_IMAGE_FAILURE,
  DELETE_IMAGE_FROM_STORE,
  DELETE_HEADER,
  UPLOAD_FIXED_IMAGE_REQUEST,
  UPLOAD_FIXED_IMAGE_SUCCESS,
  UPLOAD_FIXED_IMAGE_FAILURE,
  DELETE_EVENT_FIXED_IMAGE_REQUEST,
  DELETE_EVENT_FIXED_IMAGE_SUCCESS,
  DELETE_EVENT_FIXED_IMAGE_FAILURE,
  CLEAN_IMAGES_WITH_KEY,
} from "./types";

const initialState = {
  loading: false,
  image: [],
  error: null,
  deletedImages: [],
  header: "",
  oneImageLoading: false,
  headers: [],
  imageUpload: false,
  imgUrls: [],
  fixedImages: [],
  fetch: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        imageUpload: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      if (!state[action.payload.key]) {
        state[action.payload.key] = [];
      }
      return {
        ...state,
        loading: false,
        image: state.image.concat(action.payload.image),
        error: null,
        imageUpload: action.payload.imageUpload,
        imgUrls: action.payload.imgUrls,
        [action.payload.key]: action.payload.images.concat(
          state[action.payload.key]
        ),
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        image: "",
        error: action.payload.error,
        imageUpload: false,
      };

    case UPLOAD_FIXED_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        imageUpload: true,
      };
    case UPLOAD_FIXED_IMAGE_SUCCESS:
      if (!state[action.payload.key]) {
        state[action.payload.key] = [];
      }
      return {
        ...state,
        loading: false,
        // fixedImages: state.fixedImage.concat(action.payload.fixedImage),
        error: null,
        imageUpload: action.payload.imageUpload,
        // [action.payload.key]: action.payload.images.concat(
        //   state[action.payload.key]
        // ),
        // [action.payload.key]: action.payload.fixedImage,
        fetch: action.payload.isFetch,
      };
    case UPLOAD_FIXED_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        fixedImage: "",
        error: action.payload.error,
        imageUpload: false,
      };
    case DELETE_EVENT_FIXED_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EVENT_FIXED_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        imageUpload: false,
        fetch: !state.fetch,
      };
    case DELETE_EVENT_FIXED_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        fixedImage: "",
        error: action.payload.error,
        imageUpload: false,
      };
    case CLEAN_IMAGES:
      return {
        ...state,
        image: [],
        deletedImages: [],
        headers: [],
        header: "",
        imgUrls: [],
      };
    case CLEAN_IMAGES_WITH_KEY:
      if (!state[action.payload.key]) {
        state[action.payload.key] = [];
      }
      return {
        ...state,
        [action.payload.key]: [],
      };
    case DELETED_IMAGES:
      return {
        ...state,
        deletedImages: state.deletedImages.concat(action.payload.deletedImage),
      };

    case UPLOAD_ONE_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        oneImageLoading: true,
      };
    case UPLOAD_ONE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        header: action.payload.header,
        headers: [...state.headers.concat(action.payload.header)],
        error: null,
        oneImageLoading: action.payload.loading,
      };
    case UPLOAD_ONE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        header: "",
        error: action.payload.error,
        oneImageLoading: false,
      };

    case DELETE_IMAGE_FROM_STORE:
      return {
        ...state,
        image: [
          ...state.image.slice(0, action.payload.deleteId),
          ...state.image.slice(action.payload.deleteId + 1),
        ],
        [action.payload.key]: [
          ...state[action.payload.key].slice(0, action.payload.deleteId),
          ...state[action.payload.key].slice(action.payload.deleteId + 1),
        ],
      };
    case DELETE_HEADER:
      return {
        ...state,
        headers: [
          ...state.headers.slice(0, action.payload.deletedHeaderId),
          ...state.headers.slice(action.payload.deletedHeaderId + 1),
        ],
        header: [],
      };
    default:
      return state;
  }
};

export default reducer;
