import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../types";

export const uploadImage = (img, key) => {
  // console.log("mtav");
  // console.log(img, "stacoxy");
  const data = new FormData();

  for (let i = 0; i < img.length; i++) {
    data.append(`image${i}`, img[i], img[i].name);
  }

  // console.log(data, "uxarkvoxy");

  return (dispatch) => {
    dispatch(uploadImageRequest());

    fetch("/admin/image", { method: "POST", body: data })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(uploadImageSuccess(data, img, key));
      })
      .catch((e) => {
        dispatch(uploadImageFailure(e.message));
        // console.log({e});
      });
  };
};

const uploadImageRequest = () => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
  };
};

const uploadImageSuccess = (data, urls, key) => {
  const image = data ? data : [];
  const loading = data ? false : true;
  const imgUrls = urls
    ? Array.from(urls).map((file) => URL.createObjectURL(file))
    : [];
  // const imgUrls = urls ? urls : [];
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: {
      image,
      imageUpload: loading,
      imgUrls,
      key,
      images: image,
    },
  };
};

const uploadImageFailure = (error) => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    payload: { error },
  };
};
