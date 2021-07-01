import React from "react";
import "./newsCard.css";

function NewsCard() {
  return (
    <div className="newscard_container">
      <div className="newscard_img_container">
        <img
          alt=""
          className="newscard_img"
          src={require("../../../img/artashes.jpg").default}
        />
      </div>
      <div className="newscard_text_container">
        <div className="newscard_title">
          <p>Lorem Ipsum</p>
        </div>
        <div className="newscard_text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </div>
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
