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
} from "./types";

const initialState = {
  loading: false,
  image: [],
  error: null,
  deletedImages: [],
  header: "",
  oneImageLoading: false,
};

const reducer = (state = initialState, action) => {
  // console.log(action, "Action  ****");
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        imageUpload: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        // image: action.payload.image,
        // image: [...state.image, action.payload.image],
        image: state.image.concat(action.payload.image),

        // image: state.image.push(action.payload.image),
        error: null,
        imageUpload: action.payload.imageUpload,
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        image: "",
        error: action.payload.error,
        imageUpload: false,
      };
    case CLEAN_IMAGES:
      return {
        ...state,
        image: [],
        deletedImages: [],
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
      };
    default:
      return state;
  }
};

export default reducer;
