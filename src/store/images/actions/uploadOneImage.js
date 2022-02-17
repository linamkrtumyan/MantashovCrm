import request from "../../request";
import {
  UPLOAD_ONE_IMAGE_REQUEST,
  UPLOAD_ONE_IMAGE_SUCCESS,
  UPLOAD_ONE_IMAGE_FAILURE,
} from "../types";

export const uploadOneImage = (img, index) => {
  // console.log("mtav");
  // console.log(img, "stacoxy", URL.createObjectURL(img[0]));
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
        dispatch(
          uploadOneImageSuccess(data, URL.createObjectURL(img[0])),
          index
        );
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

const uploadOneImageSuccess = (data, url, index) => {
  const headerData = data ? data[0] : "";
  const header = [{ url, name: headerData, index }];
  // console.log(typeof image);
  const loading = data ? false : true;
  return {
    type: UPLOAD_ONE_IMAGE_SUCCESS,
    payload: {
      header,
      oneImageLoading: loading,
    },
  };
};

const uploadOneImageFailure = (error) => {
  return {
    type: UPLOAD_ONE_IMAGE_FAILURE,
    payload: { error },
  };
};
