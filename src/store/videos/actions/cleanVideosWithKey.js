import { CLEAN_VIDEOS_WITH_KEY } from "../types";

export const cleanVideosWithKey = (key) => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_VIDEOS_WITH_KEY,
      payload: {
        key,
      },
    });
  };
};
