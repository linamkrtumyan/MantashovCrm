import request from "../../request";
import { CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editCategory = (category, changePath) => {
  // console.log(news, "edit news send");
  return (dispatch) => {
    dispatch({
      type: CATEGORY_EDIT_REQUEST,
    });
    request("/admin/organizations/category", "PUT", category)
      .then((data) => {
        // console.log(data, "res edit");
        if (data.success) {
          dispatch({
            type: CATEGORY_EDIT_SUCCESS_FAILURE,
          });
          // console.log("change path");
          changePath();
          // console.log("toast");
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
