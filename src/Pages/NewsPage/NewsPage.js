import React, { useEffect } from "react";
import "./newsPage.css";
import NewsCard from "../../Components/News/NewsCard/NewsCard";
import AddNewsCard from "../../Components/News/AddNewsCard/AddNewsCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import { fetchNewsByPage } from "../../store";
import Loading from "../../Components/Loading/Loading";
import { useHistory } from "react-router-dom";

function NewsPage({
  fetchNewsByPage,
  newsByPage,
  count,
  loading,
  noNews,
  currentPage,
  action,
}) {
  let history = useHistory();

  useEffect(() => {
    fetchNewsByPage();
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
            padding: "0 50px",
            overflowY: "scroll",
            maxHeight: "65vh",
          }}
        >
          <table className="table is-striped  is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Title</th>
                <th>Text</th>
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
                          src={`/images/newsHeader/${news.id}/header.png`}
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
  // console.log(state, "state");
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
    fetchNewsByPage: () => dispatch(fetchNewsByPage()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
