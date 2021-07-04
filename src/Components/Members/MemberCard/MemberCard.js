import React from "react";
import "./memberCard.css";

function MemberCard({ memberByPage }) {
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
          <p>
            {memberByPage.firstName} {memberByPage.lastName}
          </p>
        </div>
        <div className="membercard_subtitle">
          <p>{memberByPage.location}</p>
        </div>
        <div className="membercard_text">{memberByPage.birthDate} </div>
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
