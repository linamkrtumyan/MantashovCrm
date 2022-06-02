import store from "../..";
import request from "../../request";
import {
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addMember = (member, changePath) => {
  return (dispatch) => {
    dispatch(addMemberRequest());
    request("/admin/members/member", "POST", member)
      .then((data) => {
        if (data.success) {
          dispatch(addMemberSuccess(data));
          toast.dark("Member added");

          changePath();
        } else {
          dispatch(addMemberFailure(data.errorMessage));

          toast.error(data.errorMessage);
        }
      })
      .catch((e) => {
        dispatch(addMemberFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const addMemberRequest = () => {
  return {
    type: ADD_MEMBER_REQUEST,
  };
};

const addMemberSuccess = (data) => {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload: {
      //   login,
    },
  };
};

const addMemberFailure = (error) => {
  return {
    type: ADD_MEMBER_FAILURE,
    payload: { error },
  };
};
