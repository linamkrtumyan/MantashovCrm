import React, { useEffect } from "react";
import "./newsPage.css";
import NewsCard from "../../Components/News/NewsCard/NewsCard";
import AddNewsCard from "../../Components/News/AddNewsCard/AddNewsCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import { fetchNewsByPage } from "../../store";
import Loading from "../../Components/Loading/Loading";

function NewsPage({
  fetchNewsByPage,
  newsByPage,
  count,
  loading,
  noNews,
  currentPage,
}) {
  useEffect(() => {
    fetchNewsByPage();
  }, [currentPage]);

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
    <div className="news_component">
      <div className="news_title">All News</div>
      <div className="all_newscard_container">
        <AddNewsCard />
        {newsByPage.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsByPage: () => dispatch(fetchNewsByPage()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
