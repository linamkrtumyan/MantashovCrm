import React, { useEffect, useState } from "react";
import "./newsPage.css";
import NewsCard from "../../Components/News/NewsCard/NewsCard";
import AddNewsCard from "../../Components/News/AddNewsCard/AddNewsCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import store, { changeCurrentPage, fetchNewsByPage } from "../../store";
import Loading from "../../Components/Loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useQuery } from "../../Hooks/useQuery";

function NewsPage({
  fetchNewsByPage,
  newsByPage,
  count,
  loading,
  noNews,
  // currentPage,
  changeCurrentPage,
  action,
  searchValue,
}) {
  let history = useHistory();
  let { currentPage } = useParams();

  useEffect(() => {
    changeCurrentPage(1);
  }, []);

  // useEffect(() => {
  //   fetchNewsByPage(currentPage);
  // }, []);

  useEffect(() => {
    if (!loading) {
      fetchNewsByPage(currentPage, searchValue ?? "");
    }
  }, [currentPage, action, searchValue]);

  function handleDetails(id) {
    history.push(`/edit-news/${id}`);
  }

  if (loading) {
    return <Loading />;
  }
  if (noNews && (!searchValue || searchValue == "")) {
    return (
      <div className="noData">
        <div>
          <div className="nodata_text">No news, you can add a news</div>
          <AddNewsCard />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="members_container">
        <div className="is-flex is-justify-content-flex-end">
          <SearchBar id="newsSearch" containerClass="searchbar-container" />
          <AddNewsCard />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 20px",
            overflowY: "scroll",
            maxHeight: "65vh",
          }}
        >
          <table className="table is-striped is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th style={{ width: "11%" }}>Photo</th>
                <th style={{ width: "50%" }}>Title</th>
                <th style={{ width: "49%" }}>Text</th>
              </tr>
            </thead>

            <tbody>
              {newsByPage.length > 0 ? (
                newsByPage.map((news, index) => {
                  return (
                    <tr
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetails(news.id)}
                      key={index}
                      className="tableRows"
                    >
                      <td>
                        <img
                          alt=""
                          className="newscard_img"
                          onError={(e) => {
                            e.preventDefault();
                            e.target.onerror = null;
                            e.target.src =
                              require("../../img/unnamed.png").default;
                          }}
                          // src={`/images/newsHeader/${news.id}/header.png`}
                          src={`${news.image}`}
                        />
                      </td>
                      <td>{news.title}</td>
                      <td
                      // style={{ width: "30%" }}
                      >
                        {news.text}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">
                    {!searchValue || searchValue === ""
                      ? "No data"
                      : "Nothing found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalPosts={count} url="/news" />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    newsByPage: state.newsReducer.newsByPage,
    count: state.newsReducer.count,
    loading: state.newsReducer.loading,
    noNews: state.newsReducer.newsByPage.length === 0,
    // currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
    searchValue: state.formReducer?.newsSearch ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    fetchNewsByPage: (page, searchValue) =>
      dispatch(fetchNewsByPage(page, searchValue)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
