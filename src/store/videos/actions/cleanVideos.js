import { CLEAN_VIDEOS } from "../types";

export const cleanVideos = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_VIDEOS,
    });
  };
};
