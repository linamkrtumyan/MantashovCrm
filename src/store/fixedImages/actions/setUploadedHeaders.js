import { SET_UPLOADED_HEADERS } from "../types";

export const setUploadedHeaders = (headers) => {
  return (dispatch) => {
    dispatch({
      type: SET_UPLOADED_HEADERS,
      payload: { uploadedHeaders },
    });
  };
};
