import {
  UPLOAD_FIXED_IMAGE_REQUEST,
  UPLOAD_FIXED_IMAGE_SUCCESS,
  UPLOAD_FIXED_IMAGE_FAILURE,
} from "../types";
export const uploadFixedImages = (img) => {
  const data = new FormData();
  for (let i = 0; i < img.length; i++) {
    data.append(`image${i}`, img[i], img[i].name);
  }
  return (dispatch) => {
    dispatch(uploadFixedImagesRequest());

    fetch("/admin/image", { method: "POST", body: data })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(uploadFixedImagesSuccess(data, img));
      })
      .catch((e) => {
        dispatch(uploadFixedImagesFailure(e.message));
        // console.log({e});
      });
  };
};

const uploadFixedImagesRequest = () => {
  return {
    type: UPLOAD_FIXED_IMAGE_REQUEST,
  };
};

const uploadFixedImagesSuccess = (data, urls) => {
  const fixedImages = data ? data : [];
  const loading = data ? false : true;
  const fixedImagesUrls = urls
    ? Array.from(urls).map((file) => URL.createObjectURL(file))
    : [];
  return {
    type: UPLOAD_FIXED_IMAGE_SUCCESS,
    payload: {
      fixedImages,
      fixedImagesUpload: loading,
      fixedImagesUrls,
    },
  };
};

const uploadFixedImagesFailure = (error) => {
  return {
    type: UPLOAD_FIXED_IMAGE_FAILURE,
    payload: { error },
  };
};
