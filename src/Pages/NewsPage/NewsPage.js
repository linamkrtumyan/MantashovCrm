import React, { useEffect } from "react";
import "./newsPage.css";
import NewsCard from "../../Components/News/NewsCard/NewsCard";
import AddNewsCard from "../../Components/News/AddNewsCard/AddNewsCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import { changeCurrentPage, fetchNewsByPage } from "../../store";
import Loading from "../../Components/Loading/Loading";
import { useHistory } from "react-router-dom";

function NewsPage({
  fetchNewsByPage,
  newsByPage,
  count,
  loading,
  noNews,
  currentPage,
  changeCurrentPage,
  action,
}) {
  let history = useHistory();

  useEffect(() => {
    changeCurrentPage(1);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchNewsByPage();
    }
  }, [currentPage, action]);

  function handleDetails(id) {
    history.push(`/edit-news/${id}`);
  }

  if (loading) {
    return <Loading />;
  }
  if (noNews) {
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
        <AddNewsCard />

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
                  <td colSpan="3">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalPosts={count} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  // console.log({ action: state.modalReducer.action });
  return {
    newsByPage: state.newsReducer.newsByPage,
    count: state.newsReducer.count,
    loading: state.newsReducer.loading,
    noNews: state.newsReducer.newsByPage.length === 0,
    currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    fetchNewsByPage: () => dispatch(fetchNewsByPage()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
