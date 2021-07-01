import React from "react";
import "./memberCard.css";

function MemberCard() {
  return (
    <div className="membercard_container">
      <div className="membercard_img_container">
        <img
          alt=""
          className="membercard_img"
          src={require("../../../img/artashes_only.jpg").default}
        />
      </div>
      <div className="membercard_text_container">
        <div className="membercard_title">
          <p>Lorem Ipsum</p>
        </div>
        <div className="membercard_subtitle">
          <p>Occupation</p>
        </div>
        <div className="membercard_text">
          Lorem Ipsum is simply dummy text of the
        </div>
      </div>
      <div className="membercard_action_component">
        <div>
          {" "}
          <img
            alt=""
            className="membercard_icon"
            src={require("../../../img/edit.svg").default}
          />
        </div>
        <div>
          {" "}
          <img
            alt=""
            className="membercard_icon"
            src={require("../../../img/trash.svg").default}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
