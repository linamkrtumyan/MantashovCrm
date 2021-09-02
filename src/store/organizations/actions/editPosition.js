import request from "../../request";
import { POSITION_EDIT_REQUEST, POSITION_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editPosition = (position, changePath) => {
  // console.log(news, "edit news send");
  return (dispatch) => {
    dispatch({
      type: POSITION_EDIT_REQUEST,
    });
    request("/admin/organizations/position", "PUT", position)
      .then((data) => {
        // console.log(data, "res edit");
        if (data.success) {
          dispatch({
            type: POSITION_EDIT_SUCCESS_FAILURE,
          });
          // console.log("change path");
          changePath();
          // console.log("toast");
          toast.dark("Category edited");
        } else {
          dispatch({
            type: POSITION_EDIT_SUCCESS_FAILURE,
          });
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch({
          type: POSITION_EDIT_SUCCESS_FAILURE,
        });
        toast.error("Something bad happened");
      });
  };
};
