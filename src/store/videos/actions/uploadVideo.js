import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
} from "../types";
export const uploadVideo = (vid) => {
  const data = new FormData();
  for (let i = 0; i < vid.length; i++) {
    data.append(`image${i}`, vid[i], vid[i].name);
  }
  return (dispatch) => {
    dispatch(uploadVideoRequest());

    fetch("/admin/image", { method: "POST", body: data })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(uploadVideoSuccess(data));
      })
      .catch((e) => {
        dispatch(uploadVideoFailure(e.message));
        // console.log({e});
      });
  };
};

const uploadVideoRequest = () => {
  return {
    type: UPLOAD_VIDEO_REQUEST,
  };
};

const uploadVideoSuccess = (data) => {
  const video = data ? data : [];
  const loading = data ? false : true;
  return {
    type: UPLOAD_VIDEO_SUCCESS,
    payload: {
      video,
      videoUpload: loading,
    },
  };
};

const uploadVideoFailure = (error) => {
  return {
    type: UPLOAD_VIDEO_FAILURE,
    payload: { error },
  };
};
