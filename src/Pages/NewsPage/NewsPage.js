import React from "react";
import "./newsPage.css";
import NewsCard from "../../Components/News/NewsCard/NewsCard";
import AddNewsCard from "../../Components/News/AddNewsCard/AddNewsCard";
import Pagination from "../../Components/Pagination/Pagination";

function NewsPage() {
  return (
    <div className="news_component">
      <div className="news_title">All News</div>
      <div className="all_newscard_container">
        <AddNewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <Pagination/>
      </div>
    </div>
  );
}

export default NewsPage;
