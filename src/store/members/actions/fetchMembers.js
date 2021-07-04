import request from "../../request";
import {
  FETCH_MEMBERS_BY_PAGE_REQUEST,
  FETCH_MEMBERS_BY_PAGE_SUCCESS,
  FETCH_MEMBERS_BY_PAGE_FAILURE,
} from "../types";

export const fetchMembersByPage = (page) => {
  return (dispatch) => {
    dispatch(fetchMembersByPageRequest());
    request(`/api/members/${page}`)
      .then((data) => {
        console.log(data, "data");
        dispatch(fetchMembersByPageSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchMembersByPageFailure(e.message));
      });
  };
};

const fetchMembersByPageRequest = () => {
  return {
    type: FETCH_MEMBERS_BY_PAGE_REQUEST,
  };
};

const fetchMembersByPageSuccess = (data) => {
  const membersByPage = data ? data : [];
  return {
    type: FETCH_MEMBERS_BY_PAGE_SUCCESS,
    payload: {
      membersByPage,
    },
  };
};

const fetchMembersByPageFailure = (error) => {
  return {
    type: FETCH_MEMBERS_BY_PAGE_FAILURE,
    payload: { error },
  };
};
