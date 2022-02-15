import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../types";

export const uploadImage = (img, type) => {
  // console.log({type}, "|||||||||||");
  // console.log("mtav");
  // console.log({ img }, "stacoxy");
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
        dispatch(uploadImageSuccess(data, img, type));
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

const uploadImageSuccess = (data, img, type) => {
  const image = data ? (type !== "video" ? data : []) : [];
  const videos = type === "video" ? data : [];
  // console.log(typeof image);
  const loading = data ? false : true;
  const imagesUrls = img;
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: {
      image,
      imageUpload: loading,
      imagesUrls,
      videos,
    },
  };
};

const uploadImageFailure = (error) => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    payload: { error },
  };
};
