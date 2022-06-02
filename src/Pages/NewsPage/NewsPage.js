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
import TableBody from "./components/TableBody";

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
  let { currentPage } = useParams();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    changeCurrentPage(1);
    fetchNewsByPage(1, "");
  }, []);

  useEffect(() => {
    fetchNewsByPage(currentPage, "");
  }, [deleted]);

  useEffect(() => {
    if (!loading) {
      fetchNewsByPage(currentPage, searchValue ?? "");
    }
  }, [currentPage, action, searchValue]);

  if (loading) {
    return <Loading />;
  }

  if (noNews && !searchValue && searchValue !== "") {
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
          <SearchBar
            id="newsSearch"
            containerClass="searchbar-container"
            url="/news"
          />
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
          {loading ? (
            <Loading />
          ) : (
            <table className="table is-striped is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th style={{ width: "11%" }}>Photo</th>
                  <th style={{ width: "30%" }}>Title</th>
                  <th style={{ width: "49%" }}>Text</th>
                  <th style={{ width: "10%" }}></th>
                </tr>
              </thead>

              <TableBody setDeleted={setDeleted} />
            </table>
          )}
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
    action: state.modalReducer.action,
    searchValue: state.formReducer?.newsSearch,
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
