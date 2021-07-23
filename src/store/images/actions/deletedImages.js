import { DELETED_IMAGES } from "../types";

export const deletedImages = (data) => {
  // console.log(data, "deletedImages data");
  const deletedImage = data ? data : [];
  return {
    type: DELETED_IMAGES,
    payload: {
      deletedImage,
    },
  };
};
