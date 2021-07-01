import React from "react";
import "./eventCard.css";

function EventCard() {
  return (
    <div className="eventcard_container">
      <div className="evantcard_img_container">
        <img
          alt=""
          className="evantcard_img"
          src={require("../../../img/artashes.jpg").default}
        />
      </div>
      <div className="eventcard_text_container">
        <div className="eventcard_title">
          <p>Lorem Ipsum</p>
        </div>
        <div className="eventcard_text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
      </div>
      <div className="eventcard_action_container">
        <div>
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/white_edit.svg").default}
          />
        </div>
        <div>
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/white_trash.svg").default}
          />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
