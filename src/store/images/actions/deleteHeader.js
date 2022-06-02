import { DELETE_HEADER } from "../types";

export const deleteHeader = (id) => {
  return {
    type: DELETE_HEADER,
    payload: {
      deletedHeaderId: id,
    },
  };
};
