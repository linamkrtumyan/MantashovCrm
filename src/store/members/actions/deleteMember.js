import request from "../../request";
import {
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteMember = (id) => {
  // console.log(id, "uxarkvoxy");
  return (dispatch) => {
    dispatch(deleteMemberRequest());
    request(`/admin/members/member/${id}`, "DELETE")
      .then((data) => {
        // console.log(data, "data");
        dispatch(deleteMemberSuccess(data));
        toast.dark("Member removed");
      })
      .catch((e) => {
        dispatch(deleteMemberFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
      });
  };
};

const deleteMemberRequest = () => {
  return {
    type: DELETE_MEMBER_REQUEST,
  };
};

const deleteMemberSuccess = (data) => {
  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deleteMemberFailure = (error) => {
  return {
    type: DELETE_MEMBER_FAILURE,
    payload: { error },
  };
};
