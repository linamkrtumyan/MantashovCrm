import { SET_UPLOADED_PHOTOS } from "../types";

export const setUploadedPhotos = (uploadedPhotos) => {
  return (dispatch) => {
    dispatch({
      type: SET_UPLOADED_PHOTOS,
      payload: { uploadedPhotos },
    });
  };
};
