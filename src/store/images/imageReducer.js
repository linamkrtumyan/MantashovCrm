import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  image: [],
  error: null,
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
        image: action.payload.image,
        error: null,
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        image: "",
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
