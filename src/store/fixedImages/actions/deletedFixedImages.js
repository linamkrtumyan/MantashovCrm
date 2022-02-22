import { DELETED_FIXED_IMAGES } from "../types";

export const deletedFixedImages = (data) => {
  const deletedVideo = data ? data : [];
  return {
    type: DELETED_FIXED_IMAGES,
    payload: {
      deletedVideo,
    },
  };
};
