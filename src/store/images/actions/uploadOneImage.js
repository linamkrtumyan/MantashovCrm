import request from "../../request";
import {
  UPLOAD_ONE_IMAGE_REQUEST,
  UPLOAD_ONE_IMAGE_SUCCESS,
  UPLOAD_ONE_IMAGE_FAILURE,
} from "../types";

export const uploadOneImage = (img) => {
  // console.log("mtav");
  // console.log(img, "stacoxy");
  const data = new FormData();
  for (let i = 0; i < img.length; i++) {
    data.append(`image${i}`, img[i], img[i].name);
  }

  // console.log(data, "uxarkvoxy");

  return (dispatch) => {
    dispatch(uploadOneImageRequest());
    // console.log("stieq");
    fetch("/admin/image", { method: "POST", body: data })
      .then((res) => {
        // console.log(res, "res");
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch(uploadOneImageSuccess(data));
      })
      .catch((e) => {
        dispatch(uploadOneImageFailure(e.message));
        // console.log(e);
      });
  };
};

const uploadOneImageRequest = () => {
  return {
    type: UPLOAD_ONE_IMAGE_REQUEST,
  };
};

const uploadOneImageSuccess = (data) => {
  // console.log(data, "data");
  const header = data ? data : [];
  //   console.log(typeof image);
  return {
    type: UPLOAD_ONE_IMAGE_SUCCESS,
    payload: {
      header,
    },
  };
};

const uploadOneImageFailure = (error) => {
  return {
    type: UPLOAD_ONE_IMAGE_FAILURE,
    payload: { error },
  };
};
