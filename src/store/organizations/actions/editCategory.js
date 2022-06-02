import request from "../../request";
import { CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editCategory = (category, changePath) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_EDIT_REQUEST,
    });
    request("/admin/organizations/category", "PUT", category)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: CATEGORY_EDIT_SUCCESS_FAILURE,
          });
          changePath();
          toast.dark("Category edited");
        } else {
          dispatch({
            type: CATEGORY_EDIT_SUCCESS_FAILURE,
          });
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch({
          type: CATEGORY_EDIT_SUCCESS_FAILURE,
        });
        toast.error("Something bad happened");
      });
  };
};
