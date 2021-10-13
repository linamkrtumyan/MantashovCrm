import store from "../..";
import request from "../../request";
import {
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addMember = (member, changePath) => {
  // console.log(member, "stacav");
  return (dispatch) => {
    dispatch(addMemberRequest());
    request("/admin/members/member", "POST", member)
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          // console.log(data, "news data");
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
        // console.log(e);
      });
  };
};

const addMemberRequest = () => {
  return {
    type: ADD_MEMBER_REQUEST,
  };
};

const addMemberSuccess = (data) => {
  // console.log(data, "news success data");
  //   const login = data ? data : [];
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
