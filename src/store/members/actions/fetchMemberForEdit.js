import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_MEMBER_FOR_EDIT_REQUEST,
  FETCH_MEMBER_FOR_EDIT_SUCCESS,
  FETCH_MEMBER_FOR_EDIT_FAILURE,
} from "../types";

export const fetchMemberForEdit = (id) => {
  // console.log(id, "editiid");
  return (dispatch) => {
    dispatch(fetchMemberForEditRequest());
    request(`/admin/members/member/details/${id}`)
      .then((data) => {
        // console.log("mtav");
        // console.log(data, "data");
        dispatch(initForm(data));
        dispatch(fetchMemberForEditSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchMemberForEditFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchMemberForEditRequest = () => {
  return {
    type: FETCH_MEMBER_FOR_EDIT_REQUEST,
  };
};

const fetchMemberForEditSuccess = (data) => {
  const memberForEdit = data ? data : [];
  return {
    type: FETCH_MEMBER_FOR_EDIT_SUCCESS,
    payload: {
      memberForEdit,
    },
  };
};

const fetchMemberForEditFailure = (error) => {
  return {
    type: FETCH_MEMBER_FOR_EDIT_FAILURE,
    payload: { error },
  };
};
