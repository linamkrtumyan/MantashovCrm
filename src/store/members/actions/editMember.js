import request from "../../request";
import { MEMBER_EDIT_REQUEST, MEMBER_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editMember = (member, changePath) => {
  // console.log(news, "edit news send");
  return (dispatch) => {
    dispatch({
      type: MEMBER_EDIT_REQUEST,
    });
    request("/admin/members/member", "PUT", member)
      .then((data) => {
        // console.log(data, "res edit");
        if (data.success) {
          dispatch({
            type: MEMBER_EDIT_SUCCESS_FAILURE,
          });
          // console.log("change path");
          changePath();
          // console.log("toast");
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
