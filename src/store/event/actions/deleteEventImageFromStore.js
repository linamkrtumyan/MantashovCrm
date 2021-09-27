import { DELETE_EVENT_IMAGE_FROM_STORE } from "../types";

export const deleteEventImageFromStore = (id) => {
  // console.log("mtav");
  // console.log(id, "id delete image redux");
  const deleteId = id;
  return {
    type: DELETE_EVENT_IMAGE_FROM_STORE,
    payload: {
      deleteId,
    },
  };
};
