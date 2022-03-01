import { DELETE_VIDEO_FROM_STORE } from "../types";

export const deleteVideoFromStore = (id, key) => {
  const deleteId = id;
  return {
    type: DELETE_VIDEO_FROM_STORE,
    payload: {
      deleteId,
      key,
    },
  };
};
