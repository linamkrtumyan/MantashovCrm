import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchNewsByPage, changeCurrentPage, deleteNews } from "../../../store";
import { useParams, useHistory } from "react-router-dom";

function TableBody({
  searchValue,
  newsByPage,
  fetchNewsByPage,
  action,
  loading,
  changeCurrentPage,
  deleteNews,
  setDeleted,
}) {
  let history = useHistory();
  let { currentPage } = useParams();
  useEffect(() => {
    changeCurrentPage(1);
  }, []);

  function handleDetails(id) {
    history.push(`/edit-news/${id}`);
  }

  const handleDelete = (id) => {
    deleteNews(id);
    setDeleted((prev) => !prev);
  };

  return (
    <tbody>
      {newsByPage.length > 0 ? (
        newsByPage.map((news, index) => {
          return (
            <tr
              style={{ cursor: "pointer" }}
              key={index}
              className="tableRows newsTable"
            >
              <td onClick={() => handleDetails(news.id)}>
                <img
                  alt=""
                  className="newscard_img"
                  onError={(e) => {
                    e.preventDefault();
                    e.target.onerror = null;
                    e.target.src = require("../../../img/unnamed.png").default;
                  }}
                  // src={`/images/newsHeader/${news.id}/header.png`}
                  src={`${news.image}`}
                />
              </td>
              <td onClick={() => handleDetails(news.id)}>{news.title}</td>
              <td onClick={() => handleDetails(news.id)} className="newsText">
                {news.text}
              </td>
              <td
                onClick={() => {
                  handleDelete(news.id);
                }}
              >
                <i className="far fa-trash-alt"></i>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="3">{"Nothing found"}</td>
        </tr>
      )}
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    searchValue: state.formReducer?.newsSearch ?? "",
    newsByPage: state.newsReducer.newsByPage,
    action: state.modalReducer.action,
    loading: state.newsReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    fetchNewsByPage: (page, searchValue) =>
      dispatch(fetchNewsByPage(page, searchValue)),
    deleteNews: (id) => dispatch(deleteNews(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
