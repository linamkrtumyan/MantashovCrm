import {
  UPLOAD_FIXED_IMAGE_REQUEST,
  UPLOAD_FIXED_IMAGE_SUCCESS,
  UPLOAD_FIXED_IMAGE_FAILURE,
} from "../types";

export const setEventFixedImage = (img, eventId, key, isFetch) => {
  const data = new FormData();

  data.append(`${key}`, img[0], img[0].name);


  return (dispatch) => {
    dispatch(uploadFixedImageRequest());

    fetch(`/admin/events/fixedImage/${eventId}/${key}`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(uploadFixedImageSuccess(data, key, isFetch));
      })
      .catch((e) => {
        dispatch(uploadFixedImageFailure(e.message));
      });
  };
};

const uploadFixedImageRequest = () => {
  return {
    type: UPLOAD_FIXED_IMAGE_REQUEST,
  };
};

const uploadFixedImageSuccess = (data, key, isFetch) => {
  const fixedImage = data ? data : [];
  const loading = data ? false : true;
  return {
    type: UPLOAD_FIXED_IMAGE_SUCCESS,
    payload: {
      fixedImage: { name: key, image: fixedImage },
      imageUpload: loading,
      key,
      isFetch,
    },
  };
};

const uploadFixedImageFailure = (error) => {
  return {
    type: UPLOAD_FIXED_IMAGE_FAILURE,
    payload: { error },
  };
};
