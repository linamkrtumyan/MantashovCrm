import request from "../../request";
import store from "../../../store";
import {
  FETCH_MEMBERS_BY_PAGE_REQUEST,
  FETCH_MEMBERS_BY_PAGE_SUCCESS,
  FETCH_MEMBERS_BY_PAGE_FAILURE,
} from "../types";
import { changeCurrentPage } from "../../pagination/actions";

export const fetchMembersByPage = (page,searchValue) => {
  // const page = store.getState().paginationReducer.currentPage;

  return (dispatch) => {
    dispatch(fetchMembersByPageRequest());
    request(`/admin/members/${page}?searchValue=${searchValue}`)
      .then((data) => {
        dispatch(fetchMembersByPageSuccess(data));
        if (data.count > 0 && data.members.length === 0) {
          dispatch(changeCurrentPage(page));
        }
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
