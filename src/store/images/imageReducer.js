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
  loading: true,
  image: [],
  error: null,
  deletedImages: [],
  header: "",
};

const reducer = (state = initialState, action) => {
  // console.log(action, "Action  ****");
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
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
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        image: "",
        error: action.payload.error,
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
      };
    case UPLOAD_ONE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        header: action.payload.header,
        error: null,
      };
    case UPLOAD_ONE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        header: "",
        error: action.payload.error,
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
