import request from "../../request";
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../types";

export const uploadImage = (img) => {
  console.log(img, "stacoxy");
  const data = new FormData();
  //   const fileField = document.querySelector('input[type="file"]');

  data.append("image", img, img.name);
  // data.append()

  console.log(data, "uxarkvoxy");

  return (dispatch) => {
    dispatch(uploadImageRequest());

    fetch("/api/image", { method: "POST", body: data })
      .then((res) => {
        // console.log(res.json());

        // console.log(res, "res");
        return res.text();
        // )
      })
      .then((data) => {
        console.log(data);
        dispatch(uploadImageSuccess(data));
      })
      .catch((e) => {
        dispatch(uploadImageFailure(e.message));
        console.log(e);
      });
  };
};

const uploadImageRequest = () => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
  };
};

const uploadImageSuccess = (data) => {
  //   console.log(data, "res json");
  const image = data ? data : [];
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: {
      image,
    },
  };
};

const uploadImageFailure = (error) => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    payload: { error },
  };
};
