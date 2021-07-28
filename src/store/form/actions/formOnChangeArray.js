import { FORM_ON_CHANGE_ARRAY } from "../types";

export const formOnChangeArray = (firstKey, secondKey, value) => {
  //   console.log(key, value, "key and value");

  return {
    type: FORM_ON_CHANGE_ARRAY,
    payload: {
      firstKey,
      secondKey,
      value,
    },
  };
};
