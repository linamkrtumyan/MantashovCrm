import request from "../../request";
import store from "../../../store";
import {
  FETCH_MEMBERS_FORM_REQUEST,
  FETCH_MEMBERS_FORM_SUCCESS,
  FETCH_MEMBERS_FORM_FAILURE,
} from "../types";

export const fetchMemberForm = () => {

  return (dispatch) => {
    dispatch(fetchMembersFormRequest());
    request("/admin/members/member/form")
      .then((data) => {
        dispatch(fetchMembersFormSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchMembersFormFailure(e.message));
      });
  };
};

const fetchMembersFormRequest = () => {
  return {
    type: FETCH_MEMBERS_FORM_REQUEST,
  };
};

const fetchMembersFormSuccess = (data) => {
  const memberForm = data ? data : [];
  return {
    type: FETCH_MEMBERS_FORM_SUCCESS,
    payload: {
      memberForm,
    },
  };
};

const fetchMembersFormFailure = (error) => {
  return {
    type: FETCH_MEMBERS_FORM_FAILURE,
    payload: { error },
  };
};
