import request from "../../request";
import store from "../..";
import {
  FETCH_CATEGORIES_ALL_REQUEST,
  FETCH_CATEGORIES_ALL_SUCCESS,
  FETCH_CATEGORIES_ALL_FAILURE,
} from "../types";

export const fetchCategoriesAll = () => {
  // console.log(page, "uxarkvox page");

  return (dispatch) => {
    dispatch(fetchCategoriesAllRequest());
    request("/admin/organizations/categoriesForAdmin")
      .then((data) => {
        // console.log(data, "data");
        dispatch(fetchCategoriesAllSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchCategoriesAllFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchCategoriesAllRequest = () => {
  return {
    type: FETCH_CATEGORIES_ALL_REQUEST,
  };
};

const fetchCategoriesAllSuccess = (data) => {
  const categoriesAll = data ? data : [];
  return {
    type: FETCH_CATEGORIES_ALL_SUCCESS,
    payload: {
      categoriesAll,
    },
  };
};

const fetchCategoriesAllFailure = (error) => {
  return {
    type: FETCH_CATEGORIES_ALL_FAILURE,
    payload: { error },
  };
};
