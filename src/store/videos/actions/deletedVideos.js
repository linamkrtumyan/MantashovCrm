import { DELETED_VIDEOS } from "../types";

export const deletedVideos = (data) => {
  const deletedVideo = data ? data : [];
  return {
    type: DELETED_VIDEOS,
    payload: {
      deletedVideo,
    },
  };
};
