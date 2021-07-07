import { FORM_ON_CHANGE } from "../types";

export const formOnChange = (key, value) => {
  return {
    type: FORM_ON_CHANGE,
    payload: {
      key,
      value,
    },
  };
};
