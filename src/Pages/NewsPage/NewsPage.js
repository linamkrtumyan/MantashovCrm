import React from "react";
import "./newsPage.css";
import NewsCard from "../../Components/News/NewsCard/NewsCard";
import AddNewsCard from "../../Components/News/AddNewsCard/AddNewsCard";

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
      </div>
    </div>
  );
}

export default NewsPage;
