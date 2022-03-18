import request from "../../request";
import { POSITION_EDIT_REQUEST, POSITION_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editPosition = (position, changePath) => {
  return (dispatch) => {
    dispatch({
      type: POSITION_EDIT_REQUEST,
    });
    request("/admin/organizations/position", "PUT", position)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: POSITION_EDIT_SUCCESS_FAILURE,
          });
          changePath();
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
