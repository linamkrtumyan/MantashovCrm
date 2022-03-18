import request from "../../request";
import {
  UPLOAD_ONE_IMAGE_REQUEST,
  UPLOAD_ONE_IMAGE_SUCCESS,
  UPLOAD_ONE_IMAGE_FAILURE,
} from "../types";

export const uploadOneImage = (img, url) => {
  const data = new FormData();
  for (let i = 0; i < img.length; i++) {
    data.append(`image${i}`, img[i], img[i].name);
  }


  return (dispatch) => {
    dispatch(uploadOneImageRequest());
    fetch("/admin/image", { method: "POST", body: data })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(uploadOneImageSuccess(data, url));
      })
      .catch((e) => {
        dispatch(uploadOneImageFailure(e.message));
      });
  };
};

const uploadOneImageRequest = () => {
  return {
    type: UPLOAD_ONE_IMAGE_REQUEST,
  };
};

const uploadOneImageSuccess = (data, url) => {
  const headerData = data ? data[0] : "";
  const header = [{ url, name: headerData }];
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
