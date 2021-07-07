import React from "react";
import "./newsCard.css";
import { useHistory } from "react-router-dom";

function NewsCard({ news }) {
  // console.log(news, "news");
  let history = useHistory();
  function handleClick() {
    history.push(`/news-details/${news.id}`);
  }
  return (
    <div className="newscard_container">
      <div className="newscard_img_container">
        <img
          alt=""
          className="newscard_img"
          src={`/api/image/?page=newsHeader&id=${news.id}&name=header.png`}
        />
      </div>
      <div className="newscard_text_container">
        <div className="newscard_title" onClick={handleClick}>
          <p>{news.title}</p>
        </div>
        <div className="newscard_text">{news.text}</div>
      </div>
      <div className="newscard_action_component">
        <div>
          {" "}
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/edit.svg").default}
          />
        </div>
        <div>
          {" "}
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/trash.svg").default}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
