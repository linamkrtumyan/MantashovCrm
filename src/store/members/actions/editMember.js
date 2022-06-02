import request from "../../request";
import { MEMBER_EDIT_REQUEST, MEMBER_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editMember = (member, changePath) => {
  return (dispatch) => {
    dispatch({
      type: MEMBER_EDIT_REQUEST,
    });
    request("/admin/members/member", "PUT", member)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: MEMBER_EDIT_SUCCESS_FAILURE,
          });
          changePath();
          toast.dark("Member edited");
        } else {
          dispatch({
            type: MEMBER_EDIT_SUCCESS_FAILURE,
          });
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch({
          type: MEMBER_EDIT_SUCCESS_FAILURE,
        });
        toast.error("Something bad happened");
      });
  };
};
