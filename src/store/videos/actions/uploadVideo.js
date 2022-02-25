import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
} from "../types";
export const uploadVideo = (vid, key) => {
  console.log({ key });
  const data = new FormData();
  for (let i = 0; i < vid.length; i++) {
    data.append(`video${i}`, vid[i], vid[i].name);
  }
  return (dispatch) => {
    dispatch(uploadVideoRequest());

    fetch("/admin/video", { method: "POST", body: data })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log({ dataaaaaa: data });
        dispatch(uploadVideoSuccess(data, vid, key));
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

const uploadVideoSuccess = (data, urls, key) => {
  const video = data ? data : [];
  const loading = data ? false : true;
  const videoUrls = urls
    ? Array.from(urls).map((file) => URL.createObjectURL(file))
    : [];

  return {
    type: UPLOAD_VIDEO_SUCCESS,
    payload: {
      video,
      videoUpload: loading,
      videoUrls,
      key,
      videos: video,
    },
  };
};

const uploadVideoFailure = (error) => {
  return {
    type: UPLOAD_VIDEO_FAILURE,
    payload: { error },
  };
};
