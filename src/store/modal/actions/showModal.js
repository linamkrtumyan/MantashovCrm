import { OPEN_MODAL, CLOSE_MODAL, CALL_ACTION } from "../types";

export const openModal = (show) => {
  return {
    type: OPEN_MODAL,
    payload: {
      show,
    },
  };
};

export const closeModal = (show) => {
  return {
    type: CLOSE_MODAL,
    payload: {
      show,
    },
  };
};

export const callAction = (action) => {
  return {
    type: CALL_ACTION,
    payload: {
      action,
    },
  };
};
