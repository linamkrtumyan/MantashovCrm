import {
  UPLOAD_FIXED_IMAGE_REQUEST,
  UPLOAD_FIXED_IMAGE_SUCCESS,
  UPLOAD_FIXED_IMAGE_FAILURE,
  CLEAN_FIXED_IMAGES,
  DELETED_FIXED_IMAGES,
  DELETE_FIXED_IMAGES_FROM_STORE,
  SET_UPLOADED_HEADERS
} from "./types";

const initialState = {
  loading: false,
  fixedImages: [],
  error: null,
  deletedFixedImages: [],
  fixedImagesUpload: false,
  fixedImagesUrls: [],
  uploadedHeaders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOADED_HEADERS:
      return {
        ...state,
        loading: false,
        fixedImagesUpload: false,
        uploadedHeaders: action.payload.uploadedHeaders,
      };
    case UPLOAD_FIXED_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        fixedImagesUpload: true,
      };
    case UPLOAD_FIXED_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        fixedImages: state.fixedImages.concat(action.payload.fixedImages),
        error: null,
        fixedImagesUpload: action.payload.fixedImagesUpload,
        fixedImagesUrls: action.payload.fixedImagesUrls,
        
      };
    case UPLOAD_FIXED_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        fixedImages: "",
        error: action.payload.error,
        fixedImagesUpload: false,
      };
    case CLEAN_FIXED_IMAGES:
      return {
        ...state,
        fixedImages: [],
        deletedFixedImages: [],
      };
    case DELETED_FIXED_IMAGES:
      return {
        ...state,
        deletedFixedImages: state.deletedFixedImages.concat(
          action.payload.deletedVideo
        ),
      };
    case DELETE_FIXED_IMAGES_FROM_STORE:
      return {
        ...state,
        fixedImages: [
          ...state.fixedImages.slice(0, action.payload.deleteId),
          ...state.fixedImages.slice(action.payload.deleteId + 1),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
